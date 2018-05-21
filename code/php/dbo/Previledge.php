<?php
//ID: 7dfe60c19c1b325412054302e0949208
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Previledge extends DBObject{
	protected $_table = 'previledge';
	protected $_title = '';
	protected $_fields = [
		'previledge_id'   => [DBO_AUTO, 'previledge_id', NULL],
		'previledge_code' => [DBO_STRI, 'previledge_code', NULL],
		'previledge_desc' => [DBO_STRI, 'previledge_desc', NULL]
	];
	protected $_pkey = 'previledge_id';
	protected $_hasRef = [//class=[fkey]
			'Course_access_mode'      => ['previledge_id'],
			'Previledge_relstionship' => ['child_previledge_id','parent_previledge_id'],
			'Program_access_mode'     => ['previledge_id'],
			'Question_access_mode'    => ['previledge_id'],
			'Role_previledge_map'     => ['previledge_id'],
			'Test_access_mode'        => ['previledge_id'],
			'Topic_access_mode'       => ['previledge_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'previledge_code',
			'message' => 'Chưa nhập thông tin [previledge_code]'],
		['type' => 'length',
			'field' => 'previledge_code',
			'message' => 'Thông tin [previledge_code] dài hơn 100 ký tự',
			'max' => 100],
		['type' => 'presence',
			'field' => 'previledge_desc',
			'message' => 'Chưa nhập thông tin [previledge_desc]'],
		['type' => 'length',
			'field' => 'previledge_desc',
			'message' => 'Thông tin [previledge_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}