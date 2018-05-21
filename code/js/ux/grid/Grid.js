/**
 * Kế thừa từ lớp Ext.ux.grid.Grid không được đặt thuộc tính listeners, nếu
 * không các event đã thiết lập của Ext.ux.grid.Grid không còn tác dụng, thay
 * vào đó thiết lập listeners tại lớp này và đặt hàm ứng với sự kiện rồi
 * override trên lớp kế thừa
 */
Ext.define('Ext.ux.grid.Grid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.uxgrid',
	requires: [
		'Ext.ux.grid.FiltersFeature',
		'Ext.ux.grid.HeaderToolTip'
	],
	plugins: ['headertooltip'],
	multiSelect: true,
	paging: true,
	toolbar: true,
	reorder: false,
	permission: [],
	initComponent:function(){
		var me = this;
		if (me.reorder){
			if (!me.viewConfig) me.viewConfig={};
			me.viewConfig.plugins = {
				ptype: 'gridviewdragdrop',
				dragText: 'Kéo và thả để thay đổi thứ tự'
			};
			if (!me.viewConfig.listeners) me.viewConfig.listeners={};
			me.viewConfig.listeners.drop = me.onDrop;
			me.viewConfig.listeners.scope = me;
		}
		me.initRowEditor();
		me.initFormEditor();
		me.initButton();
		me.callParent(arguments);
		//Tạo liên hệ với thanh toolbar phân trang
		if (me.paging){
			var gp = me.down('pagingtoolbar');
			gp.bindStore(me.store);
		}
		
		me.setStoreConfig();
		
		me.setButtonPermission();
	},
	setRowEditable: function(yes){
		if (this.rowEditor)
			yes ? this.rowEditor.enable() : this.rowEditor.disable(); 
	},
	checkPermission: function(){
		var me=this, s = me.store,
			selected = me.getSelectionModel().getSelection().length,
			m = new s.model(),
			acName = m.actionName?m.actionName:s.actionName,
			ls = Ext.ux.getPermisson(acName),
			bt,i,
			toolbar = me.down('toolbar');
		me.permission = ls;
		if (!toolbar) return;
		for(i in me.buttons){
			bt = me.buttons[i];
			if (!Ext.Array.contains(ls,i)){
				bt.enable = 0;
				bt.bt.setDisabled(1);
				bt.bt.hide();
			}else{
				bt.enable = 1;
				if (selected || !bt.selectrequire)
					bt.bt.setDisabled(0);
			}
		}
	},
	initRowEditor: function(){
		var fields = this.store.model.getFields(),
			keys = {},
			col, i, f,
			roweditable = false;
		for(i in fields) keys[fields[i].name] = i;
		for(i in this.columns){
			col = this.columns[i];
			f = null;
			if (col.dataIndex && keys[col.dataIndex]
				&& fields[keys[col.dataIndex]]){
				f = fields[keys[col.dataIndex]];
				if (!col.text && f.title)
					col.text =  f.title;
				if (f.type.type == 'date' && !col.renderer)
					col.renderer = Ext.util.Format.dateRenderer(
						col.format ? col.format : 'd/m/Y'
					);
				if (f.type.type == 'datetime' && !col.renderer)
					col.renderer = Ext.util.Format.dateRenderer(
						col.format ? col.format : 'd/m/Y H:i'
					);
			}
			if (!this.form && col.field && col.field.xtype=='datefield')
				col.field.format = 'd/m/Y';
			if (/:.+$/.test(col.dataIndex)){
				col.dataRef = col.dataIndex.substr(1);
				col.oldRenderer = col.renderer;
				col.renderer = function(val, cell, rec/*, rowIdx, colIdx, store*/){
					var col = cell.column, n = col.dataRef,
						v = rec.get(n),
						s = rec.raw&&rec.raw[n]!=undefined?rec.raw[n]:v;
					if (typeof col.oldRenderer=='function')
						return col.oldRenderer(s, cell, rec);
					return s;
				};
			}
			if (col.field || col.editor)
				roweditable = true;
		}
		if (!this.form && roweditable){
			this.rowEditor=Ext.create('Ext.ux.grid.plugin.RowEditing', {
				clicksToMoveEditor: 1,
			    autoCancel: false
			});
			if (this.plugins)
				this.plugins.push(this.rowEditor);
			else
				this.plugins = [this.rowEditor];
		}
	},
	initFormEditor: function(){
	},
    initButton: function(){
		this.dockedItems = [];
		if (this.toolbar){
			this.dockedItems.push({
			    xtype: 'toolbar',
			    dock: 'top',
			    items: [
				{
				    iconCls: 'add16',
				    text: 'Thêm',
				    tooltip: 'Thêm phần tử mới',
				    handler: function() {
						var g = this.up('grid'),
							f = g.form,
							r = g.rowEditor;
						if (f){
							if (f.newRecord)
								f.newRecord();
							else
								console.log(f.$className+' không có newRecord()');
						}else if (r){
						    r.cancelEdit();
					        r.startAdd({}, 0);//-1 = last
						}else
							Ext.ux.info('Tất cả các cột của bảng đều không '+
								'thể sửa chữa');
				    }
				},{
					iconCls: 'edit16',
					text: 'Sửa',
					tooltip: 'Xem và sửa nội dung chi tiết',
				    disabled: true,
					handler: function() {
						var g = this.up('grid'),
							sm = g.getSelectionModel();
						g.editRecord(sm.getSelection()[0]);
					}
				},{
					iconCls: 'duplicate16',
					text: 'Đúp',
					tooltip: 'Tạo bản sao của dòng đang chọn',
				    disabled: true,
					handler: function() {
						var g = this.up('grid'),
							sm = g.getSelectionModel(),
					    	s = g.getStore();
	    				s.duplicate(sm.getSelection());
	    				s.sync();
	    				s.load();
					}
				},{
					iconCls: 'delete16',
					text: 'Xóa',
					tooltip: 'Xóa các dòng đang chọn',
				    disabled: true,
					handler: function() {
						var g = this.up('grid'),
							re = g.rowEditor;
					    if (re) re.cancelEdit();
					    
					    var sm = g.getSelectionModel();
				    	Ext.Msg.show({
				    		title:'Xóa thông tin',
				    		msg: 'Bạn thực sự muốn xóa thông tin đang chọn?',
				    		buttons: Ext.Msg.YESNO,
				    		icon: Ext.Msg.QUESTION,
				    		fn: function(btn){
				    			if (btn === 'yes'){
				    				var s = g.getStore();
				    				s.remove(sm.getSelection());
				    				s.sync();
				    				s.load();
				    			}
				    		}
				    	});
					}
				},{
				    iconCls: 'recycle16',
				    text: 'Đã xóa',
				    tooltip: 'Danh sách thông tin đã xóa',
				    enableToggle: true,
				    toggleHandler: function(me,state) {
						var s = this.up('grid').getStore();
						s.recycleMode = state;
						s.load();
				    }
				},{
				    iconCls: 'restore16',
				    text: 'Phục hồi',
				    disabled: true,
				    handler: function() {
						var g = this.up('grid');
						var s = g.getStore();
						var sm = g.getSelectionModel().getSelection();
						s.restore(sm);
						s.load();
				    }
				}]
			});
		}
		if (this.paging){
			this.dockedItems.push({
		        xtype: 'pagingtoolbar',
		        beforePageText: 'Trang',
		        afterPageText: ': {0}',
		        dock: 'bottom',
		        displayInfo: true,
		        displayMsg: '{0}-{1} [{2}]',
		        emptyMsg: "Không có thông tin"
			});
		}
	},
	setStoreConfig: function(){
		//Tự động load dữ liệu
		if (!this.store.autoLoad)
			this.store.load();
		//Tạo liên hệ giữa store chính của grid và các store con của các column
		//Nếu store chính refresh thì các store con phải load lại
		var ls = this.store.forceReset = [];
		for(var i in this.columns)
		    if (this.columns[i].field && this.columns[i].field.store)
		        ls.push(this.columns[i].field.store);
	},
	setButtonPermission: function(){
		if (this.toolbar){
			this.buttons = {
				read: {
					enable: 1,
					bt: this.down('pagingtoolbar'),
					selectrequire: 0
				},
				create: {
					enable: 1,
					bt: this.down('[iconCls=add16]'),
					selectrequire: 0
				},
				update: {
					enable: 1,
					bt: this.down('[iconCls=edit16]'),
					selectrequire: 1
				},
				duplicate: {
					enable: 1,
					bt: this.down('[iconCls=duplicate16]'),
					selectrequire: 1
				},
				recycle: {
					enable: 1,
					bt: this.down('[iconCls=recycle16]'),
					selectrequire: 0
				},
				destroy: {
					enable: 1,
					bt: this.down('[iconCls=delete16]'),
					selectrequire: 1
				},
				restore: {
					enable: 1,
					bt: this.down('[iconCls=restore16]'),
					selectrequire: 1
				}
			};
		}
	},
	onDrop: function( node, data, overModel, dropPosition, eOpts ){
	},
	onSelectionChange: function(g,selected){
		if (!this.toolbar) return;
		for (var i in this.buttons){
			if (i=='restore')
				this.buttons[i].bt.setDisabled(!selected.length  || !this.store.recycleMode);
			else if (this.buttons[i].selectrequire)
				this.buttons[i].bt.setDisabled(!selected.length);
		}
	},
	editRecord: function(rec){
		var frm = this.form;
		if (frm && frm.editRecord)
			frm.editRecord(rec);
		else
			console.log(this.$className+' không có editRecord()');
	},
	viewRecord: function(rec){
		var frm = this.form;
		if (frm && frm.viewRecord)
			frm.viewRecord(rec);
		else
			console.log(this.$className+' không có viewRecord()');
	},
	onItemDblClick: function(dv, rec, item, index, e) {
		var me = this;
		if (Ext.Array.contains(me.permission,'update')){
        	me.editRecord(rec);
        }else if (Ext.Array.contains(me.permission,'read')){
        	me.viewRecord(rec);
        }
	},
	onItemContextMenu: function(dv, rec, item, index, e) {
    },
	listeners: {
		itemcontextmenu:  function(dv, rec, item, index, e) {
	        this.onItemContextMenu(dv, rec, item, index, e);
	    },
	    itemdblclick: function(dv, rec, item, index, e) {
	        this.onItemDblClick(dv, rec, item, index, e);
	    },
	    afterrender: function(){
	    	var me = this;
	    	me.checkPermission();
			if (me.toolbar && !me.form && !me.rowEditor){
				me.buttons.create.bt.setDisabled(true);
				me.buttons.create.enable = 0;
			}
			if (me.rowEditor && !Ext.Array.contains(me.permission,'update')){
				me.setRowEditable(0);
			}
	    },
	    edit: function() {
			this.store.sync();
			this.store.load();
        },
        selectionchange: function(g,selected,e){
        	this.onSelectionChange(g,selected,e);
        }
	}
});