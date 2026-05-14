$content = Get-Content 'd:\bluevideosaver.com\app\blog\posts.tsx' -Raw
# Find and remove the old duplicate lines (606-608) 
$old1 = "    title: `"Bluesky Video Doesn`'t Save? Here`'s How to Fix It`","
$old2 = "    description: 'Solve failed Bluesky downloads with simple steps for iPhone, Android, and desktop.',"
$old3 = "    excerpt: 'Fix Bluesky videos not saving by using BlueVideoSaver and adjusting device settings.',"

# Just remove these 3 lines by replacing them with empty
$lines = Get-Content 'd:\bluevideosaver.com\app\blog\posts.tsx'
$newLines = @()
$skip = 0
for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($i -eq 605 -or $i -eq 606 -or $i -eq 607) {
        # These are the old duplicate lines (0-indexed: 605=line606, 606=line607, 607=line608)
        continue
    }
    $newLines += $lines[$i]
}
$newLines | Set-Content 'd:\bluevideosaver.com\app\blog\posts.tsx' -Encoding UTF8
Write-Host "Done. Removed 3 duplicate lines."
