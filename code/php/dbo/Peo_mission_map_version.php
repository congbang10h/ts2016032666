<?php
//ID: 09fd94a311144d4ebba5a3fa3f943c86
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Peo_mission_map_version extends DBObject{
	protected $_table = 'peo_mission_map_version';
	protected $_title = '';
	protected $_fields = [
		'pmv_id'         => [DBO_AUTO, 'pmv_id', NULL],
		'peo_version_id' => [DBO_NUMB, 'peo_version_id', NULL],
		'umv_id'         => [DBO_NUMB, 'umv_id', NULL],
		'pmv_code'       => [DBO_NUMB, 'pmv_code', NULL],
		'pmv_date'       => [DBO_DATE, 'pmv_date', NULL],
		'pmv_isused'     => [DBO_NUMB, 'pmv_isused', NULL]
	];
	protected $_pkey = 'pmv_id';
	protected $_fkeys = [//class=[fkey]
			'Univ_mission' => ['umv_id'],
			'Peo'          => ['peo_version_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Umi_peoi_map' => ['pmv_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'pmv_code',
			'message' => 'Chưa nhập thông tin [pmv_code]'],
		['type' => 'presence',
			'field' => 'pmv_date',
			'message' => 'Chưa nhập thông tin [pmv_date]'],
		['type' => 'presence',
			'field' => 'pmv_isused',
			'message' => 'Chưa nhập thông tin [pmv_isused]']
	];
//<ZoneC

//ZoneC>
}