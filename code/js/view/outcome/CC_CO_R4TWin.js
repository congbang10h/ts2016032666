Ext.define('VX.view.outcome.CC_CO_R4TWin', {
	extend: 'Ext.ux.WinForm',
	title: 'Tỷ lệ Nội dung - Chuẩn đầu ra trong đề thi',
	iconCls: 'percentco16',
	width: '100%',
	height: '100%',
	tree: null,
	store: null,
	initColumn: function(res){
		var me=this, i, fields,columns,coi_id;
		fields = [
			{name: 'id', type: 'int'},//course_content_id
			{name: 'total', type: 'int'},
			{name: 'text', type: 'string'}
		];
		columns = [{
			xtype: 'treecolumn',
			header: 'Nội dung',
			width: 300,
			locked: true,
			dataIndex: 'text'
		}];
		for(i in res.column) if (res.column.hasOwnProperty(i)){
			coi_id = res.column[i].coi_id;
			fields.push({ name: 'coi_'+coi_id, type: 'int'});
			columns.push({
				text: res.column[i].coi_code,
				coi_id: coi_id,
				dataIndex: 'coi_'+coi_id,
				tooltip: res.column[i].coi_desc_vn,
				width: 80,
				renderer: function(val,cObj, rec, iRow, iCol){
					var total=rec.get('total');
					if (total){
						return val ? (val*100/total).toFixed(2)+'%' : 0;
					}else return '-';
				}
			});
		}
		me.store = Ext.create('Ext.data.TreeStore', {
			extend: 'Ext.data.Model',
			fields: fields,
			actionName: 'CC_CO_R4T',
			proxy:{
				type: 'direct',
				api: CC_CO_R4T,
				reader:{
					type: 'json',
					root: 'children'
				}
			}
		});
		if (me.tree)
			me.remove(me.tree);
		me.tree = Ext.create('Ext.tree.Panel', {
			useArrows: true,
			rootVisible: false,
			store: me.store,
			columns: columns
		});
		me.add(me.tree);
	},
	loadData: function(test_id,course_id) {
		var me = this;
		if (!me.grid) {
			me.grid = me.down('grid');
		}
		Ext.ux.rpc({
			action: 'CC_CO_R4T',
			method: 'prepare',
			params: {
				test_id: test_id,
				course_id: course_id
			},
			scope: me,
			callback: me.initColumn
		});
	}
});
