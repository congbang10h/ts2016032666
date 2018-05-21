Ext.define('VX.view.exam.ExamPanel',{
	extend: 'Ext.container.Container',
	requires: [
		'VX.view.exam.ExamSection'
	],
	alias: 'widget.test-exam-panel',
	cls: 'test-exam-panel',
	mapSection: {},
	qCount: 0,
	qAnswer: 0,
	loadSection: function(recs,action){
		var me=this, i, root=VX.getSE('ExamTree').getRootNode(),sec,node,
			total=recs.length;
		me.up('window').initTimer();
		me.examAction = action;
		root.removeAll();
		me.qAnswer = 0;
		me.qCount = 0;
		while (me.items.length)
			me.remove(me.items.first());
		Ext.ux.showMask(me,{
			maskCls: 'x-solid-mask',
			msg: 'Chuẩn bị...'
		});
		me.sectionCount = 1;
		me.mapSection = {};
		for(i in recs) {
			sec = recs[i];
			node = root.appendChild(Ext.create('VX.modex.ExamTree',{
				test_section_id: sec.test_section_id,
				question_id: 0,
				text: total>1?'Phần '+VX.int2char(me.sectionCount):'Bài thi'
			}));
			node.setFlag=function(n,flag){
				n.flag = flag;
				n.set('iconCls', n.flag?'question-flag':(n.answer?'question-anwsered':'question-no-anwsered'));
			};
			node.onAnswer=function(n,answer){
				if (answer){
					if (!n.answer){
						n.answer=1;
						me.qAnswer++;
					}
				}else{
					if (n.answer){
						n.answer=0;
						me.qAnswer--;
					}
				}
				n.set('iconCls', n.flag?'question-flag':(n.answer?'question-anwsered':'question-no-anwsered'));
			};
			me.qCount += me.addSection(sec, node, total);
		}
		me.queue.run();
	},
	checkFinish: function(){
		var me=this;
		if (me.qAnswer<me.qCount){
			var msg = 'Còn '+(me.qCount-me.qAnswer)+' câu hỏi chưa trả lời! ' +
				'<br>Di chuyển đến câu hỏi đầu tiên chưa trả lời?';
			Ext.Msg.confirm('Thông báo',msg,function(id){
				if (id=='yes') {
					var root=VX.getSE('ExamTree').getRootNode(), i,node,j;
					for(i in root.childNodes){
						node = root.childNodes[i];
						for(j in node.childNodes){
							if (!node.childNodes[j].answer){
								me.onSelectInTree(node.childNodes[j]);
								return;
							}
						}
					}
				}
			});
			return 0;
		}
		return 1;
	},
	onSelectInTree: function(rec){
		var me=this, secId = rec.get('test_section_id'),
			qesId = rec.get('question_id'),
			sec = me.mapSection[secId],
			qes = qesId ? sec.mapQuestion[qesId] : 0,
			target = qes?qes:sec,
			w = me.up(), pos=target.getPosition();
		pos[1] -= 15;
		w.scrollBy(pos);
		if(qes) qes.el.animate({
			duration: 1000,
			keyframes: {
				10: {
					borderColor: 'silver'
				},
				70: {
					borderColor: 'blue'
				},
				100: {
					borderColor: 'silver'
				}
			}
		});
	},
	updateOrder: function(me, from){
		var i,ls=me.items,o;
		for(i=from;i<ls.length;i++){
			o=ls.getAt(i);
			if (o.record)
				o.record.set('test_section_order',i);
		}
	},
	addSection: function(rec, node, total){
		var me=this, it, qcount;
		it=me.add({
			xtype: 'test-exam-section'
		});
		it.node = node;
		qcount = it.loadSection(rec, me.sectionCount, total);
		me.mapSection[rec.test_section_id] = it;
		me.sectionCount++;
		return qcount;
	},
	addListQuestion: function(section, box, pnode, recs){
		var me=this,pak;
		me.queue.parent = me;
		for (var i in recs){
			pak={
				section: section,
				box: box,
				node: pnode,
				record: recs[i],
				exam_id: me.examInfo.exam_id
			};
			me.queue.list.push(pak);
			//me.queue.addQuestionSingle(pak);
		}
	},
	loadQuestionFinish: function(){
		var me=this,w = me.up('window');
		me.tree.onExpandAllClick();
		if (me.examAction=='new') {
			setTimeout(function () {
				Ext.Msg.confirm('Thông báo', 'Bạn đã sẵn sàng?', function (id) {
					if (id == 'yes') {
						VX.getC('Exam').start(w.examInfo);
						me.startExam();
					} else w.close();
				});
			}, 1);
		}else{
			me.startExam();
		}
	},
	startExam: function(){
		var me=this,w = me.up('window');
		Ext.ux.hideMask();
		w.startTimer();
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
	queue:{
		list: [],
		running: 0,
		addQuestionSingle: function(pak){
			var me=pak.section,qbox,box,q,h= 0, j,qnode,win=me.up('window');
			qbox = pak.box.add({
				xtype: 'container',
				cls: 'test-question-box',
				items:[{
					xtype: 'container',
					cls: 'question-number',
					layout: 'hbox',
					items:[{
						xtype: 'box',
						html: 'Câu ' + me.questionCount,
						flex: 1
					},{
						xtype: 'toolbar',
						cls: 'inline-toolbar',
						flex: 1,
						items:['->', {
							iconCls: 'question-flag',
							itemId: 'flag',
							enableToggle: true,
							tooltip: 'Đánh dấu câu hỏi để xem lại sau',
							toggleHandler: function (me, state) {
								var tool=me.up(),
									q=tool.question,
									v= tool.down('#verify'),
									om=q.mode;
								q.setFlag(state);
								if (state){
									v.toggle(false,true);
									q.setAnswer(false);
								}
								q.mode=state?'flag':'nothing';
								q.win.updateStatic(q.mode,om);
							}
						},{
							iconCls: 'verify16',
							itemId: 'verify',
							enableToggle: true,
							tooltip: 'Xác nhận câu hỏi đã có câu trả lời',
							toggleHandler: function (me, state) {
								var tool=me.up(),
									q=tool.question,
									v= tool.down('#flag'),
									om=q.mode;
								q.setAnswer(state);
								if (state){
									v.toggle(false,true);
									q.setFlag(false);
								}
								q.mode=state?'answered':'nothing';
								q.win.updateStatic(q.mode,om);
							}
						}]
					}]
				}, {
					xtype: 'container',
					itemId: 'qbox'
				}]
			});
			box = qbox.down('#qbox');
			q = VX.getC('Question').fromRecord(pak.record);
			q.exam_id = pak.exam_id;
			q.render(0,box,false,true);
			qbox.down('toolbar').question = q;
			q.win = win;
			q.mode = 'nothing';
			win.qCount.total++;
			win.showStatic();
			for(j in box.items.items)
				h+=box.items.items[j].getHeight();
			box.setHeight(h+20);//20 for top+bottom margin of box
			qnode = pak.node.appendChild(Ext.create('VX.modex.ExamTree',{
				test_section_id: me.record.test_section_id,
				question_id: q.id,
				text: 'Câu '+me.questionCount,
				leaf: true,
				iconCls: 'question-no-anwsered'
			}));
			var qs = pak.record.hasMany.Taker_solution;
			if (qs && qs.length && qs[0].items.length){
				//Sử dụng cho load bài thi đang làm
				qnode.set('iconCls','question-anwsered');
				me.node.onAnswer(qnode,1);
			}
			q.setAnswer = function(check){
				if (check){
					q.mode = 'answered';
					VX.getC('Exam').save(q);
				}else q.mode = 'nothing';
				me.node.onAnswer(qnode,check);
			};
			q.setFlag = function(check){
				q.mode = check ? 'flag' : 'nothing';
				me.node.setFlag(qnode,check);
			};
			q.onAnswer = function(order,value){
				var q = this,i;
				if (q.type=='Fill'){
					qnode.set('iconCls','question-anwsering');
					if (q.item[order])
						q.item[order].answer = value;
					for(i in q.item){
						if (q.item[i].answer==undefined)
							return;
					}
				}
			};
			me.mapQuestion[q.id] = qbox;
			me.questionCount++;
		},
		main: function(){
			var r=this;
			if (r.list.length){
				r.addQuestionSingle(r.list.shift());
				return 1;
			}
			return 0;
		},
		run: function(){
			var r=this;
			if (r.running) return;
			r.running = 1;
			if (r.main()){
				setTimeout(function(){
					r.run();
				},1);
			}else{
				r.parent.loadQuestionFinish();
			}
			r.running = 0;
		}
	}
}); 