Ext.define('VX.controller.Action',{
	extend: 'Ext.app.Controller',
	constructor: function(){
		this.callParent(arguments);
		VX.cc.Action = this;
	},
	fire: function(action){
		switch(action){
			case 'questionmng':
				VX.cc.Home.active('VX.view.question.List');
				break;
			case 'qgroupmng':
				VX.cc.Home.active('VX.view.qgroup.List');
				break;
			case 'topicmng':
				VX.cc.Home.active('VX.view.topic.List');
				break;
			case 'exammng':
				VX.cc.Home.active('VX.view.exam.List');
				break;
			case 'universitymng':
				VX.cc.Home.active('VX.view.university.List');
				break;
			case 'facultymng':
				VX.cc.Home.active('VX.view.faculty.List');
				break;
			case 'departmentmng':
				VX.cc.Home.active('VX.view.department.List');
				break;
			case 'eduprogrammng':
				VX.cc.Home.active('VX.view.eduprogram.List');
				break;
			case 'coursemng':
				VX.cc.Home.active('VX.view.course.List');
				break;
			case 'testmng':
				VX.cc.Home.active('VX.view.test.List');
				break;
			case 'login':
				VX.cc.User.showLogin();
				break;
			case 'register':
				VX.cc.User.showRegister();
				break;
			case 'info':
				VX.cc.User.showInfo();
				break;
			case 'logout':
				VX.cc.User.logout();
				break;
			case 'giaiptb2':
				VX.cc.Home.active('MyApp.View.GiaiPTBac2');
				break;
			default:
				Ext.ux.warning('Chức năng <b>' + action + '</b> chưa được cài đặt!');
		}
	}
});