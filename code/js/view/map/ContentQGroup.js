VX.mapCQG = Ext.apply(VX.mapCfg,{
	searchField: 'course_content_desc',
	dragName: 'map-qgroup-to',
	title: 'Danh mục Nội dung theo Nhóm câu hỏi',
	itemLabel: 'Nhóm câu hỏi',
	groupLabel: 'Nội dung',
	store: VX.getSE('MapContentQGroup'),
	template: Ext.create('Ext.XTemplate',
		'<tpl for=".">',
		'<div class="vx-search-item">',
		'<input type="hidden" value="{course_content_id}">',
		'<span class="vx-action-column">',
		'<a class="{_has_link:this.hasLink} vx-bt" href="javascript:',
		'VX.mapCQG.toggle(\'{course_content_id}\')"></a>',
		'</span>',
		'(<i>Nội dung #{course_content_id} - {user_first_name} {user_last_name}</i>)',
		'<p><b>{course_content_name} ({course_content_code})</b><br/>{course_content_desc}</p>',
		'</div> </tpl>',
		{hasLink: VX.mapCfg.hasLink}
	)
});

Ext.define('VX.view.map.ContentQGroup', {
	extend: 'Ext.ux.form.GroupForm',
	mapCfg: VX.mapCQG
});