<?php
//ID: 726ac440f5e46698aaeb3aa94636e44a
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Program_comment_relationship extends DBObject{
	protected $_table = 'program_comment_relationship';
	protected $_title = '';
	protected $_fields = [
		'program_comment_relationship_id'   => [DBO_AUTO, 'program_comment_relationship_id', NULL],
		'program_comment_id'                => [DBO_NUMB, 'program_comment_id', NULL],
		'pro_program_comment_id'            => [DBO_NUMB, 'pro_program_comment_id', NULL],
		'program_comment_relationship_desc' => [DBO_STRI, 'program_comment_relationship_desc', NULL]
	];
	protected $_pkey = 'program_comment_relationship_id';
	protected $_fkeys = [//class=[fkey]
			'Program_comment' => ['pro_program_comment_id','program_comment_id']
		];
	protected $_validations = [
		['type' => 'length',
			'field' => 'program_comment_relationship_desc',
			'message' => 'Thông tin [program_comment_relationship_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}