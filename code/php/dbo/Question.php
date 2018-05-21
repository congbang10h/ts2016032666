<?php
//ID: 8e09522173d4ef9bd712d0d88ce2c7a5
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
class Question extends DBObject{
	protected $_table = 'question';
	protected $_title = '';
	protected $_fields = [
		'question_id'       => [DBO_AUTO, 'question_id', NULL],
		'question_type_id'  => [DBO_NUMB, 'question_type_id', NULL],
		'user_id'           => [DBO_NUMB, 'user_id', NULL],
		'bloom_level_id'    => [DBO_NUMB, 'bloom_level_id', NULL],
		'question_desc'     => [DBO_STRI, 'question_desc', NULL],
		'question_in_test'  => [DBO_NUMB, 'question_in_test', '0'],
		'course_id'         => [DBO_NUMB, 'course_id', NULL],
		'course_content_id' => [DBO_NUMB, 'course_content_id', NULL],
		'qgroup_id'         => [DBO_NUMB, 'qgroup_id', NULL],
		'difficulty'        => [DBO_NUMB, 'difficulty', NULL],
		'discrimination'    => [DBO_NUMB, 'discrimination', NULL]
	];
	protected $_pkey = 'question_id';
	protected $_fkeys = [//class=[fkey]
			'User'               => ['user_id'],
			'Bloom_level'        => ['bloom_level_id'],
			'Question_type_dict' => ['question_type_id'],
			'Course'             => ['course_id'],
			'Course_content'     => ['course_content_id'],
			'Question_group'     => ['qgroup_id']
		];
	protected $_hasRef = [//class=[fkey]
			'Qco_map'                => ['question_id'],
			'Qgroup_question_map'    => ['question_id'],
			'Qsolution'              => ['question_id'],
			'Question_access_mode'   => ['question_id'],
			'Question_comment'       => ['question_id'],
			'Question_content_map'   => ['question_id'],
			'Question_info'          => ['question_id'],
			'Question_item'          => ['question_id'],
			'Question_taker_comment' => ['question_id'],
			'Question_topic_map'     => ['question_id'],
			'Taker_solution'         => ['question_id'],
			'Test_question_map'      => ['editmode_question_id','testmode_question_id']
		];
	protected $_validations = [
		['type' => 'presence',
			'field' => 'question_type_id',
			'message' => 'Chưa nhập thông tin [question_type_id]'],
		['type' => 'presence',
			'field' => 'bloom_level_id',
			'message' => 'Chưa nhập thông tin [bloom_level_id]'],
		['type' => 'length',
			'field' => 'question_desc',
			'message' => 'Thông tin [question_desc] dài hơn 65535 ký tự',
			'max' => 65535]
	];
//<ZoneC
	protected $_hasMany = ['Qsolution','Question_info','Question_item'];
	protected $_jfields	= [
		'User'=>['user_first_name','user_last_name'],
		'Question_type_dict'=>['question_type_code'],
		'Bloom_level'        => ['bloom_level_desc'],
	];
	public function verifyAuthorize($id=0,$action='read'){
		//Do đã sử dụng moreWhere nên khi read không kiểm tra nữa
		if ($action!='read')
			parent::verifyAuthorize($id,$action);
	}
	public function moreWhere($params){
		//Sử dụng khi read
	}
	protected function _clearFolder(){
		unset($_SESSION[APP_ID]['questionfolder']);
	}
	protected function _getFolder($qid){
		if ($qid)
			return APP_DATA."media/question/$qid/";
		$base = APP_DATA.'media/question/';
		if (!isset($_SESSION[APP_ID]['questionfolder'])){
			$fpath = VXFile::tempdir($base,'question');
			if ($fpath)
				$_SESSION[APP_ID]['questionfolder'] = $fpath.'/';
			else
				throw new AException("Không thể tạo folder trong $base");
		}
		return $_SESSION[APP_ID]['questionfolder'];
	}
	protected function _saveAllMedia($dir,$saving,$refs){
		$baselen = strlen(APP_DATA);
		$reflen  = count($refs);
		$nfile = 0;

		//Copy media file
		$pattern = '/data\/media\/[^\"]+/';
		for($i=0;$i<$reflen;$i++){
			$content = $refs[$i];
			while(preg_match($pattern, $content, $match)){
				$nfile++;
				$media = $match[0];
				$content = str_replace($media, '', $content);
				$fname = basename($media);
				$newname = $saving.$fname;
				if (is_file($newname))
					continue;
				@copy($dir.$fname,$newname);
				if (!is_file($newname))
					throw new AException('Không thể tạo file '.$newname,3010);
			}
		}
		//Copy tmp file
		$pattern = '/data\/tmp\/[^\"]+/';
		for($i=0;$i<$reflen;$i++){
			while(preg_match($pattern, $refs[$i], $match)){
				$nfile++;
				$media = $match[0];
				$oldname = APP_DATA.substr($media, 5);//5=strlen('data/')
				$ext = pathinfo($media,PATHINFO_EXTENSION);
				$newname = VXFile::tempname($saving, $ext);
				$refname = 'data/'.str_replace(
					'/_/','/',
					substr($newname, $baselen)
				);
				@copy($oldname,$newname);
				if (!is_file($newname))
					throw new AException('Không thể tạo file '.$newname,3010);
				for($j=$i;$j<$reflen;$j++)
					$refs[$j]= str_replace($media, $refname, $refs[$j]);
			}
		}
		return $nfile;
	}
	protected function _saveMe($q, $quesdir){
		$uid = Authorise::getId();
		$rec = (object)[
			'course_id' => empty($q->course_id)?null:$q->course_id,
			'course_content_id' => empty($q->course_content_id)?null:$q->course_content_id,
			'question_desc' => $q->description,
			'question_type_id' => $q->question_type_id,
			'bloom_level_id' => $q->bloom_level_id
		];
		//Save question
		if ($q->id){
			$rec->question_id = $q->id;
			parent::_update($rec);
		}else{
			$rec->user_id = $uid;
			$rec->question_in_test = 0;
			$q->id = parent::_create($rec);
		}

		//Check media
		if ($quesdir != "{$q->id}/" && preg_match("/data\\/tmp\\//", $q->description)){
			$desc = str_replace(
				"media/question/$quesdir", 
				"media/question/{$q->id}/",
				$q->description);
			parent::_update((object)[
				'question_desc' => $desc,
				'question_id' => $q->id
			]);
		}
		//Save info
		$qinfo = new Question_info();
		foreach($q->info as $name=>$value){
			$qinfo->_create((object)[
				'question_id' => $q->id,
				'question_info_prop' => $name,
				'question_info_value' => $value
			]);
		}
		return $q->id;
	}
	protected function _changeRefMedia($refs,$quesdir,$qid){
		if ($quesdir=="$qid/") return;
		unset($refs[0]);//Da xu ly q->description
		foreach($refs as &$desc){
			$desc = str_replace(
				"media/question/$quesdir", 
				"media/question/$qid/",
				$desc
			);
		}
	}
	public function _updateMapping($params){
		parent::_update($params,null,DB_CHK_NONE);
	}
	public function _update($params,$opts=null,$flag=DB_CHK_FULL){
		//TODO: Kiem tra quyen update cau hoi
		$q = $this->findOne(['question_id'=>$params->id]);
		if ($q && $q->question_in_test)
			throw new AException('Không thể sửa câu hỏi đã đưa vào bài kiểm tra');
		$this->_save($params);
	}
	public function _create($params,$opts=null){
		//TODO: Kiem tra quyen create cau hoi
		$this->_save($params);
	}

