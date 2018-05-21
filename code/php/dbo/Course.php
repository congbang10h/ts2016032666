<?php
//ID: 60020d6db65cc641ce1eb88a802a3cab
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Course extends DBObject{
	protected $_table = 'course';
	protected $_title = '';
	protected $_fields = [
		'course_id'               => [DBO_AUTO, 'course_id', NULL],
		'course_code'             => [DBO_STRI, 'course_code', NULL],
		'course_name_vn'          => [DBO_STRI, 'course_name_vn', NULL],
		'course_name_en'          => [DBO_STRI, 'course_name_en', NULL],
		'course_name_short'       => [DBO_STRI, 'course_name_short', NULL],
		'course_credits'          => [DBO_NUMB, 'course_credits', NULL],
		'course_linkto_syllabus'  => [DBO_STRI, 'course_linkto_syllabus', NULL],
		'course_version_code'     => [DBO_STRI, 'course_version_code', NULL],
		'course_introduced_date'  => [DBO_DATE, 'course_introduced_date', NULL],
		'course_applied_year'     => [DBO_DATE, 'course_applied_year', NULL],
		'course_applied_semester' => [DBO_NUMB, 'course_applied_semester', NULL],
		'course_isused'           => [DBO_NUMB, 'course_isused', NULL]
	];
	protected $_pkey = 'course_id';
	protected $_hasRef = [//class=[fkey]
			'Course_access_mode'  => ['course_id'],
			'Course_assignment'   => ['course_id'],
			'Course_content'      => ['course_id'],
			'Course_outcome'      => ['course_id'],
			'Course_relationship' => ['child_course_id','parent_course_id'],
			'Course_topic_map'    => ['course_id'],
			'Dept_course_map'     => ['course_id'],
			'Program_course_map'  => ['course_id'],
			'Question'            => ['course_id'],
			'Test'                => ['course_id'],
			'User_course_devmap'  => ['course_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'course_code',
			'message' => 'Chưa nhập thông tin [course_code]'],
		['type' => 'length',
			'field' => 'course_code',
			'message' => 'Thông tin [course_code] dài hơn 20 ký tự',
			'max' => 20],
		['type' => 'presence',
			'field' => 'course_name_vn',
			'message' => 'Chưa nhập thông tin [course_name_vn]'],
		['type' => 'length',
			'field' => 'course_name_vn',
			'message' => 'Thông tin [course_name_vn] dài hơn 65535 ký tự',
			'max' => 65535],
		['type' => 'presence',
			'field' => 'course_name_en',
			'message' => 'Chưa nhập thông tin [course_name_en]'],
		['type' => 'length',
			'field' => 'course_name_en',
			'message' => 'Thông tin [course_name_en] dài hơn 65535 ký tự',
			'max' => 65535],
		['type' => 'length',
			'field' => 'course_name_short',
			'message' => 'Thông tin [course_name_short] dài hơn 20 ký tự',
			'max' => 20],
		['type' => 'presence',
			'field' => 'course_credits',
			'message' => 'Chưa nhập thông tin [course_credits]'],
		['type' => 'length',
			'field' => 'course_linkto_syllabus',
			'message' => 'Thông tin [course_linkto_syllabus] dài hơn 65535 ký tự',
			'max' => 65535],
		['type' => 'presence',
			'field' => 'course_version_code',
			'message' => 'Chưa nhập thông tin [course_version_code]'],
		['type' => 'length',
			'field' => 'course_version_code',
			'message' => 'Thông tin [course_version_code] dài hơn 20 ký tự',
			'max' => 20],
		['type' => 'presence',
			'field' => 'course_isused',
			'message' => 'Chưa nhập thông tin [course_isused]']
	];
//<ZoneC
	public function _destroy($params, $opts=null){
		if (isset($params->course_id))
			$this->query(
				"DELETE FROM course_content_map\n".
				"WHERE course_id=?",
				$params->course_id
			);
			$this->query(
				"DELETE FROM course\n".
				"WHERE course_id=?",
				$params->course_id
			);
			$this->query(
				"DELETE question_topic_map\n".
				"FROM question_topic_map\n".
				"\tJOIN content USING(content_id)".
				"\tLEFT JOIN course_content_map USING(content_id)".
				"WHERE course_content_map.content_id IS NULL"
			);
			$this->query(
				"DELETE content\n".
				"FROM content\n".
				"\tLEFT JOIN course_content_map USING(content_id)".
				"WHERE course_content_map.content_id IS NULL"
			);
	}
//ZoneC>
}