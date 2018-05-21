<?php
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần EDITABLE ZONE
//Những nội dung bên ngoài phần EDITABLE ZONE sẽ bị thay đổi khi chạy tool
//Không thay đổi 2 nhãn //BEGIN EDITABLE ZONE và //END EDITABLE ZONE
class Test_question extends DBObject{
	protected $_table = 'test_question';
	protected $_title = '';
	protected $_fields = array(
		'test_question_id'    => array(DBO_AUTO, 'test_question_id', NULL),
		'test_section_id'     => array(DBO_NUMB, 'test_section_id', NULL),
		'user_id'             => array(DBO_NUMB, 'user_id', '0'),
		'test_question_desc'  => array(DBO_STRI, 'test_question_desc', NULL),
		'test_question_type'  => array(DBO_STRI, 'test_question_type', NULL),
		'test_question_level' => array(DBO_STRI, 'test_question_level', NULL),
		'test_question_score' => array(DBO_NUMB, 'test_question_score', NULL)
	);
	protected $_keys = array('test_question_id');
	protected $_fkeys = array(//class=array(fkey,pkey)
			'Test_section' => array('test_section_id', 'test_section_id'),
			'User'         => array('user_id', 'user_id')
		);
	protected $_hasRef = array(//class=array(fkey,pkey)
			'Test_question_content'  => array('test_question_id', 'test_question_id'),
			'Test_question_figure'   => array('test_question_id', 'test_question_id'),
			'Test_question_info'     => array('test_question_id', 'test_question_id'),
			'Test_question_item'     => array('test_question_id', 'test_question_id'),
			'Test_question_solution' => array('test_question_id', 'test_question_id'),
			'User_solution'          => array('test_question_id', 'test_question_id')
		);
	protected $_validations = array(
		array('type' => 'length',
			'field' => 'test_question_desc',
			'message' => 'Thông tin [test_question_desc] dài hơn 65535 ký tự',
			'max' => 65535),
		array('type' => 'presence',
			'field' => 'test_question_type',
			'message' => 'Chưa nhập thông tin [test_question_type]'),
		array('type' => 'length',
			'field' => 'test_question_type',
			'message' => 'Thông tin [test_question_type] dài hơn 15 ký tự',
			'max' => 15),
		array('type' => 'length',
			'field' => 'test_question_level',
			'message' => 'Thông tin [test_question_level] dài hơn 1 ký tự',
			'max' => 1)
	);
//BEGIN EDITABLE ZONE

//END EDITABLE ZONE
}
?>