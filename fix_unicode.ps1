$content = [System.IO.File]::ReadAllText('d:\bluevideosaver.com\app\blog\posts.tsx')
$emdash = [char]0x2014
$content = $content.Replace('\u2014', $emdash.ToString())
[System.IO.File]::WriteAllText('d:\bluevideosaver.com\app\blog\posts.tsx', $content, (New-Object System.Text.UTF8Encoding $false))
Write-Host "Fixed unicode escape"
