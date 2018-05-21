Ext.define("MyApp.Utils.GiaiPTBac2",{
    config: {
        heSoA: 1,
        heSoB: 2,
        heSoC: 1
    },
    constructor: function(cfg){
        this.initConfig(cfg);
    },
    printDebug: function(){
        console.log("Phuong trinh bac 2: " + this.getHeSoA() + "x^2 + " + this.getHeSoB() + "x + " + this.getHeSoC() + " = 0.");
    },
    solve: function(){
        var a = this.getHeSoA();
        var b = this.getHeSoB();
        var c = this.getHeSoC();

        var kq = { soNghiem: NaN, x: [NaN, NaN] };
        if(a == 0){
            if(b == 0){
                if(c == 0) kq.soNghiem = -1;
                else kq.soNghiem = 0;
            }
            else {
                kq.soNghiem = 1;
                kq.x[0] = -c / b;
            }
        } else {
            var delta = b * b - 4 * a * c;
            if(delta < 0) kq.soNghiem = 0;
            else if(delta == 0) {
                kq.soNghiem = 1;
                kq.x[0] = -b / (2*a);
            } else {
                kq.soNghiem = 2;
                kq.x[0] = (-b - Math.sqrt(delta)) / (2*a);
                kq.x[1] = (-b + Math.sqrt(delta)) / (2*a);
            }
        }
        return kq;
    }
});

Ext.define("MyApp.View.GiaiPTBac2", {
    xtype:'MyApp.View.GiaiPTBac2',
    extend: "Ext.form.Panel",
    frame: true,
    title: 'Giải PTB2',
    width: 250,
    bodyPadding: 5,
    fieldDefaults: {
        labelAlign: 'left',
        labelWidth: 50,
        anchor: '100%'
    },
    items: [{
        xtype: 'textfield',
        name: 'txtHeSoA',
        fieldLabel: 'Hệ số A',
        value: ''
    }, {
        xtype: 'textfield',
        name: 'txtHeSoB',
        fieldLabel: 'Hệ số B',
        value: ''
    }, {
        xtype: 'textfield',
        name: 'txtHeSoC',
        fieldLabel: 'Hệ số C',
        value: ''
    }, {
        xtype: 'displayfield',
        name: 'lblKetQua',
        fieldLabel: 'Kết quả',
        value:''
    }],
    buttons:[{
        text: "Giải PT",
        name: 'btnGiaiPT'
    },{
        text: "Làm lại",
        name: 'btnLamLai'
    },{
        text: "Thoát",
        name: 'btnThoat'
    }],
    initComponent: function(){
        var me = this;
        me.callParent(arguments);
        me.down('button[name=btnGiaiPT]').on('click', me.onGiaiPT, me);
        me.down('button[name=btnLamLai]').on('click', me.onLamLai, me);
        me.down('button[name=btnThoat]').on('click', me.onThoat, me);
    },
    reset: function(){
    },
    getGiaTri: function(name){
        var txt = this.down('*[name='+ name +']');
        if(txt) return txt.getValue();
    },
    setGiaTri: function(name, value){
        var txt = this.down('*[name='+ name +']');
        if(txt) txt.setValue(value+ '');
    },
    onGiaiPT: function(){
        var a, b, c, kq;

        if(this.getGiaTri("txtHeSoA")== ''
            || this.getGiaTri("txtHeSoA")==''
            || this.getGiaTri("txtHeSoA") == '') {
            Ext.Msg.alert('Thong bao', 'Cac he so phai duoc nhap.');
            return;
        }

        a = parseFloat(this.getGiaTri("txtHeSoA"));
        b = parseFloat(this.getGiaTri("txtHeSoB"));
        c = parseFloat(this.getGiaTri("txtHeSoC"));

        var giaipt = new MyApp.Utils.GiaiPTBac2({ heSoA: a, heSoB: b, heSoC: c });
        var kq = giaipt.solve();

        lblKetQua = this.down('displayfield[name=lblKetQua]');
        
        if(kq.soNghiem == -1)
            lblKetQua.setValue('Phuong trinh co vo so nghiem');
        else if(kq.soNghiem == 0)
            lblKetQua.setValue('Phuong trinh vo nghiem');
        else if(kq.soNghiem == 1)
            lblKetQua.setValue('Phuong trinh co 1 nghiem, x = ' + kq.x[0]);
        else if(kq.soNghiem == 2)
            lblKetQua.setValue('Phuong trinh co 2 nghiem, x1 = ' + kq.x[0] + ', x2 = ' + kq.x[1]);
    },
    onLamLai: function(){
        var me = this;
        this.setGiaTri("txtHeSoA", '');
        this.setGiaTri("txtHeSoB", '');
        this.setGiaTri("txtHeSoC", '');
        this.setGiaTri("lblKetQua", '');
    },
    onThoat: function(){
        this.close();
    }
});