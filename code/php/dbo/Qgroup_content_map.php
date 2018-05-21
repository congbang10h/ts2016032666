<?php
//ID: 3faf3984383474afa380c98166d814fd
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Qgroup_content_map extends DBObject{
	protected $_table = 'qgroup_content_map';
	protected $_title = '';
	protected $_fields = [
		'qgroup_content_map_id' => [DBO_AUTO, 'qgroup_content_map_id', NULL],
		'question_group_id'     => [DBO_NUMB, 'question_group_id', NULL],
		'course_content_id'     => [DBO_NUMB, 'course_content_id', NULL]
	];
	protected $_pkey = 'qgroup_content_map_id';
	protected $_fkeys = [//class=[fkey]
			'Course_content' => ['course_content_id'],
			'Question_group' => ['question_group_id']
		];
//<ZoneC

//ZoneC>
}