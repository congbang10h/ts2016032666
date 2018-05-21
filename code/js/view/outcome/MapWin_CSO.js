Ext.define('VX.view.outcome.MapWin_CSO', {
	extend: 'Ext.ux.WinForm',
	title: 'Quan hệ giữa Môn học với Chuẩn đầu ra của Sinh viên',
	iconCls: 'mapping16',
	width: '100%',
	height: '100%',
	layout: 'fit',
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
			{name: 'course_id',  type: 'int'},
			{name: 'course_code', 	type: 'string'},
			{name: 'course_name_vn', type: 'string'},
			{name: 'course_name_en',  type: 'string'}
		];
		columns = [{
			width: 70,
			text: '#',
			hidden: true,
			locked: true,
			dataIndex: 'course_id'
		},{
			width: 70,
			locked: true,
			text: 'Mã môn',
			dataIndex: 'course_code'
		},{
			width: 250,
			//hidden: true,
			locked: true,
			text: 'Môn học',
			dataIndex: 'course_name_vn'
		},{
			width: 250,
			hidden: true,
			locked: true,
			text: 'Môn học (Anh)',
			dataIndex: 'course_name_en'
		}];
		for(i in res.column) if (res.column.hasOwnProperty(i)){
			fields.push({ name: res.column[i].name, type: 'string'});
			columns.push({
				text: res.column[i].soi_code,
				soi_id: res.column[i].soi_id,
				dataIndex: res.column[i].name,
				tooltip: res.column[i].soi_desc_vn,
				width: 60/*,
				renderer: function(val,cObj, rec, iRow, iCol){
					var sid=cObj.column.soi_id,cid=rec.raw.coi_id,
						scode=cObj.column.text,ccode=rec.raw.coi_code;
					return '<div class="map-coi-soi"' +
						'>'+(val?val:'-')+'</div>';
				}*/
			});
		}
		me.store = Ext.create('Ext.data.Store', {
			fields: fields,
			actionName: 'ListCSO',
			proxy:{
				type: 'direct',
				api: ListCSO,
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
		me.grid.reconfigure(me.store, columns);
	},
	loadEduPro: function(edupro_rec){
		var me=this;
		me.edu_program_id = edupro_rec.get('edu_program_id');
		me.grid = me.down('grid');
		me.show();
		Ext.ux.rpc({
			action: 'ListCSO',
			method: 'prepare',
			params: {
				edu_program_id: me.edu_program_id
			},
			scope: me,
			callback: me.initColumn
		});
	}
});
