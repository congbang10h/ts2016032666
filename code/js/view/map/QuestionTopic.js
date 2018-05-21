VX.mapQT = Ext.apply(VX.mapCfg,{
	searchField: 'question_desc',
	dragName: 'map-topic-to',
	title: 'Danh mục Câu hỏi theo Chủ đề',
	itemLabel: 'Chủ đề',
	groupLabel: 'Câu hỏi',
	store: VX.getSE('MapQuestionTopic'),
	template: Ext.create('Ext.XTemplate',
		'<tpl for=".">',
		'<div class="vx-search-item">',
		'<input type="hidden" value="{question_id}">',
		'<span class="vx-action-column">',
		'<a class="{_has_link:this.hasLink} vx-bt" href="javascript:',
		'VX.mapQT.toggle(\'{question_id}\')"></a>',
		'</span>',
		'(<i>Câu hỏi #{question_id} - {user_first_name} {user_last_name} - {question_type_code}</i>)',
		'<p>{question_desc}</p>',
		'</div> </tpl>',
		{hasLink: VX.mapCfg.hasLink}
	)
});

Ext.define('VX.view.map.QuestionTopic', {
	extend: 'Ext.ux.form.GroupForm',
	mapCfg: VX.mapQT
});