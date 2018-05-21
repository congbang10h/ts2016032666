<?php
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần EDITABLE ZONE
//Những nội dung bên ngoài phần EDITABLE ZONE sẽ bị thay đổi khi chạy tool
//Không thay đổi 2 nhãn //<ZoneC và //ZoneC>
class Filled_element extends DBObject{
	protected $_table = 'filled_element';
	protected $_title = '';
	protected $_fields = [
		'filled_element_id'    => [DBO_AUTO, 'filled_element_id', NULL],
		'fillable_element_id'  => [DBO_NUMB, 'fillable_element_id', NULL],
		'taker_solution_id'    => [DBO_NUMB, 'taker_solution_id', NULL],
		'filled_element_value' => [DBO_STRI, 'filled_element_value', NULL]
	];
	protected $_pkey = 'filled_element_id';
	protected $_hasRef = [//class=[fkey]
			'Takersolution_component' => ['filled_element_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'filled_element_value',
			'message' => 'Chưa nhập thông tin [filled_element_value]'],
		['type' => 'length',
			'field' => 'filled_element_value',
			'message' => 'Thông tin [filled_element_value] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}