<?php
//ID: b67d1e71ced3df6178517ab199c723b5
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Peo_so_map_version extends DBObject{
	protected $_table = 'peo_so_map_version';
	protected $_title = '';
	protected $_fields = [
		'psv_id'         => [DBO_AUTO, 'psv_id', NULL],
		'sov_id'         => [DBO_NUMB, 'sov_id', NULL],
		'peo_version_id' => [DBO_NUMB, 'peo_version_id', NULL],
		'psv_code'       => [DBO_NUMB, 'psv_code', NULL],
		'psv_date'       => [DBO_DATE, 'psv_date', NULL],
		'psv_isused'     => [DBO_NUMB, 'psv_isused', NULL]
	];
	protected $_pkey = 'psv_id';
	protected $_fkeys = [//class=[fkey]
			'Peo_version'             => ['peo_version_id'],
			'Student_outcome_version' => ['sov_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Peo_so_map' => ['psv_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'psv_code',
			'message' => 'Chưa nhập thông tin [psv_code]'],
		['type' => 'presence',
			'field' => 'psv_isused',
			'message' => 'Chưa nhập thông tin [psv_isused]']
	];
//<ZoneC

//ZoneC>
}