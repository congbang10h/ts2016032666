//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần EDITABLE ZONE
//Những nội dung bên ngoài phần EDITABLE ZONE sẽ bị thay đổi khi chạy tool
//Không thay đổi 2 nhãn //<ZoneC và //ZoneC>
Ext.define('VX.model.Figurelink', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'figure_id',   type: 'int', title: 'figure_id'},
		{name: 'figure_desc', type: 'string', title: 'figure_desc'},
		{name: 'figure_path', type: 'string', title: 'figure_path'}
	],
	actionName: 'Figurelink',
	validations: [
		{type: 'length', field: 'figure_desc', message: 'Thông tin [figure_desc] dài hơn 65535 ký tự', max: 65535},
		{type: 'presence', field: 'figure_path', message: 'Chưa nhập thông tin [figure_path]'},
		{type: 'length', field: 'figure_path', message: 'Thông tin [figure_path] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Figurelink,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});