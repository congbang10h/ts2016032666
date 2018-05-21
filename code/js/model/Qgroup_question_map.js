//ID: bfccf8733e54004815de0df39a02ff50
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Qgroup_question_map', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'qgroup_question_map_id', type: 'int', title: 'qgroup_question_map_id'},
		{name: 'question_group_id',      type: 'int', title: 'question_group_id'},
		{name: 'question_id',            type: 'int', title: 'question_id'}
	],
	actionName: 'Qgroup_question_map',
	proxy:{
		type: 'direct',
		api: Qgroup_question_map,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});