Ext.Msg = Ext.create('Ext.window.MessageBox', {
    buttonText: {
        ok     : 'Đồng ý',
        yes    : 'Đồng ý',
        no     : 'Không',
        cancel : 'Hủy bỏ'
    }
});

Ext.ux.error = function(e,scope){
	if (e instanceof Object)
		console.log(e);
	if (!Ext.Msg.isVisible())
	Ext.Msg.show({
		title: 'Báo lỗi',
		msg: (e instanceof Object) ? ((scope ? scope+':<br/><br/>':'')+e.message) : e,
		buttons: Ext.Msg.OK,
		icon: Ext.Msg.ERROR
	});
};
Ext.ux.warning = function(e){
	if (!Ext.Msg.isVisible())
	Ext.Msg.show({
		title: 'Chú ý',
		msg: (e instanceof Object) ? e.message : e,
		buttons: Ext.Msg.OK,
		icon: Ext.Msg.WARNING
	});
};
Ext.ux.message = Ext.ux.info = function(e){
	if (!Ext.Msg.isVisible())
	Ext.Msg.show({
		title: 'Thông báo',
		msg: (e instanceof Object) ? e.message : e,
		buttons: Ext.Msg.OK,
		icon: Ext.Msg.INFO
	});
};