<?php
$csv = $_POST['csv'];
$format = $_POST['format'];

$fileName = "a." . $format;
$filePath = "../tmp/$fileName";

if(($fileHandle = fopen($filePath, "w")) === FALSE) die("Error: Could not open or create file!");
fwrite($fileHandle, $csv);
fclose($fileHandle);

echo $fileName;
