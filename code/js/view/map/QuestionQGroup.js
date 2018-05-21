VX.mapQQG = Ext.apply(VX.mapCfg,{
	searchField: 'topic_desc',
	dragName: 'map-qgroup-to',
	title: 'Danh mục Câu hỏi theo Nhóm câu hỏi',
	itemLabel: 'Nhóm câu hỏi',
	groupLabel: 'Câu hỏi',
	store: VX.getSE('MapQuestionQGroup'),
	template: Ext.create('Ext.XTemplate',
		'<tpl for=".">',
		'<div class="vx-search-item">',
		'<input type="hidden" value="{question_id}">',
		'<span class="vx-action-column">',
		'<a class="{_has_link:this.hasLink} vx-bt" href="javascript:',
		'VX.mapQQG.toggle(\'{question_id}\')"></a>',
		'</span>',
		'(<i>Câu hỏi #{question_id} - {user_first_name} {user_last_name} - {question_type_code}</i>)',
		'<p>{question_desc}</p>',
		'</div> </tpl>',
		{hasLink: VX.mapCfg.hasLink}
	)
});

Ext.define('VX.view.map.QuestionQGroup', {
	extend: 'Ext.ux.form.GroupForm',
	mapCfg: VX.mapQQG
});