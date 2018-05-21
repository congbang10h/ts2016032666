<?php
/**
	type: 'Order',
	id: 0,
	description: '<p>Thay đổi thứ tự độ phức tạp từ tốt nhất đến xấu</p>',
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
		face: '<p>O(2<sup>n</sup>)</p>'
	}],
	info:{
		name: 'Thứ tự tốt xấu của độ phức tạp'
	}
 */
class QuestionTypeOrder{
	public function prepareQuestion(&$q){
	}
	public function getRefMedia($q){
		$refs = array(&$q->description);
		for($i=count($q->item)-1;$i>=0;$i--){
			if (preg_match("/data\//", $q->item[$i]->face))
				$refs[] = &$q->item[$i]->face;
		}
		return $refs;
	}
	public function saveChild($q){
		$qsolution = new Qsolution();
		$sid = $qsolution->_create([
			'question_id' => $q->id
		]);
		$qcom = new Qsolution_component();
		$qitem = new Question_item();
		foreach($q->item as $i=>$it){
			$itemId = $qitem->_create([
				'question_id' => $q->id,
				'item_desc' => $it->face,
				'item_order' => $i,
				'item_code' => $i
			]);
			$qcom->_create([
				'qsolution_id' => $sid,
				'curr_item_id' => $itemId
			]);
		}
	}
}