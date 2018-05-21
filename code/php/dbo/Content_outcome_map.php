<?php
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Content_outcome_map extends DBObject{
	protected $_table = 'content_outcome_map';
	protected $_title = '';
	protected $_fields = [
		'content_outcome_map_id'   => [DBO_AUTO, 'content_outcome_map_id', NULL],
		'course_content_id'        => [DBO_NUMB, 'course_content_id', NULL],
		'co_id'                    => [DBO_NUMB, 'co_id', NULL],
		'content_outcome_map_desc' => [DBO_STRI, 'content_outcome_map_desc', NULL]
	];
	protected $_pkey = 'content_outcome_map_id';
	protected $_fkeys = [//class=[fkey]
			'Course_content' => ['course_content_id'],
			'Course_outcome' => ['co_id']
		];
	protected $_validations = [
		['type' => 'length',
			'field' => 'content_outcome_map_desc',
			'message' => 'Thông tin [content_outcome_map_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}