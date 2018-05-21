<?php
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần EDITABLE ZONE
//Những nội dung bên ngoài phần EDITABLE ZONE sẽ bị thay đổi khi chạy tool
//Không thay đổi 2 nhãn //BEGIN EDITABLE ZONE và //END EDITABLE ZONE
class Test_question_content extends DBObject{
	protected $_table = 'test_question_content';
	protected $_title = '';
	protected $_fields = array(
		'test_question_content_id'    => array(DBO_AUTO, 'test_question_content_id', NULL),
		'test_question_id'            => array(DBO_NUMB, 'test_question_id', NULL),
		'content_id'                  => array(DBO_STRI, 'content_id', NULL),
		'test_question_content_level' => array(DBO_STRI, 'test_question_content_level', NULL)
	);
	protected $_keys = array('test_question_content_id');
	protected $_fkeys = array(//class=array(fkey,pkey)
			'Test_question' => array('test_question_id', 'test_question_id'),
			'Content'       => array('content_id', 'content_id')
		);
	protected $_validations = array(
		array('type' => 'length',
			'field' => 'content_id',
			'message' => 'Thông tin [content_id] dài hơn 20 ký tự',
			'max' => 20),
		array('type' => 'length',
			'field' => 'test_question_content_level',
			'message' => 'Thông tin [test_question_content_level] dài hơn 1 ký tự',
			'max' => 1)
	);
//BEGIN EDITABLE ZONE

//END EDITABLE ZONE
}
?>