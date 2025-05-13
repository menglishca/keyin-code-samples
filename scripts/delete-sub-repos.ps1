$org = "Keyin-Fullstack-and-Databases"
$sourceRoots = @(
    @{ Path = "databases"; Prefix = "keyin-db-" },
    @{ Path = "fullstack";  Prefix = "keyin-fs-" }
)

foreach ($source in $sourceRoots) {
    $rootPath = $source.Path
    $prefix = $source.Prefix

    Write-Host "`nChecking: $rootPath (prefix: $prefix)"

    Get-ChildItem -Path $rootPath -Directory | ForEach-Object {
        $topic = $_.Name

        $repoName = $topic -replace '^\d+-', $prefix
        $fullRepo = "$org/$repoName"

        Write-Host "Checking if repo exists: $fullRepo"
        $repoExists = gh repo view $fullRepo --json name 2>$null

        if ($repoExists) {
            Write-Host "Deleting repo: $fullRepo"
            gh repo delete $fullRepo --yes
        } else {
            Write-Host "Repo does not exist"
        }
    }
}
