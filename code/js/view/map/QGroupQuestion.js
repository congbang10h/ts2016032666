VX.mapQQ = Ext.apply(VX.mapCfg,{
	searchField: 'question_group_desc',
	dragName: 'map-question-to',
	title: 'Danh mục Nhóm theo Câu hỏi',
	itemLabel: 'Câu hỏi',
	groupLabel: 'Nhóm',
	store: VX.getSE('MapQGroupQuestion'),
	template: Ext.create('Ext.XTemplate',
		'<tpl for=".">',
		'<div class="vx-search-item">',
		'<input type="hidden" value="{question_group_id}">',
		'<span class="vx-action-column">',
		'<a class="{_has_link:this.hasLink} vx-bt" href="javascript:',
		'VX.mapQQ.toggle(\'{question_group_id}\')"></a>',
		'</span>',
		'(<i>Nhóm #{question_group_id} - {user_first_name} {user_last_name}</i>)',
		'<p>{question_group_desc}</p>',
		'</div> </tpl>',
		{hasLink: VX.mapCfg.hasLink}
	)
});

Ext.define('VX.view.map.QGroupQuestion', {
	extend: 'Ext.ux.form.GroupForm',
	mapCfg: VX.mapQQ
});