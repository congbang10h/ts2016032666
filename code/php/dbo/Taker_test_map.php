<?php
//ID: 72e4589a722be345e28fc9e55bb408be
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Taker_test_map extends DBObject{
	protected $_table = 'taker_test_map';
	protected $_title = '';
	protected $_fields = [
		'taker_test_map_id'        => [DBO_AUTO, 'taker_test_map_id', NULL],
		'test_id'                  => [DBO_NUMB, 'test_id', NULL],
		'user_id'                  => [DBO_NUMB, 'user_id', NULL],
		'taker_test_map_starttime' => [DBO_TIME, 'taker_test_map_starttime', NULL],
		'taker_test_map_endtime'   => [DBO_TIME, 'taker_test_map_endtime', NULL],
		'taker_test_map_desc'      => [DBO_STRI, 'taker_test_map_desc', NULL]
	];
	protected $_pkey = 'taker_test_map_id';
	protected $_fkeys = [//class=[fkey]
			'User' => ['user_id'],
			'Test' => ['test_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Taker_solution'     => ['taker_test_map_id'],
			'Test_taker_comment' => ['taker_test_map_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'taker_test_map_starttime',
			'message' => 'Chưa nhập thông tin [taker_test_map_starttime]'],
		['type' => 'presence',
			'field' => 'taker_test_map_endtime',
			'message' => 'Chưa nhập thông tin [taker_test_map_endtime]'],
		['type' => 'length',
			'field' => 'taker_test_map_desc',
			'message' => 'Thông tin [taker_test_map_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}