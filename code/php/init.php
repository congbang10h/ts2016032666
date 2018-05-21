<?php
define('APP_ID','TS1103');

$hostfile = $_SERVER['SERVER_NAME'].'.php';
if (is_file('php/host/'.$hostfile))
	require_once 'php/host/'.$hostfile;
elseif (is_file('host/'.$hostfile))
	require_once 'host/'.$hostfile;
elseif (is_file('../host/'.$hostfile))
	require_once '../host/'.$hostfile;
elseif (is_file('../php/host/'.$hostfile))
	require_once '../php/host/'.$hostfile;
else die('Testing System: Not found config file: '.$hostfile);

session_start();

date_default_timezone_set('Asia/Bangkok');
define('PS',PATH_SEPARATOR);

function __autoload($classname) {
	$name = $classname .'.php';
	$clsdir = APP_DIR.'php/';
	if (is_readable("$clsdir/class/$name"))
		require_once("$clsdir/class/$name");
	elseif (is_readable("$clsdir/dbo/$name"))
		require_once("$clsdir/dbo/$name");
	else{
		$trace = array_reverse(debug_backtrace());
		$len = strlen(APP_DIR);
		$r = '';
		foreach ($trace as $i=>$value) {
			$file = substr($value['file'], $len);
			$r .= "$i. {$file} ({$value['line']})\n";
		}
		echo "<pre>$r</pre>";
		die("<span style='color:red'><b>__autoload:</b> Can not open required ".
			"class $classname</span>");
	}
}

set_include_path(
	APP_DIR.'php/'.PS.
	APP_DIR.'php/class/'.PS.
	APP_DIR.'php/include/'
);

require_once 'constant.php';
require_once 'phpconfig.php';
require_once 'Console.php';
require_once 'exception.php';

Authorise::initUser();
UserLog::init();

/**SESSION SECURE**********/
session_set_cookie_params(5*60*60,null,null,null,1);
header("X-Powered-By: testts.com");
mb_internal_encoding("UTF-8");
