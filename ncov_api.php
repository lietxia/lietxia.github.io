<?php
$ch = curl_init('https://ncov.dxy.cn/ncovh5/view/pneumonia');
curl_setopt($ch, CURLOPT_TIMEOUT, 12);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

if (preg_match(
    "/window\.getListByCountryTypeService2[^<]+</u",
    $response,
    $matches
)) {
    $text1 = mb_substr($matches[0], 37, mb_strlen($matches[0]) - 49);
}

if (preg_match(
    "/window\.getAreaStat[^<]+</u",
    $response,
    $matches
)) {
    $text2 = mb_substr($matches[0], 20, mb_strlen($matches[0]) - 32);
}
$text = '{"success":true,"world":' . $text1 . ',"china":' . $text2 . "}";
$text = json_encode(json_decode($text));
echo ($text);
$myfile = fopen("ncov.json", "w") or die("Unable to open file!");
fwrite($myfile, $text);
fclose($myfile);
