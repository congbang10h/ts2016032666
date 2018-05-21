<?php
/**
type: 'Fill',
id: 0,
description: '<p>Chào bạn {abc}!</p><p>Hôm nay trời {xyz} đấy!' +
		'</p><p>Làm việc vui vẻ nhé!</p>',
item:[{
	id: 'abc',
	face: '<p>Tên bạn</p>',
	value: 'Trâm'
},{
	id: 'xyz',
	face: '<p>Thời tiết</p>',
	value: '@đẹp/nắng/mưa'
}],
info:{
	name: 'Ví dụ câu hỏi điền chỗ trống',
	random: 1
}
 */
class QuestionTypeFill{
	public function prepareQuestion(&$q){
		$desc = $q->description;
		foreach ($q->item as $id=>&$it){
			$id = $id+1;
			$desc = str_replace('{'.$it->id.'}', '{'.$id.'}', $desc);
			//$it->id = $id-1;
		}
		$q->description = $desc;
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
		$sid = $qsolution->_create([
			'question_id' => $q->id
		]);
		$qcom = new Qsolution_component();
		$qitem = new Question_item();
		$fillEl = new Fillable_element();
		foreach($q->item as $i=>$it){
			$itid = $qitem->_create([
				'question_id' => $q->id,
				'item_code' => $i+1,
				'item_desc' => $it->face,
				'item_order' => $i
			]);
			$values = preg_split("/\\//",$it->value,-1,PREG_SPLIT_NO_EMPTY);
			$fillAnswer = 0;
			foreach($values as $val){
				if ($val[0]=='@')
					$val=substr($val,1);
				$fId = $fillEl->_create([
					'item_id' => $itid,
					'fillable_element_code' => $i,
					'fillable_element_answer' => $val
				]);
				if ($q->solution->{$it->id}==$val)
					$fillAnswer = $fId;
			}
			if (!$fillAnswer)
				throw new AException('Chưa xác định đáp án');
			$qcom->_create([
				'qsolution_id' => $sid,
				'curr_item_id' => $itid,
				'fill_element_id' => $fillAnswer
			]);
		}
	}
}