<?php
//ID: af8f4ce880ed84a8de77ff271a5f3580
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Course_comment_relationship extends DBObject{
	protected $_table = 'course_comment_relationship';
	protected $_title = '';
	protected $_fields = [
		'course_comment_relationship_id' => [DBO_AUTO, 'course_comment_relationship_id', NULL],
		'parent_course_comment_id'       => [DBO_NUMB, 'parent_course_comment_id', NULL],
		'child_course_comment_id'        => [DBO_NUMB, 'child_course_comment_id', NULL]
	];
	protected $_pkey = 'course_comment_relationship_id';
	protected $_fkeys = [//class=[fkey]
			'Course_comment' => ['child_course_comment_id','parent_course_comment_id']
		];
//<ZoneC

//ZoneC>
}