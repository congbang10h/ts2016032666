<?php
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Course_outcome_version extends DBObject{
	protected $_table = 'course_outcome_version';
	protected $_title = '';
	protected $_fields = [
		'course_outcome_version_id'     => [DBO_AUTO, 'course_outcome_version_id', NULL],
		'course_id'                     => [DBO_NUMB, 'course_id', NULL],
		'course_outcome_version_code'   => [DBO_STRI, 'course_outcome_version_code', NULL],
		'course_outcome_version_date'   => [DBO_DATE, 'course_outcome_version_date', NULL],
		'course_outcome_version_isused' => [DBO_NUMB, 'course_outcome_version_isused', NULL]
	];
	protected $_pkey = 'course_outcome_version_id';
	protected $_fkeys = [//class=[fkey]
			'Course' => ['course_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Co_so_map_version' => ['course_outcome_version_id'],
			'Course_outcome'    => ['course_outcome_version_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'course_outcome_version_code',
			'message' => 'Chưa nhập thông tin [course_outcome_version_code]'],
		['type' => 'length',
			'field' => 'course_outcome_version_code',
			'message' => 'Thông tin [course_outcome_version_code] dài hơn 10 ký tự',
			'max' => 10],
		['type' => 'presence',
			'field' => 'course_outcome_version_date',
			'message' => 'Chưa nhập thông tin [course_outcome_version_date]'],
		['type' => 'presence',
			'field' => 'course_outcome_version_isused',
			'message' => 'Chưa nhập thông tin [course_outcome_version_isused]']
	];
//<ZoneC

//ZoneC>
}