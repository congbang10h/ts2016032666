<?php
//ID: 9e60a3baf6ad4a48b1570d04f2ed1118
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Role extends DBObject{
	protected $_table = 'role';
	protected $_title = '';
	protected $_fields = [
		'role_id'   => [DBO_AUTO, 'role_id', NULL],
		'role_code' => [DBO_STRI, 'role_code', NULL],
		'role_desc' => [DBO_STRI, 'role_desc', NULL]
	];
	protected $_pkey = 'role_id';
	protected $_hasRef = [//class=[fkey]
			'Course_access_mode'    => ['role_id'],
			'Program_access_mode'   => ['role_id'],
			'Question_access_mode'  => ['role_id'],
			'Role_previlege_map'    => ['role_id'],
			'Test_access_mode'      => ['role_id'],
			'Topic_access_mode'     => ['role_id'],
			'User_account_role_map' => ['role_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'role_code',
			'message' => 'Chưa nhập thông tin [role_code]'],
		['type' => 'length',
			'field' => 'role_code',
			'message' => 'Thông tin [role_code] dài hơn 100 ký tự',
			'max' => 100],
		['type' => 'presence',
			'field' => 'role_desc',
			'message' => 'Chưa nhập thông tin [role_desc]'],
		['type' => 'length',
			'field' => 'role_desc',
			'message' => 'Thông tin [role_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}