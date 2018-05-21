VX.mapTQG = Ext.apply(VX.mapCfg,{
	searchField: 'topic_desc',
	dragName: 'map-qgroup-to',
	title: 'Danh mục Chủ đề theo Nhóm câu hỏi',
	itemLabel: 'Nhóm câu hỏi',
	groupLabel: 'Chủ đề',
	store: VX.getSE('MapTopicQGroup'),
	template: Ext.create('Ext.XTemplate',
		'<tpl for=".">',
		'<div class="vx-search-item">',
		'<input type="hidden" value="{topic_id}">',
		'<span class="vx-action-column">',
		'<a class="{_has_link:this.hasLink} vx-bt" href="javascript:',
		'VX.mapTQG.toggle(\'{topic_id}\')"></a>',
		'</span>',
		'(<i>Chủ đề #{topic_id} - {user_first_name} {user_last_name}</i>)',
		'<p><b>{topic_name}</b><br/>{topic_desc}</p>',
		'</div> </tpl>',
		{hasLink: VX.mapCfg.hasLink}
	)
});

Ext.define('VX.view.map.TopicQGroup', {
	extend: 'Ext.ux.form.GroupForm',
	mapCfg: VX.mapTQG
});