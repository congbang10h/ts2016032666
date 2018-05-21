<?php
//ID: 2f8fb16d42a2bce00631d0c9d10e91a5
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Cco_map extends DBObject{
	protected $_table = 'cco_map';
	protected $_title = '';
	protected $_fields = [
		'cco_id'   => [DBO_AUTO, 'cco_id', NULL],
		'cc_id'    => [DBO_NUMB, 'cc_id', NULL],
		'coi_id'   => [DBO_NUMB, 'coi_id', NULL],
		'cco_desc' => [DBO_STRI, 'cco_desc', NULL]
	];
	protected $_pkey = 'cco_id';
	protected $_fkeys = [//class=[fkey]
			'Course_content'      => ['cc_id'],
			'Course_outcome_item' => ['coi_id']
		];
	protected $_validations = [
		['type' => 'length',
			'field' => 'cco_desc',
			'message' => 'Thông tin [cco_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}