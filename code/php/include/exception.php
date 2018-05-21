<?php
//Critical exception caused by a fatal error
class CException extends Exception{
	public function __construct ($msg) {
		$msg = array();
		foreach (func_get_args() as $arg){
			$msg[] = (is_string($arg)||is_numeric($arg))?
				$arg : ('<pre>'.var_export($arg, 1)).'</pre>';
		}
		$msg = implode('<br><br>',$msg);
		$cs = trace2string(1,'<br>');
		parent::__construct("<span class='servererror'>$cs$msg</span>", 0);
	}
}
class SException extends Exception{
	public function __construct ($msg) {
		$msg = array();
		foreach (func_get_args() as $arg){
			$msg[] = (is_string($arg)||is_numeric($arg))?
				$arg : ('<pre>'.var_export($arg, 1)).'</pre>';
		}
		$msg = implode('<br><br>',$msg);
		$cs = trace2string(1,'<br>');
		die("$cs$msg");
	}
}
//Application exception caused by semantic error
class AException extends Exception{
	public function __construct ($msg,$code=0) {
		global $cfg;
		$msg = (is_string($msg)||is_numeric($msg))?
				$msg : ('<pre>'.var_export($msg,1)).'</pre>';

		if ($cfg['debug']){
			$cs = debug_backtrace();
			$line = $cs[0];
			$root = str_replace('/',DIRECTORY_SEPARATOR,APP_DIR);
			$line['file'] = DIRECTORY_SEPARATOR.str_replace($root,'',$line['file']);
			$prefix = "{$line['file']} ({$line['line']}) ";
			if (!empty($cs[1]['class']))
				$prefix .= "{$cs[1]['class']}->";
			if (!empty($cs[1]['function']))
				$prefix .= "{$cs[1]['function']}()";
			$prefix .= '<br>';
		}else $prefix = '';
		
		parent::__construct("<span class='servererror'>$prefix$msg</span>", $code);
	}
}
//Database exception caused by semantic error
class DBException extends Exception{
	public function __construct ($args) {
		global $cfg;
		list($error,$query,$params) = $args;
		if ($error[0]=='HY093')
			$error[2] = 'Số lượng tham số của truy vấn không đầy đủ';
		elseif($error[1]==1451)
			$error[2] = 'Không thể xóa vì còn được dùng trong thông tin khác';
		if ($cfg['debug']){
			$cs = trace2string(1,'<br>');
			$msg = "<b>Error ({$error[0]},{$error[1]})</b>:"
				."<br>{$error[2]}<br><br>";
			if ($query) {
				$query = DBObject::query2str($query,$params);
				$msg .= "<b>Query</b>:<br>$query<br><br>";
			}
			if ($params)
				$msg .= "<b>Params</b>:<br>".var_export($params,1);
			Console::flog("$cs$msg");
		}else $cs = $msg='';
		parent::__construct("<span class='servererror'>$cs$msg</span>", 0);
	}
}
function vbug($v){
	$r = array();
	try{
		$v = func_get_args();
		switch(count($v)){
			case 1:
				throw new CException($v[0]);
			case 2:
				throw new CException($v[0],$v[1]);
			default:
				throw new CException($v[0],$v[1],$v[2]);
		}
	}catch(Exception $e){
		$r['type'] = 'exception';
		$r['message'] = $e->getMessage();
		$r['code'] = $e->getCode();
	}
	echo json_encode($r);
	exit();
}
$sys_error_type = array(
	E_ERROR => 'E_ERROR',
	E_WARNING => 'E_WARNING',
	E_PARSE => 'E_PARSE',
	E_NOTICE => 'E_NOTICE',
	E_CORE_ERROR => 'E_CORE_ERROR',
	E_CORE_WARNING => 'E_CORE_WARNING',
	E_COMPILE_ERROR => 'E_COMPILE_ERROR',
	E_COMPILE_WARNING => 'E_COMPILE_WARNING',
	E_USER_ERROR => 'E_USER_ERROR',
	E_USER_WARNING => 'E_USER_WARNING',
	E_USER_NOTICE => 'E_USER_NOTICE',
	E_STRICT => 'E_STRICT',
	E_RECOVERABLE_ERROR => 'E_RECOVERABLE_ERROR', 
	E_DEPRECATED => 'E_DEPRECATED',
	E_USER_DEPRECATED => 'E_USER_DEPRECATED'
);
function error2type($code){
	global $sys_error_type;
	return isset($sys_error_type[$code]) ? $sys_error_type[$code] : 'E_UNKNOW';
}
//START: http://www.php.net/manual/en/function.set-error-handler.php#112291
function log_error($num, $str, $file, $line/*, $context = null*/) {
	global $cfg;
	if (isset($cfg['error']['log']) && $num & $cfg['error']['log']){
		$str = str_replace(array('<br>','<pre>','</pre>'), '', $str);
		Console::flog($str, error2type($num),1);
	}
	if (isset($cfg['error']['log']) && $num & $cfg['error']['msg'])
		log_exception(new ErrorException($str, 0, $num, $file, $line));
}
function log_exception(Exception $e) {
	vbug($e->getMessage(),$e->getCode());
}
function check_for_fatal() {
	$e = error_get_last();
	if ($e["type"] == E_ERROR)
		log_error($e["type"], $e["message"], $e["file"], $e["line"]);
}

function trace2string($off=0,$tag="\n"){
	$dirlen = strlen(APP_DIR);
	$cs = debug_backtrace();
	$n = count($cs);
	$sdb = array();
	foreach($cs as $i=>&$it){
		if (isset($it['function'])&&$it['function']=='log_error'){
			$a = $it['args'];
			$file = substr($a[2],$dirlen);
			$sdb[] = ($n-$i).". $file (Line $a[3])";
			continue;
		}
		if ($off && isset($it['file'])
			&& preg_match('/^.*exception\.php$/', $it['file']))
			continue;
		$file = isset($it['file']) ? substr($it['file'],$dirlen) : '';
		$fn = isset($cs[$i+1])&&isset($cs[$i+1]['function'])?
			": {$cs[$i+1]['function']}()" : ''; 
		$j = $n-$i;
		if ($fn){
			$sdb[] = $file ? "$j. {$file} $fn (Line {$it['line']})"
				: ("$j. php function $fn");
		}else
			$sdb[] = $j.'. PHP shutdown';
	}
	return implode($tag, array_reverse($sdb)).$tag.$tag;
}

register_shutdown_function("check_for_fatal");
set_error_handler("log_error");
set_exception_handler("log_exception");
ini_set("display_errors", "off");
error_reporting(E_ALL);