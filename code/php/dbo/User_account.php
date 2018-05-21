<?php
//ID: ea2a4b7e275df60a38fc1617d5bb23fa
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class User_account extends DBObject{
	protected $_table = 'user_account';
	protected $_title = '';
	protected $_fields = [
		'account_id'       => [DBO_STRI, 'account_id', NULL],
		'user_id'          => [DBO_NUMB, 'user_id', NULL],
		'account_password' => [DBO_STRI, 'account_password', NULL]
	];
	protected $_pkey = 'account_id';
	protected $_fkeys = [//class=[fkey]
			'User' => ['user_id']
		];
	protected $_hasRef = [//class=[fkey]
			'User_account_role_map' => ['account_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'account_id',
			'message' => 'Chưa nhập thông tin [account_id]'],
		['type' => 'length',
			'field' => 'account_id',
			'message' => 'Thông tin [account_id] dài hơn 100 ký tự',
			'max' => 100],
		['type' => 'presence',
			'field' => 'user_id',
			'message' => 'Chưa nhập thông tin [user_id]'],
		['type' => 'presence',
			'field' => 'account_password',
			'message' => 'Chưa nhập thông tin [account_password]'],
		['type' => 'length',
			'field' => 'account_password',
			'message' => 'Thông tin [account_password] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}