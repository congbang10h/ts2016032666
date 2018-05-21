<?php
require_once 'init.php';
require_once 'api.php';

class BogusAction {
	public $action;
	public $method;
	public $data;
	public $tid;
}

$isForm = false;
$isUpload = false;
if(isset($HTTP_RAW_POST_DATA)) {
	header('Content-Type: text/javascript');
	$data = json_decode($HTTP_RAW_POST_DATA);
} else if (isset($_POST['extAction'])) { // form post
	$isForm = true;
	$isUpload = $_POST['extUpload'] == 'true';
	$data = new BogusAction();
	$data->action = $_POST['extAction'];
	$data->method = $_POST['extMethod'];
    // not set for upload
    $data->tid = isset($_POST['extTID']) ? $_POST['extTID'] : null;
	$data->data = array($_POST, $_FILES);
} else {
	die('Invalid request.');
}

function doRpc($cdata){
    global $API;
	try {
		$action = $cdata->action;
		$method = $cdata->method;
		if(!isset($API[$action])){
			throw new AException('Bạn yêu cầu hành động không tồn tại: '.
				$action,1001);
		}
		if(!isset($API[$action][$method])){
			throw new AException('Bạn yêu cầu hành động không tồn tại '.
				"{$action}->$method()",1002);
		}
		//Kiểm tra quyền truy xuất
		if (0&&$API[$action][$method]){
			Authorise::$msg = "Không đủ quyền truy xuất {$action}->$method()";
			Authorise::checkAuthorize($API[$action][$method]);
		}

		$r = array(
			'type'=>'rpc',
			'tid'=>isset($cdata->tid)?$cdata->tid:0,
			'action'=>$action,
			'method'=>$method
		);

		$o = new $action();
        
		$params = isset($cdata->data)? $cdata->data : 0;
		if (is_array($params)){
			$params = $params[0];
		}
		if ($method!='read'){
			if (!isset($params->items) && !isset($params->params)){
				$params = (object)[
					'items' => [$params],
					'params' => null
				];
			}elseif (!is_array($params->items))
				$params->items = array($params->items);
		}
		if (!method_exists($o, $method)){
			throw new AException('Bạn yêu cầu hành động không tồn tại '.
				"{$action}->$method()",1002);
		}
		$r['result'] = $params!==0 ? $o->$method($params) : $o->$method();
		if (!is_array($r['result']))
			throw new AException("Chức năng {$action}->{$method}() cần trả ".
				"về kiểu array", 1004);
	}
	catch(Exception $e){
		$r['type'] = 'exception';
		$r['message'] = $e->getMessage();
		$r['code'] = $e->getCode();
	}
	$r['debug'] = Console::flush();
	return $r;
}

$response = null;
if (is_array($data)) {
	$response = array();
	foreach($data as $d){
		$response[] = doRpc($d);
	}
} else {
	$response = doRpc($data);
}
if ($isForm && $isUpload) {
	echo '<html><body><textarea>';
	echo json_encode($response);
	echo '</textarea></body></html>';
} else {
	echo json_encode($response);
}