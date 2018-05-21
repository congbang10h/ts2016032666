VX.winBloomSelect4COI_SOI = Ext.create('Ext.Window',{
	layout: 'fit',
	cls: 'bloom-select',
	items:{
		xtype: 'container',
		layout: {
			type: 'table',
			columns: 2,
			tdAttrs: { style: 'padding: 10px 10px;' }
		},
		items: [{
			xtype: 'button',
			width: 220,
			bloom_id: 0,
			colspan: 2,
			scale: 'medium',
			text: 'Không có quan hệ',
			handler: function(me){
				me.up('window').map(0);
			}
		}]
	},
	listeners:{
		afterrender: function(){
			var me=this,bloom=VX.getS('Bloom_level');
			bloom.load({
				callback: me.loadBloom,
				scope: me
			});
		}
	},
	loadBloom: function(recs){
		var me=this,con=me.items.items[0], i,d;
		for(i in recs) if (recs.hasOwnProperty(i)){
			d = recs[i].data;
			con.add({
				xtype: 'button',
				bloom_id: d.bloom_level_id,
				width: 100,
				scale: 'medium',
				text: d.bloom_level_code+': '+ d.bloom_level_desc,
				handler: function(me){
					me.up('window').map(me.bloom_id);
				}
			});
		}
		me.buttons = con.items.items;
		me.setLevel();
	},
	select: function(coi_id,coi_code,soi_id,soi_code,level){
		var me=this;
		me.coi_id = coi_id;
		me.soi_id = soi_id;
		me.setTitle('Chuẩn Bloom của '+coi_code+' - '+soi_code);
		me.show();
		me.setY(50);
		me.level = level;
		me.setLevel();
	},
	setLevel: function(){
		var me=this,i;
		for(i in me.buttons) if (me.buttons.hasOwnProperty(i)){
			me.buttons[i].removeCls('selected');
			me.buttons[i].setDisabled(false);
			if (me.buttons[i].bloom_id==me.level){
				me.buttons[i].addCls('selected');
				me.buttons[i].setDisabled(true);
			}
		}
	},
	map: function(level){
		var me=this,idx, rec, i,reg=new RegExp('SOI_'+me.soi_id+'_.*');
		VX.getC('Outcome').mappingCOI2SOI(me.coi_id,me.soi_id,level);
		me.close();
		idx = me.store.find('coi_id',me.coi_id);
		if (idx>=0){
			rec = me.store.getAt(idx);
			for(i in rec.data){
				if (rec.data.hasOwnProperty(i) && reg.test(i)){
					rec.set(i,level);
					break;
				}
			}
		}
	}
});
Ext.define('VX.view.outcome.MapWin_CO_SO', {
	extend: 'Ext.ux.WinForm',
	title: 'Ma trận Chuẩn đầu ra: Môn học - Sinh viên',
	iconCls: 'mapping16',
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
			valueField: 'co_id',
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
			iconCls: 'mapping16',
			text: 'Ma trận CO-SO',
			handler: function(){
				var me=this,c=me.up().down('combobox'),p=me.up('window');
				p.viewMatrixCOSO(c.getValue());
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
	initColumnCOSO: function(res){
		var me=this, i, fields,columns;
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
			//hidden: true,
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
			fields.push({ name: res.column[i].name, type: 'int'});
			columns.push({
				text: res.column[i].soi_code,
				soi_id: res.column[i].soi_id,
				dataIndex: res.column[i].name,
				tooltip: res.column[i].soi_desc_vn,
				width: 60,
				renderer: function(val,cObj, rec, iRow, iCol){
					var sid=cObj.column.soi_id,cid=rec.raw.coi_id,
						scode=cObj.column.text,ccode=rec.raw.coi_code;
					return '<div class="map-coi-soi"' +
						'onclick="VX.winBloomSelect4COI_SOI.select('+cid+',\''+ccode+'\','+sid+',\''+scode+'\','+val+')"'+
						'>'+(val?val:'-')+'</div>';
				}
			});
		}
		me.store = Ext.create('Ext.data.Store', {
			fields: fields,
			actionName: 'MappingCOI2SOI',
			proxy:{
				type: 'direct',
				api: MappingCOI2SOI,
				reader:{
					type: 'json',
					root: 'rows',
					totalProperty: 'total'
				}
			},
			autoLoad: true,
			remoteFilter: true,
			filters:[{
				property: 'co_id',
				value: me.co_id
			},{
				property: 'edu_program_id',
				value: me.edu_program_id
			}]
		});
		VX.winBloomSelect4COI_SOI.store = me.store;

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
	viewMatrixCOSO: function(co_id){
		var me=this;
		me.co_id = co_id;
		Ext.ux.rpc({
			action: 'MappingCOI2SOI',
			method: 'prepare',
			params: {
				co_id: co_id,
				edu_program_id: me.edu_program_id
			},
			scope: me,
			callback: me.initColumnCOSO
		});
	}
});
