Ext.Loader.setConfig({
    enabled : true,
    paths   : { 'MyApp.View.GiaiPTBac2' : 'GiaiPTBac2.js' }
});

Ext.require([
    'MyApp.View.GiaiPTBac2'
]);

Ext.onReady(function(){
    var app = new MyApp.View.GiaiPTBac2();
    app.render(Ext.getBody());
});