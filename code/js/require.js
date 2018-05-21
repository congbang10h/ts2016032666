VX.require([
//Thư viện cơ bản cần thiết
"js/ux/comtability.js",
"jslib/ext/ext-all-debug.js",
"jslib/tinymce/tinymce.js",
{
	wait: "Ext.onReady",
	load: "jslib/ext/packages/ext-locale/build/ext-locale-vn.js"
},
//"js/ux/debug-loader.js",

//Cấu hình ứng dụng
"php/js_direct.php",
"php/js_config.php",

//Các thiết lập+công cụ của ứng dụng
"Demo1.js",
"js/ux/override.js",
"js/ux/vtype.js",
"js/ux/direct.js",
"js/ux/msg.js",

//Ext.ux
"Ext.ux.Form",
"Ext.ux.WinForm",
"Ext.ux.Store",
"Ext.ux.MD5",
"Ext.ux.grid.filter.Filter",
"Ext.ux.grid.filter.BooleanFilter",
"Ext.ux.grid.filter.DateFilter",
"Ext.ux.grid.filter.DateTimeFilter",
"Ext.ux.grid.filter.ListFilter",
"Ext.ux.grid.filter.NumericFilter",
"Ext.ux.grid.filter.StringFilter",
"Ext.ux.grid.menu.ListMenu",
"Ext.ux.grid.menu.RangeMenu",
"Ext.ux.grid.FiltersFeature",
"Ext.ux.form.SearchField",
"Ext.ux.grid.Grid",
"Ext.ux.DataView.DragSelector",
"Ext.ux.DataView.LabelEditor",
"Ext.ux.form.FlexText",
"Ext.ux.mediamng.ImageUpload",
{
	wait: 'Ext.ux.mediamng.ImageUpload',
	load: "Ext.ux.mediamng.ImageManager"
},
"js/view/_GiaiPTBac2/GiaiPTBac2.js",
//Model
"VX.model.Question",
"VX.modex.ContentQuestion",
"VX.modex.CourseContentTree",
"VX.model.Course",
"VX.model.User",
"VX.model.Test",

//Store
"VX.store.Question",
"VX.store.Course",
'VX.store.Test_section',
"VX.storx.CourseContentTree",
"VX.storx.ContentQuestion",

//Controller
"VX.controller.Action",
"VX.controller.Simple",
"VX.controller.User",
"VX.controller.Question",
"VX.controller.Course",

//Ứng dụng
"js/app.js"
]);