<?php
/**
type: 'Choice',
id: 0,
description: '<p>Giải thuật Quicksort có độ phức tạp là</p>',
item:[{
	id: 1,
	face: '<p>O(1)</p>'
},{
	id: 2,
	face: '<p>O(n)</p>'
},{
	id: 4,
	face: '<p>O(n<sup>2</sup>)</p>'
},{
	id: 5,
	face: '<p>O(nlogn)</p>',
	choice: true
}],
info:{
	name: 'Độ phức tạp của Quicksort',
	multichoice: 0,
	random: 1
}
 * 
 * 
 */
class QuestionTypeChoice{
	public function prepareQuestion(&$q){
		
	}
	public function getRefMedia($q){
		$refs = array(&$q->description);
		for($i=count($q->item)-1;$i>=0;$i--){
			if (preg_match("/data\\//", $q->item[$i]->face))
				$refs[] = &$q->item[$i]->face;
		}
		return $refs;
	}
	public function saveChild($q){
		$qsolution = new Qsolution();
		$sid = $qsolution->_create((object)[
			'question_id' => $q->id
		]);
		$qcom = new Qsolution_component();
		$qitem = new Question_item();
		foreach($q->item as $idx=>&$it){
			$item = (object)[
				'question_id' => $q->id,
				'item_desc' => $it->face,
				'item_order' => $idx,
				'item_code' => $idx
			];
			$itid = $qitem->_create($item);
			if (isset($q->solution->$idx) && $q->solution->$idx==1){
				$qcom->_create((object)[
					'qsolution_id' => $sid,
					'curr_item_id' => $itid
				]);
			}
		}
	}
}