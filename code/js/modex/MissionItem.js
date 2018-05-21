Ext.define('VX.modex.MissionItem', {
	extend: 'VX.model.Univ_mission_item',
	proxy:{
		type: 'memory',
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
});