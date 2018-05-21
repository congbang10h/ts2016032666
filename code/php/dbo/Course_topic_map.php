<?php
//ID: 21731f64b7efca4b62e0146bb0618784
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Course_topic_map extends DBObject{
	protected $_table = 'course_topic_map';
	protected $_title = '';
	protected $_fields = [
		'course_topic_map_id' => [DBO_AUTO, 'course_topic_map_id', NULL],
		'topic_id'            => [DBO_NUMB, 'topic_id', NULL],
		'course_id'           => [DBO_NUMB, 'course_id', NULL]
	];
	protected $_pkey = 'course_topic_map_id';
	protected $_fkeys = [//class=[fkey]
			'Course' => ['course_id'],
			'Topic'  => ['topic_id']
		];
//<ZoneC

//ZoneC>
}