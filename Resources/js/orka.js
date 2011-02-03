(function (window) {
	var Orka = {};

	const RESOURCE_DIR = Titanium.Filesystem.getResourcesDirectory();
	
	const TWIITER_TIMELINE = "http://api.twitter.com/1/statuses/home_timeline.json";
	const TWITTER_STATUS = "http://api.twitter.com/1/statuses/update.json";

	function loadJSON(filename) {
		var file = Titanium.Filesystem.getFile(RESOURCE_DIR, filename);
		
		if (!file.exists()) {
			return null; // file doesn't exist
		}
		
		return JSON.parse(file.read() + "");
	}
	
	
	Orka.config = loadJSON('config.json');
	Orka.oauth = OAuth(Orka.config);
	
	Orka.tweets = [];
	function updateTimeline() {
		var sinceId, data = {};
		
		Orka.tweets[0] && (sinceId = Orka.tweets[0].id);
		
		if (sinceId) {
			data.since_id = sinceId;
		}
	
		Orka.oauth.request({
			method: 'GET',
			url: TWIITER_TIMELINE,
			data: data,
			success: timelineRequestSuccess,
			failure: timelineRequestFailure
		});
	}
	
	function renderTimeline(timeline) {
		var list = document.querySelector('#timeline .list');
		
		timeline.forEach(function(item) {
			list.appendChild(template('tweet')({item: item}));
		});
	}
	
	function sendTimelineNotifications(timeline) {
	}
	
	function timelineRequestSuccess(data) {
		var timeline = JSON.parse(data.text), lastId;
		
		Orka.tweets[0] && (lastId = Orka.tweets[0].id);
		
		if (timeline.length > 0 && timeline[0].id != lastId) {
			renderTimeline(timeline);
		}
		
		setTimeout(updateTimeline, 30000)
	}
	
	function timelineRequestFailure(data) {
		console.log(data);
	}
	
	updateTimeline();
})(this);