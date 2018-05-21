<?php
//ID: 6d1979a59da0da27e227dea326787064
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Takersolution_component extends DBObject{
	protected $_table = 'takersolution_component';
	protected $_title = '';
	protected $_fields = [
		'takersolution_component_id' => [DBO_AUTO, 'takersolution_component_id', NULL],
		'curr_item_id'               => [DBO_NUMB, 'curr_item_id', NULL],
		'next_item_id'               => [DBO_NUMB, 'next_item_id', NULL],
		'fill_value'                 => [DBO_STRI, 'fill_value', NULL],
		'taker_solution_id'          => [DBO_NUMB, 'taker_solution_id', NULL]
	];
	protected $_pkey = 'takersolution_component_id';
	protected $_fkeys = [//class=[fkey]
			'Taker_solution' => ['taker_solution_id'],
			'Question_item'  => ['next_item_id','curr_item_id']
		];
	protected $_validations = [
		['type' => 'length',
			'field' => 'fill_value',
			'message' => 'Thông tin [fill_value] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC
	public function verifyAuthorize($id=0,$action='read'){}
//ZoneC>
}