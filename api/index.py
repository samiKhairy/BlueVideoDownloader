import os
from flask import Flask, request, jsonify, render_template
from yt_dlp import YoutubeDL

app = Flask(__name__, template_folder="../templates")

YDL_OPTS = {
    "quiet": True,
    "no_warnings": True,
    "skip_download": True,
    "forcejson": True
}


@app.route("/", methods=["GET"])
def home():
    return render_template("index.html")


@app.route("/api/extract", methods=["POST"])
def extract():
    data = request.get_json()
    url = data.get("url")

    if not url:
        return jsonify({"error": "No URL provided"}), 400

    try:
        with YoutubeDL(YDL_OPTS) as ydl:
            info = ydl.extract_info(url, download=False)

        video_url = info.get("url")
        thumbnail = info.get("thumbnail")

        return jsonify({
            "video": video_url,
            "thumbnail": thumbnail
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Vercel entry point
def handler(event, context):
    return app(event, context)
