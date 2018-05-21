<?php
include_once '../include/api_header.inc.php';

try {
	$username = $_GET['username'];
	$firstname = $_GET['firstname'];
	$lastname = $_GET['lastname'];
	$password = $_GET['password'];
	$rolecode = strtolower($_GET['role']);
	if (!$username)
		throw new Exception("Chưa có tên tài khoản");
	$oUser = new User();
	$oAcc = new User_account();
	$acc = $oAcc->findOne([
		'account_id' => $username
	]);
	if ($acc)
		throw new Exception("Tài khoản [$username] đã tồn tại");
	$oRole = new Role();
	$role = $oRole->findOne(['role_code'=>$rolecode]);
	if (!$role)
		throw new Exception("Không hỗ trợ vai trò [$rolecode]");
	$userid = $oUser->_create([
		'user_code' => $username,
		'user_first_name' => $firstname,
		'user_last_name' => $lastname
	]);
	$oAcc->_create([
		'account_id' => $username,
		'user_id' => $userid,
		'account_password' => md5($password)
	]);
	$oAR = new User_account_role_map();
	$oAR->debug();
	$oAR->_create([
		'account_id' => $username,
		'user_id' => Authorise::getId(),
		'role_id' => $role->role_id,
		'granted_date' => date(FORMAT_SQL_DATE)
	]);
	$oAR->debug(0);
	$response = [
		'success' => 1,
		'userid' => $userid
	];
}catch (Exception $e){
	$response['error'] = $e->getMessage();
}
include_once '../include/api_footer.inc.php';