<?php
class QuestionAnalyze extends Question{
	public function __construct(){
		$this->_table = '_tmp'.date('Y').'_questionanalyze_'.session_id();
		parent::__construct();
	}

	public function prepare($params){
		$params = $params->items[0];
		DBObject::query(
			"CALL analyzeQuestion(?,?)",
				$params->test_id,
				$this->_table
			);
		return [
			'success'=>1
		];
	}

	public function read($params){
		try{
			DBObject::query("SELECT * FROM {$this->_table} LIMIT 1");
		}catch (Exception $e){
			return [
				'success'=>1,
				'total'=>0,
				'rows'=>[]
			];
		}
		return parent::read($params);
	}
}