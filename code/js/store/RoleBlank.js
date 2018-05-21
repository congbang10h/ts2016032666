Ext.define('VX.store.RoleBlank', {
	extend: 'VX.store.Role',
	model: 'VX.model.Role',
	autoLoad: true,
	pageSize: 20,
    listeners:{
		load: function(me){
			me.insert(0,{role_id:0,role_name:'[Vai trò]'});
		}
	}
});