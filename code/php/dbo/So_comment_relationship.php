<?php
//ID: df0058faa5743a834a69d80bf0abc00c
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class So_comment_relationship extends DBObject{
	protected $_table = 'so_comment_relationship';
	protected $_title = '';
	protected $_fields = [
		'so_comment_relationship_id'   => [DBO_AUTO, 'so_comment_relationship_id', NULL],
		'parent_so_comment_id'         => [DBO_NUMB, 'parent_so_comment_id', NULL],
		'child_so_comment_id'          => [DBO_NUMB, 'child_so_comment_id', NULL],
		'so_comment_relationship_desc' => [DBO_STRI, 'so_comment_relationship_desc', NULL]
	];
	protected $_pkey = 'so_comment_relationship_id';
	protected $_fkeys = [//class=[fkey]
			'So_comment' => ['child_so_comment_id','parent_so_comment_id']
		];
	protected $_validations = [
		['type' => 'length',
			'field' => 'so_comment_relationship_desc',
			'message' => 'Thông tin [so_comment_relationship_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}