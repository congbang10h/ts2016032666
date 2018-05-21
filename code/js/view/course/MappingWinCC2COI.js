Ext.define('VX.view.course.MappingWinCC2COI', {
	extend: 'Ext.ux.WinForm',
	title: 'Ma trận Nội dung - Chuẩn đầu ra',
	iconCls: 'mapping16',
	width: '100%',
	height: '100%',
	course: 0,
	course_id: 0,
	tree: null,
	store: null,
	initColumn: function(res){
		var me=this, i, fields,columns;
		fields = [
			{name: 'id', type: 'int'},//course_content_id
			{name: 'text', type: 'string'}
		];
		columns = [{
			xtype: 'treecolumn',
			header: 'Nội dung',
			flex: 2,
			dataIndex: 'text'
		}];
		for(i in res.column) if (res.column.hasOwnProperty(i)){
			fields.push({ name: res.column[i].name, type: 'int'});
			columns.push({
				header: res.column[i].coi_code,
				coi_id: res.column[i].coi_id,
				dataIndex: res.column[i].name,
				width: 100,
				renderer: function(val,cObj, rec, iRow, iCol){
					var icon = val ? 'fa-check-square-o' : 'fa-square-o', cc_id=rec.data.id;
					return '<i class="fa '+icon+'" onclick="' +
						'VX.getC(\'Course\').mappingCOI2CC('+cObj.column.coi_id+','+cc_id+',this)' +
						'"></i>';
				}
			});
		}
		me.store = Ext.create('Ext.data.TreeStore', {
			extend: 'Ext.data.Model',
			fields: fields,
			filters:[{
				property: 'course_id',
				value: me.course_id
			}],
			actionName: 'MappingCC2COI',
			proxy:{
				type: 'direct',
				api: MappingCC2COI,
				reader:{
					type: 'json',
					root: 'children'
				}
			}
		});
		me.tree = Ext.create('Ext.tree.Panel', {
			useArrows: true,
			rootVisible: false,
			store: me.store,
			columns: columns
		});
		me.add(me.tree);
	},
	loadCourse: function(rec) {
		var me = this,
			course_id = rec.get('course_id');
		me.course = rec;
		me.course_id = course_id;

		if (me.tree) {
			me.remove(me.tree);
			me.tree = null;
		}
		Ext.ux.rpc({
			action: 'MappingCC2COI',
			method: 'prepare',
			params: {
				filter: [{
					property: 'course_id',
					value: course_id
				}]
			},
			scope: me,
			callback: me.initColumn
		});
	}
});
