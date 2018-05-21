<?php
include_once '../include/api_header.inc.php';

try {
    $username = $_GET['username'];
    if(!isset($_GET['userid']) || $_GET['userid'] == null || $_GET['userid'] == "" || $_GET['userid'] == 0){
        $o = new User_account();
        $e = $o->findOne([
            'account_id' => $username
        ]);
        if (!$e)
            throw new Exception("Tên người dùng không hợp lệ ($username) ");
        $userid = $e->user_id;
    }
    else {
        $userid = $_GET['userid'];
    }
    $o = new Test();
    $e = $o->findAll([
        'user_id' => $userid
    ]);
    if (!$e)
        throw new Exception("Không có bài thi của người dùng ($userid)");
    $response = [
        'success' => 1,
        'userid' => $userid,
        'tests' => $e
    ];
}catch (Exception $e){
    $response['error'] = $e->getMessage();
}
include_once '../include/api_footer.inc.php';