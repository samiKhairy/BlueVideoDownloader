$dir = "d:\bluevideosaver.com\14 april 2026 stats GSC google"
$files = Get-ChildItem "$dir\*.zip"
foreach($f in $files) {
    Write-Host "=== FILE: $($f.Name) ==="
    $td = Join-Path $dir ("extracted_" + [System.IO.Path]::GetFileNameWithoutExtension($f.Name))
    New-Item -ItemType Directory -Path $td -Force | Out-Null
    Expand-Archive -Path $f.FullName -DestinationPath $td -Force
    $csvs = Get-ChildItem $td -Recurse -Filter "*.csv"
    foreach($c in $csvs) {
        Write-Host "--- CSV: $($c.Name) ---"
        Get-Content $c.FullName
    }
}
