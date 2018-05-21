//ID: 782fb25ec113764dd96fceb6b9593131
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Program_decision', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'program_decision_id',   type: 'int', title: 'program_decision_id'},
		{name: 'program_decision_code', type: 'string', title: 'program_decision_code'},
		{name: 'program_decision_desc', type: 'string', title: 'program_decision_desc'}
	],
	actionName: 'Program_decision',
	validations: [
		{type: 'presence', field: 'program_decision_code', message: 'Chưa nhập thông tin [program_decision_code]'},
		{type: 'length', field: 'program_decision_code', message: 'Thông tin [program_decision_code] dài hơn 100 ký tự', max: 100},
		{type: 'presence', field: 'program_decision_desc', message: 'Chưa nhập thông tin [program_decision_desc]'},
		{type: 'length', field: 'program_decision_desc', message: 'Thông tin [program_decision_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Program_decision,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});