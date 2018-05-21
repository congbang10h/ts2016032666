<?php
//ID: b68fb1bce43ec5d43574311857e57822
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Qsolution extends DBObject{
	protected $_table = 'qsolution';
	protected $_title = '';
	protected $_fields = [
		'qsolution_id' => [DBO_AUTO, 'qsolution_id', NULL],
		'question_id'  => [DBO_NUMB, 'question_id', NULL]
	];
	protected $_pkey = 'qsolution_id';
	protected $_fkeys = [//class=[fkey]
			'Question' => ['question_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Qsolution_component' => ['qsolution_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'question_id',
			'message' => 'Chưa nhập thông tin [question_id]']
	];
//<ZoneC
	protected $_hasMany = ['Qsolution_component'];
	protected function _fetchFull(PDOStatement $stmt, $deep=0){
		return parent::_fetchFull($stmt,0);
	}
//ZoneC>
}