<?php
//ID: d17bb13e3ac7805e746620ef68352350
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Peo_so_map extends DBObject{
	protected $_table = 'peo_so_map';
	protected $_title = '';
	protected $_fields = [
		'psm_id'     => [DBO_AUTO, 'psm_id', NULL],
		'sov_id'     => [DBO_NUMB, 'sov_id', NULL],
		'peo_id'     => [DBO_NUMB, 'peo_id', NULL],
		'psm_code'   => [DBO_NUMB, 'psm_code', NULL],
		'psm_date'   => [DBO_DATE, 'psm_date', NULL],
		'psm_isused' => [DBO_NUMB, 'psm_isused', NULL]
	];
	protected $_pkey = 'psm_id';
	protected $_fkeys = [//class=[fkey]
			'Peo'             => ['peo_id'],
			'Student_outcome' => ['sov_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Peoi_soi_map' => ['psm_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'psm_code',
			'message' => 'Chưa nhập thông tin [psm_code]'],
		['type' => 'presence',
			'field' => 'psm_isused',
			'message' => 'Chưa nhập thông tin [psm_isused]']
	];
//<ZoneC

//ZoneC>
}