<?php
$basefile = $_SERVER['REDIRECT_URL'];
$ext = substr($basefile,strlen($basefile)-3);
$basefile = urldecode($basefile);
$filename = '../..'.$basefile;
$gzfile = '../../gz'.$basefile.'.gz';
if (is_file($gzfile)
	&& preg_match("/gzip/",$_SERVER['HTTP_ACCEPT_ENCODING'])){
	header('Content-Encoding: gzip');
	header('Content-type: '.($ext=='.js'?'text/javascript':'text/css'));
	readfile($gzfile);
}elseif (is_file($filename)){
	header('Content-type: '.($ext=='.js'?'text/javascript':'text/css'));
	readfile($filename);
}else{
	header("HTTP/1.0 404 Not Found");
}
