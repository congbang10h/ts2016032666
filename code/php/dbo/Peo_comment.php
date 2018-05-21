<?php
//ID: bc9721873644a20ef2614ae5b07e0202
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Peo_comment extends DBObject{
	protected $_table = 'peo_comment';
	protected $_title = '';
	protected $_fields = [
		'peo_comment_id'      => [DBO_AUTO, 'peo_comment_id', NULL],
		'program_comment_id'  => [DBO_NUMB, 'program_comment_id', NULL],
		'peo_id'              => [DBO_NUMB, 'peo_id', NULL],
		'program_decision_id' => [DBO_NUMB, 'program_decision_id', NULL],
		'peo_comment_date'    => [DBO_DATE, 'peo_comment_date', NULL],
		'peo_comment_time'    => [DBO_TIME, 'peo_comment_time', NULL],
		'peo_comment_desc'    => [DBO_STRI, 'peo_comment_desc', NULL]
	];
	protected $_pkey = 'peo_comment_id';
	protected $_fkeys = [//class=[fkey]
			'Peo_item'         => ['peo_id'],
			'Program_comment'  => ['program_comment_id'],
			'Program_decision' => ['program_decision_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Peo_comment_relationship' => ['child_peo_comment_id','parent_peo_comment_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'peo_comment_date',
			'message' => 'Chưa nhập thông tin [peo_comment_date]'],
		['type' => 'presence',
			'field' => 'peo_comment_desc',
			'message' => 'Chưa nhập thông tin [peo_comment_desc]'],
		['type' => 'length',
			'field' => 'peo_comment_desc',
			'message' => 'Thông tin [peo_comment_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}