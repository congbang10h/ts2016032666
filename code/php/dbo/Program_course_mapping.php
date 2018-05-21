<?php
//ID: ef61fbf75f21769b3da8f3a3dfc8adbd
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Program_course_mapping extends DBObject{
	protected $_table = 'program_course_mapping';
	protected $_title = '';
	protected $_fields = [
		'program_course_id'         => [DBO_AUTO, 'program_course_id', NULL],
		'course_id'                 => [DBO_NUMB, 'course_id', NULL],
		'edu_program_id'            => [DBO_NUMB, 'edu_program_id', NULL],
		'course_required_level_id'  => [DBO_NUMB, 'course_required_level_id', NULL],
		'program_course_time_index' => [DBO_NUMB, 'program_course_time_index', NULL]
	];
	protected $_pkey = 'program_course_id';
	protected $_fkeys = [//class=[fkey]
			'Course'                => ['course_id'],
			'Course_required_level' => ['course_required_level_id'],
			'Educational_program'   => ['edu_program_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'program_course_time_index',
			'message' => 'Chưa nhập thông tin [program_course_time_index]']
	];
//<ZoneC

//ZoneC>
}