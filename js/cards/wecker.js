function wecker(){
	this.headline = getmsg('wecker');
	this.content = '<form action="" method="" id="jsalarmclock"><div class="leftcolumn">'+getmsg('set_alarm')+':</div> <span><select></select>H.</span> <span><select></select>Min.</span> <span><select></select>Sec.</span><div class="leftcolumn">'+getmsg("page_to_launch")+'</div> <input type="text" id="musicloc" value="http://www.youtube.com/watch?v=XsMFkegNUAA" /> <span><div class="achtung"> '+getmsg("wecker_warning")+'</div></span><div class="buttons"><a href="#" class="icon-checkmark" id="setalarm"> '+getmsg('set_alarm')+' </a><a href="#" id="resetalarm" class="icon-close avgrund-close"> Reset </a></div></form>';
	this.showsettings = false;
	this.permission = '';
	this.origin = '';
	this.init = function(){
		jsalarm.init();		
	}
}
jsalarm={
	padfield:function(f){
		return (f<10)? "0"+f : f
	},
	showcurrenttime:function(){
		if (typeof this.hourwake!="undefined"){ //if alarm is set
			if ($('#date').html()==(this.hourwake+":"+this.minutewake+":"+this.secondwake)){
				clearInterval(jsalarm.timer);
				window.location=document.getElementById("musicloc").value;
			}
		}
	},
	init:function(){
		var dateobj=new Date();
		this.submitref=document.getElementById("setalarm");
		this.submitref.onclick=function(){
			jsalarm.setalarm();
			$(this).html("Alarm Set");
			this.disabled=true;
			return false;
		}
		this.resetref=document.getElementById("resetalarm");
		this.resetref.onclick=function(){
		jsalarm.submitref.disabled=false;
		jsalarm.hourwake=undefined;
		jsalarm.hourselect.disabled=false;
		jsalarm.minuteselect.disabled=false;
		jsalarm.secondselect.disabled=false;
		return false;
		}
		var selections=document.getElementsByTagName("select");
		this.hourselect=selections[0];
		this.minuteselect=selections[1];
		this.secondselect=selections[2];
		for (var i=0; i<60; i++){
			if (i<24) //If still within range of hours field: 0-23
			this.hourselect[i]=new Option(this.padfield(i), this.padfield(i), false, dateobj.getHours()==i);
			this.minuteselect[i]=new Option(this.padfield(i), this.padfield(i), false, dateobj.getMinutes()==i);
			this.secondselect[i]=new Option(this.padfield(i), this.padfield(i), false, dateobj.getSeconds()==i);
		}
		jsalarm.showcurrenttime();
		jsalarm.timer=setInterval(function(){jsalarm.showcurrenttime()}, 1000);
	},
	setalarm:function(){
		this.hourwake=this.hourselect.options[this.hourselect.selectedIndex].value
		this.minutewake=this.minuteselect.options[this.minuteselect.selectedIndex].value
		this.secondwake=this.secondselect.options[this.secondselect.selectedIndex].value
		this.hourselect.disabled=true
		this.minuteselect.disabled=true
		this.secondselect.disabled=true
	}
}