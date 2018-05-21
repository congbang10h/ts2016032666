<?php
//ID: 6b5f7a5e03229b981bef5345d9e84006
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Content_comment_relationship extends DBObject{
	protected $_table = 'content_comment_relationship';
	protected $_title = '';
	protected $_fields = [
		'content_comment_relationship_id' => [DBO_AUTO, 'content_comment_relationship_id', NULL],
		'parent_content_comment_id'       => [DBO_NUMB, 'parent_content_comment_id', NULL],
		'child_content_comment_id'        => [DBO_NUMB, 'child_content_comment_id', NULL]
	];
	protected $_pkey = 'content_comment_relationship_id';
	protected $_fkeys = [//class=[fkey]
			'Content_comment' => ['child_content_comment_id','parent_content_comment_id']
		];
//<ZoneC

//ZoneC>
}