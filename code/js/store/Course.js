//ID: 60020d6db65cc641ce1eb88a802a3cab
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.store.Course', {
	extend: 'Ext.ux.Store',
	model: 'VX.model.Course',
	autoLoad: false,
	pageSize: 20
//<ZoneC
	,remoteFilter: true
	,listeners:{
		load: function( me, records, successful, eOpts ){
			//hàm load này là cần thiết để chế độ query của combo hoạt động
			//mặc dù nội dung hàm để trống
		}
	}
//ZoneC>
});