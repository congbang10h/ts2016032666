Ext.define('VX.view.faculty.ComboBox',{
	extend: 'Ext.form.field.ComboBox',
	requires: [
		'VX.store.University'
	],
    alias: 'widget.cbx-faculty',
    displayField: 'faculty_name_vn',
    emptyText: '[Khoa]',
    valueField: 'faculty_id',
	//editable: false,
	store: VX.getS('Faculty','cbx'),
	pageSize: 10,
	typeAhead: true,
	typeAheadDelay: 1000,
	hideLabel: true,//hideTrigger:true,
	//query để xử lý, content là tên field tìm kiếm
	queryParam: 'query_faculty_name_vn',

	initComponent: function(){
		var me = this;
		me.callParent(arguments);
		me.store.load();
	},
	listConfig: {
		loadingText: 'Đang tìm...',
		getInnerTpl: function() {
			return '<div class="vx-search-item">' +
				'{faculty_name_vn}<br/>' +
				'<i>{faculty_name_en}</i><br/>' +
				'{univ_name_vn}' +
				'</div>';
		}
	},
	listeners:{
		select: function(me, record, index){
			try{
				var row = me.up(),
					rec = row.getRecord();
				rec.set('faculty_id',record[0].get('faculty_id'));
			}catch(e){}
		}
	}
});