Ext.define('VX.view.home.HomePage', {
    extend: 'Ext.Container',
    requires: [
    	'VX.view.home.Header',
    	'VX.view.home.Footer',
    	'VX.view.home.RightSide',
    	'VX.view.home.LeftSide',
    	'VX.view.home.MainContent',
    	'VX.view.home.Welcome'
    ],
    layout: 'border',
    items: [{
        region: 'north',
        xtype: 'pageheader'
    }, {
        region: 'south',
        xtype: 'pagefooter'
    }, {
/*    	region: 'east',
    	xtype: 'rightside',
    	width: 200
    }, {*/
    	region: 'west',
        xtype: 'leftside',
        width: 200
    }, {
    	region: 'center',
    	xtype:'maincontent'
    }],
    listeners:{
    	boxready: function (me){
    		var d=Ext.get('startloading');
    		if (d) d.remove();
			//var tab=VX.cc.Home.active('VX.view.eduprogram.List');
			//var r={"course_id":2,"course_code":"CTDLGT","course_name_vn":"C\u1ea4U TR\u00daC D\u1eee LI\u1ec6U V\u00c0 GI\u1ea2I THU\u1eacT","course_name_en":"Data Structures and Algorithms","course_name_short":"","course_credits":4,"course_linkto_syllabus":"Tr\u1ea7n Cao \u0110\u1ec7, \u201cC\u1ea5u Tr\u00fac D\u1eef Li\u1ec7u\u201d, NXB \u0110HCT, 2010.\nNguy\u1ec5n V\u0103n Linh, \u201cPh\u00e2n T\u00edch v\u00e0 Thi\u1ebft K\u1ebf Thu\u1eadt To\u00e1n\u201d, NXB \u0110HCT, 2010.\nL\u00ea Minh Trung, \u201cL\u1eadp tr\u00ecnh n\u00e2ng cao b\u1eb1ng pascal v\u1edbi c\u00e1c c\u1ea5u tr\u00fac d\u1eef li\u1ec7u\u201d, SCITEC, 1997.  \nA. V. Aho, J. E. Hopcroft, J. D. Ullman, \u201cData Structure and Algorithms\u201d, Addison\u2013Wesley, 1983.\nR. Sedgewick, \u201cAlgorithms\u201d, Addison\u2013Wesley, 1983.\nH.S. Wilf, \u201cAlgorithms and Complexity\u201d, A.K. Peters Ltd, 1994.\nT. Cormen, C. Leiserson, R. Rivest, C. Stein, \u201cIntroduction to Algorithms\u201d, McGraw-Hill, 1990.","course_version_code":"1","course_introduced_date":"2014-10-01T00:00:00","course_applied_year":"2015-10-24T00:00:00","course_applied_semester":0,"course_isused":0},
			//	rec = Ext.create('VX.model.Course',r);
			//tab.editContent(rec);
			//var ids = [55, 56, 58, 59];
			//var w = Ext.create('VX.view.outcome.MapWin_Q_COI');
			//w.show();
			//w.loadData(2,ids);
    	}
    }
});