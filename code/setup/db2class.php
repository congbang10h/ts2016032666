<?php
require_once '../php/init.php';
define('EXPORT_FOLDER',APP_DIR.'php/dbo/');

header('Content-type: text/html; charset=utf-8');
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
	$schema = [];
	
	configTable($tables, $schema);
	configColumn($columns, $schema);
	configFKey($constraints, $schema);

	$success=[];$fail=[];$nochange=[];
	foreach ($schema as $class=>$attr){
		if (empty($attr['table']))
			continue;
		switch(exportFile($class, $attr)){
			case -1:
				$fail[] = $class;
				break;
			case 0:
				$nochange[] = $class;
				break;
			default:
				$success[] = $class;
		}
	}

viewOutput('fail',$fail,'Thất bại');
viewOutput('success',$success,'Thành công');
viewOutput('nochange',$nochange,'Không thay đổi');

function exportFile($class, &$a){
	global $headertype;
	$fid = '//ID: '.getId($a['table'],$a);
	$filename = EXPORT_FOLDER."$class.php";
	$c = is_file($filename)?@file($filename, FILE_IGNORE_NEW_LINES):false;
	$userdefined = 0;
	if ($c !== false){
		if ($fid === $c[1]){
			return 0;
		}
		$p = array_search('//<ZoneC', $c);
		$e = array_search('//ZoneC>', $c);
		if ($p>=0 && $e>0)
			$userdefined = array_splice($c, $p, $e-$p+1);
	}
	if (!$userdefined)
		$userdefined = ['//<ZoneC','','//ZoneC>'];
	$c = preg_split('/[\n\r]/', $headertype, PREG_SPLIT_NO_EMPTY);
	$c[] = "class $class extends DBObject{";
	$c[] = "\tprotected \$_table = '{$a['table']}';";
	$c[] = "\tprotected \$_title = '{$a['title']}';";
	//Fields
	$c[] = "\tprotected \$_fields = [";
	$len = count($a['fields']);
	$size = 0;
	foreach($a['fields'] as $fname=>$field)
		if ($size < strlen($fname)) $size = strlen($fname);
	$size += 2;
	foreach($a['fields'] as $fname=>$field){
		$fname = str_pad("'$fname'",$size,' ');
		$len--;
		$def = $field[2]===NULL?'NULL':"'$field[2]'";
		$c[] = "\t\t{$fname} => [{$field[0]}, '{$field[1]}', {$def}]"
			.($len?',':'');
	}
	$c[] = "\t];";
	//Keys
	if (count($a['keys'])>1){
		echo "<span style='color: red'>WARNING: Không hỗ trợ table $class có "
			."primary key gồm nhiều field</span><br>";
	}
	if (count($a['keys']) && $a['keys'][0] != 'id') {
		$c[] = "\tprotected \$_pkey = '{$a['keys'][0]}';";
	}
	//Foreign keys
	$len = count($a['fkeys']);
	if ($len){
		$size = 0;
		foreach($a['fkeys'] as $jname=>$list)
			if ($size < strlen($jname)) $size = strlen($jname);
		$size += 2;
		$c[] = "\tprotected \$_fkeys = [//class=[fkey]";
		foreach($a['fkeys'] as $jname=>$list){
			$jname = str_pad("'$jname'",$size,' ');
			$len--;
			$tmp = [];
			foreach($list as $fkey=>$pkey)
				$tmp[] = "'$fkey'";
			$tmp = implode(',',$tmp);
			$c[] = "\t\t\t$jname => [$tmp]"
				.($len?',':'');
		}
		$c[] = "\t\t];";
	}
	//hasMany
	$len = count($a['has']);
	if ($len){
		$size = 0;
		foreach($a['has'] as $jname=>$list)
			if ($size < strlen($jname)) $size = strlen($jname);
		$size += 2;
		$c[] = "\tprotected \$_hasRef = [//class=[fkey]";
		foreach($a['has'] as $jname=>$list){
			$jname = str_pad("'$jname'",$size,' ');
			$len--;
			$tmp = [];
			foreach($list as $fkey=>$pkey)
				$tmp[] = "'$fkey'";
			$tmp = implode(',',$tmp);
			$c[] = "\t\t\t$jname => [$tmp]"
				.($len?',':'');
		}
		$c[] = "\t\t];";
	}
	//Validations
	$len = count($a['validations']);
	if ($len){
		$c[] = "\tprotected \$_validations = [";
		foreach($a['validations'] as $field){
			$len--;
			$s = "\t\t['type' => '{$field['type']}',"
				."\n\t\t\t'field' => '{$field['field']}',"
				."\n\t\t\t'message' => '{$field['message']}'";
			unset($field['type'], $field['field'], $field['message']);
			foreach ($field as $proName=>$proVal){
				$proVal = is_numeric($proVal) ? $proVal : "'$proVal'";
				$s .= ",\n\t\t\t'$proName' => $proVal";
			}
			$c[] = "$s]"
				.($len?',':'');
		}
		$c[] = "\t];";
	}

	$r = array_merge($c,$userdefined,['}']);
	$result = @file_put_contents($filename, "<?php\n$fid\n".implode("\n", $r));
	return ($result !== false) ? 1 : -1;
}