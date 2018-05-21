<?php
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần EDITABLE ZONE
//Những nội dung bên ngoài phần EDITABLE ZONE sẽ bị thay đổi khi chạy tool
//Không thay đổi 2 nhãn //BEGIN EDITABLE ZONE và //END EDITABLE ZONE
class Question_solution extends DBObject{
	protected $_table = 'question_solution';
	protected $_title = '';
	protected $_fields = array(
		'solution_id'    => array(DBO_AUTO, 'solution_id', NULL),
		'curr_item_id'   => array(DBO_NUMB, 'curr_item_id', NULL),
		'next_item_id'   => array(DBO_NUMB, 'next_item_id', NULL),
		'question_id'    => array(DBO_NUMB, 'question_id', NULL),
		'solution_order' => array(DBO_NUMB, 'solution_order', NULL)
	);
	protected $_keys = array('solution_id');
	protected $_fkeys = array(//class=array(fkey,pkey)
			'Question_item' => array('next_item_id', 'item_id'),
			'Question'      => array('question_id', 'question_id')
		);
//BEGIN EDITABLE ZONE

//END EDITABLE ZONE
}
?>