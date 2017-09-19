$KI.timer = {
	
		timerinfo : {},	
		
		callbackclosure : function(id) {
			var tid = id;
			return function() {
				var cb = $KI.timer.timerinfo[tid]["cb"];
				typeof cb == "function" && cb();
			};	
			
		},
			
		schedule: function(id, cb, interval, repeat) {
			var tinfo = $KI.timer.timerinfo;

			if(id && !tinfo[id]) {	
				tinfo[id] = {};
				tinfo[id]["cb"] = cb;
				tinfo[id]["repeat"] = repeat;

				var tcb = $KI.timer.callbackclosure(id);
				var frequency = interval*1000;  //value is in seconds.Converting to milliseconds
				var func = (repeat === true) ? "setInterval" : "setTimeout";
				
				timerid = window[func](tcb, frequency);
				tinfo[id]["timerid"] =  timerid;
			}
			else
				console.error("timerId is mandatory or duplicate timer id");

		},
		
		cancel: function(id) {
		  		var tinfo = $KI.timer.timerinfo;
				if(tinfo[id]){
					var timerid = tinfo[id].timerid;
					var func = (tinfo[id]["repeat"]  === true) ? "clearInterval" : "clearTimeout";
					window[func](timerid);
					tinfo[id] = null
				}
				else {
					console.error("timerId is mandatory");
					return null;
				}		
		},
		
		setcallback: function(id, cb) {
			var tinfo = $KI.timer.timerinfo;
			if(tinfo[id]) {
				tinfo[id].cb = cb;
			}
		}
};

$KI.appevents = (function() {
	
	var idletimeout = {id:null, value:0, cb:null, enabled:false, expired: false, lastInteraction: 0};
		
	return {			

		timercb: function(){
			var currentform = $KW.Form.getCurrentForm();
			var cb = null;
			
			if($KU.BB7 || $KU.BB6){
				idletimeout.count++;				
				if(idletimeout.count === idletimeout.value){
					clearInterval(idletimeout.id);
					idletimeout.expired = true;
					idletimeout.enabled = false;			
					if (currentform.enabledforidletimeout) {
						//idletimeout.cb && idletimeout.cb(currentform);
						//idletimeout.cb = null;
						if(idletimeout.cb){
							cb = idletimeout.cb;
							idletimeout.cb = null;
							cb(currentform);						
						}
						idletimeout.count = 0;
					}
				}
			}
			else{
				idletimeout.expired = true;
				idletimeout.enabled = false;			

				if (currentform.enabledforidletimeout) {
					//idletimeout.cb && idletimeout.cb(currentform);
					//idletimeout.cb = null;
					if(idletimeout.cb){
						cb = idletimeout.cb;
						idletimeout.cb = null;
						cb(currentform);						
					}
				}
			}
		},
		
		registerforidletimeout: function(time, cb){
			if (!idletimeout.enabled) {
				//kony.print("registerforidletimeout: " + time);
				if($KU.BB7 || $KU.BB6){
					idletimeout.count = 0;
					idletimeout.value = time * 60;
					idletimeout.id = setInterval($KI.appevents.timercb, 1000);
				}
				else{
					idletimeout.value = time * 60 * 1000;
					idletimeout.id = setTimeout($KI.appevents.timercb, idletimeout.value);
					idletimeout.lastInteraction = new Date().getTime();
				}
				idletimeout.enabled = true;
				idletimeout.expired = false;
				idletimeout.cb = cb;
				$KG["__idletimeout"] = idletimeout;
			}
		},
		
		unregisterforidletimeout: function() {
			if($KU.BB7 || $KU.BB6)
				clearInterval(idletimeout.id);			
			else
				clearTimeout(idletimeout.id);
			idletimeout.enabled = false;
			$KG["__idletimeout"] = "";
		},
		
		resettimer: function() {
			//kony.print("resettimer: " + idletimeout.value);
			if($KU.BB7 || $KU.BB6){
				idletimeout.count = 0;
			}
			else{			
				var curTime = new Date().getTime();
				if( (curTime - idletimeout.lastInteraction)  >= idletimeout.value ){
					$KI.appevents.timercb();
					return;
				}else{
					clearTimeout(idletimeout.id);
					idletimeout.id = setTimeout($KI.appevents.timercb, idletimeout.value);
					idletimeout.lastInteraction = curTime;
				}
			}
		}
	}
})();
