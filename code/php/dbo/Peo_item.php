<?php
//ID: 7f88d784c264552393999f7dcaa2b9ca
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Peo_item extends DBObject{
	protected $_table = 'peo_item';
	protected $_title = '';
	protected $_fields = [
		'peoi_id'      => [DBO_AUTO, 'peoi_id', NULL],
		'peo_id'       => [DBO_NUMB, 'peo_id', NULL],
		'peoi_code'    => [DBO_STRI, 'peoi_code', NULL],
		'peoi_desc_vn' => [DBO_STRI, 'peoi_desc_vn', NULL],
		'peoi_desc_en' => [DBO_STRI, 'peoi_desc_en', NULL]
	];
	protected $_pkey = 'peoi_id';
	protected $_fkeys = [//class=[fkey]
			'Peo' => ['peo_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Peo_comment'  => ['peo_id'],
			'Peoi_soi_map' => ['peoi_id'],
			'Umi_peoi_map' => ['peoi_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'peoi_code',
			'message' => 'Chưa nhập thông tin [peoi_code]'],
		['type' => 'length',
			'field' => 'peoi_code',
			'message' => 'Thông tin [peoi_code] dài hơn 5 ký tự',
			'max' => 5],
		['type' => 'presence',
			'field' => 'peoi_desc_vn',
			'message' => 'Chưa nhập thông tin [peoi_desc_vn]'],
		['type' => 'length',
			'field' => 'peoi_desc_vn',
			'message' => 'Thông tin [peoi_desc_vn] dài hơn 65535 ký tự',
			'max' => 65535],
		['type' => 'presence',
			'field' => 'peoi_desc_en',
			'message' => 'Chưa nhập thông tin [peoi_desc_en]'],
		['type' => 'length',
			'field' => 'peoi_desc_en',
			'message' => 'Thông tin [peoi_desc_en] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}