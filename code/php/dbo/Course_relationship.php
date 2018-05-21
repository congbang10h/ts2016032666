<?php
//ID: 0b9778d68ae45480ff1667dc73503dfa
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Course_relationship extends DBObject{
	protected $_table = 'course_relationship';
	protected $_title = '';
	protected $_fields = [
		'course_relationship_id'      => [DBO_AUTO, 'course_relationship_id', NULL],
		'parent_course_id'            => [DBO_NUMB, 'parent_course_id', NULL],
		'child_course_id'             => [DBO_NUMB, 'child_course_id', NULL],
		'course_relationship_type_id' => [DBO_NUMB, 'course_relationship_type_id', NULL],
		'course_relationship_desc'    => [DBO_STRI, 'course_relationship_desc', NULL]
	];
	protected $_pkey = 'course_relationship_id';
	protected $_fkeys = [//class=[fkey]
			'Course'                   => ['child_course_id','parent_course_id'],
			'Course_relationship_type' => ['course_relationship_type_id']
		];
	protected $_validations = [
		['type' => 'length',
			'field' => 'course_relationship_desc',
			'message' => 'Thông tin [course_relationship_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}