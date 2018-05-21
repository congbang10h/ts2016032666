<?php
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần EDITABLE ZONE
//Những nội dung bên ngoài phần EDITABLE ZONE sẽ bị thay đổi khi chạy tool
//Không thay đổi 2 nhãn //BEGIN EDITABLE ZONE và //END EDITABLE ZONE
class Course_content_map extends DBObject{
	protected $_table = 'course_content_map';
	protected $_title = '';
	protected $_fields = array(
		'course_content_map_id'     => array(DBO_AUTO, 'course_content_map_id', NULL),
		'content_id'                => array(DBO_STRI, 'content_id', NULL),
		'course_id'                 => array(DBO_STRI, 'course_id', NULL),
		'course_content_map_factor' => array(DBO_NUMB, 'course_content_map_factor', NULL)
	);
	protected $_keys = array('course_content_map_id');
	protected $_fkeys = array(//class=array(fkey,pkey)
			'Content' => array('content_id', 'content_id'),
			'Course'  => array('course_id', 'course_id')
		);
	protected $_validations = array(
		array('type' => 'length',
			'field' => 'content_id',
			'message' => 'Thông tin [content_id] dài hơn 20 ký tự',
			'max' => 20),
		array('type' => 'length',
			'field' => 'course_id',
			'message' => 'Thông tin [course_id] dài hơn 10 ký tự',
			'max' => 10)
	);
//BEGIN EDITABLE ZONE

//END EDITABLE ZONE
}
?>