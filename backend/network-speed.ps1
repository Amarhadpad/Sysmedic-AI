$rxCounter = Get-Counter '\Network Interface(*)\Bytes Received/sec'


$rx =
$rxCounter.CounterSamples |
Where-Object {
    $_.InstanceName -match "rtl8852|wifi|wireless"
} |
Select-Object -First 1 -ExpandProperty CookedValue



$txCounter = Get-Counter '\Network Interface(*)\Bytes Sent/sec'


$tx =
$txCounter.CounterSamples |
Where-Object {
    $_.InstanceName -match "rtl8852|wifi|wireless"
} |
Select-Object -First 1 -ExpandProperty CookedValue



if($null -eq $rx){
    $rx = 0
}


if($null -eq $tx){
    $tx = 0
}



$result = @{
    download = [math]::Round(($rx / 1024),2)
    upload = [math]::Round(($tx / 1024),2)
}



$result | ConvertTo-Json
