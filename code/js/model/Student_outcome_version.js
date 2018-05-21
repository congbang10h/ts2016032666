//ID: 97565416ca709b6ef607c9394b8331a2
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Student_outcome_version', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'sov_id',         type: 'int', title: 'sov_id'},
		{name: 'edu_program_id', type: 'int', title: 'edu_program_id'},
		{name: 'sov_code',       type: 'string', title: 'sov_code'},
		{name: 'sov_date',       type: 'date', title: 'sov_date'},
		{name: 'sov_isused',     type: 'int', title: 'sov_isused'}
	],
	actionName: 'Student_outcome_version',
	validations: [
		{type: 'presence', field: 'sov_code', message: 'Chưa nhập thông tin [sov_code]'},
		{type: 'length', field: 'sov_code', message: 'Thông tin [sov_code] dài hơn 10 ký tự', max: 10},
		{type: 'presence', field: 'sov_date', message: 'Chưa nhập thông tin [sov_date]'},
		{type: 'presence', field: 'sov_isused', message: 'Chưa nhập thông tin [sov_isused]'}
	],
	proxy:{
		type: 'direct',
		api: Student_outcome_version,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});