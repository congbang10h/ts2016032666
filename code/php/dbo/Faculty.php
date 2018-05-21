<?php
//ID: 6ac59aebccb1e30a5049341313fac652
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Faculty extends DBObject{
	protected $_table = 'faculty';
	protected $_title = '';
	protected $_fields = [
		'faculty_id'      => [DBO_AUTO, 'faculty_id', NULL],
		'univ_id'         => [DBO_NUMB, 'univ_id', NULL],
		'faculty_code'    => [DBO_STRI, 'faculty_code', NULL],
		'faculty_name_vn' => [DBO_STRI, 'faculty_name_vn', NULL],
		'faculty_name_en' => [DBO_STRI, 'faculty_name_en', NULL]
	];
	protected $_pkey = 'faculty_id';
	protected $_fkeys = [//class=[fkey]
			'University' => ['univ_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Department'          => ['faculty_id'],
			'Educational_program' => ['faculty_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'faculty_code',
			'message' => 'Chưa nhập thông tin [faculty_code]'],
		['type' => 'length',
			'field' => 'faculty_code',
			'message' => 'Thông tin [faculty_code] dài hơn 5 ký tự',
			'max' => 5],
		['type' => 'presence',
			'field' => 'faculty_name_vn',
			'message' => 'Chưa nhập thông tin [faculty_name_vn]'],
		['type' => 'length',
			'field' => 'faculty_name_vn',
			'message' => 'Thông tin [faculty_name_vn] dài hơn 65535 ký tự',
			'max' => 65535],
		['type' => 'presence',
			'field' => 'faculty_name_en',
			'message' => 'Chưa nhập thông tin [faculty_name_en]'],
		['type' => 'length',
			'field' => 'faculty_name_en',
			'message' => 'Thông tin [faculty_name_en] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC
	protected $_jfields = [
		'University' => ['univ_name_vn','univ_name_en']
	];
//ZoneC>
}