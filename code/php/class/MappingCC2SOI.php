<?php
class MappingCC2SOI extends DBObject{
	public function prepare($params){
		$params = $params->items[0];
		$edupro_id = $params->edu_program_id;

		$query = "CALL SO_map_column(:epid)";
		$res = $this->query($query,[
			'epid' => $edupro_id
		])->fetchAll(PDO::FETCH_OBJ);
		$column = [];
		foreach($res as $it){
			$column[] = [
				'name' => $it->name,
				'soi_id' => $it->soi_id,
				'soi_code' => $it->soi_code,
				'soi_desc_vn' => $it->soi_desc_vn,
				'soi_desc_en' => $it->soi_desc_en
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
		if (!isset($params->filter) || count($params->filter)==0) {
			Console::log('Thiếu tham số filter');
			return [];
		}
		$course_id = 0;
		$ep_id = 0;
		foreach($params->filter as $filter){
			if ($filter->property=='course_id')
				$course_id = $filter->value;
			elseif ($filter->property=='edu_program_id')
				$ep_id = $filter->value;
		}
		if (!$course_id||!$ep_id){
			Console::log('Thiếu tham số course_id hoặc edu_program_id');
			return [];
		}
		return $this->__getChild($course_id,0,$ep_id);
	}
	private function __getChild($course_id,$parent_id,$edu_program_id){
		$query = "CALL CC2SOI_map_pivot($course_id,$parent_id,$edu_program_id)";
		$contents = $this->query($query)->fetchAll(PDO::FETCH_OBJ);
		foreach ($contents as &$cItem) {
			$childs = $this->__getChild($course_id,$cItem->id,$edu_program_id);
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