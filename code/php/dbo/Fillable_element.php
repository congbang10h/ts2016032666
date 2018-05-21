<?php
//ID: d9fd8311ca2cc6440478e0994448970b
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Fillable_element extends DBObject{
	protected $_table = 'fillable_element';
	protected $_title = 'this element supports the fill-blank questions';
	protected $_fields = [
		'fillable_element_id'       => [DBO_AUTO, 'fillable_element_id', NULL],
		'item_id'                   => [DBO_NUMB, 'item_id', NULL],
		'fillable_element_code'     => [DBO_STRI, 'fillable_element_code', NULL],
		'fillable_element_hint'     => [DBO_STRI, 'fillable_element_hint', NULL],
		'fillable_element_solution' => [DBO_STRI, 'fillable_element_solution', NULL],
		'fillable_element_answer'   => [DBO_STRI, 'fillable_element_answer', NULL],
		'fillable_element_order'    => [DBO_NUMB, 'fillable_element_order', NULL]
	];
	protected $_pkey = 'fillable_element_id';
	protected $_fkeys = [//class=[fkey]
			'Question_item' => ['item_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Qsolution_component' => ['fill_element_id']
		];
	protected $_validations = [
		['type' => 'length',
			'field' => 'fillable_element_code',
			'message' => 'Thông tin [fillable_element_code] dài hơn 10 ký tự',
			'max' => 10],
		['type' => 'length',
			'field' => 'fillable_element_hint',
			'message' => 'Thông tin [fillable_element_hint] dài hơn 65535 ký tự',
			'max' => 65535],
		['type' => 'length',
			'field' => 'fillable_element_solution',
			'message' => 'Thông tin [fillable_element_solution] dài hơn 65535 ký tự',
			'max' => 65535],
		['type' => 'length',
			'field' => 'fillable_element_answer',
			'message' => 'Thông tin [fillable_element_answer] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}