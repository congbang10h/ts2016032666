Ext.define('VX.view.outcome.MapWin_SO_PEO', {
	extend: 'Ext.ux.WinForm',
	title: 'Ma trận Chuẩn đầu ra: Sinh viên - Chương trình',
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
			{name: 'soi_id',  type: 'int'},
			{name: 'soi_code', 	type: 'string'},
			{name: 'soi_desc_vn', type: 'string'},
			{name: 'soi_desc_en',  type: 'string'}
		];
		columns = [{
			width: 70,
			text: '#',
			hidden: true,
			locked: true,
			dataIndex: 'soi_id'
		},{
			width: 70,
			locked: true,
			text: 'SO',
			dataIndex: 'soi_code'
		},{
			width: 250,
			//hidden: true,
			locked: true,
			text: 'Mô tả',
			dataIndex: 'soi_desc_vn'
		},{
			width: 250,
			hidden: true,
			locked: true,
			text: 'Mô tả (Anh)',
			dataIndex: 'soi_desc_en'
		}];
		for(i in res.column) if (res.column.hasOwnProperty(i)){
			fields.push({ name: res.column[i].name, type: 'int'});
			columns.push({
				text: res.column[i].peoi_code,
				peoi_id: res.column[i].peoi_id,
				dataIndex: res.column[i].name,
				tooltip: res.column[i].peoi_desc_vn,
				width: 60,
				renderer: function(val,cObj, rec, iRow, iCol){
					var peoi_id=cObj.column.peoi_id,soi_id=rec.raw.soi_id;
					return '<div class="map-coi-soi"' +
							'onclick="VX.getC(\'Outcome\').mappingSOI2PEOI('+soi_id+','+peoi_id+')"'+
							'>'+(val?'X':'-')+'</div>';
				}
			});
		}
		me.store = Ext.create('Ext.data.Store', {
			fields: fields,
			actionName: 'MappingSOPEO',
			proxy:{
				type: 'direct',
				api: MappingSOPEO,
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
		VX.getC('Outcome').storeSOI2PEOI = me.store;
		me.grid.reconfigure(me.store, columns);
		me.show();
	},
	loadEduPro: function(edupro_rec){
		var me=this;
		me.grid = me.down('grid');
		me.edu_program_id = edupro_rec.get('edu_program_id');
		Ext.ux.rpc({
			action: 'MappingSOPEO',
			method: 'prepare',
			params: {
				edu_program_id: me.edu_program_id
			},
			scope: me,
			callback: me.initColumn
		});
	}
});
