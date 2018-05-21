Ext.define('VX.controller.Report',{
	extend: 'Ext.app.Controller',
	createChart: function(c){
		if (c.cfg.percent){
			for(var i in c.series) if (c.series.hasOwnProperty(i)){
				var s=c.series[i];
				if (s.label)
					s.label.renderer = function(v){
						return (v*1.0).toFixed(2)+'%';
					}
			}
		}
		window.chartroot = c;
		var chart=Ext.create('Ext.chart.Chart',window.chartcfg={
			//style: 'background:#fff',
			animate: true,
			shadow: true,
			legend: c.legend,
			store: Ext.create('Ext.data.JsonStore',{
				fields: c.fields,
				data: c.items
			}),
			axes: c.axes,
			series: c.series
		});
		Ext.create('Ext.Window', {
			width: 800,
			height: 600,
			minHeight: 400,
			minWidth: 550,
			hidden: false,
			maximizable: true,
			title: c.title,
			autoShow: true,
			layout: 'fit',
			tbar: [{
				text: 'Lưu biểu đồ',
				iconCls: 'save16',
				handler: function() {
					var chart = this.up('window').items.first();
					chart.save({
						type: 'image/png'
					});
				}
			}],
			items: chart
		});
	}
});