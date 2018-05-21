<?php
class Exam extends DBObject{
	public function examRand($params)
	{
		$test_id = $params->items[0]->test_id;
		$tqm = new Test_question_map();
		$listTQM = $tqm->findAll(['test_id'=>$test_id]);
		$ts = new Taker_solution();
		$ttm = new Taker_test_map();
		for($i=0;$i<25;$i++) {
			$taker_id = $ttm->_create([
					'test_id' => $test_id,
					'taker_test_map_starttime' => date('Y-m-d'),
					'taker_test_map_endtime' => date('Y-m-d'),
			]);
			foreach ($listTQM as $q) {
				$ts->_create([
					'taker_test_map_id' => $taker_id,
					'question_id' => $q->testmode_question_id,
					'mark_max' => $q->test_question_map_score,
					'mark_cur' => rand(0, $q->test_question_map_score),
				]);
			}
		}
		return ['success'=>1];
	}

	public function prepare($params){
		$test_id = $params->items[0]->test_id;
		$user_id = Authorise::getId();
		if (!$user_id)
			throw new AException('Chưa đăng nhập');

		$testObj = new TestForExam();
		$test = $testObj->findOne(['test_id'=>$test_id]);
		if (!$test)
			throw new AException('Không có đề thi để kiểm tra');

		$takerObj = new Taker_test_map();
		$exam = $takerObj->findOne([
			'test_id' => $test_id,
			'user_id' => $user_id
		]);
		if ($exam){
			if (1) {//0==Kiểm tra thời gian và chỉ cho làm 1 lần
				if ($exam->taker_test_map_endtime < date(FORMAT_SQL_DATETIME)) {
					$mark = $this->calculMark($exam->taker_test_map_id);
					return [
						'success' => 0,
						'message' => 'Đã hết thời gian làm bài này.<br>Điểm của bạn là ' .
							"{$mark['score']}/{$mark['total']}"
					];
				}
				$endtime = DateTime::createFromFormat('Y-m-d H:i:s',
					$exam->taker_test_map_endtime);
				$remain = $endtime->diff(new DateTime())->i;//i=minute
				$exam_id = $exam->taker_test_map_id;
				$action = 'continue';
			}else{//Bỏ thời gian, luôn bắt đầu lại là test mới
				$remain = $test->test_duration;
				$endtime   = new DateTime();
				$endtime->add(new DateInterval("PT{$remain}M"));
				$exam_id = $exam->taker_test_map_id;
				$action = 'new';
				$oSol = new Taker_solution();
				$oSol->_destroy([
					'taker_test_map_id' => $exam_id
				]);
				$takerObj->_update([
					'taker_test_map_endtime'   => $endtime->format(FORMAT_SQL_DATETIME),
					'taker_test_map_id' => $exam_id
				],null,DB_CHK_NONE);
				$this->initTakerSolution($test_id,$exam_id);
			}
		}else{
			$remain = $test->test_duration;
			$starttime = new DateTime();
			$endtime   = new DateTime();
			$endtime->add(new DateInterval("PT{$remain}M"));
			$action = 'new';
			$exam_id = $takerObj->_create([
				'test_id'                  => $test_id,
				'user_id'                  => $user_id,
				'taker_test_map_starttime' => $starttime->format(FORMAT_SQL_DATETIME),
				'taker_test_map_endtime'   => $endtime->format(FORMAT_SQL_DATETIME),
				'taker_test_map_desc'      => ''
			]);
			$this->initTakerSolution($test_id,$exam_id);
		}
		$section = new ExamSection();
		$sectionList = $section->findAll(['test_id' => $test_id],null,DB_FETCH_FULL);
		return array(
			'success'=>1,
			'exam_id' => $exam_id,
			'sections' => $sectionList,
			'time_remain' => $remain,
			'action' => $action
		);
	}
	//Chuẩn bị sẵn toàn bộ rows cho mỗi câu hỏi của đề thi
	private function initTakerSolution($test_id,$taker_test_map_id)
	{
		$this->query("
			INSERT INTO taker_solution
			SELECT NULL,$taker_test_map_id,testmode_question_id,test_question_map_score,0
			FROM test_section JOIN test_question_map USING(test_section_id)
			WHERE test_id=$test_id
		");
	}
	public function start($params){
		$exam_id = $params->items[0]->exam_id;
		$takerObj = new Taker_test_map();
		$user_id = Authorise::getId();
		$exam = $takerObj->findOne([
			'taker_test_map_id' => $exam_id,
			'user_id' => $user_id
		]);
		$testObj = new Test();
		$test = $testObj->findOne(['test_id'=>$exam->test_id]);
		$remain = $test->test_duration;
		$starttime = new DateTime();
		$endtime   = new DateTime();
		$endtime->add(new DateInterval("PT{$remain}M"));
		$takerObj->_update([
			'taker_test_map_id'        => $exam_id,
			'taker_test_map_starttime' => $starttime->format(FORMAT_SQL_DATETIME),
			'taker_test_map_endtime'   => $endtime->format(FORMAT_SQL_DATETIME)
		]);
		return array(
			'success'=>1
		);
	}
	public function save($params){
		$exam_id = $params->items[0]->exam_id;
		$user_id = Authorise::getId();
		$takerObj = new Taker_test_map();
		$exam = $takerObj->findOne([
			'taker_test_map_id' => $exam_id,
			'user_id' => $user_id,
			'taker_test_map_endtime' => ['>',date(FORMAT_SQL_DATETIME)]
		]);
		if (!$exam)
			throw new AException("Bài thi #$exam_id không có hoặc hết giờ");

		$question_id = $params->items[0]->question_id;
		$solObj = new Taker_solution();
		$sol = $solObj->findOne([
			'taker_test_map_id' => $exam->taker_test_map_id,
			'question_id' => $question_id
		]);
		//TODO: Tìm vị trí lưu của taker_solution, khi lưu thì tính điểm và bổ sung điểm luôn
		$solComObj = new Takersolution_component();
		$tqm = new Test_question_map();
		$tqmItem = $tqm->findOne([
			'testmode_question_id' => $question_id,
			'test_id' => $exam->test_id
		]);
		if ($sol){
			$solid = $sol->taker_solution_id;
			$solComObj->_destroy(['taker_solution_id'=>$solid]);
		}else{
			$solid = $solObj->_create([
				'taker_test_map_id' => $exam->taker_test_map_id,
				'question_id' => $question_id,
				'mark_max' => $tqmItem->test_question_map_score
			]);
		}
		foreach ($params->items[0]->solution as $item){
			$solcfg = ['taker_solution_id'=>$solid];
			if (isset($item->fill_value)){
				$solcfg['fill_value'] = $item->fill_value;
			}
			if (isset($item->curr_item_id)){
				$solcfg['curr_item_id'] = $item->curr_item_id;
			}
			if (isset($item->next_item_id)){
				$solcfg['next_item_id'] = $item->next_item_id;
			}
			$solComObj->_create($solcfg);
		}

		$this->getQuestionMark($question_id,$solid, $tqmItem->test_question_map_score);

		return array(
			'success'=>1
		);
	}
	public function finish($params){
		$exam_id = $params->items[0]->exam_id;
		$user_id = Authorise::getId();
		$takerObj = new Taker_test_map();
		$exam = $takerObj->findOne([
			'taker_test_map_id' => $exam_id,
			'user_id' => $user_id
		]);
		if (!$exam)
			throw new AException("Bài thi #$exam_id không có hoặc hết giờ");

		$takerObj->_update([
			'taker_test_map_id' => $exam_id,
			'taker_test_map_endtime' => date(FORMAT_SQL_DATETIME)
		],null,DB_CHK_NONE);

		$mark = $this->calculMark($exam_id);
		return array(
			'success'=>1,
			'mark' => $mark['score'],
			'total' => $mark['total']
		);
	}
	public function calculMark($exam_id){
		$sql = <<<SQL
SELECT SUM(mark_max) AS total,SUM(mark_cur) AS score
FROM taker_solution
WHERE taker_test_map_id=$exam_id
GROUP BY taker_test_map_id
SQL;
		$sum = $this->query($sql)->fetchObject();

		return ['total'=>$sum->total,'score'=>$sum->score?$sum->score:0];
	}
	//TODO: Viết hàm import ds điểm vào table take_solution để có dữ liệu thống kê
	public function getQuestionMark($question_id, $taker_id, $max)
	{
		$q = (new Question())->findOne(['question_id'=>$question_id]);
		$aList = DBObject::query(<<<SQL
SELECT curr_item_id,next_item_id,fill_value
	FROM takersolution_component A
	WHERE taker_solution_id={$taker_id}
SQL
		)->fetchAll(PDO::FETCH_OBJ);
		$sList = DBObject::query(<<<SQL
SELECT curr_item_id,next_item_id,B.fillable_element_answer as fill_value
	FROM qsolution_component A
		JOIN qsolution USING(qsolution_id)
		LEFT JOIN fillable_element B ON (A.fill_element_id=B.fillable_element_id)
	WHERE question_id={$question_id}
SQL
		)->fetchAll(PDO::FETCH_OBJ);
		$TypeDict = [//get from table question_type_dict
			1 => 'Choice',
			2 => 'Fill',
			3 => 'Order',
			4 => 'Match'
		];
		$score = 0;
		if (isset($TypeDict[$q->question_type_id])) {
			$method = 'compare' . $TypeDict[$q->question_type_id];
			if (method_exists($this, $method) && $this->$method($aList, $sList)) {
				$score = $max;
			}
		}
		(new Taker_solution())->_update([
			'taker_solution_id' => $taker_id,
			'mark_cur' => $score
		],null,DB_CHK_NONE);
	}
	public function compareChoice($a,$b){
		foreach($a as $i=>$ai){
			foreach($b as $j=>$bj)
				if ($ai->curr_item_id==$bj->curr_item_id){
					unset($a[$i]);
					unset($b[$j]);
				}
		}
		return count($a)==count($b);
	}
	public function compareFill($a,$b){
		foreach($a as $i=>$ai){
			if ($ai->fill_value==$b[$i]->fill_value){
				unset($a[$i]);
				unset($b[$i]);
			}
		}
		return count($a)==count($b);
	}
	public function compareMatch($a,$b){
		foreach($a as $i=>$ai){
			foreach($b as $j=>$bj)
				if ($ai->curr_item_id==$bj->curr_item_id && $ai->next_item_id==$bj->next_item_id){
					unset($a[$i]);
					unset($b[$j]);
				}
		}
		return count($a)==count($b);
	}
	public function compareOrder($a,$b){
		foreach($a as $i=>$ai){
			if ($ai->curr_item_id!=$b[$i]->curr_item_id){
				return 0;
			}
		}
		return 1;
	}
}