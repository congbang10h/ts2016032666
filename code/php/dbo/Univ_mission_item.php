<?php
//ID: 0a30c3bb70103911327279a8ea3ce1c2
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Univ_mission_item extends DBObject{
	protected $_table = 'univ_mission_item';
	protected $_title = '';
	protected $_fields = [
		'umi_id'      => [DBO_AUTO, 'umi_id', NULL],
		'um_id'       => [DBO_NUMB, 'um_id', NULL],
		'umi_code'    => [DBO_STRI, 'umi_code', NULL],
		'umi_desc_vn' => [DBO_STRI, 'umi_desc_vn', NULL],
		'umi_desc_en' => [DBO_STRI, 'umi_desc_en', NULL]
	];
	protected $_pkey = 'umi_id';
	protected $_fkeys = [//class=[fkey]
			'Univ_mission' => ['um_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Umi_peoi_map' => ['umi_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'umi_code',
			'message' => 'Chưa nhập thông tin [umi_code]'],
		['type' => 'length',
			'field' => 'umi_code',
			'message' => 'Thông tin [umi_code] dài hơn 5 ký tự',
			'max' => 5],
		['type' => 'presence',
			'field' => 'umi_desc_vn',
			'message' => 'Chưa nhập thông tin [umi_desc_vn]'],
		['type' => 'length',
			'field' => 'umi_desc_vn',
			'message' => 'Thông tin [umi_desc_vn] dài hơn 65535 ký tự',
			'max' => 65535],
		['type' => 'presence',
			'field' => 'umi_desc_en',
			'message' => 'Chưa nhập thông tin [umi_desc_en]'],
		['type' => 'length',
			'field' => 'umi_desc_en',
			'message' => 'Thông tin [umi_desc_en] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}