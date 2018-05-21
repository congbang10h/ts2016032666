function initQuestionChoiceItemDrag(me){
	var hdrag = me.down(
		me.testing ?
			'box[cls=question-choice-item-testing]':'box[cls=draghandle]'),
		hdrop;
	if (hdrag){
		me.dragEl = me.testing ? hdrag.getEl() : hdrag.up().getEl();
		me.dragZone = Ext.create('Ext.dd.DragZone',hdrag.getEl(), {
			getDragData: function (){
				var compEl = me.dragEl, cloneEl;
			
				cloneEl = compEl.dom.cloneNode(true);
				cloneEl.id = Ext.id();
			
				return me.dragData = {
					ddel: cloneEl,
					repairXY: Ext.fly(compEl).getXY(),
					sourceEl: compEl,
					item: me,
					itemId: me.getId()
				};
			},
			getRepairXY: function(){
				return this.dragData.repairXY;
			},
			ddGroup: 'question-choice-item-group'
		});
	}
	hdrop = me.down('box[cls=dropzone]');
	if (hdrop){
		//DropZone for rechoice item in a column
		me.dropRechoice = Ext.create("Ext.dd.DropZone",hdrop.getEl(),{
			getTargetFromEvent: function() {
				return me;
			},
	        onNodeEnter: function(){
	            hdrop.addCls('drophover');
	        },
	        onNodeOut: function(){
	            hdrop.removeCls('drophover');
	        },
			onNodeDrop: function(target,dd,e,data){
				if (data.itemId!=me.getId())
					me.group.moveBefore(data.item,me);
			},
			onNodeOver: function(target, dd, e, data){
				if (data.itemId==me.getId())
					return this.dropNotAllowed;
	            return this.dropAllowed;
	        },
			ddGroup: 'question-choice-item-group'
		});
	}
}

Ext.define('VX.view.question.choice.ItemEdit', {
	extend: 'Ext.container.Container',
	alias: 'widget.question-choice-item',
	width: '100%',
	cls: 'question-item-edit',
	testing: 0,
	refItem: {},
	items: [],
	initEditComponent: function(){
		this.add({
			xtype: 'box',
			height: 5,
			cls: 'dropzone'
		});
		this.add({
			xtype: 'container',
			width: '100%',
			height: 35,
			layout: 'hbox',
			cls: 'item',
			items:[{
				xtype: 'box',
				cls: 'draghandle'
			},{
				xtype: 'checkbox',
				inputValue: 1,
				uncheckedValue: 0,
				width: 20,
				tabIndex: -1,
				listeners:{
					change: function(me){
						var it=me.up('question-choice-item').refItem;
						it.choice = me.getValue();
						me.up('form').question._change++;
					}
				}
			},{
				xtype: 'flextext',
				flex: 1,
				height: 35,
				onChange: function(){
					var me=this;
					me.up('question-choice-item').refItem.face = me.getValue();
					me.up('form').question._change++;
				}
			},{
				xtype: 'button',
				iconCls: 'delete16',
				cls: 'x-btn-nobackground',
				tooltip: 'Xóa mục này',
				tabIndex: -1,
				handler: function(){
					var me=this.up('question-choice-item');
					me.up('question-choice-column').removeQuestionItem(me);
				}
			}]
		});
	},
	initTestingComponent: function(){
		this.add({
			xtype: 'box',
			height: 5,
			cls: 'dropzone'
		});
		this.add({
			xtype: 'box',
			cls: 'question-choice-item-testing'
		});
	},
	initComponent: function(){
		var me=this;
		me.callParent(arguments);
		if (me.testing)
			me.initTestingComponent();
		else
			me.initEditComponent();
	},
	listeners:{
		boxready: initQuestionChoiceItemDrag,
		afterrender: function(me){
			me.group = me.up('question-choice-column');
		}
	}
}); 
Ext.define('VX.view.question.choice.AddItem', {
	extend: 'Ext.container.Container',
	alias: 'widget.question-choice-additem',
	width: '100%',
	cls: 'question-item-edit x-unselectable',
	items: [{
		xtype: 'box',
		height: 5,
		cls: 'dropzone'
	},{
		xtype: 'container',
		layout: 'hbox',
		items:[{
			xtype: 'button',
			iconCls: 'add16',
			//cls: 'x-btn-nobackground',
			text: 'Thêm mục',
			tabIndex: -1,
			handler: function(){
				this.up('question-choice-column').addNewItem();
			}
		}]
	}],
	listeners:{
		boxready: initQuestionChoiceItemDrag,
		afterrender: function(me){
			me.group = me.up('question-choice-column');
		}
	}
}); 