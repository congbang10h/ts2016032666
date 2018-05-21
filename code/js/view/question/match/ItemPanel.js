Ext.define('VX.view.question.match.ItemPanel', {
	extend: 'Ext.form.FieldContainer',
	alias: 'widget.match-item-panel',
	requires: [
		'VX.view.question.match.ItemColumn',
		'VX.view.question.match.ItemConnect'
	],
	//width: '100%',
	layout: 'hbox',
	testing: 0,
	addNewGroup: function(group){
		var me=this, ls=me.items.items,c,i,r,q=me.question,
			p = me.testing ? ls.length : (ls.length-1),
			newg = 0;
		if (!me.testing && q.group.length==6){
			Ext.ux.error('Số nhóm tối đa là 6, không thể thêm nhóm');
		}else{
			if (group==undefined){
				group = {item:[{},{}],link:[]};
				newg = 1;
				q.group.push(group);
				q._change++;
			}
			if (p){
				c = me.insert(p,{
					xtype: 'question-item-connect'
				});
			}
			r = me.insert(p ? p+1 : 0,{
				testing: me.testing,
				xtype: 'question-match-column'
			});
			if (!me.testing){
				r.add({xtype: 'question-match-additem'});
			}
			group._id = r.getId();
			group._map = {};
			r.refGroup = group;
			r.refQuestion = q;
			for(i in group.item)
				r.addNewItem(group.item[i]);
			if (p){
				r.prevCmp = ls[p-1];
				ls[p-1].nextCmp = r;
				ls[p-1].draw = c;
				c.groupCmp = ls[p-1];
			}
			if (newg){
				q._map = {};
				VX.createMap(q._map,q.group,'_id');
			}
		}
	},
	removeGroup: function(gCmp){
		var me = this, q=me.question,
			 gPrev=gCmp.prevCmp, gNext=gCmp.nextCmp;
		if (q.group.length==2){
			Ext.ux.error('Số nhóm tối thiểu là 2, không thể xóa nhóm');
		}else{
			Ext.suspendLayouts();
			if (!gPrev){
				gNext.prevCmp = 0;
				me.remove(gCmp.draw,true);
			}else if (!gNext){
				gPrev.nextCmp = 0;
				gPrev.refGroup._link = [];
				me.remove(gPrev.draw,true);
				gPrev.draw = 0;
			}else{
				gPrev.nextCmp = gNext;
				gNext.prevCmp = gPrev;
				gPrev.refGroup._link = [];
				me.remove(gCmp.draw,true);
				gPrev.draw.updateNode(1);
			}
			me.remove(gCmp,true);
			q.group.splice(q._map[gCmp.getId()],1);
			q._map = {};
			VX.createMap(q._map,q.group,'_id');
			me.autoWidth();
			Ext.resumeLayouts();
			me.doComponentLayout();
		}
	},
	loadQuestion: function(q){
		var me=this,ls=me.items.items,i,j,k,link, g = q.group,gc,gn;
		me.question = q;
		q._change = 0;
		//Ext.suspendLayouts();
		while (ls.length>1)
			me.remove(ls[0],true);
		if (me.testing && ls.length)
			me.remove(ls[0],true);
		for(i in g){
			me.addNewGroup(g[i]);
		}
		//Tap map cho cac group
		q._map = {};
		VX.createMap(q._map,q.group,'_id');
		
		//Cap nhat _id1,_id2 cho cac link
		for(i=0;i<g.length-1;i++){
			gc = g[i];gn = g[i+1];
			if (!gc._link){
				gc._link = [];
				continue;
			}
			for(j in gc._link){
				link = gc._link[j];
				for(k in gc.item){
					if (gc.item[k].id==link.curr_id){
						link._id1 = gc.item[k]._id;
						break;
					}
				}
				for(k in gn.item){
					if (gn.item[k].id==link.next_id){
						link._id2 = gn.item[k]._id;
						break;
					}
				}
			}
			if (!link._id1 || !link._id1)
				console.log('Error link from '+link.curr_id+' to '+link.next_id);
		}
		//Hien thi cac link
		for(i in ls){
			if (ls[i].xtype=='question-item-connect')
				ls[i].updateNode();
		}
		me.autoWidth();
		//Ext.resumeLayouts();
		//me.doComponentLayout();
	},
	onBttAddNewGroup: function(){
		var me=this,pos;
		Ext.suspendLayouts();
		me.addNewGroup();
		me.autoWidth();
		Ext.resumeLayouts();
		me.doComponentLayout();
		pos = me.items.last().getPosition();
		me.up().scrollBy(pos[0],pos[1]);
	},
	autoWidth: function(){
		var me=this,g=me.question.group;
		me.setWidth(g.length*140+(g.length-1)*40+30);
	},
	items:[{
		xtype: 'box',
		cls: 'question-group-add x-unselectable',
		listeners:{
			render: function(me){
				me.getEl().on('click', function() {
					me.up('fieldcontainer').onBttAddNewGroup();
				},me);
				Ext.create('Ext.tip.ToolTip', {
					target: me.getEl(),
					html: 'Thêm nhóm mới' 
				});
			}
		}
	}]
});
