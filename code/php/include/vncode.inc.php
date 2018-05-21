<?php
/**
 * Last edit: 2014-03-24
 * Su dung cho cac chuc nang lien quan den tieng Viet
 * DON'T EDIT BY EDITOR WHICH DON'T SUPPORT ANSI ENCODING
 */

class VNCode {
	public static $UNI = array(//Unicode precomposed - unicode dung san - tot nhat
'Ä‘','Ä',
     'Ã¡', 'Ã ', 'áº£', 'Ã£', 'áº¡',
'Äƒ', 'áº¯', 'áº±', 'áº³', 'áºµ', 'áº·',
'Ã¢', 'áº¥', 'áº§', 'áº©', 'áº«', 'áº­',
     'Ã©', 'Ã¨', 'áº»', 'áº½', 'áº¹',
'Ãª', 'áº¿', 'á»', 'á»ƒ', 'á»…', 'á»‡',
     'Ã­', 'Ã¬', 'á»‰', 'Ä©', 'á»‹',
     'Ã³', 'Ã²', 'á»', 'Ãµ', 'á»',
'Æ¡', 'á»›', 'á»', 'á»Ÿ', 'á»¡', 'á»£',
'Ã´', 'á»‘', 'á»“', 'á»•', 'á»—', 'á»™',
     'Ãº', 'Ã¹', 'á»§', 'Å©', 'á»¥',
'Æ°', 'á»©', 'á»«', 'á»­', 'á»¯', 'á»±', 
     'Ã½', 'á»³', 'á»·', 'á»¹', 'á»µ',
     'Ã', 'Ã€', 'áº¢', 'Ãƒ', 'áº ',
'Ä‚', 'áº®', 'áº°', 'áº²', 'áº´', 'áº¶',
'Ã‚', 'áº¤', 'áº¦', 'áº¨', 'áºª', 'áº¬',
     'Ã‰', 'Ãˆ', 'áºº', 'áº¼', 'áº¸',
'ÃŠ', 'áº¾', 'á»€', 'á»‚', 'á»„', 'á»†',
     'Ã', 'ÃŒ', 'á»ˆ', 'Ä¨', 'á»Š',
     'Ã“', 'Ã’', 'á»Ž', 'Ã•', 'á»Œ',
'Æ ', 'á»š', 'á»œ', 'á»ž', 'á» ', 'á»¢',
'Ã”', 'á»', 'á»’', 'á»”', 'á»–', 'á»˜',
     'Ãš', 'Ã™', 'á»¦', 'Å¨', 'á»¤',
'Æ¯', 'á»¨', 'á»ª', 'á»¬', 'á»®', 'á»°',
     'Ã', 'á»²', 'á»¶', 'á»¸', 'á»´'
	);
	public static $UNI_C = array(//Unicode composed - Unicode to hop
'Ä‘','Ä',
     'aÌ', 'aÌ€', 'aÌ‰', 'aÌƒ', 'aÌ£',
'Äƒ', 'ÄƒÌ', 'ÄƒÌ€', 'ÄƒÌ‰', 'ÄƒÌƒ', 'ÄƒÌ£',
'Ã¢', 'Ã¢Ì', 'Ã¢Ì€', 'Ã¢Ì‰', 'Ã¢Ìƒ', 'Ã¢Ì£',
     'eÌ', 'eÌ€', 'eÌ‰', 'eÌƒ', 'eÌ£',
'Ãª', 'ÃªÌ', 'ÃªÌ€', 'ÃªÌ‰', 'ÃªÌƒ', 'ÃªÌ£',
     'iÌ', 'iÌ€', 'iÌ‰', 'iÌƒ', 'iÌ£',
     'oÌ', 'oÌ€', 'oÌ‰', 'oÌƒ', 'oÌ£',
'Æ¡', 'Æ¡Ì', 'Æ¡Ì€', 'Æ¡Ì‰', 'Æ¡Ìƒ', 'Æ¡Ì£',
'Ã´', 'Ã´Ì', 'Ã´Ì€', 'Ã´Ì‰', 'Ã´Ìƒ', 'Ã´Ì£',
     'uÌ', 'uÌ€', 'uÌ‰', 'uÌƒ', 'uÌ£',
'Æ°', 'Æ°Ì', 'Æ°Ì€', 'Æ°Ì‰', 'Æ°Ìƒ', 'Æ°Ì£', 
     'yÌ', 'yÌ€', 'yÌ‰', 'yÌƒ', 'yÌ£',
     'AÌ', 'AÌ€', 'AÌ‰', 'AÌƒ', 'AÌ£',
'Ä‚', 'Ä‚Ì', 'Ä‚Ì€', 'Ä‚Ì‰', 'Ä‚Ìƒ', 'Ä‚Ì£',
'Ã‚', 'Ã‚Ì', 'Ã‚Ì€', 'Ã‚Ì‰', 'Ã‚Ìƒ', 'Ã‚Ì£',
     'EÌ', 'EÌ€', 'EÌ‰', 'EÌƒ', 'EÌ£',
'ÃŠ', 'ÃŠÌ', 'ÃŠÌ€', 'ÃŠÌ‰', 'ÃŠÌƒ', 'ÃŠÌ£',
     'IÌ', 'IÌ€', 'IÌ‰', 'IÌƒ', 'IÌ£',
     'OÌ', 'OÌ€', 'OÌ‰', 'OÌƒ', 'OÌ£',
'Æ ', 'Æ Ì', 'Æ Ì€', 'Æ Ì‰', 'Æ Ìƒ', 'Æ Ì£',
'Ã”', 'Ã”Ì', 'Ã”Ì€', 'Ã”Ì‰', 'Ã”Ìƒ', 'Ã”Ì£',
     'UÌ', 'UÌ€', 'UÌ‰', 'UÌƒ', 'UÌ£',
'Æ¯', 'Æ¯Ì', 'Æ¯Ì€', 'Æ¯Ì‰', 'Æ¯Ìƒ', 'Æ¯Ì£',
     'YÌ', 'YÌ€', 'YÌ‰', 'YÌƒ', 'YÌ£'
	);
public static $ABC = array(
'®','§',
     '¸', 'µ', '¶', '·', '¹',
'¨', '¾', '»', '¼', '½', 'Æ',
'©', 'Ê', 'Ç', 'È', 'É', 'Ë',
     'Ð', 'Ì', 'Î', 'Ï', 'Ñ',
'ª', 'Õ', 'Ò', 'Ó', 'Ô', 'Ö',
     'Ý', '×', 'Ø', 'Ü', 'Þ',
     'ã', 'ß', 'á', 'â', 'ä',
'¬', 'í', 'ê', 'ë', 'ì', 'î',
'«', 'è', 'å', 'æ', 'ç', 'é',
     'ó', 'ï', 'ñ', 'ò', 'ô',
'­', 'ø', 'õ', 'ö', '÷', 'ù', 
     'ý', 'ú', 'û', 'ü', 'þ',
     '¸', 'µ', '¶', '·', '¹',
'¡', '¾', '»', '¼', '½', 'Æ',
'¢', 'Ê', 'Ç', 'È', 'É', 'Ë',
     'Ð', 'Ì', 'Î', 'Ï', 'Ñ',
'£', 'Õ', 'Ò', 'Ó', 'Ô', 'Ö',
     'Ý', '×', 'Ø', 'Ü', 'Þ',
     'ã', 'ß', 'á', 'â', 'ä',
'¥', 'í', 'ê', 'ë', 'ì', 'î',
'¤', 'è', 'å', 'æ', 'ç', 'é',
     'ó', 'ï', 'ñ', 'ò', 'ô',
'¦', 'ø', 'õ', 'ö', '÷', 'ù',
     'ý', 'ú', 'û', 'ü', 'þ'
);
	public static $ABCUTF8 = array(
'Â®','Â§',
'Â¸', 'Âµ', 'Â¶', 'Â·', 'Â¹',
'Â¨', 'Â¾', 'Â»', 'Â¼', 'Â½', 'Ã†',
'Â©', 'ÃŠ', 'Ã‡', 'Ãˆ', 'Ã‰', 'Ã‹',
'Ã', 'ÃŒ', 'ÃŽ', 'Ã', 'Ã‘',
'Âª', 'Ã•', 'Ã’', 'Ã“', 'Ã”', 'Ã–',
'Ã', 'Ã—', 'Ã˜', 'Ãœ', 'Ãž',
'Ã£', 'ÃŸ', 'Ã¡', 'Ã¢', 'Ã¤',
'Â¬', 'Ã­', 'Ãª', 'Ã«', 'Ã¬', 'Ã®',
'Â«', 'Ã¨', 'Ã¥', 'Ã¦', 'Ã§', 'Ã©',
'Ã³', 'Ã¯', 'Ã±', 'Ã²', 'Ã´',
'Â­', 'Ã¸', 'Ãµ', 'Ã¶', 'Ã·', 'Ã¹',
'Ã½', 'Ãº', 'Ã»', 'Ã¼', 'Ã¾',
'Â¸', 'Âµ', 'Â¶', 'Â·', 'Â¹',
'Â¡', 'Â¾', 'Â»', 'Â¼', 'Â½', 'Ã†',
'Â¢', 'ÃŠ', 'Ã‡', 'Ãˆ', 'Ã‰', 'Ã‹',
'Ã', 'ÃŒ', 'ÃŽ', 'Ã', 'Ã‘',
'Â£', 'Ã•', 'Ã’', 'Ã“', 'Ã”', 'Ã–',
'Ã', 'Ã—', 'Ã˜', 'Ãœ', 'Ãž',
'Ã£', 'ÃŸ', 'Ã¡', 'Ã¢', 'Ã¤',
'Â¥', 'Ã­', 'Ãª', 'Ã«', 'Ã¬', 'Ã®',
'Â¤', 'Ã¨', 'Ã¥', 'Ã¦', 'Ã§', 'Ã©',
'Ã³', 'Ã¯', 'Ã±', 'Ã²', 'Ã´',
'Â¦', 'Ã¸', 'Ãµ', 'Ã¶', 'Ã·', 'Ã¹',
'Ã½', 'Ãº', 'Ã»', 'Ã¼', 'Ã¾'
);
	public static $NCR_VNI = array(
273=>'ñ', 272=>'Ñ', 225=>'aù', 224=>'aø', 7843=>'aû', 227=>'aõ', 7841=>'aï', 259=>'aê', 7855=>'aé',
7857=>'aè', 7859=>'aú', 7861=>'aü', 7863=>'aë', 226=>'aâ', 7845=>'aá', 7847=>'aà', 7849=>'aå', 7851=>'aã',
7853=>'aä', 233=>'eù', 232=>'eø', 7867=>'eû', 7869=>'eõ', 7865=>'eï', 234=>'eâ', 7871=>'eá', 7873=>'eà',
7875=>'eå', 7877=>'eã', 7879=>'eä', 237=>'í', 236=>'ì', 7881=>'æ', 297=>'ó', 7883=>'ò', 243=>'où',
242=>'oø', 7887=>'oû', 245=>'oõ', 7885=>'oï', 7899=>'ôù', 7901=>'ôø', 7903=>'ôû', 7905=>'ôõ', 7907=>'ôï',
417=>'ô', 244=>'oâ', 7889=>'oá', 7891=>'oà', 7893=>'oå', 7895=>'oã', 7897=>'oä', 250=>'uù', 249=>'uø',
7911=>'uû', 361=>'uõ', 7909=>'uï', 7913=>'öù', 7915=>'öø', 7917=>'öû', 7919=>'öõ', 7921=>'öï', 432=>'ö',
253=>'yù', 7923=>'yø', 7927=>'yû', 7929=>'yõ', 7925=>'î', 193=>'AÙ', 192=>'AØ', 7842=>'AÛ', 195=>'AÕ',
7840=>'AÏ', 258=>'AÊ', 7854=>'AÉ', 7856=>'AÈ', 7858=>'AÚ', 7860=>'AÜ', 7862=>'AË', 194=>'AÂ', 7844=>'AÁ',
7846=>'AÀ', 7848=>'AÅ', 7850=>'AÃ', 7852=>'AÄ', 201=>'EÙ', 200=>'EØ', 7866=>'EÛ', 7868=>'EÕ', 7864=>'EÏ',
202=>'EÂ', 7870=>'EÁ', 7872=>'EÀ', 7874=>'EÅ', 7876=>'EÃ', 7878=>'EÄ', 205=>'Í', 204=>'Ì', 7880=>'Æ',
296=>'Ó', 7882=>'Ò', 211=>'OÙ', 210=>'OØ', 7886=>'OÛ', 213=>'OÕ', 7884=>'OÏ', 7898=>'ÔÙ', 7900=>'ÔØ',
7902=>'ÔÛ', 7904=>'ÔÕ', 7906=>'ÔÏ', 416=>'Ô', 212=>'OÂ', 7888=>'OÁ', 7890=>'OÀ', 7892=>'OÅ', 7894=>'OÃ',
7896=>'OÄ', 218=>'UÙ', 217=>'UØ', 7910=>'UÛ', 360=>'UÕ', 7908=>'UÏ', 431=>'Ö', 7912=>'ÖÙ', 7914=>'ÖØ',
7916=>'ÖÛ', 7918=>'ÖÕ', 7920=>'ÖÏ', 221=>'YÙ', 7922=>'YØ', 7926=>'YÛ', 7928=>'YÕ', 7924=>'Î');
	public static $VNI_NCR = array(
'aù'=>225,'aø'=>224,'aû'=>7843,'aõ'=>227,'aï'=>7841,'aê'=>259,'aé'=>7855,'aè'=>7857,'aú'=>7859,'aü'=>7861,
'aë'=>7863,'aâ'=>226,'aá'=>7845,'aà'=>7847,'aå'=>7849,'aã'=>7851,'aä'=>7853,'eù'=>233,'eø'=>232,'eû'=>7867,
'eõ'=>7869,'eï'=>7865,'eâ'=>234,'eá'=>7871,'eà'=>7873,'eå'=>7875,'eã'=>7877,'eä'=>7879,'où'=>243,'oø'=>242,
'oû'=>7887,'oõ'=>245,'oï'=>7885,'ôù'=>7899,'ôø'=>7901,'ôû'=>7903,'ôõ'=>7905,'ôï'=>7907,'oâ'=>244,'oá'=>7889,
'oà'=>7891,'oå'=>7893,'oã'=>7895,'oä'=>7897,'uù'=>250,'uø'=>249,'uû'=>7911,'uõ'=>361,'uï'=>7909,'öù'=>7913,
'öø'=>7915,'öû'=>7917,'öõ'=>7919,'öï'=>7921,'yù'=>253,'yø'=>7923,'yû'=>7927,'yõ'=>7929,'AÙ'=>193,'AØ'=>192,
'AÛ'=>7842,'AÕ'=>195,'AÏ'=>7840,'AÊ'=>258,'AÉ'=>7854,'AÈ'=>7856,'AÚ'=>7858,'AÜ'=>7860,'AË'=>7862,'AÂ'=>194,
'AÁ'=>7844,'AÀ'=>7846,'AÅ'=>7848,'AÃ'=>7850,'AÄ'=>7852,'EÙ'=>201,'EØ'=>200,'EÛ'=>7866,'EÕ'=>7868,'EÏ'=>7864,
'EÂ'=>202,'EÁ'=>7870,'EÀ'=>7872,'EÅ'=>7874,'EÃ'=>7876,'EÄ'=>7878,'OÙ'=>211,'OØ'=>210,'OÛ'=>7886,'OÕ'=>213,
'OÏ'=>7884,'ÔÙ'=>7898,'ÔØ'=>7900,'ÔÛ'=>7902,'ÔÕ'=>7904,'ÔÏ'=>7906,'OÂ'=>212,'OÁ'=>7888,'OÀ'=>7890,'OÅ'=>7892,
'OÃ'=>7894,'OÄ'=>7896,'UÙ'=>218,'UØ'=>217,'UÛ'=>7910,'UÕ'=>360,'UÏ'=>7908,'ÖÙ'=>7912,'ÖØ'=>7914,'ÖÛ'=>7916,
'ÖÕ'=>7918,'ÖÏ'=>7920,'YÙ'=>221,'YØ'=>7922,'YÛ'=>7926,'YÕ'=>7928,'aÙ'=>225,'aØ'=>224,'aÛ'=>7843,'aÕ'=>227,
'aÏ'=>7841,'aÊ'=>259,'aÉ'=>7855,'aÈ'=>7857,'aÚ'=>7859,'aÜ'=>7861,'aË'=>7863,'aÂ'=>226,'aÁ'=>7845,'aÀ'=>7847,
'aÅ'=>7849,'aÃ'=>7851,'aÄ'=>7853,'eÙ'=>233,'eØ'=>232,'eÛ'=>7867,'eÕ'=>7869,'eÏ'=>7865,'eÂ'=>234,'eÁ'=>7871,
'eÀ'=>7873,'eÅ'=>7875,'eÃ'=>7877,'eÄ'=>7879,'oÙ'=>243,'oØ'=>242,'oÛ'=>7887,'oÕ'=>245,'oÏ'=>7885,'ôÙ'=>7899,
'ôØ'=>7901,'ôÛ'=>7903,'ôÕ'=>7905,'ôÏ'=>7907,'oÂ'=>244,'oÁ'=>7889,'oÀ'=>7891,'oÅ'=>7893,'oÃ'=>7895,'oÄ'=>7897,
'uÙ'=>250,'uØ'=>249,'uÛ'=>7911,'uÕ'=>361,'uÏ'=>7909,'öÙ'=>7913,'öØ'=>7915,'öÛ'=>7917,'öÕ'=>7919,'öÏ'=>7921,
'yÙ'=>253,'yØ'=>7923,'yÛ'=>7927,'yÕ'=>7929,'Aù'=>193,'Aø'=>192,'Aû'=>7842,'Aõ'=>195,'Aï'=>7840,'Aê'=>258,
'Aé'=>7854,'Aè'=>7856,'Aú'=>7858,'Aü'=>7860,'Aë'=>7862,'Aâ'=>194,'Aá'=>7844,'Aà'=>7846,'Aå'=>7848,'Aã'=>7850,
'Aä'=>7852,'Eù'=>201,'Eø'=>200,'Eû'=>7866,'Eõ'=>7868,'Eï'=>7864,'Eâ'=>202,'Eá'=>7870,'Eà'=>7872,'Eå'=>7874,
'Eã'=>7876,'Eä'=>7878,'Où'=>211,'Oø'=>210,'Oû'=>7886,'Oõ'=>213,'Oï'=>7884,'Ôù'=>7898,'Ôø'=>7900,'Ôû'=>7902,
'Ôõ'=>7904,'Ôï'=>7906,'Oâ'=>212,'Oá'=>7888,'Oà'=>7890,'Oå'=>7892,'Oã'=>7894,'Oä'=>7896,'Uù'=>218,'Uø'=>217,
'Uû'=>7910,'Uõ'=>360,'Uï'=>7908,'Öù'=>7912,'Öø'=>7914,'Öû'=>7916,'Öõ'=>7918,'Öï'=>7920,'Yù'=>221,'Yø'=>7922,
'Yû'=>7926,'Yõ'=>7928,'ñ'=>273,'Ñ'=>272,'í'=>237,'ì'=>236,'æ'=>7881,'ó'=>297,'ò'=>7883,'ô'=>417,'ö'=>432,
'î'=>7925,'Í'=>205,'Ì'=>204,'Æ'=>7880,'Ó'=>296,'Ò'=>7882,'Ô'=>416,'Ö'=>431,'Î'=>7924);
	public static $NCR_VN0 = array(
273=>'d', 272=>'D', 225=>'a', 224=>'a', 7843=>'a', 227=>'a', 7841=>'a', 259=>'a', 7855=>'a',
7857=>'a', 7859=>'a', 7861=>'a', 7863=>'a', 226=>'a', 7845=>'a', 7847=>'a', 7849=>'a', 7851=>'a',
7853=>'a', 233=>'e', 232=>'e', 7867=>'e', 7869=>'e', 7865=>'e', 234=>'e', 7871=>'e', 7873=>'e',
7875=>'e', 7877=>'e', 7879=>'e', 237=>'i', 236=>'i', 7881=>'i', 297=>'i', 7883=>'i', 243=>'o',
242=>'o', 7887=>'o', 245=>'o', 7885=>'o', 7899=>'o', 7901=>'o', 7903=>'o', 7905=>'o', 7907=>'o',
417=>'o', 244=>'o', 7889=>'o', 7891=>'o', 7893=>'o', 7895=>'o', 7897=>'o', 250=>'u', 249=>'u',
7911=>'u', 361=>'u', 7909=>'u', 7913=>'u', 7915=>'u', 7917=>'u', 7919=>'u', 7921=>'u', 432=>'u',
253=>'y', 7923=>'y', 7927=>'y', 7929=>'y', 7925=>'y', 193=>'A', 192=>'A', 7842=>'A', 195=>'A',
7840=>'A', 258=>'A', 7854=>'A', 7856=>'A', 7858=>'A', 7860=>'A', 7862=>'A', 194=>'A', 7844=>'A',
7846=>'A', 7848=>'A', 7850=>'A', 7852=>'A', 201=>'E', 200=>'E', 7866=>'E', 7868=>'E', 7864=>'E',
202=>'E', 7870=>'E', 7872=>'E', 7874=>'E', 7876=>'E', 7878=>'E', 205=>'I', 204=>'I', 7880=>'I',
296=>'I', 7882=>'I', 211=>'O', 210=>'O', 7886=>'O', 213=>'O', 7884=>'O', 7898=>'O', 7900=>'O',
7902=>'O', 7904=>'O', 7906=>'O', 416=>'O', 212=>'O', 7888=>'O', 7890=>'O', 7892=>'O', 7894=>'O',
7896=>'O', 218=>'U', 217=>'U', 7910=>'U', 360=>'U', 7908=>'U', 431=>'U', 7912=>'U', 7914=>'U',
7916=>'U', 7918=>'U', 7920=>'U', 221=>'Y', 7922=>'Y', 7926=>'Y', 7928=>'Y', 7924=>'Y');
	/**
	 *@return int
	 *@desc Tra ve phan tu str[index] va tang index len 1
	 */
	public static function _nextCode($str, &$index){
		if ($index >= strlen($str)) return 0;
		return ord($str[$index++]);
	}
	
