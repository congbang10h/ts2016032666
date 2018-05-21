Ext.define('VX.view.outcome.CC_CO_R4TRWin', {
	extend: 'Ext.ux.WinForm',
	title: 'Tỷ lệ Nội dung - Chuẩn đầu ra trong kết quả thi',
	iconCls: 'percentco16',
	width: '100%',
	height: '100%',
	tree: null,
	store: null,
	items:[{
		xtype: 'toolbar',
		items:[{
			xtype: 'button',
			iconCls: 'chart16',
			text: 'Biểu đồ',
			handler: function(){
				var w=this.up('window');
				w.initChart();
			}
		}]
	}],
	initChart: function(){
		var r=VX.getC('Report');
		Ext.ux.rpc({
			action: 'CC_CO_R4TR',
			method: 'chart',
			scope: r,
			callback: r.createChart
		});
	},
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
			fields.push({ name: coi_id, type: 'float'});
			columns.push({
				text: res.column[i].coi_code,
				dataIndex: coi_id,
				tooltip: res.column[i].coi_desc_vn,
				width: 80,
				renderer: function(val,cObj, rec, iRow, iCol){
					if (val>=0){
						return val ? val.toFixed(2)+'%' : 0;
					}else return '-';
				}
			});
		}
		me.store = Ext.create('Ext.data.TreeStore', {
			extend: 'Ext.data.Model',
			fields: fields,
			actionName: 'CC_CO_R4TR',
			proxy:{
				type: 'direct',
				api: CC_CO_R4TR,
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
			action: 'CC_CO_R4TR',
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
