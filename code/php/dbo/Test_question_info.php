<?php
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần EDITABLE ZONE
//Những nội dung bên ngoài phần EDITABLE ZONE sẽ bị thay đổi khi chạy tool
//Không thay đổi 2 nhãn //BEGIN EDITABLE ZONE và //END EDITABLE ZONE
class Test_question_info extends DBObject{
	protected $_table = 'test_question_info';
	protected $_title = '';
	protected $_fields = array(
		'test_question_info_id'    => array(DBO_AUTO, 'test_question_info_id', NULL),
		'test_question_id'         => array(DBO_NUMB, 'test_question_id', NULL),
		'test_question_info_prop'  => array(DBO_STRI, 'test_question_info_prop', NULL),
		'test_question_info_value' => array(DBO_STRI, 'test_question_info_value', NULL)
	);
	protected $_keys = array('test_question_info_id');
	protected $_fkeys = array(//class=array(fkey,pkey)
			'Test_question' => array('test_question_id', 'test_question_id')
		);
	protected $_validations = array(
		array('type' => 'presence',
			'field' => 'test_question_info_prop',
			'message' => 'Chưa nhập thông tin [test_question_info_prop]'),
		array('type' => 'length',
			'field' => 'test_question_info_prop',
			'message' => 'Thông tin [test_question_info_prop] dài hơn 50 ký tự',
			'max' => 50),
		array('type' => 'presence',
			'field' => 'test_question_info_value',
			'message' => 'Chưa nhập thông tin [test_question_info_value]'),
		array('type' => 'length',
			'field' => 'test_question_info_value',
			'message' => 'Thông tin [test_question_info_value] dài hơn 200 ký tự',
			'max' => 200)
	);
//BEGIN EDITABLE ZONE

//END EDITABLE ZONE
}
?>