<?php
//ID: 30379b8767327dd2b7d0227106d307fa
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Test_question_map extends DBObject{
	protected $_table = 'test_question_map';
	protected $_title = '';
	protected $_fields = [
		'test_question_map_id'    => [DBO_AUTO, 'test_question_map_id', NULL],
		'editmode_question_id'    => [DBO_NUMB, 'editmode_question_id', NULL],
		'test_section_id'         => [DBO_NUMB, 'test_section_id', NULL],
		'testmode_question_id'    => [DBO_NUMB, 'testmode_question_id', NULL],
		'test_question_map_score' => [DBO_NUMB, 'test_question_map_score', NULL],
		'test_question_map_desc'  => [DBO_STRI, 'test_question_map_desc', NULL]
	];
	protected $_pkey = 'test_question_map_id';
	protected $_fkeys = [//class=[fkey]
			'Question'     => ['editmode_question_id','testmode_question_id'],
			'Test_section' => ['test_section_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'test_question_map_score',
			'message' => 'Chưa nhập thông tin [test_question_map_score]'],
		['type' => 'length',
			'field' => 'test_question_map_desc',
			'message' => 'Thông tin [test_question_map_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC
	public $_jfields = ['Test_section'=>['test_id']];
//ZoneC>
}