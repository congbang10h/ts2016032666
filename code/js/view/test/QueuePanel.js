Ext.define('VX.view.test.QueuePanel', {
	extend: 'Ext.container.Container',
	addListQuestion: function (recs, cfg) {
		/*
		 * cfg = {
		 * 	section: test section container, required
		 * 	box: box container of question, normally is section inner, required
		 * 	mode: render mode, mode=[edit,review,exam], required
		 * 	node: required in mode exam, it's contained by a parent node in ExamTree
		 * 	number: order of question, optional
		 * 	exam_id: required in mode exam
		 * }
		 * */
		var me = this;
		me.queue.parent = me;
		for (var i in recs) {
			me.queue.list.push(Ext.apply(cfg, {
				record: recs[i]
			}));
		}
		me.queue.run();
	},
	addListQuestionFinish: function () {
	},
	queue: {
		list: [],
		running: 0,
		addQuestionSingle: function (pak) {
			var me = pak.section, qbox, box, q, h = 0, j, qnode, rec=pak.record;
			qbox = pak.box.add({
				xtype: 'container',
				cls: 'test-question-box',
				items: [{
					xtype: 'container',
					cls: 'question-number',
					layout: 'hbox',
					items: [{
						xtype: 'container',
						html: 'Câu ' + pak.number ? pak.number : '',
						flex: 1
					}, {
						xtype: 'toolbar',
						cls: 'inline-toolbar',
						flex: 1,
						initComponent: function () {
							var me = this;
							if (pak.mode == 'edit') {
								me.add(['->', {
									xtype: 'displayfield',
									value: 'Điểm'
								}, {
									xtype: 'numberfield',
									width: 100,
									value: rec.score,
									oldInfoValue: rec.score,
									itemId: 'qscore',
									listeners: {
										blur: function (me) {
											var v = me.getValue();
											if (v != me.oldInfoValue) {
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
								}]);
							} else if (pak.mode == 'review') {

							} else {
								me.add(['->', {
									iconCls: 'skip16',
									text: 'Đánh dấu',
									enableToggle: true,
									tooltip: 'Xác nhận câu hỏi đã có câu trả lời',
									toggleHandler: function (me, state) {
										console.log('Toggle ' + state);
									}
								},{
									iconCls: 'verify16',
									text: 'Xác nhận',
									enableToggle: true,
									tooltip: 'Xác nhận câu hỏi đã có câu trả lời',
									toggleHandler: function (me, state) {
										console.log('Toggle ' + state);
									}
								}]);
							}
						}
					}]
				}, {
					xtype: 'container',
					itemId: 'qbox'
				}]
			});
			box = qbox.down('#qbox');
			q = VX.getC('Question').fromRecord(pak.record);
			switch (pak.mode) {
				case 'edit':
					q.render(0, box);
					break;
				case 'review':
					q.render(0, box, true);
					break;
				case 'exam':
					q.exam_id = pak.exam_id;
					q.render(0, box, false, true);
					break;
			}
			//Update height
			for (j in box.items.items)
				h += box.items.items[j].getHeight();
			box.setHeight(h + 20);//20 for top+bottom margin of box

			if (pak.mode == 'exam') {
				qnode = pak.node.appendChild(Ext.create('VX.modex.ExamTree', {
					test_section_id: me.record.test_section_id,
					question_id: q.id,
					text: 'Câu ' + me.questionCount,
					leaf: true,
					iconCls: 'question-no-anwsered'
				}));
				var qs = pak.record.hasMany.Taker_solution;
				if (qs && qs.length && qs[0].items.length) {
					//Sử dụng cho load bài thi đang làm
					qnode.set('iconCls', 'question-anwsered');
					me.node.onAnswer(qnode, 1);
				}
				q.onAnswer = function (order, value) {
					var q = this, i;
					if (q.type == 'Fill') {
						qnode.set('iconCls', 'question-anwsering');
						if (q.item[order])
							q.item[order].answer = value;
						for (i in q.item) {
							if (q.item[i].answer == undefined)
								return;
						}
					} else if (q.type == 'Order' && !order) {
						qnode.set('iconCls', 'question-no-anwsered');
						me.node.onAnswer(qnode, 0);
						return;
					}
					VX.getC('Exam').save(q);
					qnode.set('iconCls', 'question-anwsered');
					me.node.onAnswer(qnode, 1);
				};
			}
			pak.section.mapQuestion[q.id] = qbox;
		},
		main: function () {
			var r = this;
			if (r.list.length) {
				r.addQuestionSingle(r.list.shift());
				return 1;
			}
			return 0;
		},
		run: function () {
			var r = this;
			if (r.running) return;
			r.running = 1;
			if (r.main()) {
				setTimeout(function () {
					r.run();
				}, 1);
			} else {
				r.parent.addListQuestionFinish();
			}
			r.running = 0;
		}
	}
}); 