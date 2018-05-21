<?php
//ID: ea1b05bfc6b07768506903f9cea564b5
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Program_course_map extends DBObject{
	protected $_table = 'program_course_map';
	protected $_title = '';
	protected $_fields = [
		'pcm_id'                   => [DBO_AUTO, 'pcm_id', NULL],
		'course_id'                => [DBO_NUMB, 'course_id', NULL],
		'course_required_level_id' => [DBO_NUMB, 'course_required_level_id', NULL],
		'edu_program_id'           => [DBO_NUMB, 'edu_program_id', NULL],
		'pcm_time_index'           => [DBO_NUMB, 'pcm_time_index', NULL]
	];
	protected $_pkey = 'pcm_id';
	protected $_fkeys = [//class=[fkey]
			'Course'                => ['course_id'],
			'Course_required_level' => ['course_required_level_id'],
			'Educational_program'   => ['edu_program_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'pcm_time_index',
			'message' => 'Chưa nhập thông tin [pcm_time_index]']
	];
//<ZoneC

//ZoneC>
}