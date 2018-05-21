<?php
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần EDITABLE ZONE
//Những nội dung bên ngoài phần EDITABLE ZONE sẽ bị thay đổi khi chạy tool
//Không thay đổi 2 nhãn //BEGIN EDITABLE ZONE và //END EDITABLE ZONE
class User_test_map extends DBObject{
	protected $_table = 'user_test_map';
	protected $_title = '';
	protected $_fields = array(
		'user_test_id'        => array(DBO_AUTO, 'user_test_id', NULL),
		'test_id'             => array(DBO_NUMB, 'test_id', NULL),
		'user_id'             => array(DBO_NUMB, 'user_id', '0'),
		'user_test_startdate' => array(DBO_DATE, 'user_test_startdate', NULL),
		'user_test_starttime' => array(DBO_TIME, 'user_test_starttime', NULL),
		'user_test_enddate'   => array(DBO_DATE, 'user_test_enddate', NULL),
		'user_test_endtime'   => array(DBO_TIME, 'user_test_endtime', NULL),
		'user_test_visible'   => array(DBO_NUMB, 'user_test_visible', NULL)
	);
	protected $_keys = array('user_test_id');
	protected $_fkeys = array(//class=array(fkey,pkey)
			'Test' => array('test_id', 'test_id'),
			'User' => array('user_id', 'user_id')
		);
//BEGIN EDITABLE ZONE

//END EDITABLE ZONE
}
?>