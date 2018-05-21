<?php
//ID: 7fa8cdd084cf2ce6f7d65ac493244947
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Question_item_info extends DBObject{
	protected $_table = 'question_item_info';
	protected $_title = '';
	protected $_fields = [
		'question_item_info_id'    => [DBO_AUTO, 'question_item_info_id', NULL],
		'item_id'                  => [DBO_NUMB, 'item_id', NULL],
		'question_item_info_prop'  => [DBO_STRI, 'question_item_info_prop', NULL],
		'question_item_info_value' => [DBO_STRI, 'question_item_info_value', NULL],
		'question_item_info_desc'  => [DBO_STRI, 'question_item_info_desc', NULL]
	];
	protected $_pkey = 'question_item_info_id';
	protected $_fkeys = [//class=[fkey]
			'Question_item' => ['item_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'question_item_info_prop',
			'message' => 'Chưa nhập thông tin [question_item_info_prop]'],
		['type' => 'length',
			'field' => 'question_item_info_prop',
			'message' => 'Thông tin [question_item_info_prop] dài hơn 20 ký tự',
			'max' => 20],
		['type' => 'presence',
			'field' => 'question_item_info_value',
			'message' => 'Chưa nhập thông tin [question_item_info_value]'],
		['type' => 'length',
			'field' => 'question_item_info_value',
			'message' => 'Thông tin [question_item_info_value] dài hơn 65535 ký tự',
			'max' => 65535],
		['type' => 'length',
			'field' => 'question_item_info_desc',
			'message' => 'Thông tin [question_item_info_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}