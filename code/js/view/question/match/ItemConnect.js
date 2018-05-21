Ext.define('VX.view.question.match.ItemConnect', {
	extend: 'Ext.draw.Component',
	alias: 'widget.question-item-connect',
	height: '100%',
	width: 40,
	//viewBox: false,
	groupCmp: 0,
	needUpdate: 1,
	pallete: ['E3B505','610345','107E7D','044B7F','95190C'],
	addLine: function(id1,id2,a,b){
		var me=this,x1 = 0, x2=me.getWidth(), y1,y2,
			y0 = me.getPosition()[1],
			el = me.groupCmp.items.items[a],
			er = me.groupCmp.nextCmp.items.items[b],
			c = '#'+me.pallete[a%5];
		if (!el || !er){
			console.log('Connect id '+id1+' to '+id2+' failed!');
			return;
		}
		y1 = el.getPosition()[1] - y0 + (el.getHeight()/2);
		y2 = er.getPosition()[1] - y0 + (er.getHeight()/2);
		me.surface.add({
			connector: [id1,id2],
			type: 'path',
			path: 'M '+x1+' '+y1+' L '+x2+' '+y2,
			stroke: c,
			'stroke-width': 5,
			listeners:{
				click: function(sprite,ev){
					if (ev.altKey || ev.ctrlKey || ev.shiftKey){
						sprite.remove();
						me.groupCmp.removeLink(sprite.connector);
					}
				}
			}
		});
	},
	updateTimer: 0,
	destroy: function(){
		if (this.updateTimer)
			clearInterval(this.updateTimer);
		this.callParent(arguments);
	},
	updateNode: function(forced){
		var me=this;
		if (forced)
			me.needUpdate = 1;
		if (!me.updateTimer){
			me.updateTimer = setInterval(function(){
				me.drawAll();
			},200);
		}
	},
	drawAll: function(){
		var me=this;
		if (!me.needUpdate || !me.surface || !me.groupCmp || !me.getWidth())
			return;
		var gc=me.groupCmp.refGroup,
			gn=me.groupCmp.nextCmp.refGroup,
			ls=gc._link,i,p1,p2;
		me.surface.removeAll();
		for(i in ls){
			p1 = gc._map[ls[i]._id1];
			p2 = gn._map[ls[i]._id2];
			me.addLine(ls[i]._id1,ls[i]._id2,p1,p2);
		}
		me.surface.renderAll();
		me.needUpdate = 0;
	},
	listeners:{
		resize: function(me){
			me.updateNode();
		}
	}
}); 