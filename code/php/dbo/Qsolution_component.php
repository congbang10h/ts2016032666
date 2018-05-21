<?php
//ID: 2622f4aca46c390d244355ddeed13a91
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Qsolution_component extends DBObject{
	protected $_table = 'qsolution_component';
	protected $_title = '';
	protected $_fields = [
		'qsolution_component_id' => [DBO_AUTO, 'qsolution_component_id', NULL],
		'qsolution_id'           => [DBO_NUMB, 'qsolution_id', NULL],
		'curr_item_id'           => [DBO_NUMB, 'curr_item_id', NULL],
		'next_item_id'           => [DBO_NUMB, 'next_item_id', NULL],
		'fill_element_id'        => [DBO_NUMB, 'fill_element_id', NULL]
	];
	protected $_pkey = 'qsolution_component_id';
	protected $_fkeys = [//class=[fkey]
			'Qsolution'        => ['qsolution_id'],
			'Question_item'    => ['curr_item_id','next_item_id'],
			'Fillable_element' => ['fill_element_id']
		];
//<ZoneC
	protected $_jfields	= array(
		'Fillable_element' => ['fillable_element_answer'],
		'Question_item'    => ['item_order']
	);
	protected $_hasMany	= ['Fillable_element'];
//ZoneC>
}