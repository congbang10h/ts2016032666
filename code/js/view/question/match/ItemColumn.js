//NOTE: Container chứa các item có khả năng drag thì không thể đặt layout='vbox'
//nếu có, khi item đang drag sẽ không có hình đi theo chuột
Ext.define('VX.view.question.match.ItemColumn', {
	extend: 'Ext.container.Container',
	alias: 'widget.question-match-column',
	requires: [
		'VX.view.question.match.ItemEdit'
	],
	draw: 0,
	nextCmp: 0,
	prevCmp: 0,
	testing: 0,
	//layout: 'vbox',//KHÔNG THỂ đặt layout vbox
	flex: 1,
	width: 140,
	defaults:{
		xtype: 'question-match-item',
		width: '100%'
	},
	addLink: function(id1, id2){
		var me=this,gc = me.refGroup, gn = me.nextCmp.refGroup, ls=gc._link,i,
			itc = gc.item[gc._map[id1]],
			itn = gn.item[gn._map[id2]],
			q = me.refQuestion;
		if (!ls) ls = gc._link = [];
		for(i in ls)
			if (ls[i]._id1==id1 && ls[i]._id2==id2)
				return;
		ls.push({
			_id1: id1,
			_id2: id2,
			curr_id: itc.id,
			next_id: itn.id
		});
		q._change++;
		if (typeof q.onAnswer=='function')
			q.onAnswer();
		me.draw.updateNode(1);
	},
	removeLink: function(c){//c=[id1,id2]
		var me=this,gc = me.refGroup, ls=gc._link,i;
		for(i in ls){
			if (ls[i]._id1==c[0] && ls[i]._id2==c[1]){
				ls.splice(i,1);
				me.refQuestion._change++;
				break;
			}
		}
		me.draw.updateNode(1);
	},
	removeGroup: function(){
		var me=this;
		me.up('match-item-panel').removeGroup(me);
		me.refQuestion._change++;
	},
	addNewItem: function(item){
		var me = this, p, g = me.refGroup;
		if (item==undefined){
			item = {};
			g.item.push(item);
			me.refQuestion._change++;
		}
		p = me.items.length-1;
		if (me.testing) p++;
		var it = me.insert(p,{
			testing: me.testing
		});
		it.refItem = item;
		
		it.showValue();
		
		item._id = it.getId();
		g._map[item._id] = p;
	},
	moveBefore: function(com, beforeCom){
		var me=this,
			ci = me.items.findIndex('id',com.getId()),
			cb = me.items.findIndex('id',beforeCom.getId()),
			p = ci>cb?cb:(cb-1);
		if (ci!=p){
			me.insert(p,com);
			var i,group=me.refGroup;
			if (ci>cb){
				for(i=ci;i>cb;i--)
					group.item[i] = group.item[i-1]; 
			}else{
				cb--;
				for(i=ci;i<cb;i++)
					group.item[i] = group.item[i+1]; 
			}
			group.item[i] = com.refItem;
			VX.createMap(group._map,group.item,'_id');
			
			if (me.prevCmp)
				me.prevCmp.draw.updateNode(1);
			if (me.draw)
				me.draw.updateNode(1);
			me.refQuestion._change++;
		}
	}
}); 