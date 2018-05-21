Ext.define('VX.view.question.fill.ItemEdit', {
	extend: 'Ext.container.Container',
	alias: 'widget.question-fill-item',
	width: '100%',
	testing: 0,
	refItem: {},
	layout: 'hbox',
	margin: '0 0 5px 0',
	items: [{
		xtype: 'displayfield',
		margin: '0 5px 0 0'
	},{
		xtype: 'textfield',
		flex: 1,
		height: 35,
		onChange: function(){
			var it=this.up();
			it.refItem.value = this.getValue();
			it.up('form').question._change++;
		},
		margin: '0 5px 0 0'
	},{
		xtype: 'flextext',
		width: '50%',
		height: 35,
		onChange: function(){
			var it=this.up();
			it.refItem.face = this.getValue();
			it.up('form').question._change++;
		}
	}],
	setValue: function(it){
		var ls = this.items.items;
		ls[0].setValue(it.id);
		ls[1].setValue(it.value);
		ls[2].setValue(it.face);
	},
	listeners:{
		afterrender: function(me){
			me.group = me.up('question-fill-column');
		}
	}
}); 
