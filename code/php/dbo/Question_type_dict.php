<?php
//ID: 0d49e5fda88d0e278ae57eb3e9df227c
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Question_type_dict extends DBObject{
	protected $_table = 'question_type_dict';
	protected $_title = 'dictionary of question types
';
	protected $_fields = [
		'question_type_id'   => [DBO_AUTO, 'question_type_id', NULL],
		'question_type_code' => [DBO_STRI, 'question_type_code', NULL],
		'question_type_desc' => [DBO_STRI, 'question_type_desc', NULL]
	];
	protected $_pkey = 'question_type_id';
	protected $_hasRef = [//class=[fkey]
			'Question' => ['question_type_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'question_type_code',
			'message' => 'Chưa nhập thông tin [question_type_code]'],
		['type' => 'length',
			'field' => 'question_type_code',
			'message' => 'Thông tin [question_type_code] dài hơn 20 ký tự',
			'max' => 20],
		['type' => 'presence',
			'field' => 'question_type_desc',
			'message' => 'Chưa nhập thông tin [question_type_desc]'],
		['type' => 'length',
			'field' => 'question_type_desc',
			'message' => 'Thông tin [question_type_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}