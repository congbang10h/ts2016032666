//ID: c4f7d74bd672a4b50c4d0e458995608c
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Taker_solution', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'taker_solution_id', type: 'int', title: 'taker_solution_id'},
		{name: 'taker_test_map_id', type: 'int', title: 'taker_test_map_id'},
		{name: 'question_id',       type: 'int', title: 'question_id'},
		{name: 'mark_max',          type: 'int', title: 'mark_max'},
		{name: 'mark_cur',          type: 'int', title: 'mark_cur'}
	],
	actionName: 'Taker_solution',
	proxy:{
		type: 'direct',
		api: Taker_solution,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});