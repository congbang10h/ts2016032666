Ext.define('VX.view.faculty.List', {
	extend: 'Ext.ux.grid.Grid',
	requires: [],
	title: 'Khoa',
	closable: true,
	iconCls: 'faculty16',
	store: VX.getS('Faculty'),
	form: Ext.create('VX.view.faculty.Form'),
	features: [{
		ftype: 'filters',
		encode: true
	}],
	viewConfig: {
		plugins: {
			ddGroup: 'map-faculty-to',
			ptype: 'gridviewdragdrop',
			enableDrop: false
		}
	},
	columns: [{
		dataIndex: 'faculty_id',
		flex: 0.5,
		text: '#',
		filter:{type:'numeric'}
	}, {
		dataIndex: 'faculty_code',
		flex: 0.5,
		text: 'Mã số',
		filter:{type:'string'}
	}, {
		dataIndex: 'faculty_name_vn',
		flex: 1,
		text: 'Tên Tiếng Việt',
		filter:{type:'string'}
	}, {
		dataIndex: 'faculty_name_en',
		flex: 1,
		hidden: true,
		text: 'Tên Tiếng Anh',
		filter:{type:'string'}
	}, {
		dataIndex: ':univ_name_vn',
		flex: 1,
		text: 'Trường',
		filter:{type:'string'}
	}]
}); 