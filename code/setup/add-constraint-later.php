<?php

$source = 'd:/testts-full-2016-03-22.sql';
$dest   = 'd:/testts-full-2016-03-22-fix.sql';

$lines = file($source);
$appends = [];
$ends = [];
$drops = [];
$table = 0;
$flag = $start = 0;
echo '<pre>';
foreach($lines as $i=>$li){
	$li = $lines[$i] = preg_replace("/[\\r\\n]+/",'',$li);
	if ($flag){
		unset($lines[$i]);
		$ends[] = $li;
	}elseif (preg_match("/^DROP TABLE IF EXISTS /",$li)){
		$drops[] = $li;
		unset($lines[$i]);
	}elseif (preg_match("/^USE /",$li)){
		$start = $i+1;
	}elseif (preg_match("/^CREATE TABLE `(\\w+)`/",$li,$matches)){
		$table = $matches[1];
		$appends[$table] = [];
	}elseif (preg_match("/^\\s*KEY/",$li)||preg_match("/^\\s*CONSTRAINT/",$li)){
		if (isset($lines[$i-1]))
			$lines[$i-1] = preg_replace("/,$/",'',$lines[$i-1]);
		unset($lines[$i]);
		$li = preg_replace("/,$/",'',$li);
		$appends[$table][] = "ADD $li";
	}elseif (preg_match("/AUTO_INCREMENT=/",$li)){
		$lines[$i] = preg_replace("/AUTO_INCREMENT=\\d+/",'',$li);
	}elseif (preg_match("/40101 SET SQL_MODE=@OLD_SQL_MODE/",$li)){
		$flag = 1;
		unset($lines[$i]);
		$ends[] = $li;
	}
}
foreach($appends as $table=>$alter){
	if (count($alter))
		$appends[$table] = "ALTER TABLE `$table`\n".implode(",\n    ",$alter).";\n";
	else unset($appends[$table]);
}
array_splice($lines,$start,0,$drops);
file_put_contents($dest, implode("\n",$lines));
file_put_contents($dest, implode("\n",$appends),FILE_APPEND);
file_put_contents($dest, implode("\n",$ends),FILE_APPEND);
echo "Fix from $source to $dest finish!";