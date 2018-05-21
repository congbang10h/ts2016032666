Ext.define('Ext.ux.form.GroupForm', {
	extend: 'Ext.Window',
	itemId: 'groupform',
	modal: false,
	itemSelected: 0,
	oldItemFilter: '',
	itemFilter: 0,
	initComponent: function(){
		var me=this;
		me.callParent(arguments);
		if (!me.mapCfg) return;
		me.setTitle(me.mapCfg.title);
		me.add({
			layout: 'fit',
			height: 500,
			width: 450,
			items: {
				overflowY: 'auto',
				cls: 'NoItemSelected vx-group-view',
				xtype: 'dataview',
				store: me.mapCfg.store,
				itemSelector: 'div.vx-search-item',
				emptyText: '<div class="x-grid-empty">Không có thông tin</div>',
				tpl: me.mapCfg.template,
				listeners: {
					refresh: function(me){
						me.up('#groupform').initDrop(me);
					}
				}
			},
			dockedItems: [{
				dock: 'top',
				xtype: 'toolbar',
				items: [{
					xtype: 'searchfield',
					width: 200,
					paramName: 'query_'+me.mapCfg.searchField,
					store: me.mapCfg.store
				},{
					xtype: 'fieldset',
					checkboxToggle: true,
					title: 'Lọc '+me.mapCfg.groupLabel+' theo '+me.mapCfg.itemLabel,
					defaults:{
						xtype: 'radio',
						flex: 1,
						name: 'scope',
						margin: '0 10px 0 0',
						listeners:{
							change: function(me, newv){
								if (!newv)
									me.up().changeFilter();
							}
						}
					},
					itemId: 'chkItem',
					layout: 'hbox',
					items:[{
						boxLabel: 'Tất cả',
						checked: true
					},{
						boxLabel: 'Trong'
					},{
						boxLabel: 'Ngoài'
					}],
					changeFilter: function(){
						var me=this,p = me.up('#groupform'),
							ls = me.query('radio'), i,oldF=p.itemFilter;
						for(i in ls){
							if (ls[i].getValue()) {
								p.itemFilter = parseInt(i) + 1;
								break;
							}
						}
						if (oldF!=p.itemFilter)
							p.updateFilter();
					},
					listeners:{
						boxready: function(me){
							me.collapse();
						},
						collapse: function(me){
							var p = me.up('#groupform'),
								dv = p.down('dataview'),
								iz = p.down('#toolbar-selected');
							dv.addCls('NoItemSelected');
							iz.setVisible(false);
							if (p.itemFilter!=0) {
								p.itemFilter = 0;
								p.updateFilter();
							}
						},
						expand: function(me){
							var p = me.up('#groupform'),
								dv = p.down('dataview'),
								iz = p.down('#toolbar-selected');
							if (p.itemSelected)
								dv.removeCls('NoItemSelected');
							iz.setVisible(true);
							me.changeFilter();
						}
					}
				}]
			}, {
				dock: 'top',
				xtype: 'toolbar',
				itemId: 'toolbar-selected',
				items: {
					xtype: 'container',
					itemId: 'item-selected',
					height: 40,
					width: '100%'
				}
			}, {
				dock: 'bottom',
				xtype: 'pagingtoolbar',
				store: me.mapCfg.store,
				beforePageText: 'Trang',
				afterPageText: ': {0}',
				displayInfo: true,
				displayMsg: '{0}-{1} [{2}]',
				emptyMsg: "Không có thông tin"
			}]
		});
	},
	setSelection: function(rec){
		var me=this,
			sv = me.down('#item-selected'), el=sv.getEl(),
			dv=me.down('dataview');
		if (rec && el) {
			if (Ext.isArray(rec))
				rec = rec[0];
			me.itemSelected = rec.getKey();
			el.setHTML(rec.toHTML());
			if (me.itemFilter) {
				dv.removeCls('NoItemSelected');
				me.updateFilter();
			}
		}else{
			me.itemSelected = 0;
			dv.addCls('NoItemSelected');
			if (me.itemFilter)
				me.updateFilter();
		}
		me.mapCfg.itemSelected = me.itemSelected;
	},
	show: function(){
		var me=this,view = Ext.getBody().getViewSize(),
			y = (view.height-700)/ 2,
			x = view.width-450-10;
		if (y<0) y=0;
		if (x<0) x=0;
		me.callParent();
		me.setXY([x,y]);
		me.mapCfg.store.load();
	},
	updateFilter: function(){
		var me=this,store = me.mapCfg.store,
			itemId = me.itemSelected;
		if (!itemId || me.oldItemFilter == itemId+'-'+me.itemFilter)
			return;
		store.removeFilter('itemfilter', false);
		if (me.itemFilter==1){
			store.addFilter({
				id: 'itemfilter',
				property: 'hasitem',
				value: itemId
			}, false);
		}else if (me.itemFilter==2){
			store.addFilter({
				id: 'itemfilter',
				property: 'inside',
				value: itemId
			}, false);
		}else if (me.itemFilter==3){
			store.addFilter({
				id: 'itemfilter',
				property: 'outside',
				value: itemId
			}, false);
		}
		me.oldItemFilter = itemId+'-'+me.itemFilter;
		store.load();
	},
	initDrop: function(me){
		var dropZones = me.getEl().query('.vx-search-item'), i, d,
			cfg = me.up('#groupform');
		for(i in dropZones){
			d=dropZones[i];
			d.drop = Ext.create("Ext.dd.DropZone", d, {
				getTargetFromEvent: function (e) {
					return Ext.get(e.target).up('.vx-search-item');
				},
				onNodeEnter: function (target) {
					target.addCls('drophover');
				},
				onNodeOut: function (target) {
					target.removeCls('drophover');
				},
				onNodeDrop: function (target, dd, e, data) {
					var gid = target.down('input').getValue(), i,
						recs = data.records, iids=[],s=cfg.mapCfg.store;
					for(i in recs)
						iids.push(recs[i].getKey());
					s.rpc({
						action: 'create',
						params: {
							groupid: gid,
							itemid: iids
						}
					});
					s.load();
				},
				ddGroup: cfg.mapCfg.dragName
			});
		}
	}
});