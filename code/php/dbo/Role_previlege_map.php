<?php
//ID: 8caff8ebb36706be5a6d204bfa4225f6
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Role_previlege_map extends DBObject{
	protected $_table = 'role_previlege_map';
	protected $_title = '';
	protected $_fields = [
		'role_previlege_map_id' => [DBO_AUTO, 'role_previlege_map_id', NULL],
		'role_id'               => [DBO_NUMB, 'role_id', NULL],
		'previlege_id'          => [DBO_NUMB, 'previlege_id', NULL]
	];
	protected $_pkey = 'role_previlege_map_id';
	protected $_fkeys = [//class=[fkey]
			'Previlege' => ['previlege_id'],
			'Role'      => ['role_id']
		];
//<ZoneC

//ZoneC>
}