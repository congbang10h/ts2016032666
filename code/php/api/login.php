<?php
include_once '../include/api_header.inc.php';

try {
	$o = new User();
	$response = $o->login((object)[
		'account_id' => $_GET['username'],
		'account_password' => $_GET['password']
	]);
	$response['token'] = session_id();
}catch (Exception $e){
	$response['error'] = $e->getMessage();
}
include_once '../include/api_footer.inc.php';