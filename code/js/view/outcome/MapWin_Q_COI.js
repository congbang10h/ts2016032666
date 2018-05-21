Ext.define('VX.view.outcome.MapWin_Q_COI', {
	extend: 'Ext.ux.WinForm',
	title: 'Ma trận Câu hỏi - Chuẩn đầu ra',
	iconCls: 'mapping16',
	width: '100%',
	height: '100%',
	course_id: 0,
	grid: null,
	store: null,
	layout: 'fit',
	items:{
		xtype: 'grid',
		columns:[]
	},
	initColumn: function(res){
		var me=this, i, fields,columns;
		fields = [//some field of Question
			{name: 'type',  type: 'string'},
			{name: 'name', 	type: 'string'},
			{name: 'bloom', type: 'string'},
			{name: 'desc',  type: 'string'}
		];
		columns = [{
			width: 70,
			text: 'Loại',
			locked: true,
			dataIndex: 'type'
		},{
			width: 150,
			locked: true,
			text: 'Tác giả',
			dataIndex: 'name'
		},{
			width: 70,
			locked: true,
			text: 'Cấp độ',
			dataIndex: 'bloom'
		},{
			width: 200,
			locked: true,
			text: 'Mô tả',
			dataIndex: 'desc'
		}];
		for(i in res.column) if (res.column.hasOwnProperty(i)){
			fields.push({ name: res.column[i].name, type: 'int'});
			columns.push({
				text: res.column[i].coi_code,
				coi_id: res.column[i].coi_id,
				dataIndex: res.column[i].name,
				tooltip: res.column[i].coi_desc_vn,
				width: 80,
				renderer: function(val,cObj, rec, iRow, iCol){
					var icon = val ? 'fa-check-square-o' : 'fa-square-o', q_id=rec.raw.question_id;
					return '<i class="fa '+icon+'" onclick="' +
						'VX.getC(\'Outcome\').mappingCOI2Q('+cObj.column.coi_id+','+q_id+',this)' +
						'"></i>';
				}
			});
		}
		me.store = Ext.create('Ext.data.Store', {
			fields: fields,
			actionName: 'MappingQ2COI',
			proxy:{
				type: 'direct',
					api: MappingQ2COI,
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
			},{
				property: 'question_ids',
				value: me.question_ids
			}]
		});

		me.grid.reconfigure(me.store, columns);
	},
	loadData: function(course_id,ids) {
		var me = this;
		if (!me.grid) {
			me.grid = me.down('grid');
		}
		me.course_id = course_id;
		me.question_ids = ids;
		Ext.ux.rpc({
			action: 'MappingQ2COI',
			method: 'prepare',
			params: {
				course_id: course_id,
				question_ids: ids
			},
			scope: me,
			callback: me.initColumn
		});
	}
});
