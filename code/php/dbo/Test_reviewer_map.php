<?php
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần EDITABLE ZONE
//Những nội dung bên ngoài phần EDITABLE ZONE sẽ bị thay đổi khi chạy tool
//Không thay đổi 2 nhãn //<ZoneC và //ZoneC>
class Test_reviewer_map extends DBObject{
	protected $_table = 'test_reviewer_map';
	protected $_title = '';
	protected $_fields = [
		'test_reviewer_map_id'         => [DBO_AUTO, 'test_reviewer_map_id', NULL],
		'user_id'                      => [DBO_NUMB, 'user_id', NULL],
		'use_user_id'                  => [DBO_NUMB, 'use_user_id', NULL],
		'test_reviewer_map_assigndate' => [DBO_DATE, 'test_reviewer_map_assigndate', NULL],
		'test_reviewer_map_assigntime' => [DBO_TIME, 'test_reviewer_map_assigntime', NULL],
		'test_reviewer_map_enddate'    => [DBO_DATE, 'test_reviewer_map_enddate', NULL],
		'test_reviewer_map_end_time'   => [DBO_TIME, 'test_reviewer_map_end_time', NULL],
		'test_reviewer_map_desc'       => [DBO_STRI, 'test_reviewer_map_desc', NULL]
	];
	protected $_pkey = 'test_reviewer_map_id';
	protected $_fkeys = [//class=[fkey]
			'User' => ['user_id','use_user_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'test_reviewer_map_assigndate',
			'message' => 'Chưa nhập thông tin [test_reviewer_map_assigndate]'],
		['type' => 'presence',
			'field' => 'test_reviewer_map_assigntime',
			'message' => 'Chưa nhập thông tin [test_reviewer_map_assigntime]'],
		['type' => 'presence',
			'field' => 'test_reviewer_map_enddate',
			'message' => 'Chưa nhập thông tin [test_reviewer_map_enddate]'],
		['type' => 'presence',
			'field' => 'test_reviewer_map_end_time',
			'message' => 'Chưa nhập thông tin [test_reviewer_map_end_time]'],
		['type' => 'length',
			'field' => 'test_reviewer_map_desc',
			'message' => 'Thông tin [test_reviewer_map_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}