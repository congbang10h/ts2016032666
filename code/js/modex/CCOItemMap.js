Ext.define('VX.modex.CCOItemMap', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'coi_id',      type: 'int', title: 'coi_id'},
		{name: 'co_id',       type: 'int', title: 'co_id'},
		{name: 'coi_code',    type: 'string', title: 'coi_code'},
		{name: 'coi_desc_vn', type: 'string', title: 'coi_desc_vn'},
		{name: 'coi_desc_en', type: 'string', title: 'coi_desc_en'},
		{name: 'link', type: 'int'},
		{name: 'cco_desc', type: 'string'}
	],
	actionName: 'CCOItemMap',
	proxy:{
		type: 'direct',
		api: CCOItemMap,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
});