//ID: 2332944a6a2f232bfd301633f0e6d050
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.store.Course_outcome_item', {
	extend: 'Ext.ux.Store',
	model: 'VX.model.Course_outcome_item',
	autoLoad: false,
	pageSize: 20
//<ZoneC
	,remoteFilter: true
	,filters:[{
		id: 'version',
		property: 'co_id',
		value: 0
	}]
//ZoneC>
});