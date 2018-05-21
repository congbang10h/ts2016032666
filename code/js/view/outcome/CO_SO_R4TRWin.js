Ext.define('VX.view.outcome.CO_SO_R4TRWin', {
	extend: 'Ext.ux.WinForm',
	title: 'Tỷ lệ đạt theo Chuẩn đầu ra Môn học - Chuẩn đầu ra Sinh viên trong kết quả thi',
	iconCls: 'co_so_r4tr16',
	width: '100%',
	height: '100%',
	layout: 'border',
	grid: 0,
	items:[{
		region: 'north',
		xtype: 'toolbar',
		items:[{
			width: 350,
			xtype: 'combobox',
			emptyText: 'Chọn Môn học',
			store: VX.getSE('CourseInEduProWithCO'),
			displayField: 'course_name_vn',
			valueField: 'course_id',
			editable: false,
			listConfig: {
				loadingText: 'Đang tìm...',
				getInnerTpl: function() {
					return '{course_name_vn} ({course_code})';
				}
			},
			listeners:{
				select: function(me, records){
					var bts = me.up().query('button'),i;
					for(i in bts)
						if (bts.hasOwnProperty(i))
							bts[i].setDisabled(records.length?0:1);
				}
			}
		},{
			xtype: 'button',
			disabled: true,
			iconCls: 'co_so_r4tr16',
			text: 'Ma trận CO-SO',
			handler: function(){
				var me=this,c=me.up().down('combobox'),p=me.up('window');
				p.viewMatrixCOSO(c.getValue());
			}
		},{
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
		columns:[],
		viewConfig:{
			markDirty:false
		}
	}],
	initChart: function(){
		var r=VX.getC('Report');
		Ext.ux.rpc({
			action: 'CO_SO_R4TR',
			method: 'chart',
			scope: r,
			callback: r.createChart
		});
	},
	initColumnCOSO: function(res){
		var me=this, i, fields,columns,soi_id;
		fields = [
			{name: 'coi_id',  type: 'int'},
			{name: 'coi_code', 	type: 'string'},
			{name: 'coi_desc_vn', type: 'string'},
			{name: 'coi_desc_en',  type: 'string'}
		];
		columns = [{
			width: 70,
			text: '#',
			hidden: true,
			locked: true,
			dataIndex: 'coi_id'
		},{
			width: 70,
			locked: true,
			text: 'CO',
			dataIndex: 'coi_code'
		},{
			width: 250,
			locked: true,
			text: 'Mô tả',
			dataIndex: 'coi_desc_vn'
		},{
			width: 250,
			hidden: true,
			locked: true,
			text: 'Mô tả (Anh)',
			dataIndex: 'coi_desc_en'
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
			actionName: 'CO_SO_R4TR',
			proxy:{
				type: 'direct',
				api: CO_SO_R4TR,
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
		var me=this, s=VX.getS('CourseInEduProWithCO');
		me.edu_program_id = edupro_rec.get('edu_program_id');
		me.grid = me.down('grid');
		me.grid.setVisible(false);
		me.show();
		s.removeFilter('edupro');
		s.addFilter({
			id: 'edupro',
			property: 'edu_program_id',
			value: me.edu_program_id
		});
		s.load();
	},
	viewMatrixCOSO: function(course_id){
		var me=this;
		Ext.ux.rpc({
			action: 'CO_SO_R4TR',
			method: 'prepare',
			params: {
				course_id: course_id,
				edu_program_id: me.edu_program_id
			},
			scope: me,
			callback: me.initColumnCOSO
		});
	}
});
