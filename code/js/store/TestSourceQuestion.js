Ext.define('VX.store.TestSourceQuestion', {
	//extend: 'Ext.ux.Store',
	extend: 'Ext.data.Store',
	model: 'VX.model.TestSourceQuestion',
	autoLoad: false,
	pageSize: 20,
	remoteFilter: true,
	filters:[{
		id: 'content',
		property: 'content_id',
		value: ''
	}]
});