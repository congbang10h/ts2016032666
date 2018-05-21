<?php
//ID: f79ee7bf2b6e4f6912ffad0ec9ce4d42
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Course_required_level extends DBObject{
	protected $_table = 'course_required_level';
	protected $_title = '';
	protected $_fields = [
		'course_required_level_id'   => [DBO_AUTO, 'course_required_level_id', NULL],
		'course_required_level_code' => [DBO_STRI, 'course_required_level_code', NULL],
		'course_required_level_desc' => [DBO_STRI, 'course_required_level_desc', NULL]
	];
	protected $_pkey = 'course_required_level_id';
	protected $_hasRef = [//class=[fkey]
			'Program_course_map' => ['course_required_level_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'course_required_level_code',
			'message' => 'Chưa nhập thông tin [course_required_level_code]'],
		['type' => 'length',
			'field' => 'course_required_level_code',
			'message' => 'Thông tin [course_required_level_code] dài hơn 100 ký tự',
			'max' => 100],
		['type' => 'presence',
			'field' => 'course_required_level_desc',
			'message' => 'Chưa nhập thông tin [course_required_level_desc]'],
		['type' => 'length',
			'field' => 'course_required_level_desc',
			'message' => 'Thông tin [course_required_level_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}