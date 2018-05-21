<?php
class TRCOR extends DBObject{
	public function prepare($params){
		$params = $params->items[0];
		$course_id = $params->course_id;

		$this->query("CALL report_TRCOR(?)",$course_id);
		$query = "CALL CO_map_column(:course)";
		$res = $this->query($query,[
			'course' => $course_id
		])->fetchAll(PDO::FETCH_OBJ);
		$column = [];
		foreach($res as $it){
			$column[] = [
				'name' => $it->name,
				'coi_id' => $it->coi_id,
				'coi_code' => $it->coi_code,
				'coi_desc_vn' => $it->coi_desc_vn,
				'coi_desc_en' => $it->coi_desc_en
			];
		}
		return [
			'success' => 1,
			'column' => $column
		];
	}
	public function read($params){
		$result = $this->query("SELECT COUNT(*) AS total FROM _report_trcor")
				->fetchObject();

		$rows = $this->query("
			SELECT A.*, test_code as code, CONCAT(user_first_name,' ',user_last_name) as lecturer
			FROM _report_trcor A
				JOIN `test` USING (test_id)
				JOIN `user` USING (user_id)
			")->fetchAll(PDO::FETCH_OBJ);
		return [
			'success' => 1,
			'total' => $result->total,
			'rows' => $rows
		];
	}
	public function chart(){
		$rows = $this->query("SELECT * FROM _report_trcor_chart")->fetchAll(PDO::FETCH_OBJ);
//		$legend = false;
		$legend = array(
			'visible' => true,
			'position' => 'right'
		);
		$axes = [[
			'type'=>'Numeric',
			'position'=>'left',
			'fields' => ['rate'],
			'title' => 'Tỷ lệ %',
			'grid' => true,
			'minimum' => 0,
			'maximum' => 100
		],[
			'type' => 'Category',
			'position' => 'bottom',
			'fields' => ['coi_code'],
			'title' => 'Chuẩn đầu ra',
		]];
		$fields = [];
		$fieldseries = [];
		if (count($rows)){
			foreach($rows[0] as $field=>$val){
				$fields[] = $field;
				if ($field=='coi_id'||$field=='coi_code')
					continue;
				$fieldseries[] = $field;
			}
		}
		$series = [[
				'type' => 'column',
				'axis' => 'left',
				'xField' => 'coi_code',
				'yField' => $fieldseries,
				'highlight'=> true,
				'label' => [
					'display' => 'outside',
					'field'=>$fieldseries,
					'orientation'=> 'vertical',
					'color'=> '#333'
				]
		]];
		return [
			'title' => 'Bảng thống kê tỷ lệ sinh viên đạt chuẩn đầu ra môn học theo đề thi',
			'success' => 1,
			'legend' => $legend,
			'axes' => $axes,
			'series' => $series,
			'fields' => $fields,
			'items' => $rows,
			'cfg' => ['percent'=>1]
		];
	}
}