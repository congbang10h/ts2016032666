function initQuestionMatchItemDrag(me){
	var hdrag = me.down(me.testing?'box':'box[cls=draghandle]'), hdrop;
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
					group: me.group,
					itemId: me.getId(),
					groupId: me.group.getId(),
					rightId: me.group.nextCmp ? me.group.nextCmp.getId() : 0 
				};
			},
			getRepairXY: function(){
				return this.dragData.repairXY;
			},
			ddGroup: 'question-match-item-group'
		});
		//DropZone for connect two item in two column
		hdrop = me.down(me.testing?'box':'box[cls=item]');
		me.dropLink = Ext.create("Ext.dd.DropZone",hdrop.getEl(),{
			getTargetFromEvent: function() {
				return me;
			},
	       onNodeDrop: function(target,dd,e,data){
				if (data.rightId != me.group.getId())
					return;
				data.group.addLink(data.itemId, me.getId(), me.order);
			},
			onNodeOver: function(target, dd, e, data){
				if (data.rightId != me.group.getId())
					return this.dropNotAllowed;
	            return this.dropAllowed;
	        },
			ddGroup: 'question-match-item-group'
		});
	}
	hdrop = me.down('box[cls=dropzone]');
	if (hdrop && !me.testing){
		//DropZone for reorder item in a column
		me.dropReorder = Ext.create("Ext.dd.DropZone",hdrop.getEl(),{
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
				if (data.itemId!=me.getId() && data.groupId==me.group.getId())
					me.group.moveBefore(data.item,me);
			},
			onNodeOver: function(target, dd, e, data){
				if (data.itemId==me.getId() || data.groupId!=me.group.getId())
					return this.dropNotAllowed;
	            return this.dropAllowed;
	        },
			ddGroup: 'question-match-item-group'
		});
	}
}

Ext.define('VX.view.question.match.ItemEdit', {
	extend: 'Ext.container.Container',
	alias: 'widget.question-match-item',
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
				xtype: 'flextext',
				flex: 1,
				height: 35,
				onChange: function(){
					var me=this;
					me.up('question-match-item').refItem.face = me.getValue();
					me.up('form').question._change++;
				}
			}]
		});
	},
	initTestingComponent: function(){
		this.add({
			xtype: 'box',
			//width: '100%',
			//height: 35,
			cls: 'question-match-item-testing'
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
	showValue: function(){
		var me=this,it=me.refItem,
			v = it.face!=undefined?it.face:'';
		try{
			if (me.testing)
				me.down('box').getEl().setHTML(v);
			else
				me.down('flextext').setValue(v);
		}catch(e){
			console.log(e);
		}
	},
	listeners:{
		boxready: initQuestionMatchItemDrag,
		afterrender: function(me){
			me.group = me.up('question-match-column');
		}
	}
}); 
Ext.define('VX.view.question.match.AddItem', {
	extend: 'Ext.container.Container',
	alias: 'widget.question-match-additem',
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
			cls: 'x-btn-nobackground',
			iconCls: 'add16',
			tooltip: 'Thêm mục',
			tabIndex: -1,
			handler: function(){
				this.up('question-match-column').addNewItem();
			}
		},{
			xtype: 'box',
			flex: 1
		},{
			xtype: 'button',
			iconCls: 'delete16',
			cls: 'x-btn-nobackground',
			tooltip: 'Xóa nhóm',
			tabIndex: -1,
			handler: function(){
				this.up('question-match-column').removeGroup();
			}
		}]
	}],
	listeners:{
		boxready: initQuestionMatchItemDrag,
		afterrender: function(me){
			me.group = me.up('question-match-column');
		}
	}
}); 