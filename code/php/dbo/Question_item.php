<?php
//ID: b8a88a77da1fe66c942e25610b070867
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Question_item extends DBObject{
	protected $_table = 'question_item';
	protected $_title = '';
	protected $_fields = [
		'item_id'               => [DBO_AUTO, 'item_id', NULL],
		'question_id'           => [DBO_NUMB, 'question_id', NULL],
		'item_code'             => [DBO_STRI, 'item_code', NULL],
		'item_desc'             => [DBO_STRI, 'item_desc', NULL],
		'item_order'            => [DBO_NUMB, 'item_order', NULL],
		'item_reviewer_comment' => [DBO_STRI, 'item_reviewer_comment', NULL],
		'item_taker_comment'    => [DBO_STRI, 'item_taker_comment', NULL]
	];
	protected $_pkey = 'item_id';
	protected $_fkeys = [//class=[fkey]
			'Question' => ['question_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Fillable_element'        => ['item_id'],
			'Qsolution_component'     => ['curr_item_id','next_item_id'],
			'Question_item_info'      => ['item_id'],
			'Takersolution_component' => ['next_item_id','curr_item_id']
		];
	protected $_validations = [
		['type' => 'length',
			'field' => 'item_code',
			'message' => 'Thông tin [item_code] dài hơn 10 ký tự',
			'max' => 10],
		['type' => 'length',
			'field' => 'item_desc',
			'message' => 'Thông tin [item_desc] dài hơn 65535 ký tự',
			'max' => 65535],
		['type' => 'length',
			'field' => 'item_reviewer_comment',
			'message' => 'Thông tin [item_reviewer_comment] dài hơn 65535 ký tự',
			'max' => 65535],
		['type' => 'length',
			'field' => 'item_taker_comment',
			'message' => 'Thông tin [item_taker_comment] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC
	protected $_hasMany = ['Question_item_info','Fillable_element'];
	protected function _fetchFull(PDOStatement $stmt, $deep=0){
		return parent::_fetchFull($stmt,0);
	}
//ZoneC>
}