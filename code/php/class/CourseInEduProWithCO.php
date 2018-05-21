<?php

/**
 * Class CourseInEduProWithCO
 * Sử dụng để liệt kê các Course trong chương trình đào tạo và CO isused tương ứng
 */
class CourseInEduProWithCO extends Course{
	public $_jfields = [
		'Program_course_map' => ['edu_program_id'],
		'Course_outcome' => ['co_id']
	];
	public function moreWhere($params)
	{
		$this->_aWhere[] = 'co_isused';
	}
}