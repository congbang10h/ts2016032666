<?php
//ID: 2332944a6a2f232bfd301633f0e6d050
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Course_outcome_item extends DBObject{
	protected $_table = 'course_outcome_item';
	protected $_title = '';
	protected $_fields = [
		'coi_id'      => [DBO_AUTO, 'coi_id', NULL],
		'co_id'       => [DBO_NUMB, 'co_id', NULL],
		'coi_code'    => [DBO_STRI, 'coi_code', NULL],
		'coi_desc_vn' => [DBO_STRI, 'coi_desc_vn', NULL],
		'coi_desc_en' => [DBO_STRI, 'coi_desc_en', NULL]
	];
	protected $_pkey = 'coi_id';
	protected $_fkeys = [//class=[fkey]
			'Course_outcome' => ['co_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Cco_map'     => ['coi_id'],
			'Coi_soi_map' => ['coi_id'],
			'Qco_map'     => ['coi_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'coi_code',
			'message' => 'Chưa nhập thông tin [coi_code]'],
		['type' => 'length',
			'field' => 'coi_code',
			'message' => 'Thông tin [coi_code] dài hơn 5 ký tự',
			'max' => 5],
		['type' => 'presence',
			'field' => 'coi_desc_vn',
			'message' => 'Chưa nhập thông tin [coi_desc_vn]'],
		['type' => 'length',
			'field' => 'coi_desc_vn',
			'message' => 'Thông tin [coi_desc_vn] dài hơn 65535 ký tự',
			'max' => 65535],
		['type' => 'length',
			'field' => 'coi_desc_en',
			'message' => 'Thông tin [coi_desc_en] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC
	protected function beforeCreate($params,$opts=null){
		if (!preg_match("/^[_a-zA-Z.]\\w+$/",$params->coi_code))
			throw new AException('Mã số của chuẩn đầu ra chỉ sử dụng chữ, số, gạch dưới, dấu chấm và không bắt đầu bằng số');
	}
	protected function beforeUpdate($params,$opts=null){
		if (!preg_match("/^[_a-zA-Z.]\\w+$/",$params->coi_code))
			throw new AException('Mã số của chuẩn đầu ra chỉ sử dụng chữ, số, gạch dưới, dấu chấm và không bắt đầu bằng số');
	}
//ZoneC>
}