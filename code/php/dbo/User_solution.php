<?php
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần EDITABLE ZONE
//Những nội dung bên ngoài phần EDITABLE ZONE sẽ bị thay đổi khi chạy tool
//Không thay đổi 2 nhãn //BEGIN EDITABLE ZONE và //END EDITABLE ZONE
class User_solution extends DBObject{
	protected $_table = 'user_solution';
	protected $_title = '';
	protected $_fields = array(
		'user_solution_id'      => array(DBO_AUTO, 'user_solution_id', NULL),
		'test_question_id'      => array(DBO_NUMB, 'test_question_id', NULL),
		'user_id'               => array(DBO_NUMB, 'user_id', '0'),
		'user_solution_comment' => array(DBO_STRI, 'user_solution_comment', NULL)
	);
	protected $_keys = array('user_solution_id');
	protected $_fkeys = array(//class=array(fkey,pkey)
			'Test_question' => array('test_question_id', 'test_question_id'),
			'User'          => array('user_id', 'user_id')
		);
	protected $_hasRef = array(//class=array(fkey,pkey)
			'User_solution_item' => array('user_solution_id', 'user_solution_id')
		);
	protected $_validations = array(
		array('type' => 'length',
			'field' => 'user_solution_comment',
			'message' => 'Thông tin [user_solution_comment] dài hơn 65535 ký tự',
			'max' => 65535)
	);
//BEGIN EDITABLE ZONE

//END EDITABLE ZONE
}
?>