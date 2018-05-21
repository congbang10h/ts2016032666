<?php
require_once 'init.php';
header('Content-Type: application/javascript');
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past

require_once 'api.php';

// convert API config to Ext.Direct spec
$actions = array();
foreach ($API as $obj=>$mlist){
	$actions[$obj] = array();
	foreach ($mlist as $mname => $rightname) {
		$actions[$obj][] = array(
			'name' => $mname,
			'len' => 1
		);
	}
}

$api = array(
    'url'=>'php/router.php',
    'type'=>'remoting',
	'actions'=>$actions,
	'total'=>2200
);
?>
VX.cc.REMOTING_API = <?php echo json_encode($api);?>;
VX.cc.API = <?php echo json_encode($API);?>;
Ext.direct.Manager.addProvider(VX.cc.REMOTING_API);
