Ext.define('VX.view.course.ComboBox',{
	extend: 'Ext.form.field.ComboBox',
	requires: [
		'VX.store.Course'
	],
    alias: 'widget.cbx-course',
    displayField: 'course_name_vn',
    emptyText: '[Môn học]',
    valueField: 'course_id',
	//editable: false,
	store: VX.getS('Course','cbx'),
	pageSize: 10,
	typeAhead: true,
	typeAheadDelay: 1000,
	hideLabel: true,//hideTrigger:true,
	//query để xử lý, content là tên field tìm kiếm
	queryParam: 'query_course_name_vn',

	initComponent: function(){
		var me = this;
		me.callParent(arguments);
		me.store.load();
	},
	listConfig: {
		loadingText: 'Đang tìm...',
		getInnerTpl: function() {
			return '{course_name_vn} ({course_code})';
		}
	},
	listeners:{
		select: function(me, record, index){
			try{
				var row = me.up(),
					rec = row.getRecord();
				rec.set('course_id',record[0].get('course_id'));
			}catch(e){}
		}
	}
});