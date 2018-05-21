<?php
//ID: 98ce7b88e50d89d0ed0618b0b6fc5bb7
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Question_info extends DBObject{
	protected $_table = 'question_info';
	protected $_title = '';
	protected $_fields = [
		'question_info_id'    => [DBO_AUTO, 'question_info_id', NULL],
		'question_id'         => [DBO_NUMB, 'question_id', NULL],
		'question_info_prop'  => [DBO_STRI, 'question_info_prop', NULL],
		'question_info_value' => [DBO_STRI, 'question_info_value', NULL],
		'question_info_desc'  => [DBO_STRI, 'question_info_desc', NULL]
	];
	protected $_pkey = 'question_info_id';
	protected $_fkeys = [//class=[fkey]
			'Question' => ['question_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'question_info_prop',
			'message' => 'Chưa nhập thông tin [question_info_prop]'],
		['type' => 'length',
			'field' => 'question_info_prop',
			'message' => 'Thông tin [question_info_prop] dài hơn 20 ký tự',
			'max' => 20],
		['type' => 'presence',
			'field' => 'question_info_value',
			'message' => 'Chưa nhập thông tin [question_info_value]'],
		['type' => 'length',
			'field' => 'question_info_value',
			'message' => 'Thông tin [question_info_value] dài hơn 65535 ký tự',
			'max' => 65535],
		['type' => 'length',
			'field' => 'question_info_desc',
			'message' => 'Thông tin [question_info_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}