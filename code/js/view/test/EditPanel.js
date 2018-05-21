Ext.define('VX.view.test.EditPanel',{
	extend: 'Ext.container.Container',
	requires: [
		'VX.view.test.EditSection',
		'VX.view.test.AddSection'
	],
	alias: 'widget.test-edit-panel',
	cls: 'test-edit-panel',
	store: VX.getSE('TestSection'),
	testReadOnly: false,
	initComponent: function(){
		var me=this;
		me.callParent(arguments);
		me.add({
			xtype: 'test-add-section'
		});
	},
	load: function(test_id, readOnly){
		var me=this,s=me.store;
		me.testReadOnly = readOnly;
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
		while (me.items.length>1)
			me.remove(me.items.getAt(1));
		if (me.items.length){
			me.items.getAt(0).setDisabled(me.testReadOnly);
		}
		for(i in recs) {
			me.addSection(0, recs[i]);
		}
	},
	onFinishAddSection: function(recs){
		var me = this, ls = me.query('test-edit-section'), i, j, inside, r, rid;
		for(i in recs){
			rid = recs[i].get('test_section_id');
			inside = 0;
			for(j=0;j<ls.length;j++){
				if (ls[j].getRId()==rid){
					ls[j].record = recs[i];
					ls.splice(j,1);
					j--;
					inside = 1;
					break;
				}
			}
			if (!inside)
				r = recs[i];
		}
		if (ls.length) {
			ls[0].loadSection(r);
		}else{
			console.log('Not found a blank test-edit-section for new record');
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
	addSection: function(addBtt, rec){
		var me=this, ls=me.items, it,
			i=addBtt?(ls.findIndex('id',addBtt.id)+1):ls.length,next;
		next = me.insert(i,{
			xtype: 'test-add-section',
			disabled: me.testReadOnly
		});
		it=me.insert(i,{
			xtype: 'test-edit-section'
		});
		it.nextItem = next;
		if (!rec){
			rec = me.store.add({
				phantom: true,
				test_id: me.testId,
				test_section_order: i
			});
			rec[0].store = me.store;
			me.updateOrder(me,i+1);
			me.store.sync();
			me.store.load({
				scope: me,
				callback: me.onFinishAddSection
			});
		}else it.loadSection(rec, me.testReadOnly);
		
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
	},
	removeSection: function(s){
		var me=this;
		me.store.remove(s.record);
		me.store.sync();
		me.remove(s.nextItem,1);
		me.remove(s,1);
	}
}); 