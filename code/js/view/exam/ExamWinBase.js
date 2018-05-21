Ext.define('VX.view.exam.ExamWinBase', {
	extend: 'Ext.Window',
	requires: [
		'VX.view.exam.ExamPanel',
		'VX.view.exam.ExamTree'
	],
	width: '100%',
	height: '100%',
	resizable: false,
	border:false,
	constrain: true,
	header: false,
	layout: 'border',
	bodyBorder: false,
	timer: {
		id: 0,
		ctrl: 0,
		value: 0,
		callback: null,
		scope: null,
		init: function(value, ctrl, callback, scope){
			var me=this;
			me.value = value;
			me.ctrl = ctrl;
			me.callback = callback;
			me.scope = scope;
			me.stop();
			ctrl.setHTML(me.get());
		},
		start: function(){
			var me=this;
			me.id = setTimeout(function () {
				me.run();
			}, 1000);
		},
		stop: function(){
			var me=this;
			if (me.id){
				clearTimeout(me.id);
				me.id = 0;
			}
		},
		get: function(){
			var t=this.value,
				h = parseInt(t/3600), m = parseInt((t%3600)/60),s = t%60;
			if (s<10) s = '0'+s;
			if (m<10) m = '0'+m;
			return (h ? h+':' : '')+m+':'+s;
		},
		run: function(){
			var me=this;
			if (me.value>0) {
				me.value--;
				me.ctrl.setHTML(me.get());
				me.id = setTimeout(function () {
					me.run();
				}, 1000);
			}else if (typeof me.callback=='function'){
				me.callback.apply(me.scope);
			}
		}
	},
	pinger:{
		box: 0,
		val: 0,
		id: 0,
		init: function(){
			var me=this;
			me.box = Ext.get('pinger');
			me.val = me.box.down('.value').dom;
			me.box = me.box.dom;
			me.box.className = 'ping0';
			me.run();
		},
		run: function(){
			var me=this;
			if (me.running) return;
			me.running = 1;
			//VX.ping(null,me.onPing,me);
			me.id = setTimeout(function(){
				me.run();
			},500);
			me.running = 0;
		},
		stop: function(){
			if (this.id)
				clearTimeout(this.id);
		},
		onPing: function(ms,msg,e){
			var me=this;
			me.box.className = VX.pingColor(ms);
			me.val.innerHTML = ms;
		}
	},
	examInfo: 0,
	qCount: {total:0,flag:0,answered:0},
	loadTest: function(info){
		var me=this,
			panel = me.down('test-exam-panel');
		me.examInfo = info;
		me.panel = panel;
		panel.tree = me.down('test-exam-tree');
		panel.examInfo = info;
		panel.loadSection(info.sections, info.action);
	},
	onSelectInTree: function(rec){
		this.panel.onSelectInTree(rec);
	},
	startTimer: function(){
		this.timer.start();
	},
	initTimer: function(){
		var me=this,ctrl = Ext.get('exam_timer').down('.value'),
			val=me.examInfo.time_remain * 60;
		me.timer.init(val,ctrl, me.fisnishExam, me);
		//me.pinger.init();
	},
	saveAndQuit: function(){
		var me=this;
		if (!me.panel || me.panel.checkFinish()) {
			me.fisnishExam();
		}
	},
	fisnishExam: function(){
		var me=this;
		me.timer.stop();
		//me.pinger.stop();
		me.close();
		VX.getC('Exam').finish(me.examInfo);
	},
	updateStatic:function(newmode,oldmode){
		var me=this;
		if (oldmode!=newmode){
			if (oldmode=='flag')
				me.qCount.flag--;
			if (oldmode=='answered')
				me.qCount.answered--;
			if (newmode=='flag')
				me.qCount.flag++;
			if (newmode=='answered')
				me.qCount.answered++;
			me.showStatic();
		}
	},
	showStatic: function(){
		var me=this,o;
		o=me.el.query('.exam-static.total>.value')[0];
		o.innerHTML = me.qCount.total;
		o=me.el.query('.exam-static.flag>.value')[0];
		o.innerHTML = me.qCount.flag;
		o=me.el.query('.exam-static.answered>.value')[0];
		o.innerHTML = me.qCount.answered;
	},
	fixResize: function(){
		var me=this,ls, i,nw=me.getWidth(),nb,cmp;
		if (nw!=me._fix.w){
			nb=(nw-me._fix.c)+'px';
			ls = me.el.query('div');
			for(i in ls){
				cmp=Ext.getCmp(ls[i].id);
				if (cmp && cmp.getWidth()+'px'==me._fix.b)
					cmp.setWidth(nw-me._fix.c);
				else if (ls[i].style.width==me._fix.b){
					ls[i].style.width=nb;
				}
			}
			me._fix = {
				w: nw,
				b: nb
			};
		}
	},
	listeners:{
		afterrender: function(){
			var me=this,b=me.el.down('.x-window-body');
			me._fix = {
				w: me.getWidth(),
				b: b.getWidth()+'px'
			};
			me._fix.c = me._fix.w-b.getWidth();
		},
		resize: function(){
			this.fixResize();
		}
	}
});
