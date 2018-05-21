<?php
//ID: cbb79c11564ff501b755adf1b07c2086
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Co_so_map extends DBObject{
	protected $_table = 'co_so_map';
	protected $_title = '';
	protected $_fields = [
		'csom_id'     => [DBO_AUTO, 'csom_id', NULL],
		'co_id'       => [DBO_NUMB, 'co_id', NULL],
		'so_id'       => [DBO_NUMB, 'so_id', NULL],
		'csom_code'   => [DBO_NUMB, 'csom_code', NULL],
		'csom_date'   => [DBO_DATE, 'csom_date', NULL],
		'csom_isused' => [DBO_NUMB, 'csom_isused', NULL]
	];
	protected $_pkey = 'csom_id';
	protected $_fkeys = [//class=[fkey]
			'Course_outcome'  => ['co_id'],
			'Student_outcome' => ['so_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Coi_soi_map' => ['csom_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'csom_code',
			'message' => 'Chưa nhập thông tin [csom_code]'],
		['type' => 'presence',
			'field' => 'csom_date',
			'message' => 'Chưa nhập thông tin [csom_date]'],
		['type' => 'presence',
			'field' => 'csom_isused',
			'message' => 'Chưa nhập thông tin [csom_isused]']
	];
//<ZoneC

//ZoneC>
}