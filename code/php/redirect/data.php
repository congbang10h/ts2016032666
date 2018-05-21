<?php
require_once '../host/'.$_SERVER['SERVER_NAME'].'.php';

$basefile = substr($_SERVER['REQUEST_URI'],strlen('data/'));
$basefile = urldecode($basefile);
$filename = APP_DATA.$basefile;
if (is_file($filename)){
	if (preg_match('/.[a-z0-9]{1,5}$/i',$filename,$match))
		$ext = strtolower(substr($match[0],1));
	else
		$ext = '';
	switch ($ext){
		case 'html':
		case 'htm':
			$minetype = 'text/html';
			break;
		case 'gif':
		case 'jpg':
		case 'jpeg':
		case 'png':
			$minetype = 'image/'.$ext;
			break;
		case 'flv':
			$minetype = 'video/'.$ext;
			break;
		case 'css':
			$minetype = 'text/css';
			break;
		case 'js':
			$minetype = 'text/javascript';
			break;
		default:
			$minetype = 'application/octet-stream';
	}
	header('Content-type: ' . $minetype);
	readfile($filename);
}else{
	header("HTTP/1.0 404 Not Found");
	//echo $filename;
}
