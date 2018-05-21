<?php
//ID: d44cf0e2304c25643f4a82e0de51a1f4
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Test_taker_comment_relationship extends DBObject{
	protected $_table = 'test_taker_comment_relationship';
	protected $_title = '';
	protected $_fields = [
		'test_taker_comment_relationship_id'   => [DBO_AUTO, 'test_taker_comment_relationship_id', NULL],
		'parent_test_taker_comment_id'         => [DBO_NUMB, 'parent_test_taker_comment_id', NULL],
		'child_test_taker_comment_id'          => [DBO_NUMB, 'child_test_taker_comment_id', NULL],
		'test_taker_comment_relationship_desc' => [DBO_STRI, 'test_taker_comment_relationship_desc', NULL]
	];
	protected $_pkey = 'test_taker_comment_relationship_id';
	protected $_fkeys = [//class=[fkey]
			'Test_taker_comment' => ['child_test_taker_comment_id','parent_test_taker_comment_id']
		];
	protected $_validations = [
		['type' => 'length',
			'field' => 'test_taker_comment_relationship_desc',
			'message' => 'Thông tin [test_taker_comment_relationship_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}