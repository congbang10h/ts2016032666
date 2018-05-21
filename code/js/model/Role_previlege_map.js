//ID: 8caff8ebb36706be5a6d204bfa4225f6
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Role_previlege_map', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'role_previlege_map_id', type: 'int', title: 'role_previlege_map_id'},
		{name: 'role_id',               type: 'int', title: 'role_id'},
		{name: 'previlege_id',          type: 'int', title: 'previlege_id'}
	],
	actionName: 'Role_previlege_map',
	proxy:{
		type: 'direct',
		api: Role_previlege_map,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});