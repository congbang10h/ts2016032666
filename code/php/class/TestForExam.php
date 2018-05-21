<?php
class TestForExam extends Test{
	public function moreWhere($params){
		$this->addWhere('test_review_code='.RV_APPROVED);
		$this->addWhere('NOW() BETWEEN test_start_time AND test_end_time');
	}
}