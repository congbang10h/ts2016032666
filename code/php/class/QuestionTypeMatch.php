<?php
/**
type: 'Match',
id: 0,
description: 'Liên kết thiết bị và chức năng',
group:[{
	item:[{
		id: 1,
		face: '<p>Màn hình</p>'
	},{
		id: 2,
		face: '<p>Bàn phím</p>'
	},{
		id: 3,
		face: '<p>Đĩa cứng</p>'
	},{
		id: 4,
		face: '<p>RAM</p>'
	}],
	solution:[{
		curr_id: 1,
		next_id: 7
	},{
		curr_id: 2,
		next_id: 8
	},{
		curr_id: 3,
		next_id: 6
	},{
		curr_id: 4,
		next_id: 5
	}]
},{
	item:[{
		id: 5,
		face: '<p>Bộ nhớ để xử lý</p>'
	},{
		id: 6,
		face: '<p>Lưu trữ thông tin</p>'
	},{
		id: 7,
		face: '<p>Hiển thị</p>'
	},{
		id: 8,
		face: '<p>Nhập dữ liệu</p>'
	}],
	solution:[]
}],
info: {
	name: 'Ví dụ câu hỏi liên kết',
	multimatch: 0,
	random: 1
}
 */
class QuestionTypeMatch{
	public function prepareQuestion(&$q){
	}
	public function getRefMedia($q){
		$refs = array(&$q->description);
		foreach($q->group as &$ls){
			foreach($ls as &$it){
				if ($it && isset($it->face) && preg_match("/data\\//", $it->face))
					$refs[] = &$it->face;
			}
		}
		return $refs;
	}
	public function saveChild($q){
		$map = [];
		$qsolution = new Qsolution();
		$sid = $qsolution->_create([
			'question_id' => $q->id
		]);
		$qcom = new Qsolution_component();
		$qitem = new Question_item();
		foreach($q->group as $gid=>$group){
			foreach($group->item as $iid=>$it){
				$map[$it->id] = $qitem->_create([
					'question_id' => $q->id,
					'item_code' => $gid,
					'item_desc' => $it->face,
					'item_order' => $iid
				]);
			}
		}
		foreach($q->group as $group){
			foreach($group->solution as $s){
				$qcom->_create([
					'qsolution_id' => $sid,
					'curr_item_id' => $map[$s->curr_id],
					'next_item_id' => $map[$s->next_id]
				]);
			}
		}
	}
}