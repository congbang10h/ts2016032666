<?php
include_once '../include/api_header.inc.php';

try {
	$username = $_GET['username'];
	$o = new User_account();
        $e = $o->findOne([
            'account_id' => $username
        ]);
        if (!$e)
            throw new Exception("Tên người dùng không hợp lệ ($username) ");
        $userid = $e->user_id;

	$o = new Taker_test_map();
	// $userid = $_GET['userid'];
	$testid = $_GET['testid'];
	$e = $o->findOne([
		'user_id' => $userid,
		'test_id' => $testid
	]);

	if (!$e)
		throw new Exception("Không có bài thi ($userid,$testid)");
	$response['$e->taker_test_map_id'] = $e->taker_test_map_id;
	$o = new Exam();
	$result = $o->calculMark($e->taker_test_map_id, $testid);
	$response = [
		'success' => 1,
		'score' => $result[0],
		'maxscore' => $result[1],
		'userid' => $userid,
		'testid' => $testid
	];
}catch (Exception $e){
	$response['error'] = $e->getMessage();
}
include_once '../include/api_footer.inc.php';