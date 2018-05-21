//NOTE: Container chứa các item có khả năng drag thì không thể đặt layout='vbox'
//nếu có, khi item đang drag sẽ không có hình đi theo chuột
Ext.define('VX.view.question.fill.ItemColumn', {
	extend: 'Ext.form.FieldContainer',
	requires: [
		'VX.view.question.fill.ItemEdit'
	],
	alias: 'widget.question-fill-column',
	testing: 0,
	//layout: 'vbox',//KHÔNG THỂ đặt layout vbox
	flex: 1,
	insertItem: function(pos,item){
		var me = this,
			it = me.insert(pos,{
				xtype: 'question-fill-item',
				width: '100%',
				testing: me.testing
			});
		it.refItem = item;

		if (!me.testing){
			it.setValue(item);
		}
		
		item._id = it.getId();
	}
}); 