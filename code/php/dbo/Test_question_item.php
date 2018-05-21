<?php
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần EDITABLE ZONE
//Những nội dung bên ngoài phần EDITABLE ZONE sẽ bị thay đổi khi chạy tool
//Không thay đổi 2 nhãn //BEGIN EDITABLE ZONE và //END EDITABLE ZONE
class Test_question_item extends DBObject{
	protected $_table = 'test_question_item';
	protected $_title = '';
	protected $_fields = array(
		'test_question_item_id'    => array(DBO_AUTO, 'test_question_item_id', NULL),
		'test_question_id'         => array(DBO_NUMB, 'test_question_id', NULL),
		'test_question_item_face'  => array(DBO_STRI, 'test_question_item_face', NULL),
		'test_question_item_value' => array(DBO_STRI, 'test_question_item_value', NULL)
	);
	protected $_keys = array('test_question_item_id');
	protected $_fkeys = array(//class=array(fkey,pkey)
			'Test_question' => array('test_question_id', 'test_question_id')
		);
	protected $_hasRef = array(//class=array(fkey,pkey)
			'Test_question_item_figure' => array('test_question_item_id', 'test_question_item_id'),
			'Test_question_item_info'   => array('test_question_item_id', 'test_question_item_id'),
			'Test_question_solution'    => array('test_next_item_id', 'test_question_item_id'),
			'User_solution_item'        => array('test_question_item_id', 'test_question_item_id')
		);
	protected $_validations = array(
		array('type' => 'length',
			'field' => 'test_question_item_face',
			'message' => 'Thông tin [test_question_item_face] dài hơn 65535 ký tự',
			'max' => 65535),
		array('type' => 'length',
			'field' => 'test_question_item_value',
			'message' => 'Thông tin [test_question_item_value] dài hơn 65535 ký tự',
			'max' => 65535)
	);
//BEGIN EDITABLE ZONE

//END EDITABLE ZONE
}
?>