<?php
//ID: 822e4a46b170e8d1a535a7bbb6d48b99
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Previlege_relstionship extends DBObject{
	protected $_table = 'previlege_relstionship';
	protected $_title = '';
	protected $_fields = [
		'previlege_relstionship_id'   => [DBO_AUTO, 'previlege_relstionship_id', NULL],
		'parent_previlege_id'         => [DBO_NUMB, 'parent_previlege_id', NULL],
		'child_previlege_id'          => [DBO_NUMB, 'child_previlege_id', NULL],
		'previlege_relstionship_desc' => [DBO_STRI, 'previlege_relstionship_desc', NULL]
	];
	protected $_pkey = 'previlege_relstionship_id';
	protected $_fkeys = [//class=[fkey]
			'Previlege' => ['child_previlege_id','parent_previlege_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'previlege_relstionship_desc',
			'message' => 'Chưa nhập thông tin [previlege_relstionship_desc]'],
		['type' => 'length',
			'field' => 'previlege_relstionship_desc',
			'message' => 'Thông tin [previlege_relstionship_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}