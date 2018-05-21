Ext.define('VX.view.exam.ExamWin', {
	//extend: 'Ext.ux.WinForm',
	extend: 'Ext.Window',
	requires: [
		'VX.view.exam.ExamPanel',
		'VX.view.exam.ExamTree'
	],
	alias: 'widget.test-exam-win',
	width: '100%',
	height: '100%',
	resizable: false,
	border:false,
	//closable: false,
	constrain: true,
	header: false,
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
	loadTest: function(info){
		//action: "continue"
		//exam_id: "3"
		//sections: Array[2]
		//success: 1
		//time_remain: 45
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
		me.pinger.init();
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
		me.pinger.stop();
		me.close();
		VX.getC('Exam').finish(me.examInfo);
	},
	layout: 'border',
	bodyBorder: false,
	items: [{
		region: 'east',
		xtype: 'container',
		width: '25%',
        layout: 'vbox',
		items: [{
			xtype: 'test-exam-tree',
			width: '100%',
			flex: 1
		}, {
			xtype: 'container',
			html: '<div id="pinger">' +
			'<span class="title">Kết nối</span>' +
			'<span class="value">30</span>' +
			'</div>',
			width: '100%',
			height: 20
		},{
			xtype: 'container',
			html: '<div id="exam_timer">' +
			'<span class="title">Thời gian</span>' +
			'<span class="value">00:00</span>' +
			'</div>',
			width: '100%',
			height: 40
		},{
			xtype: 'toolbar',
			style: "padding-left: 110px;",
			height: 80,
			width: '100%',
			items:[{
				iconCls: 'save16',
				text: 'Lưu bài thi',
				tooltip: 'Lưu bài thi',
				iconAlign: 'top',
				scale: 'medium',
				handler: function() {
					this.up('window').saveAndQuit();
				}
			}]
		}]
	}, {
		region: 'center',
		overflowX: 'auto',
		overflowY: 'auto',
		items: {
			xtype: 'test-exam-panel'
		}
	}]
});
