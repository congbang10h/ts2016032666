Ext.define('VX.store.TestSection', {
	extend: 'VX.store.Test_section',
	autoLoad: false,
	pageSize: 1000,
	remoteFilter: true,
	filters: [{
		id: 'test',
		property: 'test_id',
		value: 0
	}]
});