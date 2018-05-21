<?php
//ID: f0c7d149882805493514ded03a290eac
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Educational_program extends DBObject{
	protected $_table = 'educational_program';
	protected $_title = '';
	protected $_fields = [
		'edu_program_id'         => [DBO_AUTO, 'edu_program_id', NULL],
		'faculty_id'             => [DBO_NUMB, 'faculty_id', NULL],
		'edu_program_code'       => [DBO_STRI, 'edu_program_code', NULL],
		'edu_program_name_vn'    => [DBO_STRI, 'edu_program_name_vn', NULL],
		'edu_program_name_en'    => [DBO_STRI, 'edu_program_name_en', NULL],
		'edu_program_name_short' => [DBO_STRI, 'edu_program_name_short', NULL],
		'edu_program_start_year' => [DBO_DATE, 'edu_program_start_year', NULL],
		'edu_program_end_year'   => [DBO_DATE, 'edu_program_end_year', NULL],
		'edu_program_desc'       => [DBO_STRI, 'edu_program_desc', NULL],
		'edu_program_link'       => [DBO_STRI, 'edu_program_link', NULL]
	];
	protected $_pkey = 'edu_program_id';
	protected $_fkeys = [//class=[fkey]
			'Faculty' => ['faculty_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Peo'                 => ['edu_program_id'],
			'Program_access_mode' => ['edu_program_id'],
			'Program_course_map'  => ['edu_program_id'],
			'Student_outcome'     => ['edu_program_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'edu_program_code',
			'message' => 'Chưa nhập thông tin [edu_program_code]'],
		['type' => 'length',
			'field' => 'edu_program_code',
			'message' => 'Thông tin [edu_program_code] dài hơn 20 ký tự',
			'max' => 20],
		['type' => 'presence',
			'field' => 'edu_program_name_vn',
			'message' => 'Chưa nhập thông tin [edu_program_name_vn]'],
		['type' => 'length',
			'field' => 'edu_program_name_vn',
			'message' => 'Thông tin [edu_program_name_vn] dài hơn 65535 ký tự',
			'max' => 65535],
		['type' => 'presence',
			'field' => 'edu_program_name_en',
			'message' => 'Chưa nhập thông tin [edu_program_name_en]'],
		['type' => 'length',
			'field' => 'edu_program_name_en',
			'message' => 'Thông tin [edu_program_name_en] dài hơn 65535 ký tự',
			'max' => 65535],
		['type' => 'length',
			'field' => 'edu_program_name_short',
			'message' => 'Thông tin [edu_program_name_short] dài hơn 20 ký tự',
			'max' => 20],
		['type' => 'presence',
			'field' => 'edu_program_start_year',
			'message' => 'Chưa nhập thông tin [edu_program_start_year]'],
		['type' => 'length',
			'field' => 'edu_program_desc',
			'message' => 'Thông tin [edu_program_desc] dài hơn 65535 ký tự',
			'max' => 65535],
		['type' => 'length',
			'field' => 'edu_program_link',
			'message' => 'Thông tin [edu_program_link] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC
	protected $_jfields = [
		'Faculty' => ['faculty_name_vn'],
		'University' => ['univ_name_vn','univ_id']
	];
//ZoneC>
}