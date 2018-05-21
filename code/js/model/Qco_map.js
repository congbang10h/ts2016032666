//ID: c6ccc93e432df2bb79f0759b305203ae
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Qco_map', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'qco_id',      type: 'int', title: 'qco_id'},
		{name: 'coi_id',      type: 'int', title: 'coi_id'},
		{name: 'question_id', type: 'int', title: 'question_id'},
		{name: 'qco_factor',  type: 'int', title: 'qco_factor'}
	],
	actionName: 'Qco_map',
	validations: [
		{type: 'presence', field: 'qco_factor', message: 'Chưa nhập thông tin [qco_factor]'}
	],
	proxy:{
		type: 'direct',
		api: Qco_map,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});