	/**
	 * @return string
	 * @desc Doi chuoi tu dang UTF-8 sang dang Decimal
	 */
	public static function UTF8NCR($str){
		$result = '';
		$len = strlen($str);
		for($i=0;$i<$len;){
			$code = VNCode::_nextCode($str,$i);
			if (($code & 0xF0) == 0xF0){//11110000, 4 byte
				$b1 = $code & 0x07; //111
				$code = VNCode::_nextCode($str,$i);
				$b2 = $code & 0x3F; //111111
				$code = VNCode::_nextCode($str,$i);
				$b3 = $code & 0x3F; //111111
				$code = VNCode::_nextCode($str,$i);
				$b4 = $code & 0x3F; //111111
				$code = ((((($b1 << 6) | $b2) << 6) | $b3) << 6) | $b4;
				$result .= '&#'.$code.';';
			}elseif (($code & 0xE0) == 0xE0){//1110000, 3 byte
				$b1 = $code & 0x0F; //1111
				$code = VNCode::_nextCode($str,$i);
				$b2 = $code & 0x3F; //111111
				$code = VNCode::_nextCode($str,$i);
				$b3 = $code & 0x3F; //111111
				$code = ((($b1 << 6) | $b2) << 6) | $b3;
				$result .= '&#'.$code.';';
			}elseif (($code & 0xC0) == 0xC0){//1100000, 2 byte
				$b1 = $code & 0x1F; //11111
				$code = VNCode::_nextCode($str,$i);
				$b2 = $code & 0x3F; //111111
				$code = ($b1 << 6) | $b2;
				$result .= '&#'.$code.';';
			}else{
				$result .= chr($code);
			}
		}
		return $result;
	}
	public static function UTF8UNI($str){
		$CT = VNCode::$NCR_UNI;
		$result = '';
		$len = strlen($str);
		for($i=0;$i<$len;){
			$code = VNCode::_nextCode($str,$i);
			if (($code & 0xF0) == 0xF0){//11110000, 4 byte
				$b1 = $code & 0x07; //111
				$code = VNCode::_nextCode($str,$i);
				$b2 = $code & 0x3F; //111111
				$code = VNCode::_nextCode($str,$i);
				$b3 = $code & 0x3F; //111111
				$code = VNCode::_nextCode($str,$i);
				$b4 = $code & 0x3F; //111111
				$code = ((((($b1 << 6) | $b2) << 6) | $b3) << 6) | $b4;
				$result .= $CT[$code];
			}elseif (($code & 0xE0) == 0xE0){//1110000, 3 byte
				$b1 = $code & 0x0F; //1111
				$code = VNCode::_nextCode($str,$i);
				$b2 = $code & 0x3F; //111111
				$code = VNCode::_nextCode($str,$i);
				$b3 = $code & 0x3F; //111111
				$code = ((($b1 << 6) | $b2) << 6) | $b3;
				$result .= $CT[$code];
			}elseif (($code & 0xC0) == 0xC0){//1100000, 2 byte
				$b1 = $code & 0x1F; //11111
				$code = VNCode::_nextCode($str,$i);
				$b2 = $code & 0x3F; //111111
				$code = ($b1 << 6) | $b2;
				$result .= $CT[$code];
			}else{
				$result .= chr($code);
			}
		}
		return $result;
	}
	
