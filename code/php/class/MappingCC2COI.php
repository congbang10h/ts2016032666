<?php
class MappingCC2COI extends DBObject{
	public function prepare($params){
		$params = $params->items[0];
		if (!isset($params->filter) || count($params->filter)==0
			|| $params->filter[0]->property!='course_id')
			return [
				'success' => 1,
				'error' => 'Thiếu tham số course_id'
			];
		$course_id = $params->filter[0]->value;

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
		return array(
			'success'=>1,
			'children'=>$this->_read($params)
		);
	}
	public function _read($params){
		if (!isset($params->filter) || count($params->filter)==0
			|| $params->filter[0]->property!='course_id')
			return [];
		$course_id = $params->filter[0]->value;
		return $this->__getChild(0,$course_id);
	}
	private function __getChild($content_id,$course_id){
		$query = "CALL CO_map_pivot($course_id,$content_id)";
		$contents = $this->query($query)->fetchAll(PDO::FETCH_OBJ);
		foreach ($contents as &$cItem) {
			$childs = $this->__getChild($cItem->id,$course_id);
			if (count($childs)){
				$cItem->leaf = false;
				$cItem->children = $childs;
			}else{
				$cItem->leaf = true;
			}
		}
		return $contents;
	}
}