<?php
class CC_CO_R4T extends DBObject{
	public function prepare($params){
		$params = $params->items[0];
		$course_id = $params->course_id;
		$test_id = $params->test_id;

		$this->query("CALL report_CC_CO_R4T(?)",$test_id);
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
			'children'=>$this->__getChild(0)
		);
	}
	private function __getChild($content_id){
		$cond = $content_id ? "=$content_id" : 'IS NULL';
		$query = "SELECT A.*,B.*,course_content_id as id, course_content_name as `text`
					FROM course_content A
						JOIN _cc_co_r4t_data B USING (course_content_id)
					WHERE course_parentcontent_id $cond";
		$contents = $this->query($query)->fetchAll(PDO::FETCH_OBJ);
		foreach ($contents as $i=>$cItem) {
			$childs = $this->__getChild($cItem->id);
			if (count($childs)){
				$contents[$i]->leaf = false;
				$contents[$i]->children = $childs;
				//TODO: Tính tổng các coi_<id> của cc con vào coi_<id> cc cha
				foreach($cItem as $field=>$value){
					if (preg_match("/coi_(\\d+)/",$field)){
						foreach($childs as $child)
							$contents[$i]->$field += $child->$field;
					}
				}
			}else{
				$contents[$i]->leaf = true;
			}
		}
		if ($content_id==0 && count($contents)) {
			$sumary = (object)[
				'id' => -1,
				'text' => 'Tổng cộng',
				'total' => $contents[0]->total,
				'leaf' => true
			];
			$fields = [];
			foreach($contents[0] as $field=>$value) {
				if (preg_match("/coi_(\\d+)/", $field)) {
					$fields[] = $field;
					$sumary->$field = 0;
				}
			}
			foreach($contents as $content){
				foreach($fields as $field){
					$sumary->$field += $content->$field;
				}
			}
			$contents[] = $sumary;
		}
		return $contents;
	}
}