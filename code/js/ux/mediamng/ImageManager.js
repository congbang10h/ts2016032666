Ext.define('Ext.ux.mediamng.ImageModel', {
    extend: 'Ext.data.Model',
    fields: [
       {name: 'name'},
       {name: 'url'},
       {name: 'size', type: 'float'},
       {name:'lastmod', type:'date', dateFormat:'timestamp'}
    ]
});
var mediamngImageStore = Ext.create('Ext.data.Store',{
    model: 'Ext.ux.mediamng.ImageModel',
    id: 'mediamng-image-store',
    autoload: true,
    proxy: {
        type: 'ajax',
        url: 'php/ajax/img_browser.php',
        reader: {
            type: 'json',
            rootProperty: 'items',
            root: 'items'
        }
    }
});
//mediamngImageStore.load();
Ext.define('Ext.ux.mediamng.ImageManager',{
	extend: 'Ext.ux.WinForm',
	requires: [
		'Ext.ux.mediamng.ImageUpload'
	],
	iconCls: 'media16',
	title: 'Media Manager',
	onsubmit: null,
	scope: null,
	modal: true,
	onTopMCE: function(){
		var ls = Ext.query('.mce-floatpanel,.mce-in'),
			index = this.getEl().zindex, max = 0, i, df;
		for(i in ls){
			if (max < ls[i].style.zIndex)
				max = ls[i].style.zIndex;
		}
		df = max - index + 1;
		for(i in ls){
			if (index < ls[i].style.zIndex)
				ls[i].style.zIndex -= df;
		}
	},
	show: function(){
		var me = this;
		me.callParent();
		me.onTopMCE();
		me.onTopMCEid = setInterval(function(){
			me.onTopMCE();
		},200);
	},
	hide: function(){
		var me = this;
		me.callParent();
		if (me.onTopMCEid)
			clearInterval(me.onTopMCEid);
	},
	items: [Ext.create('Ext.ux.Form', {
		width: 650,
		btt: VX.BT_CLOSE | VX.BT_SUBMIT,
		fieldDefaults: {
			labelStyle: 'font-weight:bold',
			labelAlign: 'top',
			anchor: '100%'
		},
		tbar: [{
			xtype: 'imageupload',
			demo: false,
			onsuccess: function(o){
				mediamngImageStore.load();
			}
		}],
		items:[{
			xtype: 'dataview',
			id: 'image-manager',
	        store: mediamngImageStore,
	        tpl: [
	            '<tpl for=".">',
	                '<div class="thumb-wrap" id="{name}">',
	                '<div class="thumb"><img src="{url}" title="{name}"></div>',
	                '<span class="x-editable">{shortName}</span></div>',
	            '</tpl>',
	            '<div class="x-clear"></div>'
	        ],
	        multiSelect: true,
	        height: 310,
	        trackOver: true,
	        overItemCls: 'x-item-over',
	        itemSelector: 'div.thumb-wrap',
	        emptyText: 'Chưa có hình',
	        plugins: [
	            Ext.create('Ext.ux.DataView.DragSelector', {}),
	            Ext.create('Ext.ux.DataView.LabelEditor', {dataIndex: 'name'})
	        ],
	        prepareData: function(data) {
	            Ext.apply(data, {
	                shortName: Ext.util.Format.ellipsis(data.name, 15),
	                sizeString: Ext.util.Format.fileSize(data.size),
	                dateString: Ext.util.Format.date(data.lastmod, "m/d/Y g:i a")
	            });
	            return data;
	        },
	        listeners: {
	            selectionchange: function(dv, nodes ){
	                var l = nodes.length,
	                    s = l !== 1 ? 's' : '';
	                //this.up('panel').setTitle('Simple DataView (' + l + ' item' + s + ' selected)');
	            }
	        }
		}],
		submit: function() {
			var f = this.up('window'), d = this.down('dataview');
			if (typeof (f.onsubmit) == 'function'){
				var i,recs = d.getRecords(d.getSelectedNodes());
				for (i in recs) recs[i] = recs[i].getData();
				f.onsubmit(f.scope, recs);
			}
			f.close();
		}
	})]
});