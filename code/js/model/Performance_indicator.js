//ID: 766e685e2d852845d5dca7e6b962cabf
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Performance_indicator', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'pi_id',                            type: 'int', title: 'pi_id'},
		{name: 'performance_indicator_version_id', type: 'int', title: 'performance_indicator_version_id'},
		{name: 'pi_desc',                          type: 'string', title: 'pi_desc'},
		{name: 'pi_introduced_date',               type: 'date', title: 'pi_introduced_date'},
		{name: 'pi_used',                          type: 'int', title: 'pi_used'},
		{name: 'pi_version',                       type: 'int', title: 'pi_version'}
	],
	actionName: 'Performance_indicator',
	validations: [
		{type: 'presence', field: 'pi_desc', message: 'Chưa nhập thông tin [pi_desc]'},
		{type: 'length', field: 'pi_desc', message: 'Thông tin [pi_desc] dài hơn 65535 ký tự', max: 65535},
		{type: 'presence', field: 'pi_introduced_date', message: 'Chưa nhập thông tin [pi_introduced_date]'},
		{type: 'presence', field: 'pi_used', message: 'Chưa nhập thông tin [pi_used]'}
	],
	proxy:{
		type: 'direct',
		api: Performance_indicator,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});