<?php
function isName($s){
	return preg_match("/^[a-z_][a-z_0-9.]+$/i",$s);
}

//TODO: ONE field PRIMARY KEY
class DBObject{
	private static $__isInTransaction = 0;
	private static $__countUsingDb = 0;
	private static $__localcfg = 0;
	protected static $_db	= null;
	
	protected $_table	= null;
	protected $_title	= null;
	protected $_fields	= array(
		//'field' => array(type,title,default)
	);
	protected $_pkey	= 'id';
	protected $_fkeys	= array(
		//'classname'=>array('foreign key','primary key')
	);
	
	//Các field sẽ được select khi join để lấy dữ liệu, thiết lập bằng tay
	//fielddef = * | fieldname[:functname][=newname]
	//fieldname: tên field sẽ select thêm
	//functname: hàm SQL có 1 tham số là fieldname
	//newname: tên field mới được alias
	protected $_jfields	= array(
		//'classname'=>array('fielddef1','fielddef2',...)
	);
		
	//Các validation tự động
	//Được thực hiện khi update hoặc create dữ liệu
	//type = {email, exclusion, format, inclusion, length, presence}
	//ext             list      matcher  list      min,max     
	protected $_validations = array(
		//array('type','field','message','ext')
	);
	
	//Các validation thêm bằng tay
	//Định dạng giống $_validations
	protected $_validationm = array(
		//array('type','field','message','ext')
	);
	
	protected $_hasRef = array(//class=[fkey=>pkey
	);
	//Chỉ định lớp này có các lớp con
	//Mỗi khi lớp này cần create/update/destroy sẽ thay đổi cả lớp con
	protected $_hasMany   = array(
		//classname1,classname2
	);
	
	protected $_aSelect	= array();
	protected $_aOrder	= array();
	protected $_aLJoin	= array();//Left join
	protected $_aJoin	= array();//Inner join
	protected $_aWhere	= array();
	protected $_mediafields = null;//array()
	private $__isChild;
	
	public function __construct($isChild=0){
		self::connect();
		$this->__isChild = $isChild;
	}
	protected static function connect(){
		if (!self::$__countUsingDb){
			@self::$_db = new PDO('mysql:host='.DB_HOST.';dbname='.DB_NAME.
					';charset=utf8',DB_USER,DB_PASS);
		}
		self::$__countUsingDb++;
	}
	public function begin(){
		if ($this->__isChild) return false;
		if (!self::$__isInTransaction && self::$_db)
			self::$__isInTransaction = self::$_db->beginTransaction();
		return self::$__isInTransaction;
	}
	public function commit(){
		if ($this->__isChild) return false;
		if (self::$__isInTransaction)
			self::$__isInTransaction = !self::$_db->commit();
		return !self::$__isInTransaction;
	}
	public function rollback(){
		if ($this->__isChild) return false;
		if (self::$__isInTransaction)
			self::$__isInTransaction = !self::$_db->rollBack();
		return !self::$__isInTransaction;
	}
	public function getPrimaryKey(){
		return $this->_pkey;
	}
	public function getFields(){
		$r = array();
		foreach ($this->_fields as $fname=>$fa)
			$r[] = $fname;
		return $r;
	}

	private function __analyzeFilter($filters,&$conds,&$binds){
		static $od = array('=','>','>=','<','<=','!=','<>');
		$conds = [];
		$binds = [];
		foreach($filters as $property=>$filter){
			if (isset($this->_fields[$property]))
				$property = "`$this->_table`.`$property`";
			elseif (strpos($property,'.')===false)
				$property = "`$property`";
			if (is_null($filter))
				$conds[] = "$property IS NULL";
			elseif (is_scalar($filter)) {
				$conds[] = "$property=?";
				$binds[] = $filter;
			}elseif (is_array($filter) && count($filter)==2){
				$op = $filter[0];
				if (!in_array($op,$od)) continue;
				if (is_scalar($filter[1])){
					$conds[] = "$property$op?";
					$binds[] = $filter[1];
				}
			}
		}
	}

	/**
	 * @param $filters array of filter like property=>[op,value] or property=>value
	 * 	op in {'=','>','>=','<','<=','!=','<>'}
	 * @return mixed
	 * 	+ false for not found
	 * 	+ object for a record found
	 * 	+ array list record found
	 * @throws DBException
	 */
	public function findOne($filters){
		$this->__analyzeFilter($filters,$this->_aWhere,$binds);
		$this->_buildJoin();
		$stmt = $this->query($this->_buildQuery().' LIMIT 1',$binds);
		return $stmt->fetch(PDO::FETCH_OBJ);
	}

