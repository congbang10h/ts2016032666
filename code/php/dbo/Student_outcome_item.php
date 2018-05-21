<?php
//ID: a6f8cc1e2e4251ff3c5cd343e6cdf530
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Student_outcome_item extends DBObject{
	protected $_table = 'student_outcome_item';
	protected $_title = '';
	protected $_fields = [
		'soi_id'      => [DBO_AUTO, 'soi_id', NULL],
		'so_id'       => [DBO_NUMB, 'so_id', NULL],
		'soi_code'    => [DBO_STRI, 'soi_code', NULL],
		'soi_desc_vn' => [DBO_STRI, 'soi_desc_vn', NULL],
		'soi_desc_en' => [DBO_STRI, 'soi_desc_en', NULL]
	];
	protected $_pkey = 'soi_id';
	protected $_fkeys = [//class=[fkey]
			'Student_outcome' => ['so_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Coi_soi_map'                   => ['soi_id'],
			'Peoi_soi_map'                  => ['soi_id'],
			'Performance_indicator_version' => ['so_id'],
			'So_comment'                    => ['so_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'soi_code',
			'message' => 'Chưa nhập thông tin [soi_code]'],
		['type' => 'length',
			'field' => 'soi_code',
			'message' => 'Thông tin [soi_code] dài hơn 2 ký tự',
			'max' => 2],
		['type' => 'presence',
			'field' => 'soi_desc_vn',
			'message' => 'Chưa nhập thông tin [soi_desc_vn]'],
		['type' => 'length',
			'field' => 'soi_desc_vn',
			'message' => 'Thông tin [soi_desc_vn] dài hơn 65535 ký tự',
			'max' => 65535],
		['type' => 'presence',
			'field' => 'soi_desc_en',
			'message' => 'Chưa nhập thông tin [soi_desc_en]'],
		['type' => 'length',
			'field' => 'soi_desc_en',
			'message' => 'Thông tin [soi_desc_en] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}