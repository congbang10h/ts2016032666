<?php
//ID: 857f9b2c987484efea8d7d69a28b9216
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Course_relationship_type extends DBObject{
	protected $_table = 'course_relationship_type';
	protected $_title = '';
	protected $_fields = [
		'course_relationship_type_id'   => [DBO_AUTO, 'course_relationship_type_id', NULL],
		'course_relationship_type_code' => [DBO_STRI, 'course_relationship_type_code', NULL],
		'course_relationship_type_desc' => [DBO_STRI, 'course_relationship_type_desc', NULL]
	];
	protected $_pkey = 'course_relationship_type_id';
	protected $_hasRef = [//class=[fkey]
			'Course_relationship' => ['course_relationship_type_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'course_relationship_type_code',
			'message' => 'Chưa nhập thông tin [course_relationship_type_code]'],
		['type' => 'length',
			'field' => 'course_relationship_type_code',
			'message' => 'Thông tin [course_relationship_type_code] dài hơn 100 ký tự',
			'max' => 100],
		['type' => 'presence',
			'field' => 'course_relationship_type_desc',
			'message' => 'Chưa nhập thông tin [course_relationship_type_desc]'],
		['type' => 'length',
			'field' => 'course_relationship_type_desc',
			'message' => 'Thông tin [course_relationship_type_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}