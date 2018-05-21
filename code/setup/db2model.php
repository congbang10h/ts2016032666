<?php
require_once '../php/init.php';
define('MODEL_FOLDER',APP_DIR.'js/model/');
define('STORE_FOLDER',APP_DIR.'js/store/');

$headertype = <<<STORE
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
STORE;
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<style type="text/css">
		.fail{color: red;border: 1px solid red;}
		.success{color:blue;border: 1px solid blue;}
		.nochange{color:green;border: 1px solid green;}
	</style>
</head>
<body>
<?php
	require 'lib/db_query.php';
	$schema = array();
	
	configTable($tables, $schema);
	configColumn($columns, $schema);
	configFKey($constraints, $schema);
	$success=[];$fail=[];$nochange=[];
	foreach ($schema as $class=>$attr){
		if (empty($attr['table']))
			continue;
		$rm = exportModel($class, $attr);
		$rs = exportStore($class, $attr);
		switch($rm){
			case -1:
				$fail[] = "VX.model.$class";
				break;
			case 0:
				$nochange[] = "VX.model.$class";
				break;
			default:
				$success[] = "VX.model.$class";
		}
		switch($rs){
			case -1:
				$fail[] = "VX.store.$class";
				break;
			case 0:
				$nochange[] = "VX.store.$class";
				break;
			default:
				$success[] = "VX.store.$class";
		}
	}
viewOutput('fail',$fail,'Thất bại');
viewOutput('success',$success,'Thành công');
viewOutput('nochange',$nochange,'Không thay đổi');

function exportModel($class, &$a){
	global $headertype;
	$fid = '//ID: '.getId($a['table'],$a);
	$filename = MODEL_FOLDER."$class.js";
	$c = is_file($filename)?@file($filename, FILE_IGNORE_NEW_LINES):false;
	$userdefined = 0;
	$fieldsAdd = 0;
	if ($c !== false){
		if ($fid === $c[0]){
			return 0;
		}
		$p = array_search('//<ZoneC', $c);
		$e = array_search('//ZoneC>', $c);
		if ($p>=0 && $e>0)
			$userdefined = array_splice($c, $p, $e-$p+1);
		$p = array_search('//<ZoneF', $c);
		$e = array_search('//ZoneF>', $c);
		if ($p>=0 && $e>0)
			$fieldsAdd = array_splice($c, $p, $e-$p+1);
	}
	if (!$userdefined)
		$userdefined = ['//<ZoneC','','//ZoneC>'];
	if (!$fieldsAdd)
		$fieldsAdd = ['//<ZoneF','//ZoneF>'];
	$m = preg_split('/[\n\r]/', $headertype, PREG_SPLIT_NO_EMPTY);
	$m[] = "Ext.define('VX.model.{$class}', {";
	$m[] = "\textend: 'Ext.data.Model',";
	$m[] = "\tfields: [";
	$m = array_merge($m,$fieldsAdd);
	//Fields
	$len = count($a['fields']);
	$size = 0;
	foreach($a['fields'] as $fname=>$field)
		if ($size < strlen($fname)) $size = strlen($fname);
	$size += 3;
	foreach($a['fields'] as $fname=>$field){
		$fname = str_pad("'$fname',",$size,' ');
		$len--;
		$default = '';
		switch ($field[0]) {
			case 'DBO_AUTO':
			case 'DBO_NUMB':
				$type = "'int'";
				if ($field[2]!==null && $field[2]!=0)
					$default = ", defaultValue: {$field[2]}";
				break;
			case 'DBO_FLOAT':
				$type = "'float'";
				if ($field[2]!==null && $field[2]!=0)
					$default = ", defaultValue: {$field[2]}";
				break;
			case 'DBO_STRI':
				$type = "'string'";
				if ($field[2]!==null)
					$default = ", defaultValue: '{$field[2]}'";
				break;
			case 'DBO_DATE':
				$type = "'date'";
				//if ($field[2]!==null)
				//	$default = ", defaultValue: '{$field[2]}'";
				break;
			case 'DBO_TIME':
			case 'DBO_STAM':
				$type = "'datetime'";
				break;
			default:
				$type = "'auto'";
		}
		$title = $field[1] ? $field[1] : '#';
		$m[] = "\t\t{name: {$fname} type: $type, title: '$title'$default}"
			.($len?',':'');
	}
	$m[] = "\t],";
	$m[] = "\tactionName: '{$class}',";
	
	//Validations
	$len = count($a['validations']);
	if ($len){
		$m[] = "\tvalidations: [";
		foreach($a['validations'] as $field){
			$len--;
			$s = "\t\t{type: '{$field['type']}', "
				."field: '{$field['field']}', "
				."message: '{$field['message']}'";
			unset($field['type'], $field['field'], $field['message']);
			foreach ($field as $proName=>$proVal){
				$proVal = is_numeric($proVal) ? $proVal : "'$proVal'";
				$s .= ", $proName: $proVal";
			}
			$m[] = $s."}"
				.($len?',':'');
		}
		$m[] = "\t],";
	}
	$m[] = "\tproxy:{";
	$m[] = "\t\ttype: 'direct',";
	$m[] = "\t\tapi: {$class},";
	$m[] = "\t\treader:{";
	$m[] = "\t\t\ttype: 'json',";
	$m[] = "\t\t\troot: 'rows',";
	$m[] = "\t\t\ttotalProperty: 'total'";
	$m[] = "\t\t}";
	$m[] = "\t}";
	
	$r = array_merge($m,$userdefined,array('});'));
	$result = @file_put_contents($filename, "$fid\n".implode("\n", $r));
	return ($result !== false) ? 1 : -1;
}
function exportStore($class, &$a){
	global $headertype;
	$fid = '//ID: '.getId($a['table'],$a);
	$filename = STORE_FOLDER."$class.js";
	$c = is_file($filename)?@file($filename, FILE_IGNORE_NEW_LINES):false;
	$userdefined = 0;
	if ($c !== false){
		if ($fid === $c[0]){
			return 0;
		}
		$p = array_search('//<ZoneC', $c);
		$e = array_search('//ZoneC>', $c);
		if ($p>=0 && $e>0)
			$userdefined = array_splice($c, $p, $e-$p+1);
	}
	if (!$userdefined)
		$userdefined = array('//<ZoneC','','//ZoneC>');
	$m = preg_split('/[\n\r]/', $headertype, PREG_SPLIT_NO_EMPTY);
	
	$m[] = "Ext.define('VX.store.{$class}', {";
	$m[] = "\textend: 'Ext.ux.Store',";
	$m[] = "\tmodel: 'VX.model.{$class}',";
	$m[] = "\tautoLoad: false,";
	$m[] = "\tpageSize: 20";
	
	$r = array_merge($m,$userdefined,array('});'));
	$result = @file_put_contents($filename, "$fid\n".implode("\n", $r));
	return ($result !== false)?1:-1;
}
function removeQuote($m){
	return substr($m[0], 1,strlen($m[0])-2);
}
function getExport($a){
	ob_start();
	var_export($a);
	$r = ob_get_contents();
	ob_end_clean();
	$r = preg_replace(
		array('/[0-9]+\s\=\>\s+/', '/\=\>\s+\n/'),
		array('', '=> '),
		$r);
	$r = preg_replace_callback('/\'DBO_[A-Z]+\'/', 'removeQuote', $r);
	echo $r;
}
