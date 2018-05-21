<?php
$debug = Console::flush();
if (count($debug))
	$response['debug'] = $debug;
$output = json_encode($response);
if (isset($_GET['callback']))
	echo "{$_GET['callback']}($output);";
else
	echo $output;