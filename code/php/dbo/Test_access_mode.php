<?php
//ID: 24c23cd3045a53f04365f7b6635b76ff
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Test_access_mode extends DBObject{
	protected $_table = 'test_access_mode';
	protected $_title = '';
	protected $_fields = [
		'test_access_mode_id'              => [DBO_AUTO, 'test_access_mode_id', NULL],
		'test_id'                          => [DBO_NUMB, 'test_id', NULL],
		'accessor_id'                      => [DBO_NUMB, 'accessor_id', NULL],
		'previlege_id'                     => [DBO_NUMB, 'previlege_id', NULL],
		'grantor_id'                       => [DBO_NUMB, 'grantor_id', NULL],
		'role_id'                          => [DBO_NUMB, 'role_id', NULL],
		'test_access_mode_granted_date'    => [DBO_DATE, 'test_access_mode_granted_date', NULL],
		'test_access_mode_valid_startdate' => [DBO_DATE, 'test_access_mode_valid_startdate', NULL],
		'test_access_mode_valid_enddate'   => [DBO_DATE, 'test_access_mode_valid_enddate', NULL],
		'test_access_mode_valid_starttime' => [DBO_TIME, 'test_access_mode_valid_starttime', NULL],
		'test_access_mode_valid_endtime'   => [DBO_TIME, 'test_access_mode_valid_endtime', NULL],
		'test_access_mode_is_disabled'     => [DBO_NUMB, 'test_access_mode_is_disabled', NULL],
		'test_access_mode_desc'            => [DBO_STRI, 'test_access_mode_desc', NULL]
	];
	protected $_pkey = 'test_access_mode_id';
	protected $_fkeys = [//class=[fkey]
			'User'      => ['accessor_id','grantor_id'],
			'Previlege' => ['previlege_id'],
			'Role'      => ['role_id'],
			'Test'      => ['test_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'test_access_mode_granted_date',
			'message' => 'Chưa nhập thông tin [test_access_mode_granted_date]'],
		['type' => 'presence',
			'field' => 'test_access_mode_valid_startdate',
			'message' => 'Chưa nhập thông tin [test_access_mode_valid_startdate]'],
		['type' => 'presence',
			'field' => 'test_access_mode_valid_starttime',
			'message' => 'Chưa nhập thông tin [test_access_mode_valid_starttime]'],
		['type' => 'presence',
			'field' => 'test_access_mode_is_disabled',
			'message' => 'Chưa nhập thông tin [test_access_mode_is_disabled]'],
		['type' => 'length',
			'field' => 'test_access_mode_desc',
			'message' => 'Thông tin [test_access_mode_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}