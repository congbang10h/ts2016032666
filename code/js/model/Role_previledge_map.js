//ID: c26b680fae4416412bb64293b6157c86
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Role_previledge_map', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'role_previledge_map_id', type: 'int', title: 'role_previledge_map_id'},
		{name: 'role_id',                type: 'int', title: 'role_id'},
		{name: 'previledge_id',          type: 'int', title: 'previledge_id'}
	],
	actionName: 'Role_previledge_map',
	proxy:{
		type: 'direct',
		api: Role_previledge_map,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});