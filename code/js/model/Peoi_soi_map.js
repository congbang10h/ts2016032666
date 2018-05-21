//ID: a985681e1fe5320ade82309661fc64ad
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Peoi_soi_map', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'psmi_id', type: 'int', title: 'psmi_id'},
		{name: 'soi_id',  type: 'int', title: 'soi_id'},
		{name: 'psm_id',  type: 'int', title: 'psm_id'},
		{name: 'peoi_id', type: 'int', title: 'peoi_id'}
	],
	actionName: 'Peoi_soi_map',
	proxy:{
		type: 'direct',
		api: Peoi_soi_map,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});