<# 
  git-autosave.ps1 — Resume project
  ทำงานทุก 5 นาที ผ่าน Windows Task Scheduler
  บันทึกทุกการเปลี่ยนแปลงอัตโนมัติ
  กู้คืนด้วย: git checkout <hash> -- <file>
#>

$ProjectPath = "C:\Users\poomi\Downloads\MoonRacle\Resume"
$LogFile = "$ProjectPath\.git\autosave.log"

function Write-Log($msg) {
    $ts = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "$ts | $msg" | Out-File -Append -FilePath $LogFile -Encoding utf8
}

Set-Location $ProjectPath

# Check if there are any changes (staged, unstaged, or untracked)
$status = git status --porcelain 2>&1
if (-not $status) {
    # No changes — skip silently
    exit 0
}

# Count changed files
$changedFiles = ($status -split "`n").Count

# Stage all changes
git add -A 2>&1 | Out-Null

# Commit with timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
$commitMsg = "autosave: $timestamp ($changedFiles files)"

$result = git commit -m $commitMsg 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Log "OK | $commitMsg"
} else {
    Write-Log "SKIP | nothing to commit"
}