	/**
	 * @return string
	 * @desc Doi chuoi tu dang UTF8 sang dang VNI
	 */
	public static function UTF8VNI($str){
		$CT = &VNCode::$NCR_VNI;
		$result = '';
		$len = strlen($str);
		for($i=0;$i<$len;){
			$code = VNCode::_nextCode($str,$i);
			if (($code & 0xF0) == 0xF0){//11110000, 4 byte
				$b1 = $code & 0x07; //111
				$code = VNCode::_nextCode($str,$i);
				$b2 = $code & 0x3F; //111111
				$code = VNCode::_nextCode($str,$i);
				$b3 = $code & 0x3F; //111111
				$code = VNCode::_nextCode($str,$i);
				$b4 = $code & 0x3F; //111111
				$code = ((((($b1 << 6) | $b2) << 6) | $b3) << 6) | $b4;
				$result .= isset($CT[$code]) ? $CT[$code] : chr($code);
			}elseif (($code & 0xE0) == 0xE0){//1110000, 3 byte
				$b1 = $code & 0x0F; //1111
				$code = VNCode::_nextCode($str,$i);
				$b2 = $code & 0x3F; //111111
				$code = VNCode::_nextCode($str,$i);
				$b3 = $code & 0x3F; //111111
				$code = ((($b1 << 6) | $b2) << 6) | $b3;
				$result .= isset($CT[$code]) ? $CT[$code] : chr($code);
			}elseif (($code & 0xC0) == 0xC0){//1100000, 2 byte
				$b1 = $code & 0x1F; //11111
				$code = VNCode::_nextCode($str,$i);
				$b2 = $code & 0x3F; //111111
				$code = ($b1 << 6) | $b2;
				$result .= isset($CT[$code]) ? $CT[$code] : chr($code);
			}else{
				$result .= chr($code);
			}
		}
		return $result;
	}
	
