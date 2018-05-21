window.tinyMCEPreInit = {
	suffix : '',
	base : '/jslib/tinymce',
	config: {
		plugins: [
			"lists link image charmap preview code fullscreen save table ",
			"paste textcolor"
		],
	
		toolbar1: "fontselect fontsizeselect | bold italic underline | "
			+"alignleft aligncenter alignright alignjustify | bullist numlist"
			+" | outdent indent blockquote",
		toolbar2: "table | subscript superscript | charmap | link unlink image"
			+" | forecolor backcolor | code preview fullscreen",
		toolbar3: "advlist",
	
		menubar: false,
		statusbar: false,
		toolbar_items_size: 'small',
		setup: function (ed) {
			ed.on('focus', function () {
				if (ed.extcom){
					ed.extcom.onFocus();
				}
			});
			ed.on('blur', function () {
				if (ed.extcom && ed.extcom.onBlur){
					ed.extcom.onBlur();
				}
			});
			ed.on("init", function() {
				var c = Ext.getCmp(this.id.replace('-tinymce',''));
				if (c){
					ed.extcom = c;
					c.mceSetDisabled();
				}
				//console.log('Init tinymce');
			});
			ed.on('change', function(e) {
				if (ed.extcom){
					ed.extcom.mceChange();
				}
				//console.log('mce onchange');
			});
		}
	},
	browseMedia: function(scope, callback){
		var w = Ext.create('Ext.ux.mediamng.ImageManager',{
				scope: scope,
				onsubmit: callback
			}), s = Ext.StoreManager.lookup('mediamng-image-store');
		s.load();
		w.show();
	}
};
var VX = {
	config: {},//Get properties from js_config.php
	user: {},//Get properties from js_config.php
	qtype: {
		1: 'Choice',
		2: 'Fill',
		3: 'Order',
		4: 'Match'
	},//Get properties from store Question_type_dict
	appPath: 'js',
	uxPath: 'js/ux',
	social: {
		id: {
			facebook: '1596867130566599',
			google: '137876773909-be56udrqsc6fvo78drkmmos35durafhu.apps.'
				+'googleusercontent.com'
		},
		uri: {
			redirect_uri: 'http://ts.com/oauth2callback'
		}
	},
	//Các loại button của ux.Form
	BT_SUBMIT: 1,
	BT_BACK: 2,
	BT_CLOSE: 4,
	BT_SEND: 8,
	
	cc: {
	},
	liststore: {
	},
	vars: {
		ReviewType: {
			fields:['type','name'],
			data:[
				{type:'',name:'[Chọn loại quyết định]'},
				{type:0,name:'Chưa quyết định'},
				{type:1,name:'Không đồng ý'},
				{type:2,name:'Cần sửa lại'},
				{type:3,name:'Đồng ý'}
			],
			find: function(type){
				var ls = this.data,i=1;
				for(;i<5;i++){
					if (type==ls[i].type)
						return ls[i].name;
				}
				return ls[1].name;
			}
		}
	},
	getC: function(name){
		name = name.replace('VX.controller.', '');
		if (!VX.cc[name])
			VX.cc[name] = Ext.create('VX.controller.' + name);
		return VX.cc[name];
	},
	getS: function(name, id){
		if (!name)
			return null;
		name = name.replace('VX.store.', '');
		id = name+':'+(id || 1);
		name = 'VX.store.' + name;
		if (!VX.liststore[id])
			VX.liststore[id] = Ext.create(name);
		return VX.liststore[id];
	},
	getSE: function(name, id){
		if (!name)
			return null;
		name = name.replace('VX.store.', '');
		id = name+':'+(id || 1);
		name = 'VX.storx.' + name;
		if (!VX.liststore[id])
			VX.liststore[id] = Ext.create(name);
		return VX.liststore[id];
	},
	resize: function(w, h, maxw, maxh) {
		var wr = maxw / w, hr = maxh / h,
			ratio = wr < hr ? wr : hr,
			nw = Math.floor(w * ratio), nh = Math.floor(h * ratio);
		return {
			width: nw,
			height: nh
		};
	},
	checkRender: function(val){
		return val ? '<i class="fa fa-check-square-o"></i>':'';
	},
	formatSize: function(size) {
		var i=0,units = [' B', ' KB', ' MB', ' GB', ' TB'];
		for (; size > 1024 && i<5; i++) {
			size /= 1024;
		}
		return i==5? '#' : (Ext.util.Format.number(size, '0,000.00')+units[i]);
	},
	download: function(url) {
		var hiddenIFrameID = 'hiddenDownloader',
			iframe = document.getElementById(hiddenIFrameID);
		if (iframe === null) {
			iframe = document.createElement('iframe');
			iframe.id = hiddenIFrameID;
			iframe.style.display = 'none';
			document.body.appendChild(iframe);
		}
		iframe.src = url;
	},
	showChart: function(chart,title){
		Ext.create('Ext.Window', {
			width: 800,
			height: 600,
			minHeight: 400,
			minWidth: 550,
			hidden: false,
			maximizable: true,
			title: title,
			autoShow: true,
			layout: 'fit',
			tbar: [{
				text: 'Lưu biểu đồ',
				iconCls: 'save16',
				handler: function() {
					var chart = this.up('window').items.first();
					chart.save({
						type: 'image/png'
					});
				}
			}],
			items: chart
		});
	},
	createMap: function(root,array,field){
		for(var i in array){
			root[array[i][field]] = i;
		}
	},
	//Thay đổi ngẫu nhiên thứ tự các phần tử trong a[]
	shuffle: function(a){
		var i = a.length, j, t;
		if (!i) return a;
		while ( --i ) {
			j = Math.floor( Math.random() * ( i + 1 ) );
			t = a[i];
			a[i] = a[j];
			a[j] = t;
		}
		return a;
	},
	charCode: function(n){
		n = n%52>>0;
		return String.fromCharCode((n<26?65:71)+n);
	},
	genId: function(length){
		var s='', len=length?length:15, t;
		if (VX.user && VX.user.user_id){
			t = parseInt(VX.user.user_id);
			while(t && s.length<len){
				s += VX.charCode(t);
				t = (t/52)>>0;
			}
		}
		while(s.length<len){
			s += VX.charCode(Math.random()*100);
		}
		return s;
	},
	int2char: function(i){
		return String.fromCharCode(i+64);
	},
	alert: function(e){
		var msg = typeof e=='string' ? e : e.message;
		if (!/^Error/.test(document.title))
			document.title = 'Error: '+msg;
		console.log(e);
	},
	p1: function(name){
		if (window.vxt==undefined)
			window.vxt = {start:{},time:{}};
		window.vxt.start[name] = performance.now();
	},
	p2: function(name){
		if (window.vxt==undefined) return;
		window.vxt.time[name] = performance.now()-window.vxt.start[name];
	},
	requireMap: {},
	requireQueue: [],
	requireNoError: 0,
	requireWait: {
		time: 0,
		name: 0,
		src: ''
	},
	require: function(arg){
		if (typeof arg=='string'){
			VX.addRequire(arg);
			VX.loadJs();
		}else if (Array.isArray(arg)){
			for(var i in arg)
				VX.addRequire(arg[i]);
			VX.loadJs();
		}
	},
	addRequire: function(n){
		if (typeof n=='string')
			VX.requireQueue.push(VX.name2url(n));
		else if (n.wait && n.load){
			VX.requireQueue.push({
				wait: n.wait,
				load: VX.name2url(n.load)
			});
		}else console.log('Sử dụng VX.addRequire sai rồi');
	},
	waitLoadJs: function(){
		if (VX.requireWait.name){
			try{
				if (VX.requireWait.time>200){//200*100mls ~ 20second
					VX.requireWait.time = 0;
					console.log('Chờ class '+VX.requireWait.name
						+' trong file '+VX.requireWait.src+' quá lâu!');
				}
				VX.requireWait.time++;
				eval(VX.requireWait.name);
				VX.requireWait = 0;
				return 0;
			}catch(e){
				//console.log('Wait to load '+VX.requireWait.name);
				setTimeout(function(){VX.loadJs();},100);
				return 1;
			}
		}
		return 0;
	},
	loadJs: function(ev){
		if (VX.requireNoError) return;
		var url,item,c,t;
		if (ev && (ev.target || ev.srcElement)){
			t = ev.target || ev.srcElement;
			VX.requireMap[c=t.src] = 1;
			if (/.+\?$/.test(c)){
				VX.requireWait = {
					time: 0,
					src: c,
					name: VX.url2name(c)
				};
			}
		}
		if (VX.waitLoadJs()) return;
		while (VX.requireQueue.length){
			item = VX.requireQueue[0];
			if (typeof item=='string')
				url = item;
			else{
				try{
					if (typeof item.wait=='string')
						eval(item.wait);
					else if (Array.isArray(item.wait)){
						for(var i in item.wait)
							eval(item.wait[i]);
					}
					url = item.load;
				}catch(e){
					setTimeout(function(){VX.loadJs();},100);
					return;
				}
			}
			VX.requireQueue.shift();
			if (!VX.requireMap[url]) break; 
		}
		if (url && !VX.requireMap[url]){
			var	head = document.getElementsByTagName('head')[0],
				s = document.createElement('script');
			s.type = 'text/javascript';
			s.src = url;
			s.onload = VX.loadJs;
			s.onerror = function(ev){
				var t = ev.target || ev.srcElement,c=t.src;
				if (/.+\?$/.test(c)){
					VX.alert('Không tải được lớp '
						+VX.url2name(c)+' trong file '+c);
					VX.requireNoError = 1;
				}
			};
			head.appendChild(s);
		}
	},
	pingColor: function (ms) {
		var m0=0,m1=0,m2=100,i=0;
		while(ms>m2&&i<5){
			m0=m1;m1=m2;m2=m0+m1;i++;
		}
		return 'ping'+i;
	},
	ping: function(url,callback,scope){
		var me=this;
		if (!me.isPinging) {
			url = url || (location.origin+'/php/api/ping.php');
			me.isPinging = 1;
			me.pingCfg = {
				callback: (typeof callback=='function')?callback:function(){},
				scope: scope
			};
			me.pingImg = new Image();
			me.pingImg.onload = function () {
				me.isPinging = 0;
				me.pingCfg.callback.call(
					me.pingCfg.scope,
					new Date().getTime()-me.pingStart,
					'ok'
				);

			};
			me.pingImg.onerror = function (e) {
				if (me.isPinging) {
					me.isPinging = 0;
					me.pingCfg.callback.call(
						me.pingCfg.scope,
						new Date().getTime()-me.pingStart,
						'error',
						e
					);
				}

			};
			me.pingStart = new Date().getTime();
			me.pingImg.src = url+"?"+me.pingStart;
			me.pingTimer = setTimeout(function () {
				if (me.isPinging) {
					me.isPinging = 0;
					me.pingCfg.callback.call(
						me.pingCfg.scope,
						new Date().getTime()-me.pingStart,
						'timeout'
					);
				}
			}, 1800);
		}
	},
	name2url: function(n){
		var u = n;
		if (/^(Ext)|(VX)/.test(u)){
			u = u.replace(/\./g,'/')
				.replace(/^Ext\/ux/,VX.uxPath)
				.replace(/^VX/,VX.appPath)+'.js?';
		}
		return u;
	},
	url2name: function(c){
		c = c.replace(location.origin+'/','')
			.replace(/\.js.*/i,'');
		if (c.indexOf(VX.uxPath+'/')==0)
			c = c.replace(VX.uxPath,'Ext/ux');
		else if (c.indexOf(VX.appPath+'/')==0)
			c = c.replace(VX.appPath,'VX');
		return c.replace(/\//g,'.');
	},
	js: {
		queue: {},
		tid: 0,
		running: 0,
		add: function(cfg){//cfg={url,check,success,fail,scope}
			var url = location.origin+'/'+cfg.url
				.replace(location.origin,'')
				.replace(/^(\/)|(\\)/,'');
			this.queue[url]=Ext.apply(cfg,{
				count: 0,
				state: 0 //0=wait to inject,1=wait to check
			});
			this.run();
		},
		inject: function(url){
			var	head = document.getElementsByTagName('head')[0],
				s = document.createElement('script');
			s.type = 'text/javascript';
			s.src = url;
			s.onload = function(ev){
				var t = ev.target || ev.srcElement,c=t.src,q=VX.js.queue;
				q[c].state = 1;
			};
			s.onerror = function(ev){
				var t = ev.target || ev.srcElement,c=t.src,q=VX.js.queue;
				if (q[c].fail) q[c].fail.call(q[c].scope);
				delete q[c];
			};
			VX.js.queue[url].state = 1;
			head.appendChild(s);
		},
		run: function(){
			if (this.running) return;
			this.running = 1;
			if (this.tid){
				clearTimeout(this.tid);
				this.tid = 0;
			}
			var i,t,c=0;
			for(i in this.queue){
				t = this.queue[i];
				t.count++;
				if (t.count>200){
					t.count=0;
					console.log('Chờ '+t.url+' và '+t.check+' quá 20s');
				}
				try{
					eval(t.check);
					if (t.success)
						t.success.call(t.scope);
					delete this.queue[i];
				}catch(e){
					if (!t.state)
						this.inject(i);
					c++;
				}
			}
			this.tid = c ? setTimeout('VX.js.run()',100) : 0;
			this.running = 0;
		}
	},
	mapCfg: {
		id: '',				//ID của dataview
		searchField: '',	//Tên field truy vấn dạng query_
		title: '',			//Tiêu đề cửa sổ
		itemLabel: '',		//Nhãn của phần tử
		groupLabel: '',		//Nhãn của nhóm
		store: 0,			//store quản lý dữ liệu
		dragName: '',		//Tên nhóm để kéo & thả
		template: '',		//Sinh ra mẫu các nhóm trong dataview
		itemSelected: 0,
		toggle: function(gid){
			var me=this,s=me.store;
			s.rpc({
				action: 'update',
				params: {
					groupid: gid,
					itemid: me.itemSelected
				}
			});
			s.load();
		},
		hasLink: function (value) {
			return value ? 'vx-bt-inside' : 'vx-bt-outside';
		}
	},
	timeout:{
		id: 0,
		db: {},
		set: function(func, scope, milis){
			var me=this, id = me.id++;
			console.log(scope.getId()+' : '+scope.node.data.text);
			me.db[id] = {
				callback: func,
				scope: scope,
			};
			return setTimeout("VX.timeout.run("+id+")",milis);
		},
		run: function(id){
			var r = this.db[id];
			if (r != undefined){
				delete this.db[id];
				r.callback.apply(r.scope);
			}
		}
	}
};
VX.require('js/require.js');
