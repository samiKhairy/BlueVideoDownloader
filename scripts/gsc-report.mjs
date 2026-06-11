// GSC Search Analytics report for sc-domain:bluevideosaver.com
//
// Setup (one-time, see scripts/README-gsc.md):
//   1. Enable "Google Search Console API" in a Google Cloud project
//   2. Create a service account + JSON key, save it (path below)
//   3. In Search Console > Settings > Users and permissions, add the
//      service account email as a user (Full or Restricted)
//   4. npm install googleapis
//
// Usage:
//   GSC_KEY_FILE=./secrets/gsc-key.json node scripts/gsc-report.mjs
//   node scripts/gsc-report.mjs --days 28 --dimension query --limit 25
//   node scripts/gsc-report.mjs --start 2026-05-01 --end 2026-05-31 --dimension page
//   node scripts/gsc-report.mjs --dimension query --csv > queries.csv

import { google } from "googleapis";
import { readFileSync } from "node:fs";

const SITE_URL = process.env.GSC_SITE_URL || "sc-domain:bluevideosaver.com";
const KEY_FILE = process.env.GSC_KEY_FILE || "./secrets/gsc-key.json";

// ---- args ----
const args = process.argv.slice(2);
const getArg = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i !== -1 && args[i + 1] ? args[i + 1] : def;
};
const hasFlag = (name) => args.includes(`--${name}`);

const dimension = getArg("dimension", "query"); // query | page | country | device | date | searchAppearance
const limit = parseInt(getArg("limit", "25"), 10);
const days = parseInt(getArg("days", "28"), 10);
const asCsv = hasFlag("csv");

const today = new Date();
const fmt = (d) => d.toISOString().slice(0, 10);
const defaultEnd = new Date(today);
defaultEnd.setDate(defaultEnd.getDate() - 1); // GSC data lags ~1-2 days
const defaultStart = new Date(defaultEnd);
defaultStart.setDate(defaultStart.getDate() - (days - 1));

const startDate = getArg("start", fmt(defaultStart));
const endDate = getArg("end", fmt(defaultEnd));

async function main() {
  let credentials;
  try {
    credentials = JSON.parse(readFileSync(KEY_FILE, "utf8"));
  } catch (e) {
    console.error(`\n✗ Could not read service-account key at "${KEY_FILE}".`);
    console.error(`  Set GSC_KEY_FILE or place the JSON key there.\n  (${e.message})\n`);
    process.exit(1);
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });
  const webmasters = google.webmasters({ version: "v3", auth });

  let res;
  try {
    res = await webmasters.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate,
        endDate,
        dimensions: [dimension],
        rowLimit: limit,
      },
    });
  } catch (e) {
    console.error(`\n✗ API request failed: ${e.message}`);
    if (String(e.message).includes("403")) {
      console.error(
        `  Make sure the service-account email is added as a user on ${SITE_URL} in Search Console.\n`
      );
    }
    process.exit(1);
  }

  const rows = res.data.rows || [];

  if (asCsv) {
    console.log([dimension, "clicks", "impressions", "ctr", "position"].join(","));
    for (const r of rows) {
      const k = (r.keys?.[0] ?? "").replace(/"/g, '""');
      console.log(
        [`"${k}"`, r.clicks, r.impressions, (r.ctr * 100).toFixed(2) + "%", r.position.toFixed(1)].join(",")
      );
    }
    return;
  }

  console.log(`\nGSC ${SITE_URL}  |  ${startDate} → ${endDate}  |  by ${dimension}\n`);
  if (!rows.length) {
    console.log("No data for this range.\n");
    return;
  }

  const totals = rows.reduce(
    (a, r) => ({ clicks: a.clicks + r.clicks, impressions: a.impressions + r.impressions }),
    { clicks: 0, impressions: 0 }
  );

  const pad = (s, n) => String(s).padEnd(n);
  const padL = (s, n) => String(s).padStart(n);
  console.log(
    pad(dimension, 45) + padL("clicks", 8) + padL("impr", 9) + padL("ctr", 8) + padL("pos", 7)
  );
  console.log("-".repeat(77));
  for (const r of rows) {
    const key = (r.keys?.[0] ?? "").slice(0, 44);
    console.log(
      pad(key, 45) +
        padL(r.clicks, 8) +
        padL(r.impressions, 9) +
        padL((r.ctr * 100).toFixed(1) + "%", 8) +
        padL(r.position.toFixed(1), 7)
    );
  }
  console.log("-".repeat(77));
  console.log(pad("TOTAL (top rows)", 45) + padL(totals.clicks, 8) + padL(totals.impressions, 9) + "\n");
}

main();
