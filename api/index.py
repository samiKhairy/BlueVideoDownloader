from __future__ import annotations

import logging
import re
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Any, Dict, Optional

from flask import Flask, jsonify, render_template, request
from yt_dlp import YoutubeDL

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
)
logger = logging.getLogger("bluesky-downloader")


BASE_DIR = Path(__file__).resolve().parent.parent
TEMPLATES_DIR = BASE_DIR / "templates"
app = Flask(__name__, template_folder=str(TEMPLATES_DIR))
app.config["JSON_SORT_KEYS"] = False


# --------------------------------------------------------------------
# Domain model
# --------------------------------------------------------------------
@dataclass
class ExtractionResult:
    video_url: str
    thumbnail_url: Optional[str] = None

    def to_response(self) -> Dict[str, Any]:
        return asdict(self)


class BlueskyDownloader:
    """Wrapper around yt_dlp with Bluesky-friendly defaults."""

    DEFAULT_HEADERS = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/129.0.0.0 Safari/537.36"
        )
    }

    BLSKY_URL_RE = re.compile(
        r"https?://(?:www\.)?(?:bsky\.app|staging\.bsky\.app)/profile/.+",
        re.IGNORECASE,
    )

    def __init__(self, session_headers: Optional[Dict[str, str]] = None) -> None:
        headers = {**self.DEFAULT_HEADERS, **(session_headers or {})}
        self.ydl_opts: Dict[str, Any] = {
            "quiet": True,
            "no_warnings": True,
            "skip_download": True,
            "forcejson": True,
            "noplaylist": True,
            "format": "bv*+ba/bestvideo+bestaudio/best",
            "http_headers": headers,
        }
        self.logger = logging.getLogger(self.__class__.__name__)

    @classmethod
    def is_valid_url(cls, url: str) -> bool:
        return bool(cls.BLSKY_URL_RE.match(url.strip()))

    def extract(self, url: str) -> ExtractionResult:
        normalized_url = url.strip()
        if not normalized_url:
            raise ValueError("Please provide a Bluesky post URL.")
        if not self.is_valid_url(normalized_url):
            raise ValueError("Only Bluesky post URLs are supported.")

        self.logger.info("Extracting Bluesky URL", extra={"url": normalized_url})

        with YoutubeDL(self.ydl_opts) as ydl:
            info = ydl.extract_info(normalized_url, download=False)

        video_url = info.get("url")
        if not video_url:
            raise ValueError("No downloadable video stream found.")

        thumbnail_url: Optional[str] = info.get("thumbnail")
        return ExtractionResult(video_url=video_url, thumbnail_url=thumbnail_url)


downloader = BlueskyDownloader()


# --------------------------------------------------------------------
# Routes
# --------------------------------------------------------------------
@app.route("/", methods=["GET"])
def home() -> str:
    return render_template("index.html")


@app.route("/api/extract", methods=["POST"])
def extract() -> Any:
    payload = request.get_json(silent=True) or {}
    url = (payload.get("url") or "").strip()

    try:
        result = downloader.extract(url)
    except ValueError as exc:
        logger.warning("Client validation error: %s", exc)
        return jsonify({"error": str(exc)}), 400
    except Exception as exc:  # noqa: BLE001
        logger.exception("Failed to extract media")
        message = str(exc) or "Unable to process this URL right now."
        return jsonify({"error": message}), 500

    return jsonify(result.to_response())


@app.route("/api/health", methods=["GET"])
def health() -> Any:
    return jsonify({"status": "ok"})


# Vercel's Python runtime will pick up `app` automatically as a WSGI app.
