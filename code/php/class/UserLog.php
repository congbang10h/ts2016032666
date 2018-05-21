<?php
class UserLog{
	public static function init(){
		global $cfg;
		if (isset($cfg['user']['log']) && !$cfg['user']['log']) return;
		if (isset($_SESSION[APP_ID]['userlog'])){
			UserLog::update();
		}elseif ($uid = Authorise::getId()){
			DBObject::query($q='INSERT _userlog VALUES (NULL,?,?,?,NOW(),NOW(),0)',
				$uid,$_SERVER['HTTP_USER_AGENT'],$_SERVER['REMOTE_ADDR']);
			$_SESSION[APP_ID]['userlog'] = DBObject::lastId('_userlog');
			//Console::flog('UserLog Init '.$_SESSION[APP_ID]['userlog'].' '.$q);
		}else{
			//Console::flog('UserLog do nothing '.$uid);
		}
	}
	public static function update(){
		global $cfg;
		if (isset($cfg['user']['log']) && !$cfg['user']['log']) return;
		if (!isset($_SESSION[APP_ID]['userlog']))
			return;
		DBObject::query($q='UPDATE _userlog SET `last`=NOW() WHERE id=?',
			$_SESSION[APP_ID]['userlog']);
		//Console::flog('UserLog Update '.$_SESSION[APP_ID]['userlog'].' '.$q);
	}
	public static function end(){
		global $cfg;
		if (isset($cfg['user']['log']) && !$cfg['user']['log']) return;
		if (isset($_SESSION[APP_ID]['userlog'])){
			DBObject::query($q='UPDATE _userlog SET `logout`=1 WHERE id=?',
				$_SESSION[APP_ID]['userlog']);
			//Console::flog('UserLog End '.$_SESSION[APP_ID]['userlog'].' '.$q);
			unset($_SESSION[APP_ID]['userlog']);
		}
	}
}
