Ext.application({
	name: 'VX',
	appFolder: VX.appPath,

	controllers: [
		'Action',
		'User'
	],
	launch: function () {
		//VX.getS('Question_type_dict').load();
		var s = location.search,
			testid = /^.exam=[0-9]+/.test(s)?
				parseInt(s.replace('?exam=','')):0;
		if (testid){
			var w=Ext.create('VX.view.exam.ExamWinHorizontal');
			w.show();
			VX.getC('Exam').prepare(w,testid);
		}else{
			Ext.create('Ext.container.Viewport', {
				layout: 'fit',
				cls: 'body',
				items: Ext.create('VX.view.home.HomePage')
			});
		}
	}
});
