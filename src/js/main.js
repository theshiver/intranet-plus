// CREDITS
// can, uraz, burak g.

function getAccessInfo(aiurl, target) {
	target.load(aiurl + ' table table', function(response) {
		target.parent().removeClass('loading');
	});
}

function setActive(){
	if ($("img[src='images/img_active.png']").length === 0) {
		$("img[src='images/img_inactive.png']").eq(0).parent().click(function(){
		window.location.href = $("img[src='images/img_inactive.png']").eq(0).parent().attr("href")
		}).trigger("click");
	}
	else {}
}

function get_contents(){
	var url = 'http://10.0.2.1/rss.asp';
	var rssCount;

	$.ajax({
		type: "GET",
		url: url,
		cache: "false",
		ifModified: "true",
		data: 'userid='+arguments[0],
		dataType: "xml",
		success: function(xml){
			var titleUser = $(xml).find('channel').find('description:first').text();
			$("#welcome").html(titleUser);
			$(xml).find('item').each(function(){
				var title = $(this).find('title').text();
				var from = $(this).find('author').text();
				var href = '<a target="_blank" href="' + $(this).find('link').text() + '">' +title + '</a>';
				$('#sonuc').append("<li>" + href + "</li>");
			});
			rssCount = $(xml).find('item').length;
			chrome.browserAction.setBadgeText({ text: ""+rssCount+"" });
			if (rssCount == 0) {
				chrome.browserAction.setIcon({path: '../icon_inactive.png'});
				chrome.browserAction.setBadgeBackgroundColor({color: [102,207,102,255]});
				$("#taskStatus").show();
				$("#error").hide();
			}
			else {
				chrome.browserAction.setIcon({path: '../icon.png'});
				chrome.browserAction.setBadgeBackgroundColor({color: [255,0,0,255]});
				$("#taskStatus").hide();
				$("#error").hide();
			}

		},
			error: function(){
				chrome.browserAction.setIcon({path: '../icon_inactive.png'});
				chrome.browserAction.setBadgeBackgroundColor({color: [255,0,0,255]});
				chrome.browserAction.setBadgeText ( { text: "error" } );
				$("#taskStatus").hide();
				$("#error").show();
			}
	});
	
}


function muhtesemScript() {
	
	$.ajax({
		type: "GET",
		url: "http://10.0.2.1/index.asp",
		dataType: "xml",
		success: function(text){
			var getUserID = $(text).find('link[rel="alternate"]').attr("href").split('=')[1];
			$("#myID").html(getUserID).hide();
		
			var userID = $("#myID").text();
			get_contents(userID);
			
			
		}
	});
	

}


$(document).ready(function() {
	
	$("div:first table:first tr td:first").width("50%").next().width("50%");
	$("#dhtmltooltip").css({
		"visibility": "visible",
		"width": "48.3%",
		"background":"transparent"
	});

	$("#dhtmltooltip").append('<iframe allowTransparency="true" id="taskViewer" name="taskViewer" src="" width="100%" height="663" border="0" style="border:none;"></iframe>')


	$("#frm_priority table table a").each(function(){
	 	var _self  = $(this);
	 	var output = _self.attr("href").slice(18, -11);
	 	//_self.attr("href", output);
	 	_self.click(function(){
	 		$(".copyLink").text("http://10.0.2.1/" + output);
	 		console.log("http://10.0.2.1/" + output);
	 	})
	});
	
	$('td a').each(function() {
		var plink = $(this).attr('href');
		if(plink.indexOf('project_page.asp') != -1) {
			$(this).addClass('plink');
			var plinkparts = plink.split('?')[1].replace('project_id', 'pid').replace('client_id', 'cid').split('&');
			$('<div class="aicont"><a class="ailink" href="access_info.asp?'+plinkparts[1] + '&' + plinkparts[0]+'"> > </a><div class="bl"></div></div>').insertBefore($(this));
		}
	});
	
	$('.ailink').bind('click', function() {
		getAccessInfo(this.href, $(this).next());
		if(!$(this).parent().hasClass('opened')) {
			$(".opened").removeClass("opened");
			$(this).parent().addClass('opened');
			$(this).parent().addClass('loading');
		}
		else {
			$(".opened").removeClass("opened");
			$(this).parent().removeClass('opened');
			$(this).parent().removeClass('loading');
			$(this).next().html('');
		}
		return false;
	});
	
	$(document).bind('click', function() {
		$('.opened > a').click();
	});
	
	$('.aicont').bind('click', function(e) {
		e.stopPropagation();
	});
	
	

	var hours = new Date().getHours()
	var minutes =  new Date().getMinutes()
	if (hours<10){hours="0" + hours}
	if (minutes<10){minutes="0" + minutes}
	var siteTime = hours+ "" +minutes
	if(siteTime>=1210 && siteTime<=1300){
		console.log("Active Control Disabled - Time: " + siteTime);
	}
	else{
		setActive();
		console.log("Active Control Enabled - Time: " + siteTime);
	}



	$("body").append('<script type="text/javascript">function popup(arg){$("#dhtmltooltip #taskViewer").attr("src", arg)}</script>')
	$("#dhtmltooltip").before('<div style="padding:5px; color:green;" class="copyLink"></div>');

	setInterval(function(){
		$("#frm_priority").load("overview.asp #frm_priority", function() {
			$('td a').each(function() {
				var plink = $(this).attr('href');
				if(plink.indexOf('project_page.asp') != -1) {
					$(this).addClass('plink');
					var plinkparts = plink.split('?')[1].replace('project_id', 'pid').replace('client_id', 'cid').split('&');
					$('<div class="aicont"><a class="ailink" href="access_info.asp?'+plinkparts[1] + '&' + plinkparts[0]+'"> > </a><div class="bl"></div></div>').insertBefore($(this));
				}
			});
			$('.ailink').bind('click', function() {
				getAccessInfo(this.href, $(this).next());
				if(!$(this).parent().hasClass('opened')) {
					$(".opened").removeClass("opened");
					$(this).parent().addClass('opened');
					$(this).parent().addClass('loading');
				}
				else {
					$(".opened").removeClass("opened");
					$(this).parent().removeClass('opened');
					$(this).parent().removeClass('loading');
					$(this).next().html('');
				}
				return false;
			});
			
			$(document).bind('click', function() {
				$('.opened > a').click();
			});
		});
	}, 30000);

	//$("#taskViewer").contents().find("head").append('<style>textarea, input {width:100%}</style>');
});