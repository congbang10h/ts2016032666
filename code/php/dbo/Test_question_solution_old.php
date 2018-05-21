<?php
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần EDITABLE ZONE
//Những nội dung bên ngoài phần EDITABLE ZONE sẽ bị thay đổi khi chạy tool
//Không thay đổi 2 nhãn //BEGIN EDITABLE ZONE và //END EDITABLE ZONE
class Test_question_solution_old extends DBObject{
	protected $_table = 'test_question_solution_old';
	protected $_title = '';
	protected $_fields = array(
		'test_question_solution_id'    => array(DBO_AUTO, 'test_question_solution_id', NULL),
		'test_question_id'             => array(DBO_NUMB, 'test_question_id', NULL),
		'test_question_item_id'        => array(DBO_NUMB, 'test_question_item_id', NULL),
		'tes_test_question_item_id'    => array(DBO_NUMB, 'tes_test_question_item_id', NULL),
		'tes_test_question_item_id2'   => array(DBO_NUMB, 'tes_test_question_item_id2', NULL),
		'test_question_solution_order' => array(DBO_NUMB, 'test_question_solution_order', NULL)
	);
	protected $_keys = array('test_question_solution_id');
//BEGIN EDITABLE ZONE

//END EDITABLE ZONE
}
?>