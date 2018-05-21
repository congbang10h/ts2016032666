Ext.define('VX.view.exam.ExamSection',{
	extend: 'Ext.container.Container',
	alias: 'widget.test-exam-section',
	requires: [
	],
	width: '100%',
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
	mapQuestion: {},
	loadSection: function(r, order, total){
		var me=this, d=me.down('#test_section_desc'),
			items=r.hasMany.Question,title, parent=me.up();
		me.record = r;
		me.sectionCount = order;
		me.questionCount = 1;
		title = total>1?'<p class="no-section">Phần '+VX.int2char(order)+'</p>':'';
		d.el.setHTML(title +r.test_section_desc);
		parent.addListQuestion(me,me.down('#sectioninner'), me.node, items);
		return items.length;
	}
});
