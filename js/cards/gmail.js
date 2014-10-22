function gmail(){
	this.headline = 'GMail '+getmsg("unread");
	this.content = '<a href="https://mail.google.com" class="unread_gmail">'+getmsg("laden")+'</a>';
	this.showsettings = false;
	this.permission = '';
	this.origin = 'https://mail.google.com/mail';
	this.init = function(){
		$.get("https://mail.google.com/mail/feed/atom", function(XMLmediaArray){
			$(XMLmediaArray).find("fullcount").each(function(){	
				$('#gmail .content .unread_gmail').html($(this).text()).addClass('maincolor');
				$('#gmail .content .unread_gmail').addClass('notifthere');
			});
			$(XMLmediaArray).find("entry").each(function(){
				$('#gmail .content').append('<li><a href="'+$(this).find("link").attr("href")+'">'+$(this).find("title").text()+'</a></li>');
			});
		}).fail(function() {
			$("#gmail .content .unread_gmail").html(getmsg("gmailerror"));
		});	
	}
}