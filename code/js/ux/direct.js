function directForwardError(e){
	switch(e.code){
	case 1016:
		return VX.cc.User.onLoginFailed(e);
	}
	return 0;
}
function directEventCatch(e) {
	if (e.debug && e.debug.length){
		for(var i in e.debug){
			console.log(e.debug[i].msg);
		}
	}
	if (e.code == 'parse'){
		Ext.ux.error('<span style="color:red">Nội dung trả về không đúng định dạng '
				+'JSON</span><br/><br/>'+e.xhr.responseText);
	}
}
function directExceptionCatch(e) {
	Ext.ux.hideMask();
	if (directForwardError(e))
		return;
	Ext.ux.error(e.message);
}

Ext.Direct.on('event', directEventCatch);
Ext.Direct.on('exception', directExceptionCatch);
Ext.Ajax.on('requestexception', function(conn, res ) {
	if (res.status==500 && res.responseText){
		var msg;
		try{
			msg = Ext.decode(res.responseText).message;
		}catch(e){
			msg = res.responseText;
		}
		Ext.ux.error(msg);
	}
});

