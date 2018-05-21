Ext.define('VX.view.test.AddQuestion',{
	extend: 'Ext.container.Container',
	alias: 'widget.test-add-question',
	cls: 'test-add-question',
	addQuestion: function(qs){
		var me=this,p=me.up('test-edit-section');
		if(!me.isDisabled() && p)
			p.addQuestion(qs,me);
	},
	listeners: {
		afterlayout: function(me){
			if (!me.droptarget){
				var el = me.getEl();
				el.on('click',function(){
					if (!me.isDisabled())
						me.up('test-edit-section').setAddBtt(me);
				});
				me.droptarget = Ext.create('Ext.dd.DropTarget', el, {
					component: me,
					ddGroup: 'test-add-question',
					notifyOver : function(dd, e, data){
						return !this.component.isDisabled();
					},
					notifyEnter: function(ddSource, e, data) {
						var me=this,el=me.el;
						if (!me.component.isDisabled()) {
							el.stopAnimation();
							el.highlight();
						}
					},
					notifyDrop: function(src, e, data){
						var recs = src.dragData.records;
							me=this.component;
						me.addQuestion(recs);
						
						return true;
					}
				});
			}
		}
	}
});
