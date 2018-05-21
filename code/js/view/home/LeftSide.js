Ext.define('VX.view.home.LeftSide', {
	extend: 'Ext.Panel',
	requires: [
		'VX.view.home.PanelFunction'
	],
	alias: 'widget.leftside',
	header: false,
	title: 'Chức năng',
	bodyCls: 'patternbg',
	collapsible: true,
	animCollapse: true,
	layout: 'accordion',
	split: true,
	splitterResize: false,
	border: false,
	constructor: function(){
		this.callParent(arguments);
		VX.cc.Panel = this;
	},
	initComponent: function(){
		this.callParent(arguments);
		this.on('boxready',function(){
			var d=this.down('panelfunction[defaultExpand=true]');
			if (d) d.expand();
		},this);
	},
	reset: function(){
		var pfs = this.query('panelfunction'),i;
		for(i in pfs){
			pfs[i].reset();
		}
	},
	items: [{
		title: 'Hệ thống',
		iconCls: 'system16',
		xtype: 'panelfunction',
		reset: function(){
			var me = this,
				c = me.query('#userhi,button[action="logout"],' +
						'button[action="info"],button[action="changepass"]'),
				u = me.query('button[action="login"],' +
						'button[action="register"],button[action="lostpass"]'),
				logged = !VX.user.user_id,
				i;
			c[0].setValue(VX.user.user_first_name+' '+VX.user.user_last_name);
			for(i in c) c[i].setVisible(!logged);
			for(i in u) u[i].setVisible(logged);
		},
		items:[{
			iconCls: 'login16',
            text: 'Đăng nhập',
            tooltip: 'Đăng nhập vào hệ thống với tài khoản có sẵn',
            action: 'login'
		},{
			iconCls: 'register16',
            text: 'Đăng ký',
            tooltip: 'Đăng ký tài khoản mới',
            action: 'register'
		},{
			xtype: 'displayfield',
			fieldLabel: 'Xin chào',
			labelAlign: 'top',
            id: 'userhi',
            cls: 'welcome'
		},{
			xtype: 'textfield',
			iconCls: 'student16',
            emptyText: 'Tài khoản',
            id: 'username'
		},{
			xtype: 'textfield',
			inputType: 'password',
			iconCls: 'changepass16',
            emptyText: 'Mật khẩu',
            id: 'password',
	    	listeners:{
	    		afterrender: function(){
	    			Ext.create('Ext.util.KeyNav', this.el, {
			            enter: function(){
			        		VX.cc.User.login();
			        	},
			            scope: this
			        });
	    		}
	    	}
		},{
			iconCls: 'changepass16',
            text: 'Đổi mật khẩu',
            tooltip: 'Đổi mật khẩu đăng nhập',
            action: 'changepass'
		},{
			iconCls: 'lostpass16',
            text: 'Quên mật khẩu',
            tooltip: 'Lấy lại mật khẩu đã quên',
            action: 'lostpass'
		},{
			iconCls: 'contact16',
            text: 'Liên hệ',
            tooltip: 'Liên hệ với quản trị hệ thống',
            action: 'contact'
		},{
			iconCls: 'changeinfo16',
            text: 'Thông tin cá nhân',
            tooltip: 'Thay đổi thông tin cá nhân',
            action: 'info'
		},{
			iconCls: 'exit16',
			margin: '15 0 0 3',
            text: 'Thoát',
            tooltip: 'Thoát phiên làm việc của tài khoản hiện tại',
            action: 'logout'
		}]
	}, {
		title: 'Danh mục',
		iconCls: 'manage16',
		xtype: 'panelfunction',
		defaultExpand: false,
		reset: function(){
			var me = this,
				bs = me.query('button'),
				b,i,c=0,v;
			for(i in bs){
				b = bs[i];
				v = Ext.ux.checkPermisson(b.model,b.method);
				b.setVisible(v);
				if (v) c++;
			}
			me.setVisible(c);
		},
		items:[{
			iconCls: 'university16',
			text: 'Trường đại học',
			tooltip: 'Quản trị Trường',
			action: 'universitymng',
			model: 'University',
			method: 'read'
		},{
			iconCls: 'faculty16',
			text: 'Khoa',
			tooltip: 'Quản trị Khoa',
			action: 'facultymng',
			model: 'Faculty',
			method: 'read'
		},{
			iconCls: 'department16',
			text: 'Bộ môn',
			tooltip: 'Quản trị Bộ môn',
			action: 'departmentmng',
			model: 'Department',
			method: 'read'
		},{
			iconCls: 'eduprogram16',
			text: 'Chương trình đào tạo',
			tooltip: 'Quản trị Chương trình đào tạo',
			action: 'eduprogrammng',
			model: 'Educational_program',
			method: 'read'
		}]
	}, {
		title: 'Môn học',
		iconCls: 'course16',
		xtype: 'panelfunction',
		//defaultExpand: true,
		reset: function(){
			var me = this,
				bs = me.query('button'),
				b,i,c=0,v;
			for(i in bs){
				b = bs[i];
				v = Ext.ux.checkPermisson(b.model,b.method);
				b.setVisible(v);
				if (v) c++;
			}
			me.setVisible(c);
		},
		items:[{
		//	iconCls: 'question16',
		//	//margin: '15 0 0 3',
		//	text: 'Câu hỏi',
		//	tooltip: 'Quản trị Câu hỏi',
		//	action: 'questionmng'
		//},{
			iconCls: 'qgroup16',
			text: 'Nhóm câu hỏi',
			tooltip: 'Quản trị Nhóm câu hỏi',
			action: 'qgroupmng',
			model: 'Question_group',
			method: 'read'
		},{
			iconCls: 'topic16',
			text: 'Chủ đề',
			tooltip: 'Quản trị Chủ đề',
			action: 'topicmng',
			model: 'Topic',
			method: 'read'
		},{
			iconCls: 'course16',
			text: 'Môn học',
			tooltip: 'Quản trị Môn học',
			action: 'coursemng',
			model: 'Course',
			method: 'read'
		},{
			iconCls: 'test16',
			text: 'Đề thi',
			tooltip: 'Quản trị Đề thi',
			action: 'testmng',
			model: 'Test',
			method: 'read'
		}]
	}, {
		title: 'Học tập',
		iconCls: 'study16',
		xtype: 'panelfunction',
		//defaultExpand: true,
		reset: function(){
			var me = this,
				bs = me.query('button'),
				b,i,c=0,v;
			for(i in bs){
				b = bs[i];
				v = Ext.ux.checkPermisson(b.model,b.method);
				b.setVisible(v);
				if (v) c++;
			}
			me.setVisible(c);
		},
		items:[{
			iconCls: 'exam16',
			text: 'Kiểm tra',
			tooltip: 'Các bài kiểm tra hiện hành',
			action: 'exammng',
			model: 'Exam',
			method: 'start'
		}]
	}, {
		title: 'Demo',
		iconCls: 'study16',
		xtype: 'panelfunction',
		//defaultExpand: true,
		reset: function(){
			var me = this,
				bs = me.query('button'),
				b,i,c=0,v;
			for(i in bs){
				b = bs[i];
				v = Ext.ux.checkPermisson(b.model,b.method);
				b.setVisible(v);
				if (v) c++;
			}
			me.setVisible(c);
		},
		items:[{
			iconCls: 'qgroup16',
			text: 'Giải phương trình bậc 2',
			tooltip: 'Giải phương trình bậc 2',
			action: 'giaiptb2',
			model: 'Exam',
			method: 'start'
		}]
	}]
 });