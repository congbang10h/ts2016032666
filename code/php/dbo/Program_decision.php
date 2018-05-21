<?php
//ID: 782fb25ec113764dd96fceb6b9593131
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Program_decision extends DBObject{
	protected $_table = 'program_decision';
	protected $_title = '';
	protected $_fields = [
		'program_decision_id'   => [DBO_AUTO, 'program_decision_id', NULL],
		'program_decision_code' => [DBO_STRI, 'program_decision_code', NULL],
		'program_decision_desc' => [DBO_STRI, 'program_decision_desc', NULL]
	];
	protected $_pkey = 'program_decision_id';
	protected $_hasRef = [//class=[fkey]
			'Peo_comment'     => ['program_decision_id'],
			'Program_comment' => ['program_decision_id'],
			'So_comment'      => ['program_decision_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'program_decision_code',
			'message' => 'Chưa nhập thông tin [program_decision_code]'],
		['type' => 'length',
			'field' => 'program_decision_code',
			'message' => 'Thông tin [program_decision_code] dài hơn 100 ký tự',
			'max' => 100],
		['type' => 'presence',
			'field' => 'program_decision_desc',
			'message' => 'Chưa nhập thông tin [program_decision_desc]'],
		['type' => 'length',
			'field' => 'program_decision_desc',
			'message' => 'Thông tin [program_decision_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}