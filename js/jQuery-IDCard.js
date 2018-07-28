(function($){
	var fun=(function(){
		function fun(dom,opts){
			
			this.setOptions(opts);
			this.returnInfo();
		}
		fun.prototype.setOptions=function(opts){
			if (opts == null) {
				opts = null;
			}
			this.options = $.extend({}, this.options, opts);
			return this;
		}
        fun.prototype.options={
			idCardNo:'123',
			birthday:'',
			sex:'',
			area:'',
			age:0
		};
		fun.prototype.returnInfo=function(){
			
			this.getArea();
			this.getBirthday();
			this.getSex();
			this.getAge();
		}
		fun.prototype.getArea=function(){
			var opt=this.options;
			opt.area=opt.idCardNo.substring(0,6);
			var idCardConfig=eval('IDCardConfig');
			opt.area=idCardConfig['area'][opt.area];
		}
		fun.prototype.getBirthday=function(){
			var opt=this.options;
			var str=opt.idCardNo.substring(6,opt.idCardNo.length);
			str=str.substring(0,8);
			var year=str.substring(0,4);
			var month=str.substring(4,6);
			var day=str.substring(6,str.length);
			opt.birthday=year+"-"+month+"-"+day;
		}
		fun.prototype.getAge=function(){
			var opt=this.options;
			var r=opt.birthday.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);     
			if(r==null){
				opt.age=0; 
			}				
			var d=new Date(r[1],r[3]-1,r[4]);     
			if(d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4])   
			{   
				  var Y=new Date().getFullYear();   
				  opt.age=Y-r[1];
			}
			else{
				opt.age=0;
			}  
		}
		fun.prototype.getSex=function(){
			var opt=this.options;
			var str=opt.idCardNo.substring(opt.idCardNo.length-2,opt.idCardNo.length-1);
			if(parseInt(str)%2==1){
				opt.sex='男';
			}
			else{
				opt.sex='女';
			}
		}
     return fun;
	})();
	$.fn.fun=function(opts){
		var $this = $(this),
			data = $this.data();

		if (data.fun) {
			delete data.fun;
		}
		if (opts !== false) {
			data.fun = new fun($this, opts);
		}
		return data.fun;
	}
})(window.jQuery)