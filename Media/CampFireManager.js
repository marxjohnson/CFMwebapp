/* CampfireManager (Web)App Javascript */
/* Written by Jack Wearden for CampfireManager V2 */
/* Code released as open source under GNU AGPL v3 */

/* Don't blame me if this code takes your cake!!! */

// function initCFM is executed upon the page loading.
// Called by: All page loads (1st time, *not* Jquerymobile page loads as these manipulate the DOM) 
// Purpose: Checks that CFM has been 'set up' - IE a base URL has been registered
function initCFM() {
	if (document.getElementById("thegrid")) {
		if (!localStorage.getItem('CFM')) {
			if (!!localStorage.getItem('baseURL')) {
				$.mobile.showPageLoadingMsg();
				window.campfireData = parseJSON($.ajax({
				    type: 'GET',
				    url: localStorage.getItem('baseURL')+"rest/timetable",
				    dataType: 'json',
				    success: function() { },
				    data: {},
				    async: false
				}).responseText);
				localStorage.setItem('CFM',JSON.stringify(campfireData));
				$.mobile.hidePageLoadingMsg();
			} else {
				window.location = "home.html";
			}
		} else {
			window.campfireData = parseJSON(localStorage.getItem('CFM'));
		}			
		var listdata = "";	
		$.mobile.showPageLoadingMsg();
		$.each(window.campfireData.Collection_Timetable[0].arrTimetable, function (key, session) {
			listdata+='<li data-role="list-divider">';
			listdata+=eval("campfireData.Collection_Timetable[0].arrSlots."+key+".timeStart");
			listdata+=' - ';
			listdata+=eval("campfireData.Collection_Timetable[0].arrSlots."+key+".timeEnd");
			listdata+='</li>';
			var c = 0;
			$.each(session, function (k, t) {
				if (!(!!t.strTalkTitle)) {
					if (c<1) {
						listdata+='<li data-theme="a"><a href="talk.html">';
						listdata+='<h3>Empty</h3>';
						listdata+='<p><strong>Click to arrange a talk here!</strong></p>';
						listdata+='<p class="ui-li-aside">'+'</p>';
						listdata+='</a>';
						c++;
					}
				} else {
					listdata+='<li><a href="talk.html">';
					listdata+='<h3>'+t.strTalkTitle+'</h3>';
					listdata+=( (!!t.arrUser) ? '<p><strong>'+t.arrUser.strUserName+'</strong></p>' : "" );
					listdata+='<p>'+t.strTalkSummary+'</p>';
					listdata+='<span class="ui-li-count">'+t.intAttendees+' / '+' Attendees</span>';
					listdata+='<p class="ui-li-aside">'+'</p>';
					listdata+='</a></li>';
				}
			});
		});
		document.getElementById("thegrid").innerHTML=listdata;
		$( "#thegrid" ).listview();
		$.mobile.hidePageLoadingMsg();
	}
}
window.onload=initCFM;


function checkBase() {
	localStorage.baseURL=document.getElementById('baseurl').value;
	window.location="index.html";
}

function parseJSON(json) {
	/** this code adapted from http://www.json.org/js.html **/
	return JSON.parse(json, function (k, v) {
		var type;
		if (v && typeof v === 'object') {
			type = v.type;
			if (typeof type === 'string' && typeof window[type] === 'function') {
				return new (window[type])(v);
			}
		}
		return v;
		});
	/** end of "recycled" code **/
}
// function getGrid pulls the JSON data from the CFM backend
// Called: when the grid has not previously been gotten or when user clicks refresh
