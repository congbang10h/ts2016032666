<?php
//ID: 766e685e2d852845d5dca7e6b962cabf
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Performance_indicator extends DBObject{
	protected $_table = 'performance_indicator';
	protected $_title = '';
	protected $_fields = [
		'pi_id'                            => [DBO_AUTO, 'pi_id', NULL],
		'performance_indicator_version_id' => [DBO_NUMB, 'performance_indicator_version_id', NULL],
		'pi_desc'                          => [DBO_STRI, 'pi_desc', NULL],
		'pi_introduced_date'               => [DBO_DATE, 'pi_introduced_date', NULL],
		'pi_used'                          => [DBO_NUMB, 'pi_used', NULL],
		'pi_version'                       => [DBO_NUMB, 'pi_version', NULL]
	];
	protected $_pkey = 'pi_id';
	protected $_fkeys = [//class=[fkey]
			'Performance_indicator_version' => ['performance_indicator_version_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'pi_desc',
			'message' => 'Chưa nhập thông tin [pi_desc]'],
		['type' => 'length',
			'field' => 'pi_desc',
			'message' => 'Thông tin [pi_desc] dài hơn 65535 ký tự',
			'max' => 65535],
		['type' => 'presence',
			'field' => 'pi_introduced_date',
			'message' => 'Chưa nhập thông tin [pi_introduced_date]'],
		['type' => 'presence',
			'field' => 'pi_used',
			'message' => 'Chưa nhập thông tin [pi_used]']
	];
//<ZoneC

//ZoneC>
}