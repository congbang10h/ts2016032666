//js/ux/Slider.js
Ext.ux.SliderCls = function(targetId){
	this.id		= Ext.ux.Slider.nextId++;
	this.scroll = 'up'; //{up,down,left,right}
	this.delay  = 50; //miliseconds
	this.el		= null;
	this.timer	= 0;

	this.playUp = function(){
		var c = this.el.firstChild;
		var m = -parseInt(this.el.style.marginTop) | 0;
		if (c.offsetHeight > m){
			m += 1;
			this.el.style.marginTop = '-'+m+'px';
		}else{
			this.el.style.marginTop = '-1px';
			this.el.removeChild(c);
			this.el.appendChild(c);
		}
	};
	
	this.play = function(){
		if (this.el && this.el.firstChild){
			this.playUp();
		}
	};
	this.stop = function(){
		if (this.timer){
			clearInterval(this.timer);
			this.timer = 0;
		}
	};
	this.go = function(){
		if (!this.timer)
			this.timer = setInterval('Ext.ux.Slider.list['+this.id+'].play()',
				this.delay);
	};

	try{
		var p=Ext.get(targetId).down('.vxSliderItem'),box = p.parent?p.parent():0;
		this.el = box.dom;
		box.on({
			mouseenter: this.stop,
			mouseleave: this.go,
			scope: this
		});
		Ext.ux.Slider.list.push(this);
		this.go();
	}catch(e){
		this.el = null;
		if (VX.config.debug>1)
			console.log('Init Ext.ux.Slider ['+targetId+'] failed: '+e.message);
	}
};

Ext.ux.Slider = {
		nextId: 0,
		list:[],
		
		init: function(targetId){
			new Ext.ux.SliderCls(targetId);
		}
	};
