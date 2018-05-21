<?php
//ID: d575e29dc303611aae53df11da49693e
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class User_course_devmap extends DBObject{
	protected $_table = 'user_course_devmap';
	protected $_title = '';
	protected $_fields = [
		'user_course_devmap_id' => [DBO_AUTO, 'user_course_devmap_id', NULL],
		'user_id'               => [DBO_NUMB, 'user_id', NULL],
		'course_id'             => [DBO_NUMB, 'course_id', NULL]
	];
	protected $_pkey = 'user_course_devmap_id';
	protected $_fkeys = [//class=[fkey]
			'Course' => ['course_id'],
			'User'   => ['user_id']
		];
//<ZoneC

//ZoneC>
}