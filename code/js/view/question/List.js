Ext.define('VX.view.question.button.FilterQType',{
	extend: 'Ext.form.ComboBox',
	alias: 'widget.question-filter-type',
    width: 120,
    forceSelection: true,
    editable: false,
    value: 'All',
    store: ['All','Choice','Match','Fill','Order'],
	listeners:{
		select: function(me/*, records, eOpts*/ ){
			var v = me.getValue(), s = VX.getS('Question');
			s.removeFilter('filter_question_type', false);
			if (v != 'All'){
				s.addFilter({
					id: 'filter_question_type',
					property: 'question_type_code',
					operator: '=',
					value: v
				}, false);
			}
			s.load();
		}
	}
});
Ext.define('VX.view.question.List', {
	extend: 'Ext.ux.grid.Grid',
	alias: 'widget.question-list',
	requires: [
		'VX.view.question.BaseForm',
		'VX.view.question.EditForm',
		'VX.view.question.choice.Form',
		'VX.view.question.fill.Form',
		'VX.view.question.match.Form',
		'VX.view.question.order.Form'
	],
	title: 'Câu hỏi',
	//closable: true,
	dblClick: 'edit',
	iconCls: 'question16',
	store: VX.getS('Question'),
	course_id: 0,
	course_content_id: 0,
	editForm:{},
	viewForm: null,
	lsForm: {},
	features: [{
		ftype: 'filters',
		encode: true
	}],
	viewConfig: {
		plugins: {
			ddGroup: 'map-question-to',
			ptype: 'gridviewdragdrop',
			enableDrop: false
		}
	},
	setCourse: function(course_id){
		var s=VX.getS('Question');
		s.removeFilter('course');
		s.addFilter({
			id: 'course',
			property: 'course_id',
			value: course_id
		});
		s.load();
		this.course_id = course_id;
	},
	setCourseContent: function(cc_id){
		var me=this,fs=me.filters.filters.items, i,fyet=1;
		me.course_content_id = cc_id;
		for(i in fs){
			if (fs.hasOwnProperty(i) && fs[i].dataIndex=='course_content_id'){
				fs[i].setValue({eq:cc_id});
				//fs[i].setActive(1);
				fyet = 0;
				break;
			}
		}
		if (fyet){
			var f = me.filters.addFilter({
				dataIndex: 'course_content_id',
				value: {eq:cc_id}
			});
			//noinspection JSCheckFunctionSignatures
			f.setActive(1);
			VX.getS('Question').load();
		}
	},
	columns: [{
		dataIndex: 'question_id',
		flex: 0.5,
		hidden: true,
		text: '#',
		filter:{type:'numeric'}
	}, {
		dataIndex: 'course_content_id',
		flex: 0.5,
		text: 'Thuộc',
		tooltip: 'Câu hỏi này có thuộc Nội dung đang chọn bên trái hay không',
		renderer: function(val,cObj, rec, iRow, iCol,store,view){
			var g=view.panel,
				icon = val&&(g.course_content_id==val) ? 'fa-check-square-o' : 'fa-square-o';
			//return '<i class="fa '+icon+'"></i>';
			return '<i class="fa '+icon+'" onclick="' +
				'VX.getC(\'Course\').mappingCC2Q('+g.course_content_id+','+rec.data.question_id+',this)' +
				'"></i>';
		},
		filter:{type:'numeric'}
	}, {
		dataIndex: ':user_first_name',
		flex: 1,
		text: 'Họ',
		filter:{type:'string'}
	}, {
		dataIndex: ':user_last_name',
		flex: 1,
		text: 'Tên',
		filter:{type:'string'}
	}, {
		dataIndex: 'question_desc',
		text: 'Mô tả',
		flex: 3,
		filter:{type:'string'}
	}, {
		dataIndex: ':question_type_code',
		text: 'Loại',
		flex: 1,
		filter:{type:'string'}
	}, {
		dataIndex: ':bloom_level_desc',
		text: 'Cấp độ',
		flex: 1,
		filter:{type:'string'}
	}],
	initComponent: function(){
		this.callParent(arguments);
		
		var tbar = this.getDockedItems('toolbar[dock="top"]')[0];
		tbar.insert(0,{
			iconCls: 'add16',
		    text: 'SC',
		    tooltip: 'Tạo câu hỏi lựa chọn',
		    handler: function() {
		    	this.up('grid').newQuestion('Choice');
		    }
		});
		tbar.insert(1,{
			iconCls: 'add16',
		    text: 'MA',
		    tooltip: 'Tạo câu hỏi liên kết nhóm',
		    handler: function() {
				this.up('grid').newQuestion('Match');
		    }
		});
		tbar.insert(2,{
			iconCls: 'add16',
		    text: 'FB',
		    tooltip: 'Tạo câu hỏi điền chỗ trống',
		    handler: function() {
				this.up('grid').newQuestion('Fill');
		    }
		});
		tbar.insert(3,{
			iconCls: 'add16',
		    text: 'OR',
		    tooltip: 'Tạo câu hỏi xếp thứ tự',
		    handler: function() {
				this.up('grid').newQuestion('Order');
		    }
		});
		tbar.add('-',{
			iconCls: 'mapping16',
			disabled: true,
			text: 'Mapping',
			tooltip: 'Ma trận Chuẩn đầu ra cho các Câu hỏi đang chọn',
			handler: function() {
				var g = this.up('grid'),
					sm = g.getSelectionModel();
				g.editMapping(sm.getSelection());
			}
		},{
			iconCls: 'qgroup16',
			text: 'Nhóm',
			disabled: true,
			tooltip: 'Danh sách Nhóm - Câu hỏi',
			handler: function () {
				var g = this.up('grid');
				g.showGroup('QGroupQuestion');
			}
		},{
			iconCls: 'topic16',
			text: 'Topic',
			tooltip: 'Danh sách Topic - Câu hỏi',
			handler: function() {
				var g = this.up('grid');
				g.showGroup('TopicQuestion');
			}
		});
		tbar.add('->');
		tbar.add({
			xtype: 'question-filter-type'
		});
		this.buttons.create.bt.setVisible(false);
		this.buttons.mapping_coi_q = {
			enable: 1,
			bt: this.down('[iconCls=mapping16]'),
			selectrequire: 1
		};
	},
	showGroup: function(name){
		var me=this, frm=me.lsForm[name], i,
			recs = me.getSelectionModel().getSelection();
		if (!frm){
			me.lsForm[name] = frm = Ext.create('VX.view.map.'+name);
		}
		for(i in me.lsForm) if (me.lsForm.hasOwnProperty(i)){
			if (me.lsForm[i]!=frm)
				me.lsForm[i].hide();
		}
		if (recs.length)
			frm.setSelection(recs[0]);
		frm.show();
	},
	editRecord: function(rec){
		var me = this, frm=me.editForm,
			type=rec.get('question_type_code'),
			t = type.toLowerCase();
		if (me.dblClick=='edit'){
			me.setLoading(true);
			if (!frm[type]){
				frm[type] = Ext.create('VX.view.question.'+t+'.Form');
			}
			frm[type].editQuestion(rec);
			me.setLoading(false);
		}
	},
	newQuestion: function(type){
		var me=this, frm=me.editForm,t = type.toLowerCase();
		if (!frm[type])
			frm[type] = Ext.create('VX.view.question.'+t+'.Form');
		frm[type].parentInfo = {
			course_id: me.course_id,
			course_content_id: me.course_content_id
		};
		frm[type].newRecord();
	},
	onSelectionChange: function(g,selected){
		var me=this,ls=me.lsForm, i;
		me.callParent(arguments);
		for(i in ls){
			if (ls[i].isVisible())
				ls[i].setSelection(selected);
		}
	},
	hide: function(){
		var me=this,ls=me.lsForm,i;
		for(i in ls)
			ls[i].hide();
		me.callParent();
	},
	editMapping: function (recs){
		var me=this,ids=[], i,course_id=recs[0].data.course_id;
		for(i in recs)
			ids.push(recs[i].data.question_id);

		if (!me.outcomeMap)
			me.outcomeMap = Ext.create('VX.view.outcome.MapWin_Q_COI');
		me.outcomeMap.show();
		me.outcomeMap.loadData(course_id,ids);
	}
}); 