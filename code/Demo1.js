function Demo01(){// Load 1 Store
    var store = VX.getS("Course"); // Ext.create("VX.store.Course");
    store.load({
        scope: this,
        callback : function(records, options, success) {
            if(success){
                console.log("Num records: " + records.length);

                // In dữ liệu
                if(records.length > 0){
                    console.log("----------------------------");
                    console.log("Tất cả dữ liệu");
                    console.log("----------------------------");

                    var fields = [];
                    for(var key in records[0].getData()){
                        fields.push(key);
                    }

                    records.forEach(function(store){
                        console.log("----------------------------------------------");
                        for(var idx in fields){
                            console.log(fields[idx] + " = " + store.get(fields[idx]));
                        }
                    });
                    console.log("----------------------------");
                }

                console.log("Load Success!");
            } else {
                console.log("Load Fail!");
            }
        }
    }, this);
}

function Demo2(){
    // Ext.ux.rpc // on file override.js
    cfg = {
        action:"Peo",
        method:"read",
        params:{page: 1, start: 0, limit: 20}
    };

    Ext.Ajax.request({
        url: 'php/router.php',
        headers: { 'Content-Type': 'application/json' },
        params : Ext.JSON.encode({
            action: cfg.action,
            method: cfg.method,
            data: [cfg.params],
            type:"rpc"
        }),
        success: function(res){
            var msg;
            try{
                msg = Ext.decode(res.responseText);
            }catch(e){
                msg = res.responseText;
            }
            directEventCatch(msg);
            if (msg && msg.type=='exception')
                directExceptionCatch(msg);
            else if (msg && cfg.callback){
                if(msg.type=='rpc')
                    cfg.callback.call(cfg.scope,msg.result);
                else
                    console.log(msg);
            }
            console.log(msg.result);
        }
    });
}