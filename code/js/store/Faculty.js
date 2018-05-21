//ID: 6ac59aebccb1e30a5049341313fac652
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.store.Faculty', {
	extend: 'Ext.ux.Store',
	model: 'VX.model.Faculty',
	autoLoad: false,
	pageSize: 20
//<ZoneC
	,remoteFilter: true
//ZoneC>
});