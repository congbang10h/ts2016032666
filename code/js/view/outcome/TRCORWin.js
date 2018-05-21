Ext.define('VX.view.outcome.TRCORWin', {
	extend: 'Ext.ux.WinForm',
	title: 'Tỷ lệ Kết quả thi - Chuẩn đầu ra',
	iconCls: 'percentco16',
	width: '100%',
	height: '100%',
	course_id: 0,
	grid: null,
	store: null,
	layout: 'border',
	items:[{
		region: 'north',
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
	},{
		region: 'center',
		xtype: 'grid',
		columns:[]
	}],
	initChart: function(){
		var r=VX.getC('Report');
		Ext.ux.rpc({
			action: 'TRCOR',
			method: 'chart',
			scope: r,
			callback: r.createChart
		});
	},
	initColumn: function(res){
		var me=this, i, fields,columns,coi_id;
		fields = [//some field of Test
			{name: 'test_id',  type: 'int'},
			{name: 'number_taker',  type: 'int'},
			{name: 'code',  type: 'string'},
			{name: 'lecturer',  type: 'string'}
		];
		columns = [{
			hidden: true,
			width: 70,
			text: '#',
			locked: true,
			dataIndex: 'test_id'
		},{
			width: 90,
			text: 'Mã đề',
			locked: true,
			dataIndex: 'code'
		},{
			width: 70,
			text: 'Số bài thi',
			locked: true,
			dataIndex: 'number_taker'
		},{
			width: 200,
			locked: true,
			text: 'Giảng viên',
			dataIndex: 'lecturer'
		}];
		for(i in res.column) if (res.column.hasOwnProperty(i)){
			coi_id = res.column[i].coi_id;
			fields.push({ name: 'coi_'+coi_id+'_nq', type: 'int'});
			fields.push({ name: 'coi_'+coi_id+'_rq', type: 'int'});
			columns.push({
				text: res.column[i].coi_code,
				coi_id: coi_id,
				dataIndex: 'coi_'+coi_id+'_rq',
				tooltip: res.column[i].coi_desc_vn,
				width: 80,
				renderer: function(val,cObj, rec, iRow, iCol){
					var total=rec.get('coi_'+cObj.column.coi_id+'_nq');
					if (total){
						return val ? (val*100/total).toFixed(2)+'%' : 0;
					}else return '-';
				}
			});
		}
		me.store = Ext.create('Ext.data.Store', {
			fields: fields,
			actionName: 'TRCOR',
			proxy:{
				type: 'direct',
					api: TRCOR,
					reader:{
					type: 'json',
						root: 'rows',
						totalProperty: 'total'
				}
			},
			autoLoad: true,
			remoteFilter: true,
			filters:[{
				property: 'course_id',
				value: me.course_id
			}]
		});

		me.grid.reconfigure(me.store, columns);
	},
	loadData: function(course_id) {
		var me = this;
		if (!me.grid) {
			me.grid = me.down('grid');
		}
		me.course_id = course_id;
		Ext.ux.rpc({
			action: 'TRCOR',
			method: 'prepare',
			params: {
				course_id: course_id
			},
			scope: me,
			callback: me.initColumn
		});
	}
});