	public static function UTF8VN0($str){
		$CT = &VNCode::$NCR_VN0;
		$result = '';
		$len = strlen($str);
		for($i=0;$i<$len;){
			$code = VNCode::_nextCode($str,$i);
			if (($code & 0xF0) == 0xF0){//11110000, 4 byte
				$b1 = $code & 0x07; //111
				$code = VNCode::_nextCode($str,$i);
				$b2 = $code & 0x3F; //111111
				$code = VNCode::_nextCode($str,$i);
				$b3 = $code & 0x3F; //111111
				$code = VNCode::_nextCode($str,$i);
				$b4 = $code & 0x3F; //111111
				$code = ((((($b1 << 6) | $b2) << 6) | $b3) << 6) | $b4;
				//if (!isset($CT[$code])) echo "UTF8 code error (1) char $code<br>";
				$result .= isset($CT[$code]) ? $CT[$code] : '-';
			}elseif (($code & 0xE0) == 0xE0){//1110000, 3 byte
				$b1 = $code & 0x0F; //1111
				$code = VNCode::_nextCode($str,$i);
				$b2 = $code & 0x3F; //111111
				$code = VNCode::_nextCode($str,$i);
				$b3 = $code & 0x3F; //111111
				$code = ((($b1 << 6) | $b2) << 6) | $b3;
				//if (!isset($CT[$code])) echo "UTF8 code error (2) char $code<br>";
				$result .= isset($CT[$code]) ? $CT[$code] : '-';
			}elseif (($code & 0xC0) == 0xC0){//1100000, 2 byte
				$b1 = $code & 0x1F; //11111
				$code = VNCode::_nextCode($str,$i);
				$b2 = $code & 0x3F; //111111
				$code = ($b1 << 6) | $b2;
				//if (!isset($CT[$code])) echo "UTF8 code error (3) char $code<br>";
				$result .= isset($CT[$code]) ? $CT[$code] : '-';
			}else{
				$result .= chr($code);
			}
		}
		return $result;
	}

