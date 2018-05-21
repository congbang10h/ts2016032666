Ext.define('VX.view.outcome.Course_SO_R4TRWin', {
	extend: 'Ext.ux.WinForm',
	title: 'Tỷ lệ đạt theo Môn học - Chuẩn đầu ra Sinh viên trong kết quả thi',
	iconCls: 'course_so_r4tr16',
	width: '100%',
	height: '100%',
	grid: null,
	store: null,
	layout: 'border',
	items:[{
		region: 'north',
		xtype: 'toolbar',
		items:[{
			xtype: 'button',
			iconCls: 'chart16',
			text: 'Biểu đồ chung',
			handler: function(){
				var w=this.up('window');
				w.initChart();
			}
		},{
			xtype: 'button',
			iconCls: 'chart16',
			text: 'Biểu đồ riêng',
			handler: function(){
				var w=this.up('window');
				w.initChartPrivate();
			}
		}]
	},{
		region: 'center',
		xtype: 'grid',
		columns:[]
	}],
	initChart: function(){
		var r=VX.getC('Report');
		Ext.ux.rpc({
			action: 'Course_SO_R4TR',
			method: 'chart',
			scope: r,
			callback: r.createChart
		});
	},
	initChartPrivate: function(){
		var r=VX.getC('Report'), selected = this.grid.getSelectionModel().getSelection();
		if (selected.length) {
			Ext.ux.rpc({
				action: 'Course_SO_R4TR',
				method: 'chartdetail',
				params: {
					course_id: selected[0].get('course_id')
				},
				scope: r,
				callback: r.createChart
			});
		}
	},
	initColumn: function(res){
		var me=this, i, fields,columns,soi_id;
		fields = [
			{name: 'course_id',  type: 'int'},
			{name: 'course_code', 	type: 'string'},
			{name: 'course_name_vn', type: 'string'},
			{name: 'course_name_en',  type: 'string'}
		];
		columns = [{
			dataIndex: 'course_id',
			hidden: true,
			locked: true,
			text: '#',
			width: 70,
			filter:{type:'numeric'}
		}, {
			dataIndex: 'course_code',
			width: 80,
			locked: true,
			text: 'Mã môn',
			filter:{type:'string'}
		}, {
			dataIndex: 'course_name_vn',
			width: 160,
			locked: true,
			text: 'Tên môn',
			filter:{type:'string'}
		}, {
			dataIndex: 'course_name_en',
			width: 160,
			text: 'Tên môn TA',
			hidden: true,
			locked: true,
			filter:{type:'string'}
		}];
		for(i in res.column) if (res.column.hasOwnProperty(i)){
			soi_id = res.column[i].soi_id;
			fields.push({ name: soi_id, type: 'float'});
			columns.push({
				text: res.column[i].soi_code,
				dataIndex: soi_id,
				tooltip: res.column[i].soi_desc_vn,
				width: 80,
				renderer: function(val){
					if (val>=0){
						return val ? val.toFixed(2)+'%' : 0;
					}else return '-';
				}
			});
		}
		me.store = Ext.create('Ext.data.Store', {
			fields: fields,
			actionName: 'Course_SO_R4TR',
			proxy:{
				type: 'direct',
				api: Course_SO_R4TR,
				reader:{
					type: 'json',
					root: 'rows',
					totalProperty: 'total'
				}
			},
			autoLoad: true
		});

		me.grid.reconfigure(me.store, columns);
		me.grid.setVisible(true);
	},
	loadEduPro: function(edupro_rec){
		var me=this;
		if (!me.grid) {
			me.grid = me.down('grid');
		}
		me.show();
		Ext.ux.rpc({
			action: 'Course_SO_R4TR',
			method: 'prepare',
			params: {
				edu_program_id: edupro_rec.get('edu_program_id')
			},
			scope: me,
			callback: me.initColumn
		});
	}
});
