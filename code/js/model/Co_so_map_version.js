//ID: efb59e9e95da61d9ed0b21e14bfdb70d
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Co_so_map_version', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'co_so_map_version_id',       type: 'int', title: 'co_so_map_version_id'},
		{name: 'student_outcome_version_id', type: 'int', title: 'student_outcome_version_id'},
		{name: 'course_outcome_version_id',  type: 'int', title: 'course_outcome_version_id'},
		{name: 'co_so_map_version_code',     type: 'int', title: 'co_so_map_version_code'},
		{name: 'co_so_map_version_date',     type: 'date', title: 'co_so_map_version_date'},
		{name: 'co_so_map_version_isused',   type: 'int', title: 'co_so_map_version_isused'}
	],
	actionName: 'Co_so_map_version',
	validations: [
		{type: 'presence', field: 'co_so_map_version_code', message: 'Chưa nhập thông tin [co_so_map_version_code]'},
		{type: 'presence', field: 'co_so_map_version_date', message: 'Chưa nhập thông tin [co_so_map_version_date]'},
		{type: 'presence', field: 'co_so_map_version_isused', message: 'Chưa nhập thông tin [co_so_map_version_isused]'}
	],
	proxy:{
		type: 'direct',
		api: Co_so_map_version,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});