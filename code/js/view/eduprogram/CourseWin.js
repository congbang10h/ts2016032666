Ext.define('VX.view.eduprogram.CourseWin', {
	extend: 'Ext.ux.WinForm',
	title: 'Môn học trong Chương trình đào tạo',
	iconCls: 'course16',
	modal: true,
	width: '100%',
	height: '100%',
	layout: 'fit',
	items:[{
		xtype: 'uxgrid',
		store: VX.getSE('CourseInEduPro'),
		toolbar: false,
		features: [{
			ftype: 'filters',
			encode: true
		}],
		form: Ext.create('VX.view.eduprogram.CourseForm'),
		columns: [{
			dataIndex: 'course_id',
			hidden: true,
			text: '#',
			flex: 0.3,
			filter:{type:'numeric'}
		}, {
			dataIndex: 'course_code',
			flex: 1,
			text: 'Mã môn',
			filter:{type:'string'}
		}, {
			dataIndex: 'course_name_vn',
			flex: 1.2,
			text: 'Tên môn',
			filter:{type:'string'}
		}, {
			dataIndex: 'course_name_en',
			flex: 1.2,
			text: 'Tên môn TA',
			hidden: true,
			filter:{type:'string'}
		}, {
			dataIndex: 'course_version_code',
			flex: 0.8,
			text: 'Phiên  bản',
			filter:{type:'string'}
		}, {
			dataIndex: 'course_introduced_date',
			flex: 0.8,
			hidden: true,
			text: 'Ngày giới thiệu',
			filter:{type:'date'}
		}, {
			dataIndex: 'course_applied_year',
			flex: 0.8,
			text: 'Ngày áp dụng',
			filter:{type:'date'}
		}, {
			dataIndex: 'course_credits',
			flex: 0.3,
			text: 'Số tín chỉ',
			filter:{type:'numeric'}
		}, {
			dataIndex: ':pcm_time_index',
			width: 80,
			text: 'Học kỳ',
			tooltip: 'Học kỳ là 0 nếu Môn học không thuộc Chương trình đào tạo',
			renderer: function(val){
				return val?val:'';
			},
			filter:{type:'numeric'}
		}]
	}],
	setEduPro: function(rec){
		var me=this, s=VX.getSE('CourseInEduPro'),
			epid = rec.get('edu_program_id'),
			scr=VX.getS('Course_required_level');
		s.removeFilter('edupro');
		s.addFilter({
			id: 'edupro',
			property: 'edu_program_id',
			value: epid
		});
		me.show();
		me.down('uxgrid').form.setEduPro(epid);
		scr.load();
	}
});