<?php
//ID: 8c66563d58a031a866d02497390cd7e1
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Course_assignment extends DBObject{
	protected $_table = 'course_assignment';
	protected $_title = '';
	protected $_fields = [
		'course_assign_id'   => [DBO_AUTO, 'course_assign_id', NULL],
		'user_id'            => [DBO_NUMB, 'user_id', NULL],
		'course_id'          => [DBO_NUMB, 'course_id', NULL],
		'course_assign_role' => [DBO_STRI, 'course_assign_role', NULL]
	];
	protected $_pkey = 'course_assign_id';
	protected $_fkeys = [//class=[fkey]
			'Course' => ['course_id'],
			'User'   => ['user_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'course_assign_role',
			'message' => 'Chưa nhập thông tin [course_assign_role]'],
		['type' => 'length',
			'field' => 'course_assign_role',
			'message' => 'Thông tin [course_assign_role] dài hơn 10 ký tự',
			'max' => 10]
	];
//<ZoneC

//ZoneC>
}