	/**
	 * @param $filters array of filter like property=>[op,value] or property=>value
	 *    op in {'=','>','>=','<','<=','!=','<>'}
	 * @param $order string/string[] field and order need to sort
	 * @param int $fetchtype
	 * @return mixed + false for not found
	 * + false for not found
	 * + object for a record found
	 * + array list record found
	 * @throws DBException
	 */
	public function findAll($filters, $order=null, $fetchtype=DB_FETCH_SIMPLE){
		$this->__analyzeFilter($filters,$this->_aWhere,$binds);
		$this->_buildJoin();
		if ($order){
			if (is_array($order))
				$this->_aOrder = $order;
			else $this->_aOrder[] = $order;
		}
		$stmt = $this->query($this->_buildQuery(),$binds);
		if ($fetchtype==DB_FETCH_SIMPLE)
			return $stmt->fetchAll(PDO::FETCH_OBJ);
		return $this->_fetchFull($stmt);
	}
	/**
	 * @param $filters array of filter like property=>[op,value] or property=>value
	 * 	op in {'=','>','>=','<','<=','!=','<>'}
	 * @return int Number row
	 * @throws DBException
	 */
	public function countAll($filters){
		$this->__analyzeFilter($filters,$this->_aWhere,$binds);
		$this->_buildJoin();
		$stmt = $this->query(
			$this->_buildTotal(),
			$binds
		);
		return intval($stmt->fetchColumn());
	}
	public function getTable(){
		return $this->_table;
	}
	public function getTitle(){
		return $this->_title;
	}
	public function recycle($params){
		$params->recycle = true;
		return $this->read($params);
	}
	public function read($params){
		list($total,$results) = $this->_read($params);
		if(method_exists($this, 'afterread'))
			$this->afterread($results,$params);

		return array(
			'success'=>1,
			'total'=>$total,
			'rows'=>$results
		);
	}
	public function update($params)	{
		try{
			$this->begin();
			foreach ($params->items as $rec)
	    		$this->_update($rec,$params->params);
	        $this->commit();
		    return array(
				'success'=>1
			);
		}catch (Exception $e){
			$this->rollback();
			throw $e;
		}
	}
	public function destroy($params){
		try{
			$this->begin();
			foreach ($params->items as $rec) {
				$this->_destroy((object)[
					$this->_pkey => $rec->{$this->_pkey}
				], $params->params);
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
	public function duplicate(stdClass $params){
		try{
			$this->begin();
			foreach ($params->items as $rec)
		    	$this->_duplicate($rec,$params->params);
		    $this->commit();
		    return array(
				'success'=>1
			);
		}catch (Exception $e){
			$this->rollback();
			throw $e;
		}
	}
	public function create($params){
	    try{
			$this->begin();
			foreach ($params->items as $rec)
				$this->_create($rec,$params->params);
			$this->commit();
			return array(
				'success'=>1
			);
		}catch (AException $e){
			$this->rollback();
			return array(
				'success'=>0,
				'error'=>$e->getMessage()
			);
		}catch (Exception $e){
			$this->rollback();
			throw $e;
		}
	}
	public function __destruct(){
		self::$__countUsingDb--;
		if (self::$_db && !self::$__countUsingDb)
			self::$_db = null;
	}
	protected function _buildFilterEx($filters){
		$filters = json_decode($filters);
		foreach ($filters as $f){
			$prop = 0;
			if (isset($this->_fields[$f->field]))
				$prop = "`{$this->_table}`.`{$f->field}`";
			elseif ($f->field[0]==':'){
				$t = substr($f->field,1);
				if (isName($t))
					$prop = "`$t`";
			}
			if (!$prop){
				Console::log('Không sử dụng được filter '.var_export($f,1));
				continue;
			}
			$val = addslashes($f->value);
			$op = '=';
			switch($f->type){
				case 'string':
					$op = 'LIKE';
					$val = "'%$val%'";
					break;
				case 'numeric':
				case 'date':
					if ($f->comparison=='gt')
						$op = '>';
					if ($f->comparison=='lt')
						$op = '<';
					if ($f->comparison=='eq')
						$op = '=';
					break;
				case 'boolean':
					$op = '=';
					$val = $val ? 1 : 0;
					break;
			}
			if ($f->type=='date')
				$val = "'".self::__date2sql($val)."'";
			$this->addWhere("$prop $op $val");
		}
	}
	protected function _buildFilter($filters){
		static $od = ['=','>','>=','<','<=','!=','<>','not in','in','has','is'];
		foreach ($filters as $f){
			if (!isset($f->property)||!isset($f->value)||!isName($f->property))
				continue;
			$val = addslashes($f->value);
			$op = isset($f->operator) ? $f->operator : '=';
			if (!in_array($op, $od)) continue;
			if (isset($f->anyMatch) && $f->anyMatch){
				$op = 'LIKE';
				$val = '%'.$val.'%';
			}
			if ($op=='not in' || $op=='in'){
				$val = preg_split('/,/', $val,-1,PREG_SPLIT_NO_EMPTY);
				$val = "('".implode("','", $val)."')";
			}elseif ($op=='has'){
				$val = intval($val);
				$op  = '&';
			}elseif ($op=='is'){
			}else{
				$val = "'$val'";
			}
			$prop = isset($this->_fields[$f->property])?
				"`{$this->_table}`.`{$f->property}`" : $f->property;
			$this->addWhere("$prop $op $val");
		}
	}
	private function _createJoinField($table,$field){
		global $cfg;
		return $cfg['dbo']['join']['fullname'] || isset($this->_fields[$field])
			? "`{$table}_{$field}`" : "`$field`";
	}
	protected function _buildJoin(){
		foreach ($this->_jfields as $class=>$fields){
			$o = new $class();
			/** @noinspection PhpUndefinedMethodInspection */
			$jtable = $o->getTable();
			$hasLink = 1;
			if (isset($this->_fkeys[$class])){
				/** @noinspection PhpUndefinedMethodInspection */
				$pkey = $o->getPrimaryKey();
				$fkey = $this->_fkeys[$class][0];
			}elseif (isset($this->_hasRef[$class])){
				$pkey = $this->_hasRef[$class][0];
				$fkey = $fkey = $this->_pkey;
			}else{
				$hasLink = 0;
				/** @noinspection PhpUndefinedMethodInspection */
				$pkey = $fkey = $o->getPrimaryKey();
			}
			//TODO: Chỉ xử lý join với 1 khóa ngoại cho 1 table
			foreach ($fields as $jfname){
				if ($jfname=='*'){
					/** @noinspection PhpUndefinedMethodInspection */
					$fields = $o->getFields();
					foreach ($fields as $jfname2){
						if (preg_match('/password/i', $jfname2))
							continue;
						$this->_aSelect[] = "`$jtable`.`$jfname2` as ".
							$this->_createJoinField($jtable, $jfname2);
					}
					break;
				}
				preg_match('/\\w+/', $jfname, $keys);
				preg_match('/:\\w+/', $jfname, $functs);
				preg_match('/=\\w+/', $jfname, $aliass);
				$js = "`$jtable`.`{$keys[0]}`";
				if (count($functs)) {
					$js = substr($functs[0],1)."($js)";
				}
				if (count($aliass)) {
					$js = "$js as ".substr($aliass[0],1);
				}elseif(count($functs)){
					$js = "$js as `{$keys[0]}`";
				}
				$this->_aSelect[] = $js;
			}
			if (!isset($this->_aLJoin[$jtable]) && $fkey && $pkey){
				if (isset($this->_fields[$fkey]))
					$fkey = "`$this->_table`.`$fkey`";
				$this->_aLJoin[$jtable] = "\n\tLEFT JOIN `$jtable` "
					.($hasLink ? "ON (`$jtable`.`$pkey`=$fkey)":"USING(`$pkey`)");
			}
		}
	}
	protected function _buildOrder($params){
		if (isset($params->sort)){
			$selectMap = [];
			foreach ($this->_aSelect as $col){
				$selectItem = preg_split("/\\s+as\\s+/i",$col);
				if (count($selectItem)==1)
					$field = $alias = $selectItem[0];
				else
					list($field,$alias) = $selectItem;
				$alias = str_replace('`','',$alias);
				$p = strpos($alias,'.');
				if ($p)
					$alias = substr($alias,$p+1);
				$selectMap[$alias] = $field;
			}
			foreach ($params->sort as $s)
				if (preg_match('/\:.+/', $s->property)){
					$orderField = substr($s->property,1);
					if (isset($selectMap[$orderField]))
						$this->_aOrder[] = "{$selectMap[$orderField]} ".
							$s->direction;
				}else
					$this->_aOrder[] = "`$this->_table`.`$s->property` ".
						$s->direction;
		}
	}
	public function hasField($field){
		return isset($this->_fields[$field]);
	}
	public function verifyAuthorize($id=0,$action='read'){
		if (0&&$this->hasField('user_id')){
			$uid = Authorise::getId();
			if ($action=='read'){
				$this->addWhere("`$this->_table`.user_id=$uid");
			}else{
				//TODO: Kiem tra quyen truy xuat
				if (0) {
					$stmt = $this->query(
						"SELECT 1 " .
						"FROM `{$this->_table}` " .
						"WHERE `{$this->_pkey}`=? AND user_id=?",
						$id,
						$uid
					);
					if (!$stmt->fetch())
						throw new AException(Authorise::$msg, 1003);
				}
			}
		}
	}
	public function addWhere($c){
		$this->_aWhere[] = $c;
	}
	public function moreWhere($params){}
	protected function _buildWhere(stdClass $params){
		if (isset($params->filter)){
			$this->_buildFilter($params->filter);
			if(method_exists($this, 'filterExtend'))
				$this->filterExtend($params->filter);
		}
		foreach ($params as $key => $value) {
			if (preg_match("/^query_.*/", $key)){
				$field = substr($key, 6);
				$value = addslashes($value);
				if (strlen($value)<4 || !isName($field))
					continue;
				$prop = isset($this->_fields[$field]) ?
					"`$this->_table`.`$field`" : $field;
				$this->addWhere("$prop LIKE '%{$value}%'");
			}
		}
		if (isset($params->filterex))
			$this->_buildFilterEx($params->filterex);
		$this->moreWhere($params);
	}
	protected function _buildTotal(){
		$wheres = count($this->_aWhere) 
			? "\nWHERE (".implode(') AND (', $this->_aWhere).')'
			: '';
		
		$joins = array_merge($this->_aJoin,$this->_aLJoin);
		$jc = count($joins);
		$tablerefs = $jc
			? "`$this->_table` ".implode(' ', $joins)
			: "`$this->_table`";
		$pkey = "`$this->_table`.`{$this->_pkey}`";
		return "SELECT COUNT(DISTINCT $pkey) as total"
			."\nFROM $tablerefs"
			."$wheres";
	}
	protected function _buildSelect(){
		$selects = array();
		foreach ($this->_fields as $fname=>$fpro){
//			if (!preg_match('/password/i', $fname))
				$selects[] = "`$this->_table`.`$fname`";
		}
		if (count($selects)==count($this->_fields))
			$this->_aSelect[] = "`$this->_table`.*";
		else
			$this->_aSelect = array_merge($selects,$this->_aSelect);
	}
	protected function _buildQuery($params=null){
		$this->_buildSelect();
		$select = implode(', ', $this->_aSelect);
		$wheres = count($this->_aWhere) 
			? "\nWHERE (".implode(') AND (', $this->_aWhere).')'
			: '';
		
		$joins = array_merge($this->_aJoin,$this->_aLJoin);
		$jc = count($joins);
		$tablerefs = $jc
			? "`$this->_table` ".implode(' ', $joins)
			: "`$this->_table`";
		
		if (count($this->_aOrder))
			$orders = "\nORDER BY ".implode(', ', $this->_aOrder);
		else $orders = '';
		$limit = $params&&isset($params->start)&&isset($params->limit) ?
					"LIMIT $params->start,$params->limit":'';
		
		return "SELECT $select"
			."\nFROM $tablerefs"
			.($wheres?"$wheres":'')
			.($jc?"\nGROUP BY `$this->_table`.`{$this->_pkey}`\n":'')
			."$orders $limit";
	}
	//$limit: 0 hoặc array: Chỉ giới hạn kiểm tra các field trong danh sách này
	protected function validate($rec,$limit=0){
		$validators = array_merge($this->_validations,$this->_validationm);
		foreach ($validators as $vi) {
			$t		= $vi['type'];
			$fname	= $vi['field'];
			$msg	= $vi['message'];
			if (is_array($limit) && array_search($fname, $limit)===false)
				continue;
			if ($t=='presence' && (!isset($rec->$fname) || $rec->$fname==='')) {
				Console::log($rec);
				throw new AException($msg, 3002);
			}
			if (isset($rec->$fname)){
				$val = $rec->$fname;
				if ($t=='length'){
					$len = @strlen($val);
					if ((isset($vi['min']) && $len<$vi['min']) || 
						(isset($vi['max']) && $len>$vi['max']))
						throw new AException($msg,3003);
				}elseif ($t=='email' && !preg_match(
					"/^\\w[\\w\\-\\.]*@\\w[\\w\\-\\.]*\\.\\w{2,}$/", $val)){
					throw new AException($msg,3004);
				}elseif ($t=='range'){
					if (isset($vi['min']) && $val<$vi['min'])
						throw new AException($msg,3005);
					if (isset($vi['max']) && $val>$vi['max'])
						throw new AException($msg,3005);
				}
			}
		}
		if (method_exists($this, 'aftervalidate'))
			$this->aftervalidate($rec);
	}
	protected function _getChild($fkey, $fval, $deep=0){
		$filter = new stdClass;
		$filter->property = $fkey;
		$filter->value = $fval;
		$params = new stdClass;
		$params->filter = array($filter);
		$this->_buildWhere($params);
		$this->_buildJoin();
		$this->_buildOrder($params);
		
		$q = $this->_buildQuery($params);
		
		$stmt = $this->query($q);

		return $this->_fetchFull($stmt,$deep+1);
	}
	protected function _fetchFull(PDOStatement $stmt, $deep=0){
		global $cfg;
		$list = $stmt->fetchAll(PDO::FETCH_OBJ);
		if ($deep < $cfg['dbo']['join']['deep']){
			foreach ($list as $key => $o) {
				foreach ($this->_hasMany as $class){
					if (!isset($this->_hasRef[$class])) continue;
					$nc = new $class(1);
					$fkey = $this->_hasRef[$class][0];
					$pkey = $this->_pkey;
					$fval = $o->$pkey;
					/** @noinspection PhpUndefinedMethodInspection */
					$o->hasMany[$class] = $nc->_getChild($fkey,$fval,$deep);
				}
			}
		}
		return $list;
	}
	public function _read($params){
		$this->verifyAuthorize();
		$this->_buildWhere($params);
		$this->_buildJoin();
		$this->_buildOrder($params);
		
		$q = $this->_buildTotal();
		$stmt = $this->query($q);
		$total = $stmt->fetchObject();
		
		$q = $this->_buildQuery($params);
		$stmt = $this->query($q);

		return array($total->total,$this->_fetchFull($stmt));
	}
	protected function beforeDestroy($params,$opts=null){}
	protected function afterDestroy($params,$opts=null){}
	public function _destroy($params, $opts=null){
		if (!is_object($params))
			$params = (object)$params;
		$whereBackup = array_values($this->_aWhere);
		$this->_aWhere = [];
		$pkey = $this->_pkey;

		$binds = array();
		if (isset($params->$pkey)) {
			$this->addWhere("`$this->_table`.`$pkey`=?");
			$binds[] = $params->$pkey;
		}else{
			foreach($params as $field=>$value){
				$this->addWhere("`$this->_table`.`$field`=?");
				$binds[] = $value;
			}
		}

		$wheres = '('.implode(') AND (', $this->_aWhere).')';
		if (count($this->_aLJoin)){
	    	$tablerefs = "`$this->_table` ".implode(' ', $this->_aLJoin);
	    }else $tablerefs = "`$this->_table`";
		/** @noinspection PhpUndefinedFieldInspection */
		if ($opts && !empty($opts->direct) && count($this->_hasRef)==0){
			$q = "DELETE `$this->_table`.*\n"
				. "FROM $tablerefs\n"
				. "WHERE $wheres";
			$this->query($q, $binds);
		}else {
			$q = "SELECT `$this->_table`.*\n"
				. "FROM $tablerefs\n"
				. "WHERE $wheres";
			$stmt = $this->query($q, $binds);
			while ($ra = $stmt->fetchObject()) {
				$id = $ra->$pkey;
				$this->verifyAuthorize($id, 'destroy');
				$this->beforeDestroy($ra, $opts);
				$this->_destroyChild($id);
				$q = "DELETE FROM $tablerefs\nWHERE `$this->_table`.`$pkey`=?";
				$this->query($q, $id);
				$this->_destroyMedia($id);
				$this->afterDestroy($ra, $opts);
			}
		}
		$this->_aWhere = $whereBackup;
	}
	public static function lastId($table){
		return self::$_db->lastInsertId($table);
	}
	public function getInsertId(){
		return self::$_db->lastInsertId($this->_table);
	}

	/**
	 * @param $params
	 * @param null $opts
	 * @param array $values
	 * @return int	newId
	 * @throws AException
	 */
	public function _duplicate($params,$opts=null,$values=[]){
		if (!is_object($params))
			$params = (object)$params;
		if (empty($opts))
			$opts = new stdClass();
		$pkey = $this->_pkey;
		if (!isset($opts->checkauthorize)||$opts->checkauthorize)
			$this->verifyAuthorize($params->$pkey, 'duplicate');
		$oldId = $params->$pkey;
		if (!isset($opts->checkexists)||$opts->checkexists) {
			$r = $this->findOne([$pkey => $oldId]);
			if (!$r) return 0;
		}
		foreach($values as $name=>$value)
			$params->$name = $value;
		unset($params->$pkey);
		$newId = self::_create($params,$opts);
		if (!isset($opts->withchild)||$opts->withchild) {
			foreach ($this->_hasMany as $childName) {
				$childObj = new $childName;
				//Khác với hasRef, hasMany là các table con nên chỉ có 1 khóa ngoại
				//trỏ đến table cha
				$fkey = $this->_hasRef[$childName][0];
				/** @noinspection PhpUndefinedMethodInspection */
				$listChild = $childObj->findAll([$fkey => $oldId]);
				foreach ($listChild as $childItem) {
					/** @noinspection PhpUndefinedMethodInspection */
					$childObj->_duplicate($childItem, $opts, [$fkey => $newId]);
				}
			}
		}
		return $newId;
	}
	protected function beforeCreate($params,$opts=null){}
	protected function afterCreate($params,$opts=null){}
	public function _create($params,$opts=null){
		if (!is_object($params))
			$params = (object)$params;
		$this->validate($params);
		$this->beforeCreate($params,$opts);
		$db = self::$_db;
	    $bindParams = array();
	    $cols = array();
	    $vals = array();
	    foreach ($this->_fields as $fname=>$fa){
	    	if ($fa[0]!=DBO_STAM && $fa[0]!=DBO_AUTO && isset($params->$fname)){
	    		$cols[] = "`$fname`";
	    		$vals[] = '?';
	    		$bindParams[] = $params->$fname;
	    	}
	    }
	    $colss = implode(', ', $cols);
	    $vals = implode(', ', $vals);
	    $q = "INSERT `$this->_table` ($colss) VALUE ($vals)";
	    $this->query($q, $bindParams);
		$pkey = $this->_pkey;
		$params->$pkey = $db->lastInsertId($this->_table);
		$this->_updateChild($params);
		
		$this->_saveMedia($params);
		$this->afterCreate($params,$opts);

		return $params->$pkey;
	}
	protected function _updateChild($params){}
	protected function _destroyChild($parentId, $all=1){
		if (!$parentId) return;
		$ref = $all ? array_keys($this->_hasRef) : $this->_hasMany;
		foreach($ref as $classname){
			foreach($this->_hasRef[$classname] as $fkey) {
				$o = new $classname();
				/** @noinspection PhpUndefinedMethodInspection */
				$o->_destroy([$fkey=>$parentId],(object)['direct'=>1]);
			}
		}
	}

	/**
	 * @param mixed $params Các field cần update
	 * @param null $opts Các tham số mở rộng từ client
	 * @param int $flag Các tham số từ server
	 * @return int	id
	 * @throws AException
	 * @throws DBException
	 * @throws Exception
	 */
	public function _update($params, $opts=null, $flag=DB_CHK_FULL){
		if (!is_object($params))
			$params = (object)$params;
		$whereBackup = $this->_aWhere;
		$this->_aWhere = [];
		$pkey = $this->_pkey;
		if ($flag & DB_CHK_AUTHORISE)
			$this->verifyAuthorize($params->$pkey, 'update');
		$this->beforeUpdate($params,$opts);
		if ($flag & DB_CHK_VALIDATE)
		    $this->validate($params);
	    $binds = [];
		$sets = [];
		$fs = $this->_fields;
		foreach($params as $fname=>$fval){
			if ($pkey===$fname || $fname==='user_id' || !isset($fs[$fname])
				|| $fs[$fname][0]===DBO_STAM || $fval===null) continue;
			$sets[] = "`$this->_table`.`$fname`=:$fname";
			$binds[":$fname"] = $fval;
		}
		if (!count($sets))
			throw new AException("Không có thông tin cần cập nhật",2004);
	    $sets = implode(', ', $sets);
		$this->addWhere("`$this->_table`.`$pkey`=:$pkey");
		$binds[":$pkey"] = $params->$pkey;

		$wheres = implode(') AND (', $this->_aWhere);
	    if (count($this->_aLJoin)){
	    	$tablerefs = "`$this->_table` ".implode(' ', $this->_aLJoin);
	    }else $tablerefs = "`$this->_table`";
	    $q = "UPDATE $tablerefs\nSET $sets\nWHERE ($wheres)";
		$this->query($q, $binds);
		
		$this->_updateChild($params);
		
		$this->_saveMedia($params);
		$this->afterUpdate($params,$opts);

		$this->_aWhere = $whereBackup;
		return $params->$pkey;
	}
	protected function beforeUpdate($params,$opts=null){}
	protected function afterUpdate($params,$opts=null){}
	protected function _getFields($pkey=false){
		$r = $this->getFields();
		return $pkey ? $r : array_diff($r, [$this->_pkey]);
	}
	public static function query($query){
		$args = func_get_args();
		unset($args[0]);
		if (isset($args[1])){
			if (is_array($args[1]))
				$bindParams = $args[1];
			else{
				$bindParams = array();
				foreach ($args as $p)
					$bindParams[] = $p;
			}
		}else $bindParams = array();
		self::__querylog($query,$bindParams);
		if (empty(self::$_db))
			self::connect();
		$stmt = self::$_db->prepare($query);
		if (!$stmt)
			throw new DBException([self::$_db->errorInfo(),$query,$bindParams]);
	    if (!$stmt->execute($bindParams))
	       	throw new DBException([$stmt->errorInfo(),$query,$bindParams]);
	    return $stmt;
	}
	protected function _destroyMedia($key){
		if (!$this->_mediafields) return;
		$dir = APP_DATA."media/{$this->_table}/$key";
		if (is_dir($dir)){
			$cdir = getcwd();
			chdir($dir);
			foreach(glob("*") as $name)
				unlink($name);
			chdir($cdir);
			rmdir($dir);
		}
	}
	protected function _saveMedia($params){
		if (!$this->_mediafields) return;
		//$key,$fieldname,$content
		$pattern = '/data\/tmp\/[^\"]+/';
		$notfound = 1;
		foreach($this->_mediafields as $mf){
			if (preg_match($pattern, $params->$mf)){
				$notfound = 0;
				break;
			}
		}
		if ($notfound) return;
		$pkey = $this->_pkey;
		$key = $params->$pkey;
		$dir = $this->_getdir(APP_DATA."media/{$this->_table}/$key");
		$fieldset = array();
		$bind = array();
		$content = '';
		foreach($this->_mediafields as $mf)
			$content .= $params->$mf;
		while(preg_match($pattern, $content, $match)){
			$media = $match[0];
			$oldname = APP_DATA.substr($media, 5);//5=strlen('data/')
			$ext = pathinfo($media,PATHINFO_EXTENSION);
			$newname = $this->_getuf($dir, $ext);
			$refname = 'data/'.substr($newname, strlen(APP_DATA));
			@rename($oldname,$newname);
			if (!is_file($newname))
				throw new Exception('Không thể tạo file '.$newname,3010);
			$content = str_replace($media, $refname, $content);
			foreach($this->_mediafields as $mf)
				$params->$mf= str_replace($media, $refname, $params->$mf);
		}
		foreach($this->_mediafields as $mf){
			$fieldset[] = "`$mf`=:$mf";
			$bind[":$mf"] = $params->$mf;
		}
		
		$this->query(
			"UPDATE `{$this->_table}` SET ".implode(',', $fieldset)
			." WHERE $pkey=$key",
			$bind
		);
	}
	protected function _copyMedia($table, $key, $content){
		$pattern = '/data\/tmp\/[^\"]+/';
		if (!preg_match($pattern, $content))
			return $content;
		
		$dir = $this->_getdir(APP_DATA."media/$table/$key");
		while(preg_match($pattern, $content, $match)){
			$media = $match[0];
			$oldname = APP_DATA.substr($media, 5);//5=strlen('data/')
			$ext = pathinfo($media,PATHINFO_EXTENSION);
			$newname = $this->_getuf($dir, $ext);
			$refname = 'data/'.substr($newname, strlen(APP_DATA));
			@copy($oldname,$newname);
			if (!is_file($newname))
				throw new Exception('Không thể tạo file '.$newname,3010);
			$content = str_replace($media, $refname, $content);
		}
		return $content;
	}
	private function _getdir($dir){
		if (!is_dir($dir))
			@mkdir($dir,0700,true);
		if (!is_dir($dir))
			throw new Exception('Không thể tạo thư mục '.$dir,3009);
		return $dir;
	}
	private function _getuf($dir,$ext){
		static $i=0;
		do{
			$i++;
			$pad = str_pad($i, 3, '0', STR_PAD_LEFT);
			$name = "$dir/$pad.$ext";
		}while(is_file($name));
		return $name;
	}
	public static function query2str($q,$bind){
		$q = preg_split('/\?/', $q);
		$len = count($q)-1;
		for($i=0;$i<$len;$i++)
			$q[$i] .= isset($bind[$i])?"'{$bind[$i]}'":"XNULL";
		$q = implode('', $q);
		foreach($bind as $i=>$val){
			if ($i[0]==':')
				$q = str_replace($i,"'$val'",$q);
		}
		return $q;
	}
	private static function __querylog($q,$bind){
		global $cfg;
		$log = &$cfg['sqllog'];
		if ($log['target'] & L_DISABLE)
			return;
		if ($log['filter']['have'] && !preg_match($log['filter']['have'], $q))
			return;
		if ($log['filter']['nohave'] 
			&& preg_match($log['filter']['nohave'], $q))
			return;
		$action = strtoupper(substr(trim($q), 0, 6));
		if ($action=='SELECT' && !($log['type'] & LT_QUERY)) return;
		$change = array('UPDATE','DELETE','INSERT','REPLAC');
		if (in_array($action,$change) && !($log['type'] & LT_CHANGE)) return;
		
		$q = self::query2str($q,$bind);
	
		if ($log['target'] & L_CONSOLE)
			Console::log($q);
		if ($log['target'] & L_FILE){
			Console::flog("\n$q",'SQL',$log['trace']);
		}
	}
	/**
	 * Convert from 'dd/mm/yyyy' to 'yyyy-mm-dd'
	 * Năm 2 chữ số sẽ chỉ thuộc khoảng [$baseyear,$baseyear+99]
	 */
	private static function __date2sql($d,$baseyear=1930){
		if (is_numeric($d)){
			//$d là số day serial của Excel
			$year = intval($d)-1;
			$d = date_create_from_format('Y-m-d','1900-01-00');
			$d = date_add($d, new DateInterval("P{$year}D"));
			return date_format($d,'Y-m-d');
		}
		$d2=date_create_from_format('d/m/y',$d);
		if ($d2){
			$y = intval(date_format($d2, 'Y'));
			if ($y>=$baseyear+100){
				$y -= 100;
				$d2=date_create_from_format('d/m/Y',
					date_format($d2,'d/m/').$y);
			}
		}else
			$d2=date_create_from_format('d/m/Y',$d);
		
		return $d2 ? date_format($d2,'Y-m-d') : '0000-00-00';
	}
	public static function debug($on=1){
		global $cfg;
		if ($on && !self::$__localcfg){
			self::$__localcfg = $cfg['sqllog'];
			$cfg['sqllog'] = [
				'target' => L_CONSOLE,//L_DISABLE L_CONSOLE L_FILE,
				'type'	 => LT_ALL,//LT_QUERY LT_CHANGE LT_ALL
				'filter' => array(
					'have' => '//',
					'nohave' => '/_userlog/'
				),
				'trace' => 0
			];
		}elseif(is_array(self::$__localcfg)){
			$cfg['sqllog'] = self::$__localcfg;
			self::$__localcfg = 0;
		}
	}
}
//Biến static dành cho các trường hợp gọi hàm static của DBObject
$_staticdb = new DBObject(); 