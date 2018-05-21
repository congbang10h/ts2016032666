//ID: 3c2a8c0a33ac4b2f34a27bbefff2f054
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.store.Department', {
	extend: 'Ext.ux.Store',
	model: 'VX.model.Department',
	autoLoad: false,
	pageSize: 20
//<ZoneC
	,remoteFilter: true
//ZoneC>
});