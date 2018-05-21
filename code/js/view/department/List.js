Ext.define('VX.view.department.List', {
	extend: 'Ext.ux.grid.Grid',
	requires: [],
	title: 'Bộ môn',
	closable: true,
	iconCls: 'department16',
	store: VX.getS('Department'),
	form: Ext.create('VX.view.department.Form'),
	features: [{
		ftype: 'filters',
		encode: true
	}],
	viewConfig: {
		plugins: {
			ddGroup: 'map-department-to',
			ptype: 'gridviewdragdrop',
			enableDrop: false
		}
	},
	columns: [{
		dataIndex: 'dept_id',
		flex: 0.5,
		text: '#',
		filter:{type:'numeric'}
	}, {
		dataIndex: 'dept_code',
		flex: 0.5,
		text: 'Mã số',
		filter:{type:'string'}
	}, {
		dataIndex: 'dept_name_vn',
		flex: 1,
		text: 'Tên Tiếng Việt',
		filter:{type:'string'}
	}, {
		dataIndex: 'dept_name_en',
		flex: 1,
		hidden: true,
		text: 'Tên Tiếng Anh',
		filter:{type:'string'}
	}, {
		dataIndex: ':faculty_name_vn',
		flex: 1,
		text: 'Khoa',
		filter:{type:'string'}
	}, {
		dataIndex: ':univ_name_vn',
		flex: 1,
		text: 'Trường',
		filter:{type:'string'}
	}]
}); 