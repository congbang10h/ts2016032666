var VXMD5 = function(s,raw,hexcase,chrsz) {
	var me = this;
	raw = raw || false;
	hexcase = hexcase || false;
	chrsz = chrsz || 8;

	me.safe_add = function(x, y){
		var lsw = (x & 0xFFFF) + (y & 0xFFFF);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return (msw << 16) | (lsw & 0xFFFF);
	};
	me.bit_rol = function(num, cnt){
		return (num << cnt) | (num >>> (32 - cnt));
	};
	me.md5_cmn = function(q, a, b, x, s, t){
		var me=this;
		return me.safe_add(me.bit_rol(me.safe_add(me.safe_add(a, q), me.safe_add(x, t)), s),b);
	};
	me.md5_ff = function(a, b, c, d, x, s, t){
		return this.md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
	};
	me.md5_gg = function(a, b, c, d, x, s, t){
		return this.md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
	};
	me.md5_hh = function(a, b, c, d, x, s, t){
		return this.md5_cmn(b ^ c ^ d, a, b, x, s, t);
	};
	me.md5_ii = function(a, b, c, d, x, s, t){
		return this.md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
	};

	me.core_md5 = function(x, len){
		x[len >> 5] |= 0x80 << ((len) % 32);
		x[(((len + 64) >>> 9) << 4) + 14] = len;
		var me=this,a =  1732584193;
		var b = -271733879;
		var c = -1732584194;
		var d =  271733878,i = 0;
		for(; i < x.length; i += 16){
			var olda = a;
			var oldb = b;
			var oldc = c;
			var oldd = d;
			a = me.md5_ff(a, b, c, d, x[i], 7 , -680876936);
			d = me.md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
			c = me.md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
			b = me.md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
			a = me.md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
			d = me.md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
			c = me.md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
			b = me.md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
			a = me.md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
			d = me.md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
			c = me.md5_ff(c, d, a, b, x[i+10], 17, -42063);
			b = me.md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
			a = me.md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
			d = me.md5_ff(d, a, b, c, x[i+13], 12, -40341101);
			c = me.md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
			b = me.md5_ff(b, c, d, a, x[i+15], 22,  1236535329);
			a = me.md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
			d = me.md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
			c = me.md5_gg(c, d, a, b, x[i+11], 14,  643717713);
			b = me.md5_gg(b, c, d, a, x[i], 20, -373897302);
			a = me.md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
			d = me.md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
			c = me.md5_gg(c, d, a, b, x[i+15], 14, -660478335);
			b = me.md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
			a = me.md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
			d = me.md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
			c = me.md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
			b = me.md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
			a = me.md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
			d = me.md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
			c = me.md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
			b = me.md5_gg(b, c, d, a, x[i+12], 20, -1926607734);
			a = me.md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
			d = me.md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
			c = me.md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
			b = me.md5_hh(b, c, d, a, x[i+14], 23, -35309556);
			a = me.md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
			d = me.md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
			c = me.md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
			b = me.md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
			a = me.md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
			d = me.md5_hh(d, a, b, c, x[i], 11, -358537222);
			c = me.md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
			b = me.md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
			a = me.md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
			d = me.md5_hh(d, a, b, c, x[i+12], 11, -421815835);
			c = me.md5_hh(c, d, a, b, x[i+15], 16,  530742520);
			b = me.md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);
			a = me.md5_ii(a, b, c, d, x[i], 6 , -198630844);
			d = me.md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
			c = me.md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
			b = me.md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
			a = me.md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
			d = me.md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
			c = me.md5_ii(c, d, a, b, x[i+10], 15, -1051523);
			b = me.md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
			a = me.md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
			d = me.md5_ii(d, a, b, c, x[i+15], 10, -30611744);
			c = me.md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
			b = me.md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
			a = me.md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
			d = me.md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
			c = me.md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
			b = me.md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);
			a = me.safe_add(a, olda);
			b = me.safe_add(b, oldb);
			c = me.safe_add(c, oldc);
			d = me.safe_add(d, oldd);
		}
		return [a, b, c, d];
	};
	me.str2binl = function(str){
		var bin = [];
		var mask = (1 << chrsz) - 1,i = 0;
		for(; i < str.length * chrsz; i += chrsz) {
			bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
		}
		return bin;
	};
	me.binl2str = function(bin){
		var str = "";
		var mask = (1 << chrsz) - 1,i = 0;
		for(; i < bin.length * 32; i += chrsz) {
			str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
		}
		return str;
	};

	me.binl2hex = function(binarray){
		var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
		var str = "",i=0;
		for(; i < binarray.length * 4; i++) {
			str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) + hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
		}
		return str;
	};
	return (raw ? me.binl2str(me.core_md5(me.str2binl(s), s.length * chrsz)) : me.binl2hex(me.core_md5(me.str2binl(s), s.length * chrsz)));
};
var VXTS = {
	api:{
		root: VXTScfg.root,
		login: '/php/api/login.php',
		exam: '?exam=',
		create: '/php/api/createuser.php',
		getmark: '/php/api/_getmark.php',
		getlisttest: '/php/api/getlisttest.php'
	},
	code: VXTScfg.code,
	userid: 0,
	token: '',
	loginCallback: function(data){
		var me=this;
		me.debug(data);
		if (me.loginCfg && me.loginCfg.callback)
			me.loginCfg.callback.call(me.loginCfg.scope,data);
		if (data.success){
			me.token = data.token;
			me.userid = data.user.user_id;
		}
	},
	login: function(cfg){
		cfg = cfg || {};
		var me=this;
		me.loginCfg = {
			callback: cfg.callback,
			scope: cfg.scope
		};
		cfg.password = cfg.password || '';
		$.ajax({
			url: me.api.root+me.api.login,
			dataType: "jsonp",
			data: {
				callback: 'VXTS.loginCallback',
				username: cfg.username,
				password: VXMD5(me.code+VXMD5(cfg.password))
			}
		});
	},
	checkAuthorise: function(){
		return 0;
	},
	doExam: function(cfg){
		cfg = cfg || {};
		var me=this;
		if (me.checkAuthorise())
			return;
		var d=document,div, idiv= d.createElement('iframe');
		if (cfg.targetid){
			div = d.getElementById(cfg.targetid);
			if (!div){
				console.log('Không tìm thấy DomObject có #'+cfg.targetid);
				return;
			}
		}else if(cfg.targetdom)
			div = cfg.targetdom;
		else{
			console.log('Gọi doExam() Thiếu tham số targetid hoặc targetdom');
			return;
		}

		idiv.style.width = '100%';
		idiv.style.height = '100%';
		idiv.style.border = 0;
		idiv.src = me.api.root+me.api.exam+cfg.testid+'&userid='+me.userid;
		while (div.firstChild)
			div.removeChild(div.firstChild);
		div.appendChild(idiv);
	},
	createCallback: function(data){
		var me=this;
		me.debug(data);
		if (me.createCfg && me.createCfg.callback)
			me.createCfg.callback.call(me.createCfg.scope,data);
	},
	createUser: function(cfg){
		cfg = cfg || {};
		var me=this;
		if (me.checkAuthorise())
			return;
		me.createCfg = {
			callback: cfg.callback,
			scope: cfg.scope
		};
		cfg.callback = 'VXTS.createCallback';
		$.ajax({
			url: me.api.root+me.api.create,
			dataType: "jsonp",
			data: cfg
		});
	},
	getMarkCallback: function(data){
		var me=this;
		me.debug(data);
		if (me.getMarkCfg && me.getMarkCfg.callback)
			me.getMarkCfg.callback.call(me.getMarkCfg.scope,data);
	},
	getMark: function(cfg,userid,testid, callback, scope){
		cfg = cfg || {};
		var me=this;
		if (me.checkAuthorise())
			return;
		me.getMarkCfg = {
			callback: cfg.callback,
			scope: cfg.scope
		};
		$.ajax({
			url: me.api.root+me.api.getmark,
			dataType: "jsonp",
			data: {
				callback: 'VXTS.getMarkCallback',
				userid: cfg.userid,
				username: cfg.username,
				testid: cfg.testid
			}
		});
	},
	getListTestCallback: function(data){
		var me=this;
		me.debug(data);
		if (me.getListTestCfg && me.getListTestCfg.callback)
			me.getListTestCfg.callback.call(me.getListTestCfg.scope,data);
	},
	getListTest: function(cfg,userid,callback, scope){
		cfg = cfg || {};
		var me=this;
		if (me.checkAuthorise())
			return;
		me.getListTestCfg = {
			callback: cfg.callback,
			scope: cfg.scope
		};
		$.ajax({
			url: me.api.root+me.api.getlisttest,
			dataType: "jsonp",
			data: {
				callback: 'VXTS.getListTestCallback',
				userid: cfg.userid,
				username: cfg.username
			}
		});
	},
	debug: function(data){
		if (data.debug){
			var d;
			for(var i in data.debug){
				d = data.debug[i];
				if (d.type=='log')
					console.log(d.msg);
			}
		}
	}
};