	/**
	 * @return string
	 * @desc Doi chuoi tu dang Decimal sang dang UTF-8
	 */
	public static function NCRVNI($str){
		$CT = &VNCode::$NCR_VNI;
		$len = strlen($str);
		$result = '';
		for($i=0;$i<$len;$i++){
			$n = '';
			if ($str[$i] == '&'){
				$k = $i+1;
				if ($k < $len && $str[$k] == '#'){
					$k++;
					while ($k < $len && is_numeric($str[$k]))
						$n .= $str[$k++];
					if ($k < $len && $str[$k]==';')
						$i = $k;
				}
			}
			if ($n!=''){
				$n = intval($n);
				$result .= isset($CT[$n]) ? $CT[$n] : '-';
			}else
				$result .= $str[$i];
		}
		return $result;
	}

	/**
	 * @return string
	 * @desc Doi chuoi tu dang Decimal sang dang UTF-8
	 */
	public static function NCRUTF8($str){
		$len = strlen($str);
		$result = '';
		for($i=0;$i<$len;$i++){
			$n = '';
			if ($str[$i] == '&'){
				$k = $i+1;
				if ($k < $len && $str[$k] == '#'){
					$k++;
					while ($k < $len && is_numeric($str[$k]))
						$n .= $str[$k++];
					if ($k < $len && $str[$k]==';')
						$i = $k;
				}
			}
			if ($n!=''){
				$n = intval($n);
				$result .= VNCode::toUTF8($n);
			}else
				$result .= $str[$i];
		}
		return $result;
	}

