Ext.define('VX.view.test.ReviewForm', {
	extend: 'Ext.ux.Form',
    alias: 'widget.reviewform',
    btt: VX.BT_SUBMIT,
    layout: 'anchor',
    defaults:{
        labelAlign: 'left',
        labelWidth: 160,
        anchor: '100%'
    },
    items: [{
        labelAlign: 'top',
        xtype: 'flextext',
        fieldLabel: 'Lời bình',
        height: 150,
        name: 'test_review_desc'
    },{
        xtype: 'combobox',
        fieldLabel: 'Kiểu duyệt',
        name: 'test_review_code',
        store: Ext.create('Ext.data.Store',VX.vars.ReviewType),
        queryMode: 'local',
        displayField: 'name',
        valueField: 'type',
        editable: false
    }],
    buttons:[{
        text: 'Tạo mới',
        iconCls: 'add16',
        handler: function() {
            this.up('form').newReview();
        }
    }],
    submit: function(){
        var me=this,rec=me.getRecord();
        rec.set('test_id',me.test_id);
        if (me.isValid()){
            VX.getC('Test').saveReview(me,me.up('window'));
        }
    },
    loadReview: function (rec) {
        var me=this;
        me.loadRecord(rec);
        var b=me.down('#submit');
        b.setDisabled(true);
    },
    newReview: function (data) {
        var me=this,b=me.down('#submit'),
            rec=Ext.create('VX.model.Test_review',data);
        b.setDisabled(false);
        rec.set('test_review_code','');
        me.loadRecord(rec);
    },
    initComponent: function(){
        var me=this;
        me.callParent(arguments);
        me.newReview();
    }
});
