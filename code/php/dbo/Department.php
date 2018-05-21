<?php
//ID: 3c2a8c0a33ac4b2f34a27bbefff2f054
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Department extends DBObject{
	protected $_table = 'department';
	protected $_title = '';
	protected $_fields = [
		'dept_id'      => [DBO_AUTO, 'dept_id', NULL],
		'faculty_id'   => [DBO_NUMB, 'faculty_id', NULL],
		'dept_code'    => [DBO_STRI, 'dept_code', NULL],
		'dept_name_vn' => [DBO_STRI, 'dept_name_vn', NULL],
		'dept_name_en' => [DBO_STRI, 'dept_name_en', NULL]
	];
	protected $_pkey = 'dept_id';
	protected $_fkeys = [//class=[fkey]
			'Faculty' => ['faculty_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Dept_course_map' => ['dept_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'dept_code',
			'message' => 'Chưa nhập thông tin [dept_code]'],
		['type' => 'length',
			'field' => 'dept_code',
			'message' => 'Thông tin [dept_code] dài hơn 5 ký tự',
			'max' => 5],
		['type' => 'presence',
			'field' => 'dept_name_vn',
			'message' => 'Chưa nhập thông tin [dept_name_vn]'],
		['type' => 'length',
			'field' => 'dept_name_vn',
			'message' => 'Thông tin [dept_name_vn] dài hơn 65535 ký tự',
			'max' => 65535],
		['type' => 'presence',
			'field' => 'dept_name_en',
			'message' => 'Chưa nhập thông tin [dept_name_en]'],
		['type' => 'length',
			'field' => 'dept_name_en',
			'message' => 'Thông tin [dept_name_en] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC
	protected $_jfields = [
		'Faculty' => ['faculty_name_vn'],
		'University' => ['univ_name_vn','univ_id']
	];
//ZoneC>
}