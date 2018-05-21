Ext.define('VX.view.test.ReviewSection',{
	extend: 'Ext.container.Container',
	alias: 'widget.test-review-section',
	requires: [
	],
	width: 800,
	style: 'margin-bottom:10px;',
	layout: 'hbox',
	items: [{
		flex: 1,
		xtype: 'container',
		itemId: 'sectioninner',
        cls: 'sectioninner',
		minHeight: 30,
		style: 'margin-right:3px;',
		items: [{
			xtype: 'box',
			cls: 'question_desc',
			itemId: 'test_section_desc',
			//height: 100,
			width: '100%'
		}]
	}],
	ctrl: VX.getC('Question'),
	getRId: function(){
		return this.record ? this.record.get('test_section_id') : 0;
	},
	loadSection: function(r){
		var me=this, d=me.down('#test_section_desc'),
			items=r.raw.hasMany.Question;
		me.record = r;
		d.el.setHTML(r.get('test_section_desc'));
        //d.el.dom.style.height = null;//Sử dụng chiều cao theo nội dung
		me.addQuestion(items);
	},
	updateHeight: function(){
		//var me=this, h=0, i,ls=me.items.items;
		//if (!me.inner)
			//me.inner = Ext.getDom(me.id+'-innerCt');
		////h = me.items.first().getHeight();
		//for(i in ls) {
        //    h += ls[i].getHeight();
        //}
        //h = (h+20)+'px';//20 for top+bottom margin of section
		//me.setHeight(h);
		//me.inner.style.height = h;
		//me.el.dom.style.height = h;
		//console.log('Height of '+me.getId()+' is '+h);
	},
	addQuestion: function(recs){
		var me=this, si = me.down('#sectioninner'), i;
		for (i in recs){
			//me.queue.push({
			//	action: 'add',
			//	rec: recs[i],
			//	con: si
			//});
			me.addSingle(recs[i],si);
		}
		Ext.ux.showMask(me.up('test-review-panel'));
		me.addRun();
	},
	addSingle: function(rec,con){
		var me=this,box,q,h= 0, j,qbox;
		qbox = con.add({
			xtype: 'container',
			width: '100%',
			cls: 'test-question-box',
			items:[{
				xtype: 'container',
				cls: 'question-number',
				layout: 'hbox',
				items:[{
					xtype: 'container',
					itemId: 'qnum',
					html: 'Câu hỏi',
					flex: 1
				},{
					xtype: 'toolbar',
					cls: 'inline-toolbar',
					flex: 1,
					items:['->', {
						xtype: 'displayfield',
						value: 'Điểm '+rec.score
					}]
				}]
			}, {
				xtype: 'container',
				itemId: 'qbox'
			}]
		});
		box = qbox.down('#qbox');
		//box = con.add({
		//	xtype: 'container',
		//	cls: 'test-question-box'
		//});
		q = me.ctrl.fromRecord(rec);
		q.render(0,box,true);
		for(j in box.items.items)
			h+=box.items.items[j].getHeight();
		box.setHeight(h+20);//20 for top+bottom margin of box
		me.updateHeight();
	},
	queue: [],
	addRun: function(){
		var me=this;
		if (me.addSingleRunning) return;
		if (!me.queue.length){
			Ext.ux.hideMask();
			return;
		}
		me.addSingleRunning=1;
		var a=me.queue.shift();
		if (a.action=='add'){
			me.addSingle(a.rec,a.con);
		}else if (a.action='sync'){
			me.addSync(a.recs);
		}
		setTimeout(function(){
			me.addRun();
		},100);
		me.addSingleRunning=0;
	}
});
