<?php
//ID: d6c94daeae47645d5493b2e68aa4193c
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class User_account_role_map extends DBObject{
	protected $_table = 'user_account_role_map';
	protected $_title = '';
	protected $_fields = [
		'id'           => [DBO_AUTO, 'id', NULL],
		'user_id'      => [DBO_NUMB, 'user_id', NULL],
		'account_id'   => [DBO_STRI, 'account_id', NULL],
		'role_id'      => [DBO_NUMB, 'role_id', NULL],
		'granted_date' => [DBO_DATE, 'granted_date', NULL]
	];
	protected $_fkeys = [//class=[fkey]
			'User'         => ['user_id'],
			'User_account' => ['account_id'],
			'Role'         => ['role_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'user_id',
			'message' => 'Chưa nhập thông tin [user_id]'],
		['type' => 'presence',
			'field' => 'account_id',
			'message' => 'Chưa nhập thông tin [account_id]'],
		['type' => 'length',
			'field' => 'account_id',
			'message' => 'Thông tin [account_id] dài hơn 100 ký tự',
			'max' => 100],
		['type' => 'presence',
			'field' => 'role_id',
			'message' => 'Chưa nhập thông tin [role_id]']
	];
//<ZoneC

//ZoneC>
}