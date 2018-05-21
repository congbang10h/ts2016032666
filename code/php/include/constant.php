<?php
//Các hằng số về quyền truy xuất
define('UR_CLIENT',		1);
define('UR_STUDENT',	2);
define('UR_TEACHER',	4);
define('UR_MANAGER', 	8);
define('UR_MEMBER',		16);
define('UR_ADMIN',		32);
define('UR_OWNER',		64);

define('UR_ALL',		63);
define('UR_ALLC',		1+2+16);
define('UR_ALLM',		8+32);

define('DBO_AUTO',1);//Auto increment
define('DBO_NUMB',2); //int
define('DBO_FLOAT',3); //float or double
define('DBO_STRI',4); //char, varchar, text, blob
define('DBO_DATE',5);//date
define('DBO_TIME',6);//datetime,time
define('DBO_STAM',7);//timestamp

//Kiểu câu hỏi trong question
define('QT_STRING'	,	1);
define('QT_NUMBER'	,	2);
define('QT_ACHOICE'	,	4);
define('QT_NCHOICE'	,	8);

//Kiểu câu hỏi trong history
define('QH_TRAIN'	,	0);
define('QH_TEST'	,	1);
define('QH_IMPROVE',	2);

//Độ khó của câu hỏi
define('QD_EASY'	,	1);
define('QD_MEDIUM'	,	2);
define('QD_HARD'	,	3);

//Loại bài kiểm tra, xác định các câu hỏi lấy từ:
define('TSET_ALL',		1);//tất cả
define('TSET_SUB',		2);//một phần 
define('TLEVEL_ONE',	1);//hiện tại
define('TLEVEL_ALL',	2);//hiện tại + phía trước

//Loại duyệt đề thi, theo quy định của field test_review_code
define('RV_NOTYET',0);
define('RV_DISAPPROVED',1);
define('RV_MODIFY', 2);
define('RV_APPROVED',3);

define('SEX_UNKNOW'	,	0);
define('SEX_MAN'	,	1);
define('SEX_WOMAN'	,	2);

define('L_DISABLE',1);
define('L_CONSOLE',2);
define('L_FILE',4);

define('LT_QUERY',1);
define('LT_CHANGE',2);
define('LT_ALL',3);

define('FORMAT_SQL_DATE','Y-m-d');
define('FORMAT_SQL_DATETIME','Y-m-d H:i:s');
define('DB_CHK_NONE',0);
define('DB_CHK_AUTHORISE',1);
define('DB_CHK_VALIDATE',2);
define('DB_CHK_FULL',3);

define('DB_FETCH_SIMPLE',0);
define('DB_FETCH_FULL',1);
