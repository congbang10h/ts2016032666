VX.mapCT = Ext.apply(VX.mapCfg,{
	searchField: 'course_name_vn',
	dragName: 'map-topic-to',
	title: 'Danh mục Môn học theo Chủ đề',
	itemLabel: 'Chủ đề',
	groupLabel: 'Môn học',
	store: VX.getSE('MapCourseTopic'),
	template: Ext.create('Ext.XTemplate',
		'<tpl for=".">',
		'<div class="vx-search-item">',
		'<input type="hidden" value="{course_id}">',
		'<span class="vx-action-column">',
		'<a class="{_has_link:this.hasLink} vx-bt" href="javascript:',
		'VX.mapCT.toggle(\'{course_id}\')"></a>',
		'</span>',
		'(<i>Môn học #{course_id} - {course_code}</i>)',
		'<p>{course_name_vn}<br/>{course_name_en}</p>',
		'</div> </tpl>',
		{hasLink: VX.mapCfg.hasLink}
	)
});

Ext.define('VX.view.map.CourseTopic', {
	extend: 'Ext.ux.form.GroupForm',
	mapCfg: VX.mapCT
});