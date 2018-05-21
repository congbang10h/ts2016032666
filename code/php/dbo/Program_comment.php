<?php
//ID: 7fcac53f4669f2df009d94fb7ac9b107
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Program_comment extends DBObject{
	protected $_table = 'program_comment';
	protected $_title = '';
	protected $_fields = [
		'program_comment_id'     => [DBO_AUTO, 'program_comment_id', NULL],
		'program_access_mode_id' => [DBO_NUMB, 'program_access_mode_id', NULL],
		'program_decision_id'    => [DBO_NUMB, 'program_decision_id', NULL],
		'program_comment_date'   => [DBO_DATE, 'program_comment_date', NULL],
		'program_comment_time'   => [DBO_TIME, 'program_comment_time', NULL],
		'program_comment_desc'   => [DBO_STRI, 'program_comment_desc', NULL]
	];
	protected $_pkey = 'program_comment_id';
	protected $_fkeys = [//class=[fkey]
			'Program_decision'    => ['program_decision_id'],
			'Program_access_mode' => ['program_access_mode_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Peo_comment'                  => ['program_comment_id'],
			'Program_comment_relationship' => ['pro_program_comment_id','program_comment_id'],
			'So_comment'                   => ['program_comment_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'program_comment_date',
			'message' => 'Chưa nhập thông tin [program_comment_date]'],
		['type' => 'presence',
			'field' => 'program_comment_time',
			'message' => 'Chưa nhập thông tin [program_comment_time]'],
		['type' => 'presence',
			'field' => 'program_comment_desc',
			'message' => 'Chưa nhập thông tin [program_comment_desc]'],
		['type' => 'length',
			'field' => 'program_comment_desc',
			'message' => 'Thông tin [program_comment_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}