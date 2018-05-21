<?php
class PAM extends DBObject{
	protected static $_pamtable	= '_pam';
	public static function get($group,$name){
		if (!isset($_SESSION[APP_ID]['pam'][$group][$name])){
			try{
				$uid = $_SESSION[APP_ID]['user']->id;
				$q = "SELECT value\n"
					."FROM ".self::$_pamtable."\n"
					."WHERE (user_id=? OR user_id=0) AND `group`=? AND name=?\n"
					."ORDER BY user_id DESC\n"
					."LIMIT 0,1";
				$stmt = self::query($q,array($uid,$group,$name));
			}catch(Exception $e){
				return '';
			}
			$apam = $stmt->fetchObject();
			$_SESSION[APP_ID]['pam'][$group][$name] = $apam->value;
		}
		return $_SESSION[APP_ID]['pam'][$group][$name];
	}
	public static function set($name,$group,$value,$cmt='',$forall=false){
		if (!isset($_SESSION[APP_ID]['pam'][$group][$name])){
			try{
				$uid = $forall?0:$_SESSION[APP_ID]['user']->id;
				$q = "REPLACE ".self::$_pamtable."\n"
					."SET user_id=?, `group`=?, name=?, `comment`=?\n";
				self::query($q,array($uid,$group,$name,$cmt));
			}catch(Exception $e){
				return false;
			}
			$_SESSION[APP_ID]['pam'][$group][$name] = $value;
		}
		return true;
	}
}
