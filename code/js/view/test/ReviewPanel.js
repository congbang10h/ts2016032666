Ext.define('VX.view.test.ReviewPanel',{
	extend: 'Ext.container.Container',
	requires: [
		'VX.view.test.ReviewSection'
	],
	alias: 'widget.test-review-panel',
	cls: 'test-review-panel',
	store: VX.getSE('TestSection'),
	load: function(test_id){
		var me=this,s=me.store;
		me.testId = test_id;
		s.removeFilter('test', false);
		s.addFilter({
			id: 'test',
			property: 'test_id',
			value: test_id
		}, false);
		s.load({
			scope: me,
			callback: me.onFinishLoadSection
		});
	},
	onFinishLoadSection: function(recs){
		var me=this,i;
		while (me.items.length)
			me.remove(me.items.first());
		for(i in recs) {
			me.addSection(recs[i]);
		}
	},
	updateOrder: function(me, from){
		var i,ls=me.items,o;
		for(i=from;i<ls.length;i++){
			o=ls.getAt(i);
			if (o.record)
				o.record.set('test_section_order',i);
		}
	},
	addSection: function(rec){
		var me=this, it;
		it=me.add({
			xtype: 'test-review-section'
		});
		it.loadSection(rec);
		
	},
	createFinish: function(batch){
		var me=this,ops=batch.operations,i,j,recs,it,id;
		for (i in ops){
			if (ops[i].action=='create'){
				recs = ops[i].records;
				for (j in recs){
					id = recs[j].raw.component_id;
					it = me.down('#'+id);
					if (it)
						it.record = recs[j];
					else
						VX.alert('Không tìm thấy component '+id);
				}
			}
		}
	}
}); 