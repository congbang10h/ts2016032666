//ID: 8e09522173d4ef9bd712d0d88ce2c7a5
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.store.Question', {
	extend: 'Ext.ux.Store',
	model: 'VX.model.Question',
	autoLoad: false,
	pageSize: 20
//<ZoneC
	,remoteFilter: true
	/*,listeners: {
		load: function(me, records, successful, eOpts ){
			console.log('Here');
		}
	}*/
//ZoneC>
});