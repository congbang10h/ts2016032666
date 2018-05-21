<?php
session_start();
$origin = $_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'];
?>
var VXTScfg={
	root: '<?=$origin?>',
	code: '<?=session_id()?>'
};