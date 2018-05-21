//ID: 9e87f1f80450b7ba4229a2c44d3172cb
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.store.Course_outcome', {
	extend: 'Ext.ux.Store',
	model: 'VX.model.Course_outcome',
	autoLoad: false,
	pageSize: 20
//<ZoneC
	,remoteFilter: true
	,filters:[{
		id: 'course',
		property: 'course_id',
		value: 0
	}]
//ZoneC>
});