	/**
	 * @desc Chuyen ma tu Unicode composed thanh Unicode precomposed
	 */
	public static function toUniPrecomposed($s){
		return str_replace(VNCode::$UNI_C,VNCode::$UNI,$s);
	}
	/**
	 * @desc Chuyen 1 chuoi tu ma VNI sang ma UTF-8
	 */
	public static function VNIUTF8($str){
		$CT = &VNCode::$VNI_NCR;
		$s = '';
		$l=strlen($str)-1;
		for($i=0;$i<$l;$i++){
			$d = $str[$i].$str[$i+1];
			if (isset($CT[$d])){
				$s .= VNCode::toUTF8($CT[$d]);
				$i++;
			}elseif (isset($CT[$str[$i]]))
				$s .= VNCode::toUTF8($CT[$str[$i]]);
			else
				$s .= $str[$i];
		}
		if ($i==$l){
			$s .= isset($CT[$str[$i]])?VNCode::toUTF8($CT[$str[$i]]):$str[$i];
		}
		return $s;
	}
	public static function ABCUTF8_UNI($str){//Tai lieu dang ABC nhung bi doc/hieu dang UTF-8
		$A = &VNCode::$ABCUTF8;
		$B = &VNCode::$UNI;
		$s = '';
		$len=strlen($str);
		for($i=0;$i<$len;$i++){
			$t=$str[$i];
			$c = ord($t);
			if (32<=$c && $c<=126){
				$s .= $t;
				continue;
			}
			$p = array_search($t,$A);
			for($j=0;$p===false && $j<=3 && $i+$j+1<$len;$j++){
				$t .= $str[$i+$j+1];
				$p = array_search($t,$A);
			}
			if ($p!==false){
				$s .= $B[$p];
				$i += $j;
			}else
				$s .= $str[$i];
		}
		return $s;
	}
	public static function ABCUNI($str){
		$A = &VNCode::$ABC;
		$B = &VNCode::$UNI;
		$s = '';
		$len=strlen($str);
		for($i=0;$i<$len;$i++){
			$t=$str[$i];
			$c = ord($t);
			if (32<=$c && $c<=126){
				$s .= $t;
				continue;
			}
			$p = array_search($t,$A);
			if ($p!==false){
				$s .= $B[$p];
			}else
				$s .= $str[$i];
		}
		return $s;
	}
	/**
	 * @return string
	 * @desc Tra ve chuoi UTF-8 tuong ung voi $n
	 */
	public static function toUTF8($n){
		$s = '';
		$first = 0;
		$mask = 0x80;
		while ($n>0){
			$byte = $n & 0x3F; //00111111
			$n = $n >> 6;
			if ($n) $s = chr($byte | 0x80).$s;
			$first = $first | $mask;
			$mask  = $mask >> 1;
		}
		$s = chr($first | $byte).$s;
		return $s;
	}
	
