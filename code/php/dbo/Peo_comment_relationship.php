<?php
//ID: 5585bc5dc9fa65c8ec822da54b7060cb
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Peo_comment_relationship extends DBObject{
	protected $_table = 'peo_comment_relationship';
	protected $_title = '';
	protected $_fields = [
		'peo_comment_relationship_id'   => [DBO_AUTO, 'peo_comment_relationship_id', NULL],
		'parent_peo_comment_id'         => [DBO_NUMB, 'parent_peo_comment_id', NULL],
		'child_peo_comment_id'          => [DBO_NUMB, 'child_peo_comment_id', NULL],
		'peo_comment_relationship_desc' => [DBO_STRI, 'peo_comment_relationship_desc', NULL]
	];
	protected $_pkey = 'peo_comment_relationship_id';
	protected $_fkeys = [//class=[fkey]
			'Peo_comment' => ['child_peo_comment_id','parent_peo_comment_id']
		];
	protected $_validations = [
		['type' => 'length',
			'field' => 'peo_comment_relationship_desc',
			'message' => 'Thông tin [peo_comment_relationship_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}