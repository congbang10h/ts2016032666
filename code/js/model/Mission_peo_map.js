//ID: 8495f1dfb6cb67d6ed08570bf8d33cba
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Mission_peo_map', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'mission_peo_id', type: 'int', title: 'mission_peo_id'},
		{name: 'mission_id',     type: 'int', title: 'mission_id'},
		{name: 'peoi_id',        type: 'int', title: 'peoi_id'},
		{name: 'pmv_id',         type: 'int', title: 'pmv_id'}
	],
	actionName: 'Mission_peo_map',
	proxy:{
		type: 'direct',
		api: Mission_peo_map,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});