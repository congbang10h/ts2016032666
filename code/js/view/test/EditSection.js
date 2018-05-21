Ext.define('VX.view.test.EditSection',{
	extend: 'Ext.container.Container',
	alias: 'widget.test-edit-section',
	requires: [
		'VX.view.test.AddQuestion'
	],
	width: '100%',
	style: 'margin-bottom:10px;',
	layout: 'hbox',
	items: [{
		flex: 1,
		xtype: 'container',
		itemId: 'sectioninner',
		minHeight: 30,
		style: 'margin-right:3px;',
		items: [{
			xtype: 'flextext',
			itemId: 'test_section_desc',
			height: 100,
			width: '100%',
			onChange: function(){
				var me=this,r=me.up('test-edit-section').record,
					s=VX.getSE('TestSection');
				if (me.isDisabled()) return;
				r.set('test_section_desc',me.getValue());
				s.sync();
			}
		},{
			xtype: 'test-add-question'
		}]
	},{
		xtype: 'container',
		items: [{
			xtype: 'button',
			iconCls: 'delete16',
			handler: function(){
				var me=this,s=me.up('test-edit-section'),
					p=s.up('test-edit-panel');
				p.removeSection(s);
			}
		}]
	}],
	ctrl: VX.getC('Question'),
	getRId: function(){
		return this.record ? this.record.get('test_section_id') : 0;
	},
	loadSection: function(r, readOnly){
		var me=this, d=me.down('#test_section_desc'),
			items=r.raw.hasMany.Question,
			addBtt=me.down('test-add-question');
		me.record = r;
		me.readOnly = readOnly;
		d.setDisabled(readOnly);
		addBtt.setDisabled(readOnly);
		d.setValue(r.get('test_section_desc'));
		me.addQuestion(items,addBtt,0);
		if (readOnly){
			d = me.down('button[iconCls=delete16]');
			if (d)
				d.setDisabled(1);
		}
	},
	setAddBtt: function(addBtt){
		var me=this, p = me.up('test-edit-win');
		try{
			p.currentAddBtt.removeCls('selected');
		}catch(e){}
		p.currentAddBtt = addBtt;
		addBtt.addCls('selected');
	},
	updateHeight: function(){
		var me=this,h;
		//console.log(me.getId()+' start updateHeight');
		if (!me.inner)
			me.inner = Ext.getDom(me.id+'-innerCt');
		h = me.items.first().getHeight();
		me.setHeight(h);
		me.inner.style.height=h+'px';
		//console.log(me.getId()+' end updateHeight');
	},
	addQuestion: function(recs, addBtt, sync){
		var me=this, si = addBtt.up('#sectioninner'),			
			ls=si.items, i,pos=ls.findIndex('id',addBtt.id);
		for (i in recs){
			//me.queue.push({
			//	action: 'add',
			//	rec: recs[i],
			//	con: si,
			//	pos: pos
			//});
			me.addSingle(recs[i],si,pos);
			pos+=2;
		}
		if (recs.length && (sync==undefined || sync==1)){
			//me.queue.push({
			//	action: 'sync',
			//	recs: recs
			//});
			me.addSync(recs);
		}
		Ext.ux.showMask(me.up('test-edit-panel'));
		me.addRun();
	},
	addSingle: function(rec,con,pos){
		var me=this,box, qbox,q, j,h= 0,sbox;
		//box = con.insert(pos,{
		//	xtype: 'container',
		//	width: '100%',
		//	layout: 'hbox',
		//	items:[{
		//		cls: 'test-question-box',
		//		flex: 1
		//	},{
		//		xtype: 'container',
		//		width: 50,
		//		style: 'border:1px solid red'
		//	}]
		//});
		qbox = con.insert(pos, {
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
				}]
			}, {
				xtype: 'container',
				itemId: 'qbox'
			}]
		});
		box = qbox.down('#qbox');
		con.insert(pos,{
			xtype: 'test-add-question',
			disabled: me.readOnly
		});
		q = me.ctrl.fromRecord(rec);
		sbox = qbox.down('#qscore');
		sbox.info = {
			question_id: q.id,
			test_section_id: me.record.data.test_section_id
		};
		//console.log(sbox.info);
		q.render(0,box);
		for(j in box.items.items)
			h+=box.items.items[j].getHeight();
		box.setHeight(h);
		try{
			box.el.dom.style.height = box.getHeight()+'px';
		}catch(e){}
		me.updateHeight();
	},
	addSync: function(recs){
		var s = VX.getSE('TestSourceQuestion'),
			rid=this.record.get('test_section_id');
		s.getProxy().setExtraParam('test_section_id',rid);
		s.remove(recs);
		s.sync();
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
			me.addSingle(a.rec,a.con,a.pos);
		}else if (a.action='sync'){
			me.addSync(a.recs);
		}
		setTimeout(function(){
			me.addRun();
		},100);
		me.addSingleRunning=0;
	}
});
