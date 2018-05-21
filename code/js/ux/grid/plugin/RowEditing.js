/**
 * @class Ext.ux.grid.plugin.RowEditing
 * @extends Ext.grid.plugin.RowEditing
 * 
 * The Initial Developer of the Original Code is tz (atian25@qq.com)
 * @see http://www.sencha.com/forum/showthread.php?131482-Ext.ux.RowEditing-add-some-usefull-features
 * 
 * @2013-09-25: 
 * 	- pmdung fix cancelEdit(): turn off autoSync when remove blank record
 * 	- Apply new RowEditor.prototype
 * 
 * @author Harald Hanek (c) 2011-2012
 * @license http://harrydeluxe.mit-license.org
 */

Ext.apply(Ext.grid.RowEditor.prototype, {
	saveBtnText: 'Lưu lại',
	cancelBtnText: 'Hủy bỏ',
	errorsText: 'Chú ý',
	dirtyText: 'Vui lòng xem xét các vấn đề sau:<br/>'
});

Ext.define('Ext.ux.grid.plugin.RowEditing', {
	extend: 'Ext.grid.plugin.RowEditing',
	alias: 'plugin.ux.rowediting',

	removePhantomsOnCancel: true,
	firstInitValidator: true,

	init: function(grid)
	{
		var me = this;
		//me.addEvents('canceledit');
		me.callParent(arguments);
		//grid.addEvents('canceledit');
		grid.relayEvents(me, [ 'canceledit', 'beforeedit' ]);

		me.on('edit', function(editor, context){
			if (context.record)
				delete context.record._blank;
		});
	},
	startEdit: function(record,column){
		if (this.disabled) return;
		this.callParent(arguments);
		var me = this.getEditor();
		if (this.firstInitValidator){
			Ext.each(me.query('[isFormField]'), function(field) {
				field.validator = function(){
					var me=this,
						f = me.up('form').getForm(),
						r = f.getRecord();
					if (!r) return true;
					var oldv = r.get(me.name), e;
					r.set(me.name,f.findField(me.name).getValue());
					e = r.validate().getByField(me.name);
					r.set(me.name,oldv);
					if (e.length)
						return e[0].message;
					return true;
				};
				field.validate = function() {
			        var me = this,
			        	p  = me.up(),
			            isValid = me.isValid();
			        if (isValid !== me.wasValid) {
			            me.wasValid = isValid;
			            me.fireEvent('validitychange', me, isValid);
			        }
			        if (!p.callOnFieldChange){
			        	p.callOnFieldChange = 1;
			        	me.up().onFieldChange();
			        	p.callOnFieldChange = 0;
			        }
			        return isValid;
			    };
	        }, me);
			this.firstInitValidator = false;
		}
	},
	
	/**
	 * add a record and start edit it
	 * 
	 * @param {Object} data Data to initialize the Model's fields with
	 * @param {Number} position The position where the record will added. -1
	 *            will be added record at last position.
	 */
	startAdd: function(data, position)
	{
		var me = this,
			record = me.grid.store.model.create(data);
		
		record._blank = true;
		record.set('user_id', VX.user.id);
		
		position = (position && position != -1 && parseInt(position + 1) <= parseInt(me.grid.store.getCount())) ? position
				: (position == -1) ? parseInt(me.grid.store.getCount()) : 0;

		var autoSync = me.grid.store.autoSync;
		me.grid.store.autoSync = false;
		me.grid.store.insert(position, record);
		me.grid.store.autoSync = autoSync;
		me.startEdit(position, 0);
		
        if (me.editor.floatingButtons && me.editor.form.isValid())
		{
            me.editor.floatingButtons.child('#update').setDisabled(false);
        }
	},

	startEditByClick: function()
	{
		var me = this;
		
		if(!me.editing || me.clicksToMoveEditor === me.clicksToEdit)
		{
			if(me.context || me.context.record._blank)//Nguyên gốc là &&
				me.cancelEdit();

			me.callParent(arguments);
		}
	},
	
	moveEditorByClick: function()
	{
        var me = this;
        if(me.editing)
        {
        	if(me.context || me.context.record._blank)//Nguyên gốc là &&
        		me.cancelEdit();

        	me.editing = false;
			me.superclass.onCellClick.apply(me, arguments);
        }
    },

	cancelEdit: function()
	{
		var me = this;
		if(me.editing)
		{
			me.getEditor().cancelEdit();
			me.callParent(arguments);
			me.fireEvent('canceledit', me.context);

			if(me.removePhantomsOnCancel)
			{
				if(me.context.record._blank && me.context.record.store)
				{
					var as = me.context.store.autoSync;
					me.context.store.autoSync = false;
					me.context.store.remove(me.context.record);
					me.context.store.autoSync = as;
				}
				else
				{
					me.context.record.reject();
				}
			}
		}
	}
});