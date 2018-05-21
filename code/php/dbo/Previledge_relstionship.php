<?php
//ID: 82832e9d90299da7be853b4291b9b6aa
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Previledge_relstionship extends DBObject{
	protected $_table = 'previledge_relstionship';
	protected $_title = '';
	protected $_fields = [
		'previledge_relstionship_id'   => [DBO_AUTO, 'previledge_relstionship_id', NULL],
		'parent_previledge_id'         => [DBO_NUMB, 'parent_previledge_id', NULL],
		'child_previledge_id'          => [DBO_NUMB, 'child_previledge_id', NULL],
		'previledge_relstionship_desc' => [DBO_STRI, 'previledge_relstionship_desc', NULL]
	];
	protected $_pkey = 'previledge_relstionship_id';
	protected $_fkeys = [//class=[fkey]
			'Previledge' => ['child_previledge_id','parent_previledge_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'previledge_relstionship_desc',
			'message' => 'Chưa nhập thông tin [previledge_relstionship_desc]'],
		['type' => 'length',
			'field' => 'previledge_relstionship_desc',
			'message' => 'Thông tin [previledge_relstionship_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}