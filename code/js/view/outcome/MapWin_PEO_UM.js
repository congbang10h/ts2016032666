Ext.define('VX.view.outcome.MapWin_PEO_UM', {
	extend: 'Ext.ux.WinForm',
	title: 'Ma trận Chuẩn đầu ra Chương trình - Sứ mệnh',
	iconCls: 'mapping16',
	width: '100%',
	height: '100%',
	layout: 'fit',
	grid: 0,
	items:[{
		xtype: 'grid',
		columns:[],
		viewConfig:{
			markDirty:false
		}
	}],
	initColumn: function(res){
		var me=this, i, fields,columns;
		fields = [
			{name: 'peoi_id',  type: 'int'},
			{name: 'peoi_code', 	type: 'string'},
			{name: 'peoi_desc_vn', type: 'string'},
			{name: 'peoi_desc_en',  type: 'string'}
		];
		columns = [{
			width: 70,
			text: '#',
			hidden: true,
			locked: true,
			dataIndex: 'peoi_id'
		},{
			width: 70,
			locked: true,
			text: 'SO',
			dataIndex: 'peoi_code'
		},{
			width: 250,
			//hidden: true,
			locked: true,
			text: 'Mô tả',
			dataIndex: 'peoi_desc_vn'
		},{
			width: 250,
			hidden: true,
			locked: true,
			text: 'Mô tả (Anh)',
			dataIndex: 'peoi_desc_en'
		}];
		for(i in res.column) if (res.column.hasOwnProperty(i)){
			fields.push({ name: res.column[i].name, type: 'int'});
			columns.push({
				text: res.column[i].umi_code,
				umi_id: res.column[i].umi_id,
				dataIndex: res.column[i].name,
				tooltip: res.column[i].umi_desc_vn,
				width: 60,
				renderer: function(val,cObj, rec, iRow, iCol){
					var icon = val ? 'fa-check-square-o' : 'fa-square-o',
						umi_id=cObj.column.umi_id,peoi_id=rec.raw.peoi_id;
					return '<i class="fa '+icon+'" onclick="' +
							'VX.getC(\'Outcome\').mappingPEOI2UMI('+peoi_id+','+umi_id+',this)' +
							'"></i>';
				}
			});
		}
		me.store = Ext.create('Ext.data.Store', {
			fields: fields,
			actionName: 'MappingPEO2UM',
			proxy:{
				type: 'direct',
				api: MappingPEO2UM,
				reader:{
					type: 'json',
					root: 'rows',
					totalProperty: 'total'
				}
			},
			autoLoad: true,
			remoteFilter: true,
			filters:[{
				property: 'edu_program_id',
				value: me.edu_program_id
			}]
		});
		VX.getC('Outcome').storePEOI2UMI = me.store;
		me.grid.reconfigure(me.store, columns);
		me.show();
	},
	loadEduPro: function(edupro_rec){
		var me=this;
		me.grid = me.down('grid');
		me.edu_program_id = edupro_rec.get('edu_program_id');
		Ext.ux.rpc({
			action: 'MappingPEO2UM',
			method: 'prepare',
			params: {
				edu_program_id: me.edu_program_id
			},
			scope: me,
			callback: me.initColumn
		});
	}
});
