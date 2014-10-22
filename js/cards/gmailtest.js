function gmailtest(){
	this.headline = 'GMail '+getmsg("unread");
	this.content = '<a href="https://mail.google.com" class="unread_gmail">'+getmsg("laden")+'</a><h2 class="mail-title"> . </h2><ul> </ul>';
	this.showsettings = false;
	this.init = function(){
		$.get("https://mail.google.com/mail/feed/atom", function(XMLmediaArray){
			$(XMLmediaArray).find("title").each(function(){	
				$('#gmail .content h2.mail-title').html($(this).text());
			});
			$(XMLmediaArray).find("fullcount").each(function(){	
				$('#gmail .content .unread_gmail').html($(this).text()).addClass('maincolor');
				$('#gmail .content .unread_gmail').addClass('notifthere');
			});
			$(XMLmediaArray).find("entry").each(function(){
				$('#gmail .content ul').append('<li><a href="#">'+$(this).find("title").text()+'</a></li>');
			});
			
		}).fail(function() {
			$("#gmail .content .unread_gmail").html(getmsg("gmailerror"));
		});	
	}
}