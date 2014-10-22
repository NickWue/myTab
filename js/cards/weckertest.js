function weckertest(){
	this.headline = getmsg('wecker');
	this.content = '';
	this.showsettings = true;
	this.permission = '';
	this.init = function(){	
		if (typeof(localStorage['wecker']) == 'undefined') localStorage['wecker'] = 'null';
		alarmobj = new jsalarm2();
		alarmobj.init();		
	}
	this.settings = function(){
		return '<form action="" method="" id="jsalarmclock"><div class="leftcolumn">'+getmsg('set_alarm')+':</div> <span><select></select>H.</span> <span><select></select>Min.</span> <span><select></select>Sec.</span></form>';
	}
}
function jsalarm2(){
	this.init = function(){
		weckers = (localStorage['wecker'] == 'null'?'':localStorage['wecker'].split(';'));
		weckerinter = setInterval(function(){alarmobj.checkalarm()}, 1000);
		for (i=0;i<=weckers.length-1;i++){
			$('#weckertest').append('<li>'+weckers[i]+'</li>');
		}
	}
	this.checkalarm = function(){
		
	}
}