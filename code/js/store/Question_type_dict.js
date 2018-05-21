//ID: 0d49e5fda88d0e278ae57eb3e9df227c
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.store.Question_type_dict', {
	extend: 'Ext.ux.Store',
	model: 'VX.model.Question_type_dict',
	autoLoad: false,
	pageSize: 20
//<ZoneC
	,listeners:{
		load: function(me, recs){
			for(var i in recs){
				VX.qtype[recs[i].get('question_type_id')] = recs[i].get('question_type_code');
			}
		}
	}
//ZoneC>
});