<?php
try {
	$limittables = array(
		'user','question','question_item','question_solution','figurelink',
		'question_info','question_item_info',
		'question_figure','question_item_figure',
		'content','question_topic_map'
		);
	$limittext = '';//"AND TABLE_NAME in ('".implode("','", $limittables)."')";

	$dbhost = DB_HOST;
	$dbname = DB_NAME;
    $dbinfo = new PDO("mysql:host=$dbhost;dbname=information_schema;charset=utf8",DB_USER,DB_PASS);
	$db = new PDO("mysql:host=$dbhost;dbname=$dbname;charset=utf8",DB_USER,DB_PASS);
	
	//Danh sách bảng với table và title
	$sql = "SELECT  `TABLE_NAME` AS  `table` ,  `TABLE_COMMENT` AS  `title`
		FROM  `TABLES` 
		WHERE  `TABLE_SCHEMA` =  '$dbname' AND `TABLE_NAME` not rlike '^_.+'
			$limittext
		ORDER BY TABLE_NAME";
	$stmt = $dbinfo->query($sql);
	$tables = $stmt->fetchAll(PDO::FETCH_CLASS);
	//var_export($tables);
	
	//Danh sách các cột với table, name, default, isnull, type, max,
	//   key, autoint, comment
	$sql = "SELECT  `TABLE_NAME` as `table`,  `COLUMN_NAME` as `name`,
			`COLUMN_DEFAULT` as `default`,	`IS_NULLABLE` as `isnull`,  
			`DATA_TYPE` as `type`,  `COLUMN_TYPE` as `datatype`,  `CHARACTER_MAXIMUM_LENGTH` as `max`, 
			`COLUMN_KEY` as `key`, `EXTRA` as `autoint`, 
			 `COLUMN_COMMENT` as `comment`
		FROM  `COLUMNS` 
		WHERE  `TABLE_SCHEMA` LIKE  '$dbname'
			AND `COLUMN_NAME` not rlike '^_.+'
			AND `TABLE_NAME` not rlike '^_.+'
			$limittext
		ORDER BY  `TABLE_NAME` ,  `ORDINAL_POSITION`";
	$stmt = $dbinfo->query($sql);
	$columns = $stmt->fetchAll(PDO::FETCH_CLASS);
	$sql = "SELECT `TABLE_NAME` as `table`, `COLUMN_NAME` as `fkey`,
				`REFERENCED_TABLE_NAME` as `jtable`,
				`REFERENCED_COLUMN_NAME` as `pkey`
	    	FROM `KEY_COLUMN_USAGE`
	    	WHERE `CONSTRAINT_SCHEMA` LIKE '$dbname'
	    		$limittext
	    		AND `CONSTRAINT_NAME` <> 'PRIMARY'
	    		AND `REFERENCED_TABLE_NAME` is not null";
	$stmt = $dbinfo->query($sql);
	$constraints = $stmt->fetchAll(PDO::FETCH_CLASS);
	
} catch (PDOException $e) {
    die('Connection failed: ' . $e->getMessage());
}
function getId($table,&$a){
	global $db;
	$stmt = $db->query($query="SHOW CREATE TABLE `$table`");
	if (!$stmt)
		throw new Exception("$query\n".var_export($db->errorInfo(),1));
	$cfg = $stmt->fetchColumn(1);
	$cfg = preg_replace("/AUTO_INCREMENT=\\d+\\s/",'',$cfg)
		. var_export($a['has'],1);
	return md5($cfg);
}
function getClassname($s){
	$s{0} = strtoupper($s{0});
	return $s;
}
function configTable(&$tables, &$cfg){
	foreach ($tables as $table){
		if ($table->table{0}=='_') continue;
		$cfg[getClassname($table->table)] = array(
			'table' => $table->table,
			'title' => $table->title,
			'fields' => array(),
			'keys'	=> array(),
			'fkeys'	=> array(),
			'has'	=> array(),
			'validations'	=> array(),
		);
	}
}
function configFKey(&$constraints, &$cfg){
	foreach ($constraints as $cons){
		$table = getClassname($cons->table);
		$jtable = getClassname($cons->jtable);
		$fkey = strtolower($cons->fkey);
		$pkey = strtolower($cons->pkey);
		$cfg[$table]['fkeys'][$jtable][$fkey] = $pkey;
		$cfg[$jtable]['has'][$table][$fkey] = $pkey;
	}
}
function configColumn(&$columns, &$cfg){
	foreach ($columns as $col){
		if ($col->table{0}=='_') continue;
		$table = &$cfg[getClassname($col->table)];
		switch ($col->type) {
			case 'date':
				$type = 'DBO_DATE';break;
			case 'datetime':
			case 'time':
				$type = 'DBO_TIME';break;
			case 'decimal':
			case 'double':
			case 'float':
				$type = 'DBO_FLOAT';break;
			case 'enum':
			case 'smallint':
			case 'bigint':
			case 'int':
			case 'tinyint':
				$type = 'DBO_NUMB';break;
			case 'timestamp':
				$type = 'DBO_STAM';break;
			default:
				$type = 'DBO_STRI';
		}
		if ($col->autoint=='auto_increment')
			$type = 'DBO_AUTO';

		//if (!$col->comment)
			$col->comment = $col->name;
		
		$table['fields'][$col->name] = array($type,$col->comment,$col->default);
		
		if ($col->key == 'PRI')
			$table['keys'][] = $col->name;
		
		if ($col->isnull == 'NO' && $col->default === NULL 
			&& $type != 'DBO_AUTO' && $type != 'DBO_STAM'
			&& $col->comment){
			$table['validations'][] = array(
				'type' => 'presence',
				'field'=> $col->name,
				'message'=>"Chưa nhập thông tin [{$col->comment}]"
			);
		}
		if ($col->max !== NULL && $col->max > 0){
			$table['validations'][] = array(
				'type' => 'length',
				'field'=> $col->name,
				'message'=>"Thông tin [{$col->comment}] dài hơn {$col->max} ký tự",
				'max'=>intval($col->max)
			);
		}
		if (preg_match('/email/i', $col->name)){
			$table['validations'][] = array(
				'type' => 'email',
				'field'=> $col->name,
				'message'=>"[{$col->comment}] không đúng dạng địa chỉ email (abc@xyz.com)"
			);
		}
	}
}
function viewOutput($class, $array,$title){
	echo '<div class="'.$class.'">';
	echo "<h3>$title</h3>";
	echo implode(', ',$array);
	echo '</div>';
}
