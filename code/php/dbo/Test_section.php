<?php
//ID: eae7606b11453de020cc2aaeb868a542
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Test_section extends DBObject{
	protected $_table = 'test_section';
	protected $_title = '';
	protected $_fields = [
		'test_section_id'    => [DBO_AUTO, 'test_section_id', NULL],
		'test_id'            => [DBO_NUMB, 'test_id', NULL],
		'test_section_code'  => [DBO_STRI, 'test_section_code', NULL],
		'test_section_desc'  => [DBO_STRI, 'test_section_desc', NULL],
		'test_section_order' => [DBO_NUMB, 'test_section_order', NULL]
	];
	protected $_pkey = 'test_section_id';
	protected $_fkeys = [//class=[fkey]
			'Test' => ['test_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Test_question_map' => ['test_section_id']
		];
	protected $_validations = [
		['type' => 'length',
			'field' => 'test_section_code',
			'message' => 'Thông tin [test_section_code] dài hơn 10 ký tự',
			'max' => 10],
		['type' => 'length',
			'field' => 'test_section_desc',
			'message' => 'Thông tin [test_section_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC
	protected function _buildOrder($params){
		$this->_aOrder[] = 'test_section_order ASC';
	}
	protected function _fetchFull(PDOStatement $stmt, $deep=0){
		$list = $stmt->fetchAll(PDO::FETCH_OBJ);
		$q = new Question();
		foreach ($list as $key => $o) {
			$stmt = $this->query(
				"SELECT question.*,test_question_map_score as score\n"
				."FROM question JOIN test_question_map ON (question_id in (editmode_question_id,testmode_question_id))\n"
				."WHERE test_section_id=?",
				$o->test_section_id
			);			
			$o->hasMany['Question'] = $q->_fetchFull($stmt);
		}
		return $list;
	}
	protected function beforeDestroy($params,$opts=null){
		$sectionMap = new Test_question_map();
		$sectionMap->_destroy([
			'test_section_id' => $params->test_section_id
		]);
	}
//ZoneC>
}