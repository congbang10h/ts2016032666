Ext.define('VX.view.question.choice.ItemView', {
	extend: 'Ext.container.Container',
	alias: 'widget.question-choice-item-view',
	layout: 'hbox',
	padding: '0 0 5 0',
	cls: 'question-choice-item question-choice-item-nocheck',
	items: [],
	updateItem: function(multichoice, it, review){
		var me=this,type = multichoice ? 'Checkbox' : 'Radio';
		me.multichoice = multichoice;
		me.refItem = it;
		me.add(Ext.create('Ext.form.field.'+type,{
			name: multichoice ? 'solution' : it.id,
			width: 25,
            checked: review && it.choice,
			listeners:{
				change: function(me){
					var p = me.up(), v = me.getValue(), others, i,input;
					p.refItem.choice = v;
					if (p.question && typeof p.question.onAnswer == 'function')
						p.question.onAnswer();
					if (v){
						p.addCls('question-choice-item-checked');
						p.removeCls('question-choice-item-nocheck');
					}else{
						p.addCls('question-choice-item-nocheck');
						p.removeCls('question-choice-item-checked');
					}
					if (!p.multichoice) {
						others = p.up().query('radiofield');
						for (i in others) {
							input = others[i];
							if (v && input != me && input.getValue()) {
								input.setValue(false);
							}
						}
					}
				}
			}
		}));
		me.add(Ext.create('Ext.container.Container',{
			flex: 1,
            cls: review && it.choice ? 'question-choice-item-checked':'',
			html: it.face,
			listeners: {
				render: function(me) {
					me.el.on('click', function(ev) {
						var el = Ext.get(ev.target),
							ep = el.parent('.question-choice-item'),
							p = Ext.getCmp(ep.id),
							i = p.down();
						i.setValue(p.multichoice ? !i.getValue() : true);
					});
				}
			}
		}));
	}
}); 