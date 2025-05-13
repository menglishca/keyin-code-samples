$org = "Keyin-Fullstack-and-Databases"
$sourceRoots = @(
    @{ Path = "databases"; Prefix = "keyin-db-" },
    @{ Path = "fullstack";  Prefix = "keyin-fs-" }
)

foreach ($source in $sourceRoots) {
    $rootPath = $source.Path
    $prefix = $source.Prefix

    Write-Host "`nProcessing source: $rootPath (prefix: $prefix)"

    Get-ChildItem -Path $rootPath -Directory | ForEach-Object {
        $topic = $_.Name
        $topicPath = $_.FullName
        $basePath = Join-Path $topicPath "base"
        $basePathRelative = "$rootPath/$topic/base"

        if (!(Test-Path $basePath) -or ((Get-ChildItem $basePath | Measure-Object).Count -eq 0)) {
            Write-Host "Skipping $topic"
            return
        }

        $repoName = $topic -replace '^\d+-', $prefix
        $repoUrl = "https://github.com/$org/$repoName.git"
        $branchName = "$($topic.Replace('-', '_'))_base_branch"

        Write-Host "`nCreating and pushing repo: $repoName"

        $existing = gh repo view "$org/$repoName" 2>$null

        if (-not $existing) {
            gh repo create "$org/$repoName" --public --description "Base examples for $topic"
            Write-Host "Repo $repoName created."
        }
        else {
            Write-Host "Repo $repoName already exists. Proceeding to push."
        }

        Write-Host "Creating subtree branch from: $basePathRelative"

        git subtree split --prefix=$basePathRelative -b $branchName

        if (git rev-parse --verify $branchName 2>$null) {
            Write-Host "➡️ Pushing $branchName → $repoUrl"
            git push $repoUrl $branchName
            git branch -D $branchName

            Write-Host "Renaming branch $branchName to main in $repoUrl"
            $tempPath = Join-Path $env:TEMP ([System.IO.Path]::GetRandomFileName())
            git clone --no-checkout --depth=1 --branch $branchName $repoUrl $tempPath

            Push-Location $tempPath

            git branch -m $branchName main
            git push origin main

            $repoSlug = ($repoUrl -replace 'https://github.com/', '') -replace '\.git$', ''
            Write-Host "Setting default branch to main for $repoSlug"
            gh repo edit $repoSlug --default-branch main

            git push origin --delete $branchName
            Pop-Location
            Remove-Item -Recurse -Force $tempPath
        }
        else {
            Write-Host "Failed to create branch $branchName. Skipping push."
        }
    }
}
