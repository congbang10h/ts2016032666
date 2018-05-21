<?php
//ID: 20b50d6caf814808e8c5c4290bfa6267
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Bloom_level extends DBObject{
	protected $_table = 'bloom_level';
	protected $_title = '';
	protected $_fields = [
		'bloom_level_id'   => [DBO_AUTO, 'bloom_level_id', NULL],
		'bloom_level_code' => [DBO_NUMB, 'bloom_level_code', NULL],
		'bloom_level_desc' => [DBO_STRI, 'bloom_level_desc', NULL]
	];
	protected $_pkey = 'bloom_level_id';
	protected $_hasRef = [//class=[fkey]
			'Question' => ['bloom_level_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'bloom_level_code',
			'message' => 'Chưa nhập thông tin [bloom_level_code]'],
		['type' => 'presence',
			'field' => 'bloom_level_desc',
			'message' => 'Chưa nhập thông tin [bloom_level_desc]'],
		['type' => 'length',
			'field' => 'bloom_level_desc',
			'message' => 'Thông tin [bloom_level_desc] dài hơn 64 ký tự',
			'max' => 64]
	];
//<ZoneC

//ZoneC>
}