<?php
//ID: c4f7d74bd672a4b50c4d0e458995608c
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Taker_solution extends DBObject{
	protected $_table = 'taker_solution';
	protected $_title = '';
	protected $_fields = [
		'taker_solution_id' => [DBO_AUTO, 'taker_solution_id', NULL],
		'taker_test_map_id' => [DBO_NUMB, 'taker_test_map_id', NULL],
		'question_id'       => [DBO_NUMB, 'question_id', NULL],
		'mark_max'          => [DBO_NUMB, 'mark_max', NULL],
		'mark_cur'          => [DBO_NUMB, 'mark_cur', NULL]
	];
	protected $_pkey = 'taker_solution_id';
	protected $_fkeys = [//class=[fkey]
			'Question'       => ['question_id'],
			'Taker_test_map' => ['taker_test_map_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Takersolution_component' => ['taker_solution_id']
		];
//<ZoneC
	protected $_hasMany = ['Takersolution_component'];
	protected function _fetchFull(PDOStatement $stmt, $deep=0){
		$list = $stmt->fetchAll(PDO::FETCH_OBJ);
		$nc = new Takersolution_component(1);
		foreach ($list as $key => $o) {
			$o->items = $nc->findAll([
				'taker_solution_id' => $o->taker_solution_id
			]);
		}
		return $list;
	}
//ZoneC>
}