	/**
	 * SAVE QUESTION ALGORITHM
	 * folder = getCurrentFolder($q->id)
	 * clearFolder(folder/saving)
	 * foreach HTML field as fieldcontent
	 *        - copy media to folder/saving
	 *        - change fieldcontent by link to folder
	 * BEGIN
	 *    destroy childs from $q->id
	 *    save question & info
	 *    $qid = $q->id or lastit()
	 *    save childs
	 *    COMMIT
	 *    clear folder
	 *    move folder/saving to folder
	 *    clearFolder()
	 * CATCH{
	 *    ROLLBACK
	 *    clear folder/saving
	 * }
	 * @param $q
	 * @return array
	 * @throws AException
	 */
	public function _save($q){
		if (!isset($q->type))
			throw new AException('Tham số thiếu question_type');
		$basedir = APP_DATA.'media/question/';
		$fulldir = $this->_getFolder($q->id);
		$quesdir = substr($fulldir, strlen($basedir));
		$saving = $fulldir.'_/';
		@mkdir($saving,0700,true);
		if (!is_dir($saving))
			throw new AException('Không thể tạo folder '.$saving);
		switch($q->type){
			case 'Choice':
				$cname = new QuestionTypeChoice();break;
			case 'Fill':
				$cname = new QuestionTypeFill();break;
			case 'Match':
				$cname = new QuestionTypeMatch();break;
			case 'Order':
				$cname = new QuestionTypeOrder();break;
			default:
				throw new AException('Hiện tại chưa hỗ trợ kiểu câu hỏi '.$q->type);
		}
		$refs = $cname->getRefMedia($q);
		$nfile = $this->_saveAllMedia($fulldir,$saving,$refs);
		$this->begin();
		try{
			$this->_destroyChild($q->id, 0);
			$this->_prepare($q);
			$cname->prepareQuestion($q);
			$q->id =  $this->_saveMe($q, $quesdir);
			$this->_changeRefMedia($refs,$quesdir,$q->id);
			$cname->saveChild($q);
			$this->commit();
			VXFile::cleanDir($fulldir);
			VXFile::moveDir($saving,$fulldir);
			@rmdir($saving);
			if (!$nfile)
				@rmdir($fulldir);
			else if ($quesdir!="{$q->id}/")
				@rename($fulldir, $basedir.$q->id);
			$this->_clearFolder();
		}catch(Exception $e){
			$this->rollback();
			@rmdir($saving);
			throw new AException($e->getMessage());
		}
		return array(
			'success'=>1
		);
	}
	protected function _prepare(&$q){
		//Convert type
		$qt = new Question_type_dict();

		$type = $qt->findOne(['question_type_code'=>$q->type]);
		if (!$type)
			throw new AException('Hiện tại chưa hỗ trợ kiểu câu hỏi '.$q->type);
		$q->question_type_id = $type->question_type_id;
	}
	public function _duplicate($rq,$opts=null,$values=[]){
		if (!is_object($rq))
			$rq = (object)$rq;
		$uid = Authorise::getId();
		//TODO: Kiem tra quyen clone
		//1. SELECT info from question
		$q = $this->findOne(['question_id'=>$rq->question_id]);

		if (!$q)
			throw new AException("Không thấy câu hỏi có id={$rq->question_id}");
		$id1 = $q->question_id;

		//2. Insert a new question row ->newid
		$q->user_id = $uid;
		$q->question_id = 0;
		$q->question_in_test = isset($rq->question_in_test)?$rq->question_in_test:0;
		$id2 = parent::_create($q);

		//3. Change resource id in question_desc, if changed then update
		$mediascr = "data/media/question/{$id1}/";
		$mediadst = "data/media/question/{$id2}/";
		if (is_dir(APP_DATA."media/question/{$id1}")){
			mkdir(APP_DATA."media/question/{$id2}");
			VXFile::copyDir(
				APP_DATA."media/question/{$id1}",
				APP_DATA."media/question/{$id2}"
			);
			$desc = str_replace($mediascr, $mediadst, $q->question_desc);
			if ($desc != $q->question_desc){
				parent::_update((object)[
					'question_desc' => $desc,
					'question_id' => $id2
				]);
			}
		}

		//4. Clone question_info
		$qinfo = new Question_info();
		$listinfo = $qinfo->findAll(['question_id'=>$id1]);
		foreach($listinfo as $info){
			$info->question_id = $id2;
			$qinfo->_create($info);
		}

		//5. Clone question_item + question_item_info
		$opts = (object)['withchild'=>0,'checkauthorize'=>0,'checkexists'=>0];
		$itemmap = [];
		$fillmap = [];
		$qitem = new Question_item();
		$fillObj = new Fillable_element();
		$listitem = $qitem->findAll(['question_id'=>$id1]);
		foreach($listitem as $item){
//			Console::log(var_export($item,1));
			$iid = $item->item_id;
			$itemmap[$iid] = $qitem->_duplicate($item,$opts,[
				'question_id' => $id2,
				'item_desc' => str_replace($mediascr, $mediadst, $item->item_desc)
			]);
			$fillList = $fillObj->findAll(['item_id'=>$iid]);
			foreach($fillList as $fillItem){
				$fillmap[$fillItem->fillable_element_id] = $fillObj->_duplicate(
					$fillItem,
					$opts,
					['item_id' => $itemmap[$iid]]
				);
			}
		}
				
		//6. Clone question_solution
		$qsol = new Qsolution();
		$qsi  = new Qsolution_component();
		$listsol = $qsol->findAll(['question_id'=>$id1]);
		$spkey = $qsol->getPrimaryKey();
		foreach($listsol as $solution){
			$sOldId = $solution->$spkey;
			$sNewId = $qsol->_duplicate($solution,$opts,[
				'question_id'=>$id2
			]);
			$listSolItem = $qsi->findAll(['qsolution_id'=>$sOldId]);
			foreach($listSolItem as $sItem){
				$sItem->qsolution_id = $sNewId;
				if ($sItem->curr_item_id)
					$sItem->curr_item_id = $itemmap[$sItem->curr_item_id];
				if ($sItem->next_item_id)
					$sItem->next_item_id = $itemmap[$sItem->next_item_id];
				if ($sItem->fill_element_id)
					$sItem->fill_element_id = $fillmap[$sItem->fill_element_id];
				$qsi->_create($sItem);
			}
		}
		//7. Clone Qco_map
		$qco = new Qco_map();
		$listQCO = $qco->findAll(['question_id'=>$id1]);
		foreach($listQCO as $qcoi){
			$qco->_duplicate($qcoi,$opts,['question_id'=>$id2]);
		}
		return $id2;
	}
	protected function beforeDestroy($params,$opts=null){
//		$uid = Authorise::getId();
		//throw new AException('Không có quyền xóa câu hỏi này');
	}
	protected function afterDestroy($params,$opts=null){
		$dir = APP_DATA."media/question/{$params->question_id}";
		if (is_dir($dir)){
			foreach(glob($dir."/*") as $name)
				unlink($name);
			rmdir($dir);
		}
	}
	protected function _share($item,$opts){
		if ($item && $opts){}
		//TODO:Không phải onwer, kiểm tra có được quyền share không
		throw new AException('Không có quyền share câu hỏi này');
	}
	public function share($params){
		try{
			$this->begin();
			foreach ($params->items as $item){
				$this->_share($item,$params->params);
			}
		    $this->commit();
		    return array(
				'success'=>1
			);
		}catch (Exception $e){
			$this->rollback();
			throw $e;
		}
	}

	/**
	 *	Xóa Qsolution trong kết quả của Question khi fetchFull
	 */
	public function clearSolutionCfg(){
		unset($this->_hasRef['Qsolution']);
		//Đọc kết quả đang làm
		//$this->_hasMany[] = 'Taker_solution';
	}
//ZoneC>
}