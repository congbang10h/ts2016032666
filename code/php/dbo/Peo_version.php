<?php
//ID: 796d25e83567d61874fd7c7f3d26a45a
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Peo_version extends DBObject{
	protected $_table = 'peo_version';
	protected $_title = '';
	protected $_fields = [
		'peo_version_id'     => [DBO_AUTO, 'peo_version_id', NULL],
		'edu_program_id'     => [DBO_NUMB, 'edu_program_id', NULL],
		'peo_version_code'   => [DBO_STRI, 'peo_version_code', NULL],
		'peo_version_date'   => [DBO_DATE, 'peo_version_date', NULL],
		'peo_version_isused' => [DBO_NUMB, 'peo_version_isused', NULL]
	];
	protected $_pkey = 'peo_version_id';
	protected $_fkeys = [//class=[fkey]
			'Educational_program' => ['edu_program_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Peo'                     => ['peo_version_id'],
			'Peo_mission_map_version' => ['peo_version_id'],
			'Peo_so_map_version'      => ['peo_version_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'peo_version_code',
			'message' => 'Chưa nhập thông tin [peo_version_code]'],
		['type' => 'length',
			'field' => 'peo_version_code',
			'message' => 'Thông tin [peo_version_code] dài hơn 10 ký tự',
			'max' => 10],
		['type' => 'presence',
			'field' => 'peo_version_date',
			'message' => 'Chưa nhập thông tin [peo_version_date]'],
		['type' => 'presence',
			'field' => 'peo_version_isused',
			'message' => 'Chưa nhập thông tin [peo_version_isused]']
	];
//<ZoneC

//ZoneC>
}