	/**
	 * @return int
	 * @desc Tra ve vi tri that cua chu cai thu index trong chuoi unicode UTF-8
	 */
	public static function indexUTF8($data, $index){
		$len = strlen($data);
		if ($len==0) return 0;
		for($i=0, $j=0;$i<$len && $j<$index;$j++){
			$code = ord($data{$i++});
			if (($code & 0xF0) == 0xF0){//11110000, 4 byte
				$i += 3;
			}elseif (($code & 0xE0) == 0xE0){//1110000, 3 byte
				$i += 2;
			}elseif (($code & 0xC0) == 0xC0){//1100000, 2 byte
				$i += 1;
			}
		}
		return ($i ? $i-1 : 0);
	}
	
	/**
	 * @return string
	 * @desc Correct a string UTF-8 (error cause by some char is cuted at the end)
	 */
	public static function correctUTF8($data){
		$len = strlen($data);
		if ($len>=3){
			$code = ord($data{$len-3});
			if (($code & 0xF0) == 0xF0) return substr($data,0,$len-3);
			$code = ord($data{$len-2});
			if (($code & 0xE0) == 0xE0) return substr($data,0,$len-2);
			$code = ord($data{$len-1});
			if (($code & 0xC0) == 0xC0) return substr($data,0,$len-1);
		}
		return $data;
	}
	
