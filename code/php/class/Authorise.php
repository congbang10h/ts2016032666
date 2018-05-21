<?php
class Authorise{
	public static $msg = 'Không đủ quyền truy xuất';
	
	public static function verifyAuthorize(){
		global $API;
		$items = DBObject::query(
				"CALL getPrevilege(?,?)",
				Authorise::getAId(),
				session_id()
		)->fetchAll(PDO::FETCH_OBJ);
		$previleges = [];
		foreach($items as $p){
			$previleges[$p->previlege_code] = 1;
		}
		foreach($API as $class=>$methods){
			foreach($methods as $pname=>$right) {
				if ($right&&!isset($previleges[$right]))
					unset($API[$class][$pname]);
				else
					$API[$class][$pname] = 0;
			}
		}
	}
	public static function checkAuthorize($pname){
		$ac = &$_SESSION[APP_ID]['user']->permissions;
		if (isset($ac[$pname]))
			return;
		$check = DBObject::query(
			'CALL checkPrevilege(?,?)',
			Authorise::getAId(),
			$pname
		)->fetchObject();
		if ($check->verified){
			$ac[$pname] = 1;
		}else{
			throw new AException(Authorise::$msg,1003);
		}
	}
	public static function makeGuest(){
		$u = new stdClass;
		$u->user_id = 0;
		$u->account_id = 0;
		return $u;
	}
	public static function initUser(){
		if (!isset($_SESSION[APP_ID]['user'])){
			$_SESSION[APP_ID]['user'] = Authorise::makeGuest();
		}
	}
	public static function getId(){
		return $_SESSION[APP_ID]['user']->user_id;
	}
	public static function getAId(){
		return $_SESSION[APP_ID]['user']->account_id;
	}
	public static function setUser($u){
		if (self::getAId())
			self::verifyAuthorize();
		else
			DBObject::query('CALL clearPrevilege(?)',session_id());
		$u->permissions = array();
		$_SESSION[APP_ID]['user'] = $u;
		UserLog::init();
	}
}
