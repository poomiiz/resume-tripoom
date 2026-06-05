# perf-monitor.ps1
# Monitor Next.js Resume App performance

$Port = 3001
$Interval = 60 # seconds
$LogFile = "perf-audit.log"

Write-Host "--- Resume Performance Monitor Started ---" -ForegroundColor Cyan

function Get-PidOnPort($p) {
    $netstat = netstat -ano | findstr ":$p" | findstr "LISTENING"
    if ($netstat) {
        $parts = $netstat.Trim() -split '\s+'
        return $parts[-1]
    }
    return $null
}

while ($true) {
    $pidOnPort = Get-PidOnPort $Port
    if ($pidOnPort) {
        $proc = Get-Process -Id $pidOnPort -ErrorAction SilentlyContinue
        if ($proc) {
            $ram = [math]::Round($proc.WorkingSet / 1MB, 2)
            $cpu = [math]::Round($proc.CPU, 2)
            
            # Ping the app
            $start = Get-Date
            try {
                $resp = Invoke-WebRequest -Uri "http://localhost:$Port" -Method Get -TimeoutSec 5 -UseBasicParsing
                $elapsed = (Get-Date) - $start
                $ms = [math]::Round($elapsed.TotalMilliseconds, 2)
                $status = $resp.StatusCode
            } catch {
                $ms = -1
                $status = "Error"
            }

            $log = "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] PID: $pidOnPort | RAM: $($ram)MB | CPU: $($cpu)s | Resp: $($ms)ms | Status: $status"
            Write-Host $log
            $log | Out-File -FilePath $LogFile -Append -Encoding utf8
        }
    } else {
        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] No process listening on port $Port" -ForegroundColor Red
    }
    Start-Sleep -Seconds $Interval
}
