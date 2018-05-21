<?php
//ID: 6f3d171c5c7b84387ca4d0cc6022fb9a
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Dept_course_map extends DBObject{
	protected $_table = 'dept_course_map';
	protected $_title = '';
	protected $_fields = [
		'dept_course_map_id'        => [DBO_AUTO, 'dept_course_map_id', NULL],
		'dept_id'                   => [DBO_NUMB, 'dept_id', NULL],
		'course_id'                 => [DBO_NUMB, 'course_id', NULL],
		'dept_course_map_startdate' => [DBO_DATE, 'dept_course_map_startdate', NULL],
		'dept_course_map_enddate'   => [DBO_DATE, 'dept_course_map_enddate', NULL]
	];
	protected $_pkey = 'dept_course_map_id';
	protected $_fkeys = [//class=[fkey]
			'Course'     => ['course_id'],
			'Department' => ['dept_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'dept_course_map_startdate',
			'message' => 'Chưa nhập thông tin [dept_course_map_startdate]']
	];
//<ZoneC

//ZoneC>
}