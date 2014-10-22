function apps(){
	this.headline = 'Apps';
	this.content = '';
	this.showsettings = false;
	this.permission = 'management';
	this.origin = '';
	this.init = function(){
		chrome.management.getAll(function(data){
			for (i=1;i<=data.length-1;i++){
				if (data[i].type == 'hosted_app'){
					$('#apps .content').append("<li><a href='"+data[i].appLaunchUrl+"'><img width='16' src='"+data[i].icons[0].url+"'/>"+data[i].name+"</a></li>");		
				}	
			}
		});
	}
}