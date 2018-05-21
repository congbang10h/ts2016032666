<?php
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần EDITABLE ZONE
//Những nội dung bên ngoài phần EDITABLE ZONE sẽ bị thay đổi khi chạy tool
//Không thay đổi 2 nhãn //BEGIN EDITABLE ZONE và //END EDITABLE ZONE
class User_solution_item extends DBObject{
	protected $_table = 'user_solution_item';
	protected $_title = '';
	protected $_fields = array(
		'user_solution_item_id'      => array(DBO_AUTO, 'user_solution_item_id', NULL),
		'user_solution_id'           => array(DBO_NUMB, 'user_solution_id', NULL),
		'test_question_item_id'      => array(DBO_NUMB, 'test_question_item_id', NULL),
		'tes_test_question_item_id'  => array(DBO_NUMB, 'tes_test_question_item_id', NULL),
		'tes_test_question_item_id2' => array(DBO_NUMB, 'tes_test_question_item_id2', NULL),
		'user_solution_item_order'   => array(DBO_NUMB, 'user_solution_item_order', NULL),
		'user_solution_item_comment' => array(DBO_STRI, 'user_solution_item_comment', NULL),
		'user_solution_item_value'   => array(DBO_STRI, 'user_solution_item_value', NULL)
	);
	protected $_keys = array('user_solution_item_id');
	protected $_fkeys = array(//class=array(fkey,pkey)
			'Test_question_item' => array('test_question_item_id', 'test_question_item_id'),
			'User_solution'      => array('user_solution_id', 'user_solution_id')
		);
	protected $_validations = array(
		array('type' => 'length',
			'field' => 'user_solution_item_comment',
			'message' => 'Thông tin [user_solution_item_comment] dài hơn 65535 ký tự',
			'max' => 65535),
		array('type' => 'length',
			'field' => 'user_solution_item_value',
			'message' => 'Thông tin [user_solution_item_value] dài hơn 65535 ký tự',
			'max' => 65535)
	);
//BEGIN EDITABLE ZONE

//END EDITABLE ZONE
}
?>