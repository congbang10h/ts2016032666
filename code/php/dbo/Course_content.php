<?php
//ID: 8c8ee01eafe0a5762b5dac03b061fca2
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Course_content extends DBObject{
	protected $_table = 'course_content';
	protected $_title = '';
	protected $_fields = [
		'course_content_id'         => [DBO_AUTO, 'course_content_id', NULL],
		'course_parentcontent_id'   => [DBO_NUMB, 'course_parentcontent_id', NULL],
		'course_id'                 => [DBO_NUMB, 'course_id', NULL],
		'course_content_code'       => [DBO_STRI, 'course_content_code', NULL],
		'course_content_name'       => [DBO_STRI, 'course_content_name', NULL],
		'course_content_desc'       => [DBO_STRI, 'course_content_desc', NULL],
		'course_content_percentage' => [DBO_NUMB, 'course_content_percentage', NULL],
		'course_content_order'      => [DBO_NUMB, 'course_content_order', NULL]
	];
	protected $_pkey = 'course_content_id';
	protected $_fkeys = [//class=[fkey]
			'Course'         => ['course_id'],
			'Course_content' => ['course_parentcontent_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Cco_map'              => ['cc_id'],
			'Content_comment'      => ['course_content_id'],
			'Course_content'       => ['course_parentcontent_id'],
			'Qgroup_content_map'   => ['course_content_id'],
			'Question'             => ['course_content_id'],
			'Question_content_map' => ['course_content_id']
		];
	protected $_validations = [
		['type' => 'length',
			'field' => 'course_content_code',
			'message' => 'Thông tin [course_content_code] dài hơn 10 ký tự',
			'max' => 10],
		['type' => 'length',
			'field' => 'course_content_name',
			'message' => 'Thông tin [course_content_name] dài hơn 200 ký tự',
			'max' => 200],
		['type' => 'presence',
			'field' => 'course_content_desc',
			'message' => 'Chưa nhập thông tin [course_content_desc]'],
		['type' => 'length',
			'field' => 'course_content_desc',
			'message' => 'Thông tin [course_content_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC
	protected function _buildOrder($params){
		$this->_aOrder[] = "course_content_order ASC";
	}
//ZoneC>
}