<?php
//ID: 8495f1dfb6cb67d6ed08570bf8d33cba
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Mission_peo_map extends DBObject{
	protected $_table = 'mission_peo_map';
	protected $_title = '';
	protected $_fields = [
		'mission_peo_id' => [DBO_AUTO, 'mission_peo_id', NULL],
		'mission_id'     => [DBO_NUMB, 'mission_id', NULL],
		'peoi_id'        => [DBO_NUMB, 'peoi_id', NULL],
		'pmv_id'         => [DBO_NUMB, 'pmv_id', NULL]
	];
	protected $_pkey = 'mission_peo_id';
	protected $_fkeys = [//class=[fkey]
			'Univ_mission'            => ['mission_id'],
			'Peo_item'                => ['peoi_id'],
			'Peo_mission_map_version' => ['pmv_id']
		];
//<ZoneC

//ZoneC>
}