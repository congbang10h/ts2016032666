<?php
//ID: ffbf78397d9a422092d768f3c3a87d69
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Previlege extends DBObject{
	protected $_table = 'previlege';
	protected $_title = '';
	protected $_fields = [
		'previlege_id'   => [DBO_AUTO, 'previlege_id', NULL],
		'previlege_code' => [DBO_STRI, 'previlege_code', NULL],
		'previlege_desc' => [DBO_STRI, 'previlege_desc', NULL]
	];
	protected $_pkey = 'previlege_id';
	protected $_hasRef = [//class=[fkey]
			'Course_access_mode'     => ['previlege_id'],
			'Previlege_relstionship' => ['child_previlege_id','parent_previlege_id'],
			'Program_access_mode'    => ['previlege_id'],
			'Question_access_mode'   => ['previlege_id'],
			'Role_previlege_map'     => ['previlege_id'],
			'Test_access_mode'       => ['previlege_id'],
			'Topic_access_mode'      => ['previlege_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'previlege_code',
			'message' => 'Chưa nhập thông tin [previlege_code]'],
		['type' => 'length',
			'field' => 'previlege_code',
			'message' => 'Thông tin [previlege_code] dài hơn 100 ký tự',
			'max' => 100],
		['type' => 'presence',
			'field' => 'previlege_desc',
			'message' => 'Chưa nhập thông tin [previlege_desc]'],
		['type' => 'length',
			'field' => 'previlege_desc',
			'message' => 'Thông tin [previlege_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC

//ZoneC>
}