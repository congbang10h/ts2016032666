Ext.define('VX.storx.ContentQuestion', {
	extend: 'Ext.ux.Store',
	model: 'VX.modex.ContentQuestion',
	autoLoad: false,
	pageSize: 20,
	remoteFilter: true,
	filters:[{
		property: 'content_id',
		value: ''
	}]
});