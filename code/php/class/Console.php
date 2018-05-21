<?php
class Console{
	private static $messages = array();
	public static function log($msg,$trace=0){
		if (!is_scalar($msg))
			$msg = var_export($msg,1);

		if($trace){
			$msg = trace2string(0)."\n".$msg;
		}
		self::$messages[] = array(
			'type' => 'log',
			'msg' => $msg
		);
	}
	public static function flog($msg,$title='',$trace=0){
		if (!is_scalar($msg))
			$msg = var_export($msg,1);
		$msg = str_replace('<br>', '', $msg);
		$hf = fopen(APP_DATA.'logs/'.date('Y-m').'.log','a');
		if ($title)
			$title =" $title";
		$msg = date('Y-m-d h:i:s')."$title> ".$msg."\n";
		
		fwrite($hf,$msg,strlen($msg));
		if($trace){
			$msg = trace2string(0)."\n\n";
			fwrite($hf,$msg,strlen($msg));
		}
		fclose($hf);
	}
	public static function dump(){
		foreach (func_get_args() as $a)
			self::$messages[] = array(
				'type' => 'log',
				'msg' => var_export($a,true)
			);
	}
	public static function flush(){
		$r = self::$messages;
		self::$messages = array();
		return $r;
	}
}