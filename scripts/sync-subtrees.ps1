$org = "Keyin-Fullstack-and-Databases"
$sourceRoots = @(
    @{ Path = "databases"; Prefix = "keyin-db-" },
    @{ Path = "fullstack";  Prefix = "keyin-fs-" }
)

foreach ($source in $sourceRoots) {
    $rootPath = $source.Path
    $prefix = $source.Prefix

    Write-Host "`n🔄 Syncing updates for: $rootPath (prefix: $prefix)"

    Get-ChildItem -Path $rootPath -Directory | ForEach-Object {
        $topic = $_.Name
        $basePath = Join-Path $rootPath "$topic/base"

        # Skip if base folder missing or empty
        if (!(Test-Path $basePath) -or ((Get-ChildItem $basePath | Measure-Object).Count -eq 0)) {
            Write-Host "⏭️ Skipping $topic (no base folder or empty)"
            return
        }

        $repoName = $topic -replace '^\d+-', $prefix
        $repoUrl = "https://github.com/$org/$repoName.git"
        $basePathRelative = "$rootPath/$topic/base" -replace '\\', '/'

        Write-Host "Pushing updates for $basePathRelative → $repoName"

        git subtree push --prefix=$basePathRelative $repoUrl main
    }
}
