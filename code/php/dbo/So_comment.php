<?php
//ID: 4e444a991f8cb56ee448a29813a666b0
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class So_comment extends DBObject{
	protected $_table = 'so_comment';
	protected $_title = '';
	protected $_fields = [
		'so_comment_id'       => [DBO_AUTO, 'so_comment_id', NULL],
		'program_comment_id'  => [DBO_NUMB, 'program_comment_id', NULL],
		'so_id'               => [DBO_NUMB, 'so_id', NULL],
		'program_decision_id' => [DBO_NUMB, 'program_decision_id', NULL],
		'so_comment_date'     => [DBO_DATE, 'so_comment_date', NULL],
		'so_comment_time'     => [DBO_TIME, 'so_comment_time', NULL],
		'so_comment_desc'     => [DBO_STRI, 'so_comment_desc', NULL]
	];
	protected $_pkey = 'so_comment_id';
	protected $_fkeys = [//class=[fkey]
			'Program_decision'     => ['program_decision_id'],
			'Student_outcome_item' => ['so_id'],
			'Program_comment'      => ['program_comment_id']
		];
	protected $_hasRef = [//class=[fkey]
			'So_comment_relationship' => ['child_so_comment_id','parent_so_comment_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'so_comment_date',
			'message' => 'Chưa nhập thông tin [so_comment_date]'],
		['type' => 'presence',
			'field' => 'so_comment_desc',
			'message' => 'Chưa nhập thông tin [so_comment_desc]'],
		['type' => 'length',
			'field' => 'so_comment_desc',
			'message' => 'Thông tin [so_comment_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}