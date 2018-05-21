<?php
//ID: d82fe0a849e21dbf8b8ea585f086b749
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class University extends DBObject{
	protected $_table = 'university';
	protected $_title = '';
	protected $_fields = [
		'univ_id'         => [DBO_AUTO, 'univ_id', NULL],
		'univ_code'       => [DBO_STRI, 'univ_code', NULL],
		'univ_name_vn'    => [DBO_STRI, 'univ_name_vn', NULL],
		'univ_name_en'    => [DBO_STRI, 'univ_name_en', NULL],
		'univ_name_short' => [DBO_STRI, 'univ_name_short', NULL]
	];
	protected $_pkey = 'univ_id';
	protected $_hasRef = [//class=[fkey]
			'Faculty'      => ['univ_id'],
			'Univ_mission' => ['univ_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'univ_code',
			'message' => 'Chưa nhập thông tin [univ_code]'],
		['type' => 'length',
			'field' => 'univ_code',
			'message' => 'Thông tin [univ_code] dài hơn 10 ký tự',
			'max' => 10],
		['type' => 'presence',
			'field' => 'univ_name_vn',
			'message' => 'Chưa nhập thông tin [univ_name_vn]'],
		['type' => 'length',
			'field' => 'univ_name_vn',
			'message' => 'Thông tin [univ_name_vn] dài hơn 65535 ký tự',
			'max' => 65535],
		['type' => 'presence',
			'field' => 'univ_name_en',
			'message' => 'Chưa nhập thông tin [univ_name_en]'],
		['type' => 'length',
			'field' => 'univ_name_en',
			'message' => 'Thông tin [univ_name_en] dài hơn 65535 ký tự',
			'max' => 65535],
		['type' => 'presence',
			'field' => 'univ_name_short',
			'message' => 'Chưa nhập thông tin [univ_name_short]'],
		['type' => 'length',
			'field' => 'univ_name_short',
			'message' => 'Thông tin [univ_name_short] dài hơn 10 ký tự',
			'max' => 10]
	];
//<ZoneC

//ZoneC>
}