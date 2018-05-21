<?php
class CC_CO_R4TR extends DBObject{
	public function prepare($params){
		$params = $params->items[0];
		$course_id = $params->course_id;
		$test_id = $params->test_id;

		$this->query("CALL report7(?,?)",$test_id,$course_id);
		$res = $this->query('
			SELECT *
			FROM _report_7coi JOIN course_outcome_item USING(coi_id)
		')->fetchAll(PDO::FETCH_OBJ);
		$column = [];
		foreach($res as $it){
			$column[] = [
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
		$this->query('CALL report7cc2co()');
		return array(
			'success'=>1,
			'children'=>$this->__getChild(0)
		);
	}
	private function __getChild($content_id){
		$cond = $content_id ? "=$content_id" : 'IS NULL';
		$query = "SELECT A.*,B.*,course_content_id as id, course_content_name as `text`
					FROM course_content A
						JOIN _report_7cc2co B USING (course_content_id)
					WHERE course_parentcontent_id $cond";
		$contents = $this->query($query)->fetchAll(PDO::FETCH_OBJ);
		foreach ($contents as $i=>$cItem) {
			$childs = $this->__getChild($cItem->id);
			if (count($childs)){
				$contents[$i]->leaf = false;
				$contents[$i]->children = $childs;
				foreach($cItem as $field=>$value){
					if (preg_match("/(\\d+)/",$field)){
						foreach($childs as $child){
							if ($child->$field>0) {
								if ($contents[$i]->$field<0)
									$contents[$i]->$field=0;
								$contents[$i]->$field += $child->$field;
							}
						}
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
				'leaf' => true
			];
			$fields = [];
			foreach($contents[0] as $field=>$value) {
				if (preg_match("/(\\d+).*/", $field)) {
					$fields[] = $field;
					$sumary->$field = 0;
				}
			}
			foreach($contents as $content){
				foreach($fields as $field){
					if ($content->$field>0){
						$sumary->$field += $content->$field;
					}
				}
			}
			$contents[] = $sumary;
		}
		return $contents;
	}
	public function chart(){
		$this->query('CALL report7co2cc()');
		$rows = $this->query('
			SELECT coi_code,A.*
			FROM _report_7co2cc A JOIN course_outcome_item USING(coi_id)
		')->fetchAll(PDO::FETCH_OBJ);
//		$legend = false;
		$legend = array(
				'visible' => true,
				'position' => 'right'
		);
		$axes = [[
				'type'=>'Numeric',
				'position'=>'left',
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
		$fieldseries=[];
		$titleseries=[];
		$ccs = $this->query('
			SELECT course_content_id as id,course_content_code as code
			FROM _report_7cc JOIN course_content USING(course_content_id)
			WHERE course_parentcontent_id IS NULL
		')->fetchAll(PDO::FETCH_OBJ);
		foreach($ccs as $cc){
			$fieldseries[] = $cc->id;
			$titleseries[] = $cc->code;
		}
		if (count($rows)){
			foreach($rows[0] as $field=>$val){
				if (preg_match("/^\\d+$/",$field))
					$fields[] = ['name'=>$field,'type'=>'float'];
				else
					$fields[] = $field;
			}
		}
		$series = [[
				'type' => 'column',
				'axis' => 'left',
				'xField' => 'coi_code',
				'yField' => $fieldseries,
				'title' => $titleseries,
				'highlight'=> true,
				'label' => [
					'display' => 'outside',
					'field'=>$fieldseries,
					'orientation'=> 'vertical',
					'color'=> '#333'
				]
		]];
		return [
				'title' => 'Bảng thống kê',
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