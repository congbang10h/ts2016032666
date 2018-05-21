Ext.define('VX.controller.Question',{
	extend: 'Ext.app.Controller',
	requires: [
		'VX.view.question.match.ItemPanel',
		'VX.view.question.order.ItemColumn',
		'VX.view.question.fill.ItemColumn',
		'VX.view.question.choice.ItemColumn'
	],
	store: VX.getS('Question'),
	qFillCache: {},//Sử dụng cho các input khi render fill question
	qFillChange: function(id,el,order){
		var me=this, q = me.qFillCache[id];
		if (q && typeof q.onAnswer=='function'){
			q.onAnswer(order,el.value);
		}
		if (q){
			q.response = q.response || {};
			q.response[order+1] = el.value;
		}
	},
	qFill: {
		create: function(){
			return Ext.apply({
				type: 'Fill',
				id: 0,
				description: '<p>Chào bạn {1}!</p><p>Hôm nay trời {2} đấy!' +
						'</p><p>Làm việc vui vẻ nhé!</p>',
				item:[{
					id: 1,
					face: '<p>Tên bạn</p>',
					value: 'Trâm'
				},{
					id: 2,
					face: '<p>Thời tiết</p>',
					value: '@đẹp/nắng/mưa'
				}],
				info:{
					name: 'Ví dụ câu hỏi điền chỗ trống',
					tags: 'cơ bản; ví dụ; điền chỗ trống',
					random: 1
				}
			},this);
		},
		clone: function(q){
			var i,j,v,s,it;
			q = Ext.clone(q || this);
			
			q.solution = {};
			for (i in q.item){
				it = q.item[i];
				v = it.value.split('/');
				s = '';
				if (v.length==1) {
					s = v[0];
					if (s[0]=='@')
						s= s.substr(1);
				}else{
					for (j in v){
						if (v[j][0]=='@'){
							s = v[j].substr(1);
							break;
						}
					}
					it.value = it.value.replace('@','').split('/');
					if (q.info && q.info.random)
						VX.shuffle(it.value);
					it.value = it.value.join('/');
				}
				q.solution[it.id] = s;
			}
			delete q._map;
			delete q._change;
			delete q._preview;
			return q;
		},
		rand: function(q){
			q = q || this;
			if (!q.info || !q.info.random)
				return q;
			var i,it,v;
			for(i in q.item){
				it = q.item[i];
				v = it.value.split('/');
				VX.shuffle(v);
				it.value = v.join('/');
			}
			return q;
		},
		verify: function(q){
			q = q || this;
			if (!q.response) return 0;
			for(var i in q.solution)
				if (q.response[i] != q.solution[i])
					return 0;
			return 1;
		},
		fromRecord: function(r){
			var q={
				type: 'Fill',
				id: r.get('question_id'),
				description: r.get('question_desc')
			}, i,j, has=r.raw.hasMany, li,ls,order;
			//Load info
			q.info = {};
			li = has.Question_info;
			for(i=0;i<li.length;i++){
				q.info[li[i].question_info_prop] = li[i].question_info_value;
			}
			
			//Load item & solution
			li = has.Question_item;
			//Question support only one solution
			ls = has.Qsolution?has.Qsolution[0].hasMany.Qsolution_component:0;
			var lsmap={},fid,vlist,flist;
			if (ls) {
				for (i in ls)
					lsmap[ls[i].curr_item_id] = i;
			}
			q.item = [];
			for(i in li){
				fid = ls?ls[lsmap[li[i].item_id]].fill_element_id:-1;
				vlist=[];
				flist = li[i].hasMany.Fillable_element;
				for(j in flist){
					var v=flist[j].fillable_element_answer;
					if (fid==flist[j].fillable_element_id)
						vlist.push('@'+v);
					else
						vlist.push(v);
				}
				if (!ls && vlist.length==1)
					vlist=[];
				order = parseInt(li[i].item_order);
				q.item[order] = {
					id: li[i].item_id,
					face: li[i].item_desc,
					value: vlist.join('/')
				};
			}
			//Load Takersolution
			var sol = has.Taker_solution;
			if (sol && sol.length){
				sol = sol[0];
				for(i in sol.items){
					q.item[i].answer = sol.items[i].fill_value;
				}
			}
			return Ext.apply(q,this);
		},
		syncItem: function(){
			var q=this,ls,i,j,id,t,newit=0;
			
			ls = q.description.match(/([^\\]|^)\{\w+}/gi);
			//Bỏ ký tự đầu tiên (nếu có)
			for(i=0;i<ls.length;i++){
				if(ls[i][1]=='{')
					ls[i] = ls[i].substr(1);
			}
			//Bỏ qua các vị trí có id bị trùng
			for(i=0;i<ls.length;i++){
				if (ls.indexOf(ls[i]) < i)
					ls.splice(i--,1);
			}
			for(i=0;i<ls.length;i++){
				id = ls[i].match(/\w+/i)[0];
				newit = 0;
				if (!q.item[i]){
					newit=1;
				}else if (q.item[i].id!=id){
					//q.item phia sau co item nao trung id voi ls.item?
					for(j=i+1;j<q.item.length;j++){
						if (q.item[j].id==id){
							t=q.item[i];q.item[i]=q.item[j];q.item[j]=t;
							break;
						}
					}
					if (j==q.item.length){
						//ls.item phia sau co item nao trung id voi q.item?
						for(j=i+1;j<ls.length;j++){
							if (q.item[i].id==ls[j].match(/\w+/i)[0]){
								newit=1;
								break;
							}
						}
						if (j==ls.length){
							q.item[i].id = id;
						}
					}
				}
				if (newit){
					newit = {
						id: id,
						face: '',
						value: ''
					};
					q.item.splice(i,0,newit);
				}
			}
			while (i<q.item.length){
				q.item.splice(i,1);
			}
		},
		getSolution: function(){
			var s=[], i, q=this;
			for(i in q.item){
				s.push({
					fill_value: q.item[i].answer
				});
			}
			return s;
		},
		render: function(q, parent,review){
			 q = q || this;
			var comp = parent || Ext.create('Ext.container.Container'),
				i,j,it,input,val,desc=q.description,id, v, s, ev,
				ctrl = VX.getC('Question');
			q.syncItem();
            q._review = review;
			comp.question = q;
			comp.fillTip = comp.fillTip || [];
			comp.addFillTipCmp = comp.addFillTipCmp || function(){
				var me=this,i,it,q=me.question,tip;
				for (i in q.item){
					it = q.item[i];
					if (!it.face) continue;
					tip = it.face.replace(/<[^>]+>/g,'');
					if (!tip && !it.face.match(/img/i)) continue;
					me.fillTip.push(Ext.create('Ext.tip.ToolTip', {
					    target: me.id+'-fill-item-input-'+it.id,
					    html: it.face
					}));
				}
			};
			ctrl.qFillCache[q.id] = q;

			while(comp.fillTip.length){
				comp.fillTip[0].destroy();
				comp.fillTip.splice(0,1);
			}
			for (i in q.item){
				it = q.item[i];
				val = it.value.split('/');
				ev = " onchange=\"VX.getC('Question').qFillChange("+q.id+",this,"+i+")\"";
				id = ' id="'+comp.id+'-fill-item-input-'+it.id+'" ';
				if (val.length==1){
					val = val[0].substr(1);
					if (review)
						s = ' value="'+val.replace(/\\"/g, "'")+'"';
					else if (it.answer!=undefined)
						s = ' value="'+it.answer.replace(/\\"/g, "'")+'"';
					else
						s = '';
					input = '<input'+id+'size=10 type="text" ' +s+ev+
						'class="x-form-field x-form-text" autocomplete="off">';
				}else{
					input = '<select'+id+ev+' class="x-form-field x-form-text">'+
						'<option value="">------</option>';
					for(j in val){
                        v = val[j];
                        s='';
                        if (v[0]=='@'){
                            v = v.substr(1);
                            if (review)
                                s = ' selected';
                        }
						if (it.answer==v)
							s = ' selected';
                        input += '<option value="'+v.replace(/\\"/g, "'")+'" '+
							s+'>'+v+'</option>';
					}
					input += '</select>';
				}
				desc = desc
					.replace('\\{'+it.id+'}', ':?:vxfillhole:?:')
					.replace('{'+it.id+'}', input)
					.replace(':?:vxfillhole:?:','\\{'+it.id+'}');
			}
			comp.add({
				xtype: 'container',
                itemId: 'question-fill-content',
				html: desc,
				listeners:{
					afterrender: function(){
						comp.addFillTipCmp();
					}
				}
			});
			return comp;
		}
	},
	qChoice:{
		create: function(){
			return Ext.apply({
				type: 'Choice',
				id: 0,
				description: '<p>Thiết bị nào là thiết bị ngoại vi</p>',
				item:[{
					id: 1,
					face: '<p>Bàn phím</p>',
					choice: true
				},{
					id: 2,
					face: '<p>RAM</p>'
				},{
					id: 4,
					face: '<p>Đĩa cứng</p>'
				},{
					id: 5,
					face: '<p>Màn hình</p>',
					choice: true
				}],
				info:{
					name: 'Ví dụ câu hỏi chọn',
					tags: 'cơ bản; ví dụ; chọn',
					multichoice: 1,
					random: 1
				}
			},this);
		},
		clone: function(q){
			var i;
			q = Ext.clone(q || this);
			q.solution = {};
			for (i in q.item){
				q.item[i].id = i;
				if (q.item[i].choice)
					q.solution[q.item[i].id] = 1;
				q.item[i].choice = 0;
			}
			delete q._map;
			delete q._change;
			delete q._preview;
			return q;
		},
		rand: function(q){
			q = q || this;
			if (!q.info || !q.info.random)
				return q;
			VX.shuffle(q.item);
			return q;
		},
		verify: function(q){
			var i,o,s=q.solution;
			for(i in q.item){
				o = q.item[i];
				if ((o.choice && !s[o.id])|| (!o.choice && s[o.id]))
					return 0;
			}
			return 1;
		},
		fromRecord: function(r){
			var q={
				type: 'Choice',
				id: r.get('question_id'),
				description: r.get('question_desc')
			}, i,j, has=r.raw.hasMany, li,ls,it;
			//Load info
			q.info = {};
			li = has.Question_info;
			for(i=0;i<li.length;i++){
				q.info[li[i].question_info_prop] = li[i].question_info_value;
			}
			//Load item
			q.item = [];
			li = has.Question_item;
			//Question support only one solution with one/many choice
			ls = has.Qsolution? Ext.clone(has.Qsolution[0].hasMany.Qsolution_component) : 0;
			for(i=0;i<li.length;i++){
				it = {
					id: li[i].item_id,
					face: li[i].item_desc,
					choice: 0
				};
				if (ls) {
					for (j in ls) {
						if (ls[j].curr_item_id == it.id) {
							it.choice = 1;
							ls.splice(j, 1);
							break;
						}
					}
				}
				q.item.push(it);
			}
			return Ext.apply(q,this);
		},
		getSolution: function(){
			var s=[], i, q=this,it;
			for(i in q.item){
				it=q.item[i];
				if (it.choice){
					s.push({
						curr_item_id: it.id
					});
				}
			}
			return s;
		},
		render: function(q,parent,review){
			q = q || this;
			var comp = parent || Ext.create('Ext.container.Container'),
				mc = (q.info && q.info.multichoice==1) ? 1 : 0,
				con = Ext.create('Ext.container.Container',{
					cls: 'question-choice-item-list'
				}), it,i;
            comp.add({
				xtype: 'container',
				html: q.description,
				margin: '0 0 5px 0'
			});
			for(i in q.item){
				it = Ext.create('VX.view.question.choice.ItemView');
				it.updateItem(mc, q.item[i], review);
				it.question = q;
				con.add(it);
			}
			comp.add(con);
			comp.question = q;
			return comp;
		}
	},
	qMatch:{
		create: function(){
			return Ext.apply({
				type: 'Match',
				id: 0,
				description: 'Liên kết thiết bị và chức năng',
				group:[{
					item:[{
						id: 1,
						face: '<p>Màn hình</p>'
					},{
						id: 2,
						face: '<p>Bàn phím</p>'
					},{
						id: 3,
						face: '<p>Đĩa cứng</p>'
					},{
						id: 4,
						face: '<p>RAM</p>'
					}],
					solution:[{
						curr_id: 1,
						next_id: 7
					},{
						curr_id: 2,
						next_id: 8
					},{
						curr_id: 3,
						next_id: 6
					},{
						curr_id: 4,
						next_id: 5
					}]
				},{
					item:[{
						id: 5,
						face: '<p>Bộ nhớ để xử lý</p>'
					},{
						id: 6,
						face: '<p>Lưu trữ thông tin</p>'
					},{
						id: 7,
						face: '<p>Hiển thị</p>'
					},{
						id: 8,
						face: '<p>Nhập dữ liệu</p>'
					}],
					solution:[]
				}],
				info: {
					name: 'Ví dụ câu hỏi liên kết',
					tags: 'cơ bản; ví dụ; liên kết',
					multimatch: 0,
					random: 1
				}
			},this);
		},
		clone: function(q){
			var ctrl = VX.getC('Question');
			q = Ext.clone(q || this);
			ctrl.qMatch.convertLink2Solution(q);
			delete q._map;
			delete q._change;
			delete q._preview;
			return q;
		},
		rand: function(q){
			q = q || this;
			if (!q.info || !q.info.random)
				return q;
			for(var i in q.group)
				VX.shuffle(q.group[i].item);
			return q;
		},
		verify: function(q){
			var g,i,j,c,n,s;
			for(i=1;i<q.group.length;i++){
				g = q.group[i-1];
				if (g.solution.length != g._link.length)
					return 0;
				s = {};n=0;
				for(j in g.solution){
					s[g.solution[j].curr_id+'.'+g.solution[j].next_id] = 1;
					n++;
				}
				for(j in g._link){
					c = g._link[j].curr_id+'.'+g._link[j].next_id;
					if (s[c]!=1) return 0;
					n--;
				}
				if (n) return 0;
			}
			return 1;
		},
		fromRecord: function(r){
			var q={
				type: 'Match',
				id: r.get('question_id'),
				description: r.get('question_desc')
			}, i, has=r.raw.hasMany, li,ls,lg,map,gid,iid;
			//Load info
			q.info = {};
			li = has.Question_info;
			for(i=0;i<li.length;i++){
				q.info[li[i].question_info_prop] = li[i].question_info_value;
			}
			//Load group
			li = has.Question_item;
			lg = {};
			map = {};
			//Các group phân biệt thông qua item_code
			for(i in li){
				gid = li[i].item_code;
				iid = li[i].item_order;
				if (lg[gid]==undefined)
					lg[gid] = {item:{},solution:[]};
				lg[gid].item[iid]={
					id: li[i].item_id,
					face: li[i].item_desc
				};
				map[li[i].item_id] = gid;
			}
			//Load solution, support only one solution
			if (has.Qsolution) {
				ls = has.Qsolution[0].hasMany.Qsolution_component;
				for (i in ls) {
					gid = map[ls[i].curr_item_id];
					lg[gid].solution.push({
						curr_id: ls[i].curr_item_id,
						next_id: ls[i].next_item_id
					});
				}
			}
			for(i in lg){
				lg[i].item = Ext.Object.getValues(lg[i].item);
			}
			q.group = Ext.Object.getValues(lg);
			
			return Ext.apply(q,this);
		},
		convertSolution2Link: function(q){
			for(var i in q.group){
				q.group[i]._link = Ext.clone(q.group[i].solution); 
			}
		},
		getSolution: function(){
			var s=[], i, j,q=this,a;
			for(i in q.group){
				for(j in q.group[i]._link){
					a = q.group[i]._link[j];
					s.push({
						curr_item_id: a.curr_id,
						next_item_id: a.next_id
					});
				}
			}
			return s;
		},
		convertLink2Solution: function(q){
			var g,gn,i,j,c,n,lk;
			for(i=0;i<q.group.length;i++){
				g = q.group[i];gn = q.group[i+1];
				g.solution = [];
				for (j=0;j<g.item.length;j++){
					g.item[j].id = i*1000 + j + 1;
					delete g.item[j]._id;
				}
				if (g._link){
					for (j=0;j<g._link.length;j++){
						lk = g._link[j];
						c = i*1000 + parseInt(g._map[lk._id1]) + 1;
						n = (i+1)*1000 + parseInt(gn._map[lk._id2]) + 1;
						g.solution.push({
							curr_id: c,
							next_id: n
						});
					}
				}
				delete g._link;
				delete g._map;
				delete g._id;
			}
		},
		render: function(q,parent,review){
			q = q || this;
			var comp = parent || Ext.create('Ext.container.Container');
            if (review)
                q.convertSolution2Link(q);
			comp.add({
				xtype: 'container',
				html: q.description
			});
			comp.add({
				xtype: 'container',
				width: '100%',
				overflowX: 'auto',
				items:[{
					testing: 1,
					xtype: 'match-item-panel'
				}]
			});
			comp.down('match-item-panel').loadQuestion(q);
			//try{
			//	comp.el.dom.style.height = comp.getHeight()+'px';
			//}catch(e){}
			comp.question = q;
			return comp;
		}
	},
	qOrder:{
		create: function(){
			return Ext.apply({
				type: 'Order',
				id: 0,
				description: '<p>Thay đổi thứ tự độ phức tạp từ tốt nhất đến xấu</p>',
				item:[{
					id: 1,
					face: '<p>O(1)</p>'
				},{
					id: 2,
					face: '<p>O(n)</p>'
				},{
					id: 4,
					face: '<p>O(n<sup>2</sup>)</p>'
				},{
					id: 5,
					face: '<p>O(2<sup>n</sup>)</p>'
				}],
				info:{
					name: 'Thứ tự tốt xấu của độ phức tạp',
					tags: 'cơ bản; ví dụ; thứ tự'
				}
			},this);
		},
		clone: function(q){
			var i;
			q = Ext.clone(q || this);
			for (i in q.item){
				q.item[i].id = i;
			}
			delete q._map;
			delete q._change;
			delete q._preview;
			return q;
		},
		rand: function(q){
			q = q || this;
			VX.shuffle(q.item);
			return q;
		},
		verify: function(q){
			for(var i in q.item)
				if (q.item[i].id != i)
					return 0;
			return 1;
		},
		fromRecord: function(r){
			var q={
				type: 'Order',
				id: r.get('question_id'),
				description: r.get('question_desc')
			}, i,j, has=r.raw.hasMany, li,ls,lsmap={};
			//Load info
			q.info = {};
			li = has.Question_info;
			for(i=0;i<li.length;i++){
				q.info[li[i].question_info_prop] = li[i].question_info_value;
			}
			
			//Load item & solution
			//Giá trị solution_order quyết định thứ tự item, thuộc 0,1,2,...
			li = Ext.clone(has.Question_item);
			//Question support only one solution
			ls = has.Qsolution?has.Qsolution[0].hasMany.Qsolution_component:0;
			q.item = [];
			if (ls){
				for(i in ls) {
					lsmap[ls[i].item_order] = ls[i].curr_item_id;
				}
			}else{
				for(i in li) {
					lsmap[li[i].item_order] = li[i].item_id;
				}
			}
			for(i in lsmap){
				for(j in li) {
					if (li[j].item_id == lsmap[i]) {
						q.item[i] = {
							id: li[j].item_id,
							face: li[j].item_desc
						};
						li.splice(j, 1);
						break;
					}
				}
			}

			return Ext.apply(q,this);
		},
		getSolution: function(){
			var s=[], i, q=this,it;
			for(i in q.item){
				it=q.item[i];
				s.push({
					curr_item_id: it.id
				});
			}
			return s;
		},
		render: function(q,parent,review,exam){
			q = q || this;
			var comp = parent || Ext.create('Ext.container.Container');
            q._review = review;
			comp.add({
				xtype: 'container',
				html: q.description
			});
			comp.add({
				xtype: 'question-order-column',
				testing: 1
			});
			comp.down('question-order-column').loadQuestion(q);
			comp.question = q;
			return comp;
		}
	},
	
	saveQuestion: function(dlg,q){
		Ext.ux.showMask();
		try{
			var me = this, info = dlg.parentInfo;
			me.dlg = dlg;
			if (!q.id){
				q.course_id = info.course_id ? info.course_id : null;
				q.course_content_id = info.course_content_id ? info.course_content_id : null;
			}

			me.store.rpc({
				action: q.id ? 'update':'create',
				params: q.clone(),
				scope: me,
				callback: me.onSaveResponsed
			});
		}catch(e){
			Ext.ux.hideMask();
			Ext.ux.error(e,'VX.controller.Question::saveQuestion');
		}
	},
	onSaveResponsed: function(me,res){
		try{
			if (!res.success)
				throw res.error || res.message;
			me.store.load();
			me.dlg.hide();
		}catch(e){
			Ext.ux.error(e,'VX.controller.Question::onSaveResponsed');
		}
		Ext.ux.hideMask();
	},
	fromRecord: function(r){
		if (!r.isModel)
			r = Ext.create('VX.model.Question',r);
		var t = VX.qtype[r.get('question_type_id')],q;
		if (!t)
			Ext.ux.error("VX.controller.Question: Không hỗ trợ kiểu câu hỏi "+
				r.get('question_type_id'));
		else
			q=this['q'+t].fromRecord(r);
		q.bloom_level_id = r.get('bloom_level_id');
		q.course_id = r.get('course_id');
		q.course_content_id = r.get('course_content_id');
		return q;
	},
	share: function(win,rq){
		Ext.ux.showMask();
		try{
			var me=this;
			me.dlgShare = win;
			Ext.ux.rpc({
				action: 'Question',
				method: 'share',
				params: rq,
				scope: me,
				callback: me.onShareResponsed
			});
		}catch(e){
			Ext.ux.hideMask();
			Ext.ux.error(e,'VX.controller.Question::share');
		}
	},
	onShareResponsed: function(res){
		try{
			if (!res.success)
				throw res.error || res.message;
			this.dlgShare.hide();
			Ext.ux.hideMask();
		}catch(e){
			Ext.ux.hideMask();
			Ext.ux.error(e,'VX.controller.Question::onShareResponsed');
		}
	}
});