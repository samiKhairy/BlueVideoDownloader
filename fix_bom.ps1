# Check for BOM in posts.tsx
$bytes = [System.IO.File]::ReadAllBytes('d:\bluevideosaver.com\app\blog\posts.tsx')
if ($bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
    Write-Host "BOM DETECTED - removing it"
    $content = [System.IO.File]::ReadAllText('d:\bluevideosaver.com\app\blog\posts.tsx')
    [System.IO.File]::WriteAllText('d:\bluevideosaver.com\app\blog\posts.tsx', $content, (New-Object System.Text.UTF8Encoding $false))
    Write-Host "BOM removed"
} else {
    Write-Host "No BOM found - file encoding is clean"
}
Write-Host "First 3 bytes: $($bytes[0]) $($bytes[1]) $($bytes[2])"
