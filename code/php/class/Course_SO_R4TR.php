<?php
class Course_SO_R4TR extends DBObject{
	public function prepare($params){
		$params = $params->items[0];
//		$course_id = $params->course_id;
		$edu_program_id = $params->edu_program_id;

		$this->query("CALL report9(?)",$edu_program_id);
		$query = "SELECT A.*
			FROM _report_9soi
				JOIN student_outcome_item A USING(soi_id)
			";
		$res = $this->query($query)->fetchAll(PDO::FETCH_OBJ);
		$column = [];
		foreach($res as $it){
			$column[] = [
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
		$this->query('CALL report9course2soi()');
		$query = "SELECT A.*,B.*
					FROM course A
						JOIN _report_9course2soi B USING (course_id)";
		$contents = $this->query($query)->fetchAll(PDO::FETCH_OBJ);
		return array(
				'success'=>1,
				'rows'=>$contents,
				'total'=>count($contents)
		);
	}
	public function chart(){
		$this->query('CALL report9soi2course()');
		$rows = $this->query('
			SELECT soi_code,A.*
			FROM _report_9soi2course A JOIN student_outcome_item USING(soi_id)
		')->fetchAll(PDO::FETCH_OBJ);
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
				'fields' => ['soi_code'],
				'title' => 'Chuẩn đầu ra SV',
		]];
		$fields = ['soi_code'];
		$series = [];
		$list = $this->query('
			SELECT course_id as id,course_code as code
			FROM _report_9course JOIN course USING(course_id)
		')->fetchAll(PDO::FETCH_OBJ);
		foreach($list as $it){
			$type = ChartLine::get();
			$series[] = [
					'type' => 'line',
					'axis' => 'left',
					'xField' => 'soi_code',
					'yField' => $it->id,
					'title' => $it->code,
					'highlight'=> [
							'size' => 7,
							'radius'=>7
					],
					'markerConfig'=> [
							'type'=> $type['type'],
							'fill'=> $type['color'],
							'size'=> 4,
							'radius'=> 4,
							'stroke-width'=> 0
					]
			];
		}
		if (count($rows)){
			foreach($rows[0] as $field=>$val){
				if (preg_match("/^\\d+$/",$field))
					$fields[] = ['name'=>$field,'type'=>'float'];
			}
		}
		return [
				'title' => 'Tỷ lệ đạt theo Môn học - Chuẩn đầu ra Sinh viên',
				'success' => 1,
				'legend' => $legend,
				'axes' => $axes,
				'series' => $series,
				'fields' => $fields,
				'items' => $rows,
				'cfg' => ['percent'=>1]
		];
	}
	public function chartdetail($params){
		$params = $params->items[0];
		$course_id = $params->course_id;

		$this->query('CALL report9soi2course()');
		$rows = $this->query('
			SELECT soi_code,A.*
			FROM _report_9soi2course A JOIN student_outcome_item USING(soi_id)
		')->fetchAll(PDO::FETCH_OBJ);
		$legend = false;
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
				'fields' => ['soi_code'],
				'title' => 'Chuẩn đầu ra SV',
		]];
		$fields = ['soi_code'];
		$series = [];
		$name = '';
		$list = $this->query("
			SELECT course_id as id,course_code as code,course_name_vn as name
			FROM _report_9course JOIN course USING(course_id)
			WHERE course_id=$course_id
		")->fetchAll(PDO::FETCH_OBJ);
		foreach($list as $it){
			$type = ChartLine::get();
			$series[] = [
				'type' => 'column',
				'axis' => 'left',
				'xField' => 'soi_code',
				'yField' => $it->id,
				'title' => $it->code,
				'highlight'=> true,
				'label' => [
					'display' => 'outside',
					'field'=>$it->id,
					'orientation'=> 'vertical',
					'color'=> '#333'
				]
			];
			$name = $it->name;
		}
		if (count($rows)){
			foreach($rows[0] as $field=>$val){
				if (preg_match("/^\\d+$/",$field))
					$fields[] = ['name'=>$field,'type'=>'float'];
			}
		}
		return [
				'title' => "Tỷ lệ đạt theo Môn học $name - Chuẩn đầu ra Sinh viên",
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