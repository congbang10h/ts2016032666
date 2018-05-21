Ext.define('VX.view.course.QuestionSearch', {
	extend: 'Ext.form.Panel',
	alias: 'widget.questionsearch',
	width: 470,
	border: 0,
	defaults:{
		labelAlign: 'left',
		labelWidth: 120,
		anchor: '100%'
	},
	items: [{
		xtype: 'textfield',
		fieldLabel: 'Nội dung tìm kiếm',
		name: 'question_id'
	},{
		xtype: 'fieldcontainer',
		fieldLabel: 'Giới hạn tìm kiếm',
		layout: 'hbox',
		defaults:{
			xtype: 'checkbox',
			flex: 1,
			inputValue: 1
		},
		items:[{
			boxLabel: 'Tên câu hỏi',
			name: 'search_name'
		},{
			boxLabel: 'Mô tả câu hỏi',
			name: 'search_desc'
		},{
			boxLabel: 'Nhãn',
			name: 'search_tags'
		}]
	},{
		fieldLabel: 'Loại câu hỏi',
		xtype: 'checkbox',
		inputValue: 1,
		boxLabel: 'Chỉ tìm câu hỏi tự do',
		name: 'search_free',
		checked: true
	}]
});
