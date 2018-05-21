<?php
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần EDITABLE ZONE
//Những nội dung bên ngoài phần EDITABLE ZONE sẽ bị thay đổi khi chạy tool
//Không thay đổi 2 nhãn //BEGIN EDITABLE ZONE và //END EDITABLE ZONE
class Test_question_solution extends DBObject{
	protected $_table = 'test_question_solution';
	protected $_title = '';
	protected $_fields = array(
		'test_solution_id'    => array(DBO_AUTO, 'test_solution_id', NULL),
		'test_question_id'    => array(DBO_NUMB, 'test_question_id', NULL),
		'test_curr_item_id'   => array(DBO_NUMB, 'test_curr_item_id', NULL),
		'test_next_item_id'   => array(DBO_NUMB, 'test_next_item_id', NULL),
		'test_solution_order' => array(DBO_NUMB, 'test_solution_order', NULL)
	);
	protected $_keys = array('test_solution_id');
	protected $_fkeys = array(//class=array(fkey,pkey)
			'Test_question_item' => array('test_next_item_id', 'test_question_item_id'),
			'Test_question'      => array('test_question_id', 'test_question_id')
		);
//BEGIN EDITABLE ZONE

//END EDITABLE ZONE
}
?>