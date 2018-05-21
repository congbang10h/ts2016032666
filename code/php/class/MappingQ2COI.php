<?php
class MappingQ2COI extends DBObject{
	public function prepare($params){
		$params = $params->items[0];
		$course_id = $params->course_id;

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
		$course_id = 0;
		$question_ids = [];
		foreach($params->filter as $filter){
			if ($filter->property=='course_id')
				$course_id = $filter->value;
			elseif($filter->property=='question_ids')
				$question_ids = $filter->value;
		}
		$idstxt = implode(',',$question_ids);
		$query = "CALL Q2COI_map_pivot($course_id,'$idstxt')";
		$total = count($question_ids);
		if ($total==0)
			throw new AException("Tham số question_ids không chính xác");
		$rows = $this->query($query)->fetchAll(PDO::FETCH_OBJ);
		return [
			'success' => 1,
			'total' => $total,
			'rows' => $rows
		];
	}
}