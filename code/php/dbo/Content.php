<?php
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần EDITABLE ZONE
//Những nội dung bên ngoài phần EDITABLE ZONE sẽ bị thay đổi khi chạy tool
//Không thay đổi 2 nhãn //BEGIN EDITABLE ZONE và //END EDITABLE ZONE
class Content extends DBObject{
	protected $_table = 'content';
	protected $_title = '';
	protected $_fields = array(
		'content_id'        => array(DBO_STRI, 'content_id', NULL),
		'parent_content_id' => array(DBO_STRI, 'parent_content_id', NULL),
		'content_name'      => array(DBO_STRI, 'content_name', NULL),
		'content_desc'      => array(DBO_STRI, 'content_desc', NULL),
		'content_order'     => array(DBO_NUMB, 'content_order', '0')
	);
	protected $_keys = array('content_id');
	protected $_hasRef = array(//class=array(fkey,pkey)
			'Course_content_map'    => array('content_id', 'content_id'),
			'Question_topic_map'    => array('content_id', 'content_id'),
			'Test_question_content' => array('content_id', 'content_id')
		);
	protected $_validations = array(
		array('type' => 'presence',
			'field' => 'content_id',
			'message' => 'Chưa nhập thông tin [content_id]'),
		array('type' => 'length',
			'field' => 'content_id',
			'message' => 'Thông tin [content_id] dài hơn 20 ký tự',
			'max' => 20),
		array('type' => 'length',
			'field' => 'parent_content_id',
			'message' => 'Thông tin [parent_content_id] dài hơn 20 ký tự',
			'max' => 20),
		array('type' => 'presence',
			'field' => 'content_name',
			'message' => 'Chưa nhập thông tin [content_name]'),
		array('type' => 'length',
			'field' => 'content_name',
			'message' => 'Thông tin [content_name] dài hơn 200 ký tự',
			'max' => 200),
		array('type' => 'length',
			'field' => 'content_desc',
			'message' => 'Thông tin [content_desc] dài hơn 65535 ký tự',
			'max' => 65535)
	);
//BEGIN EDITABLE ZONE
//END EDITABLE ZONE
}
?>