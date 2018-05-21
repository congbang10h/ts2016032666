//ID: e1c517da89fe2b4c273866c9872402f7
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Umi_peoi_map', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'upm_id',  type: 'int', title: 'upm_id'},
		{name: 'peoi_id', type: 'int', title: 'peoi_id'},
		{name: 'umi_id',  type: 'int', title: 'umi_id'},
		{name: 'pmv_id',  type: 'int', title: 'pmv_id'}
	],
	actionName: 'Umi_peoi_map',
	proxy:{
		type: 'direct',
		api: Umi_peoi_map,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});