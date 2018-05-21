<?php
class ExamSection extends Test_section{
	protected function _fetchFull(PDOStatement $stmt, $deep=0){
		$list = $stmt->fetchAll(PDO::FETCH_OBJ);
		$q = new Question();
		$q->clearSolutionCfg();
		foreach ($list as $key => $o) {
			$stmt = $this->query(
				"SELECT question.*\n"
				."FROM question JOIN test_question_map ON (question_id=testmode_question_id)\n"
				."WHERE test_section_id=?",
				$o->test_section_id
			);			
			$o->hasMany['Question'] = $q->_fetchFull($stmt);
		}
		return $list;
	}
}