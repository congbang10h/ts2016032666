Ext.define('VX.view.university.ComboBox',{
	extend: 'Ext.form.field.ComboBox',
	requires: [
		'VX.store.University'
	],
    alias: 'widget.cbx-university',
    displayField: 'univ_name_vn',
    emptyText: '[Trường]',
    valueField: 'univ_id',
	//editable: false,
	store: VX.getS('University','cbx'),
	pageSize: 10,
	typeAhead: true,
	typeAheadDelay: 1000,
	hideLabel: true,//hideTrigger:true,
	//query để xử lý, content là tên field tìm kiếm
	queryParam: 'query_univ_name_vn',

	initComponent: function(){
		var me = this;
		me.callParent(arguments);
		me.store.load();
	},
	listConfig: {
		loadingText: 'Đang tìm...',
		getInnerTpl: function() {
			return '<div class="vx-search-item">' +
				'{univ_name_vn}<br/>' +
				'<i>{univ_name_en}</i>' +
				'</div>';
		}
	},
	listeners:{
		select: function(me, records, index){
			if (typeof me.onSelect=='function')
				me.onSelect(records[0]);
			try{
				var row = me.up(),
					rec = row.getRecord();
				rec.set('univ_id',record[0].get('univ_id'));
			}catch(e){}
		}
	}
});