	/**
	 * @return string
	 * @desc Correct a string NCR (error cause by some char code >127 and < 255 isnot converted)
	 */
	public static function correctNCR($data){
		for ($i=128;$i<256;$i++)
			$data = str_replace(chr($i),"&#$i;",$data);
		return $data;
	}
	
	/**
	 * @return string
	 * @desc Cat mot string ngan lai de vua mot cot nho
	 */
	public static function trunstrword($str, $trunsize=0){
		$size = ($trunsize)? $trunsize : 20;
		if (strlen($str)<=$size) return $str;
		$len = strlen($str);
		for ($r=VNCode::indexUTF8($str,$size); $r<$len && $str[$r]!=' ' && $r<$size+5;$r++);
	
		$s2 = substr($str, 0, $r);
		if (strlen($s2)<strlen($str))
			$s2.='...';
		return $s2;
	}
	
	/**
	 * @return int
	 * @desc Tra ve vi tri that cua chu cai thu index trong chuoi unicode NCR
	 */
	public static function indexNCR($data, $index){
		$p = 0;
		$len = strlen($data);
		for($i=0;$i<$len && $p<$index;$i++){
			$p++;
			if ($data[$i] == '&'){
				$k = $i+1;
				if ($k<$len && $data[$k] == '#'){
					$k++;
					while ($k<$len && is_numeric($data[$k])) $k++;
					if ($k<$len && $data[$k]==';') $i = $k;
				}
			}
		}
		return $i;
	}
	
	/**
	 * @return int
	 * @desc Tra ve do dai chuoi unicode NCR
	 */
	public static function strlenNCR($data){
		$p = 0;
		$len = strlen($data);
		for($i=0;$i<$len;$i++){
			$p++;
			if ($data[$i] == '&'){
				$k = $i+1;
				if ($k<$len && $data[$k] == '#'){
					$k++;
					while ($k<$len && is_numeric($data[$k])) $k++;
					if ($k<$len && $data[$k]==';') $i = $k;
				}
			}
		}
		return $p;
	}
	/**
	 * Convert string in NCRx to UTF-8
	 * (NCRx has format --xxx; is an character which has ASCCI code is xxx)
	 */
	public static function NCRxUTF8($str){
		$len = strlen($str);
		$result = '';
		$ln=0;
		for($i=0;$i<$len;$i++){
			$n = '';
			if ($str[$i] == '-'){
				$k = $i+1;
				if ($k < $len && $str[$k] == '-'){
					$k++;
					while ($k < $len && is_numeric($str[$k]))
						$n .= $str[$k++];
					if ($k < $len && $str[$k]==';')
						$i = $k;
				}
			}
			if ($n!=''){
				$n = intval($n);
				if ($n==13 || $n==10){
					$result .= $ln?'':'<br>';
					$ln = 1;
				}elseif ($n<128){
					$result .= chr($n);
					$ln = 0;
				}else{
					$s = '';
					$first = 0;
					$mask = 0x80;
					while ($n>0){
						$byte = $n & 0x3F; //00111111
						$n = $n >> 6;
						if ($n) $s = chr($byte | 0x80).$s;
						$first = $first | $mask;
						$mask  = $mask >> 1;
					}
					$s = chr($first | $byte).$s;
					$result .= $s;
					$ln = 0;
				}
			}else{
				$result .= $str[$i];
				$ln = 0;
			}
		}
		return $result;
	}
}
?>