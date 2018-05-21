<?php
//ID: 86fe497305c817cb41f5cacac2905d39
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Test_taker_comment extends DBObject{
	protected $_table = 'test_taker_comment';
	protected $_title = '';
	protected $_fields = [
		'test_taker_comment_id'   => [DBO_AUTO, 'test_taker_comment_id', NULL],
		'taker_test_map_id'       => [DBO_NUMB, 'taker_test_map_id', NULL],
		'test_taker_comment_date' => [DBO_DATE, 'test_taker_comment_date', NULL],
		'test_taker_comment_time' => [DBO_TIME, 'test_taker_comment_time', NULL],
		'test_taker_comment_desc' => [DBO_STRI, 'test_taker_comment_desc', NULL]
	];
	protected $_pkey = 'test_taker_comment_id';
	protected $_fkeys = [//class=[fkey]
			'Taker_test_map' => ['taker_test_map_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Question_taker_comment'          => ['test_taker_comment_id'],
			'Test_taker_comment_relationship' => ['child_test_taker_comment_id','parent_test_taker_comment_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'test_taker_comment_date',
			'message' => 'Chưa nhập thông tin [test_taker_comment_date]'],
		['type' => 'presence',
			'field' => 'test_taker_comment_desc',
			'message' => 'Chưa nhập thông tin [test_taker_comment_desc]'],
		['type' => 'length',
			'field' => 'test_taker_comment_desc',
			'message' => 'Thông tin [test_taker_comment_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}