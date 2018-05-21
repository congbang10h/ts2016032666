Ext.define('VX.view.test.EditQuestionToolbar',{
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.edit-question-tool',
	cls: 'inline-toolbar',
	flex: 1,
	items:['->', {
		xtype: 'displayfield',
		value: 'Điểm'
	},{
		xtype: 'numberfield',
		width: 100,
		value: rec.score,
		oldInfoValue: rec.score,
		itemId: 'qscore',
		listeners:{
			blur: function(me){
				var v = me.getValue();
				if (v!=me.oldInfoValue){
					me.oldInfoValue = v;
					me.info.score = v;
					Ext.ux.rpc({
						action: 'TestSourceQuestion',
						method: 'changescore',
						params: me.info
					});
				}
			}
		}
	}]
});