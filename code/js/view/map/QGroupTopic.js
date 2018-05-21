VX.mapQGT = Ext.apply(VX.mapCfg,{
	searchField: 'question_group_desc',
	dragName: 'map-topic-to',
	title: 'Danh mục Nhóm câu hỏi theo Chủ đề',
	itemLabel: 'Chủ đề',
	groupLabel: 'Nhóm câu hỏi',
	store: VX.getSE('MapQGroupTopic'),
	template: Ext.create('Ext.XTemplate',
		'<tpl for=".">',
		'<div class="vx-search-item">',
		'<input type="hidden" value="{question_group_id}">',
		'<span class="vx-action-column">',
		'<a class="{_has_link:this.hasLink} vx-bt" href="javascript:',
		'VX.mapQGT.toggle(\'{question_group_id}\')"></a>',
		'</span>',
		'(<i>Nhóm #{question_group_id} - {user_first_name} {user_last_name}</i>)',
		'<p>{question_group_desc}</p>',
		'</div> </tpl>',
		{hasLink: VX.mapCfg.hasLink}
	)
});

Ext.define('VX.view.map.QGroupTopic', {
	extend: 'Ext.ux.form.GroupForm',
	mapCfg: VX.mapQGT
});