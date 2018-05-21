//NOTE: Container chứa các item có khả năng drag thì không thể đặt layout='vbox'
//nếu có, khi item đang drag sẽ không có hình đi theo chuột
Ext.define('VX.view.question.choice.ItemColumn', {
	extend: 'Ext.form.FieldContainer',
	requires: [
		'VX.view.question.choice.ItemEdit',
		'VX.view.question.choice.ItemView'
	],
	alias: 'widget.question-choice-column',
	testing: 0,
	flex: 1,
	defaults:{
		xtype: 'question-choice-item',
		width: '100%'
	},
	loadQuestion: function(q){
		var me=this,i;
		me.removeAll();
		me.refQuestion = q;
		if (!me.testing){
			me.add({
				xtype: 'question-choice-additem'
			});
		}
		for(i in q.item)
			me.addNewItem(q.item[i]);
		
		if (me.testing){
			var r = me.add({
				testing: me.testing
			});
			r.remove(r.items.last());
		}
		q._map = {};
		VX.createMap(q._map,q.item,'_id');
	},
	removeQuestionItem: function(cItem){
		var me = this, q = me.refQuestion, pos;
		pos = q._map[cItem.refItem._id];
		q.item.splice(pos,1);
		me.remove(cItem);
		
		q._map = {};
		VX.createMap(q._map,q.item,'_id');
		q._change++;
	},
	addNewItem: function(item){
		var me = this, it,p, q = me.refQuestion,newit=0,val,chk;
		if (item==undefined){
			item = {};
			q.item.push(item);
			q._change++;
			newit=1;
		}
		p = me.items.length-1;
		if (me.testing) p++;
		it = me.insert(p,{
			testing: me.testing
		});
		it.refItem = item;
		it.refQuestion = q;

		if (newit){
			var tab = me.up('#question-basic-tab');
			tab.scrollBy(it.getPosition());
		}
		
		val = item.face!=null?item.face:'';
		chk = item.choice?1:0;
		it.down('checkbox').setValue(chk);
		it.down('flextext').setValue(val);
		
		item._id = it.getId();
	},
	moveBefore: function(com, beforeCom){
		var me=this,
			ci = me.items.findIndex('id',com.getId()),
			cb = me.items.findIndex('id',beforeCom.getId()),
			p = ci>cb?cb:(cb-1);
		if (ci!=p){
			me.insert(p,com);
			var i,q=me.refQuestion;
			if (ci>cb){
				for(i=ci;i>cb;i--)
					q.item[i] = q.item[i-1]; 
			}else{
				cb--;
				for(i=ci;i<cb;i++)
					q.item[i] = q.item[i+1]; 
			}
			q.item[i] = com.refItem;
			
			q._map = {};
			VX.createMap(q._map,q.item,'_id');
			q._change++;
		}
	}
}); 