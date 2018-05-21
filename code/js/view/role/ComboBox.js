Ext.define('VX.view.role.ComboBox',{
	extend: 'Ext.form.field.ComboBox',
	requires: [
		'VX.store.RoleBlank'
	],
    alias: 'widget.cbx-role',
    displayField: 'role_name',
    emptyText: '[Vai trò]',
    valueField: 'role_id',
	editable: false,
	store: VX.getS('RoleBlank','cbx'),
	listeners:{
		select: function(me, record){
			try{
				var row = me.up(),
					rec = row.getRecord();
				rec.set('role_id',record[0].get('id'));
			}catch(e){}
		}
	}
});
