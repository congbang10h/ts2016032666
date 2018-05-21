Ext.define('VX.view.question.ShareForm', {
	extend: 'Ext.ux.WinForm',
	title: 'Chia sẻ câu hỏi',
	iconCls: 'share16',
	items: [{
		xtype: 'eform',
		width: 470,
		btt: VX.BT_CLOSE | VX.BT_SUBMIT,
		bttSubmit: {
			text: 'Chia sẻ',
			iconCls: 'share16'
		},
		layout: 'anchor',
		items: [{
			xtype: 'fieldcontainer',
			itemId: 'permission',
			fieldLabel: 'Các quyền đối với câu hỏi',
			labelAlign: 'top',
			anchor: '100%',
			layout: 'hbox',
			defaults: {
				flex: 1,
				inputValue: 1,
				uncheckedValue: 0,
				xtype: 'checkbox'
			},
			items: [{
				boxLabel: 'Xem',
				name: 'view',
				checked: true,
				readOnly: true
			},{
				boxLabel: 'Sửa chữa',
				name: 'modifiable'
			},{
				boxLabel: 'Chia sẻ',
				name: 'resharable'
			}]
		},{
			xtype: 'fieldcontainer',
			fieldLabel: 'Tìm người dùng',
			labelAlign: 'top',
			anchor: '100%',
			layout: 'anchor',
			items: [{
				anchor: '100%',
				labelAlign: 'top',
				name: 'user_id',
				xtype: 'combobox',
				displayField: 'fullname',
				valueField: 'uid',
				store: VX.getS('UserForShare'),
				listeners: {
					change: function(me, newval, oldval, eOpts) {
						var s = VX.getS('UserForShare'),
							r = s.findRecord('uid',newval),
							t = VX.getS('UserShareList');
						if (r && !t.findRecord('uid',newval))
							t.add(r);
					}
				},
				pageSize: 10,
				typeAhead: true,
				typeAheadDelay: 1000,
				hideLabel: true,//hideTrigger:true,
				queryParam: 'query_fullname',
	
				listConfig: {
					loadingText: 'Đang tìm...',
					getInnerTpl: function() {
						return '{fullname} ({roles})';
					}
				}
			}]
		},{
			xtype: 'fieldcontainer',
			fieldLabel: 'Danh sách người dùng được chia sẻ',
			itemId: 'usertarget',
			labelAlign: 'top',
			anchor: '100%',
			layout: 'anchor',
			items: [{
		        width: 450,
		        height: 250,
		        xtype: 'sharelist'
		    }]
		}],
		submit: function(){
			var me=this,t=VX.getS('UserShareList');
			if (!t.count()){
				var tf = me.getForm().findField('user_id');
				tf.markInvalid('Chưa chọn người dùng để chia sẻ');
			}else{
				var vals = me.getValues(), rq = {
					questions: me.questions,
					viewable: 1,
					modifiable: vals.modifiable || 0,
					resharable: vals.resharable || 0,
					users: []
				};
				t.each(function(r){
					rq.users.push(r.data.uid);
				});
				VX.getC('Question').share(me.up('window'),rq);
			}
		}
	}],
	show: function(){
		var me=this, frm=me.down('form').getForm(),
			cbx = frm.findField('user_id'),
			s = VX.getS('UserShareList');
		me.callParent();
		cbx.setValue(null);
		s.removeAll();
	},
	setRecords: function (recs){
		var me=this, frm=me.down('form'),p=me.down('#permission'), i;
		frm.questions = [];
		for(i in recs)
			frm.questions.push(recs[i].data.question_id);
		p.setFieldLabel('Các quyền chia sẻ đối với '+recs.length
			+' câu hỏi đang chọn');
	}
});
