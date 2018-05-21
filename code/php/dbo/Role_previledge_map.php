<?php
//ID: c26b680fae4416412bb64293b6157c86
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Role_previledge_map extends DBObject{
	protected $_table = 'role_previledge_map';
	protected $_title = '';
	protected $_fields = [
		'role_previledge_map_id' => [DBO_AUTO, 'role_previledge_map_id', NULL],
		'role_id'                => [DBO_NUMB, 'role_id', NULL],
		'previledge_id'          => [DBO_NUMB, 'previledge_id', NULL]
	];
	protected $_pkey = 'role_previledge_map_id';
	protected $_fkeys = [//class=[fkey]
			'Previledge' => ['previledge_id'],
			'Role'       => ['role_id']
		];
//<ZoneC

//ZoneC>
}