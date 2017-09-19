
if (typeof kony == "undefined") {
	kony = {
		api: {},
		app: {},		
		globals: {},
		system: {},
		widgets: {},
        io: {},
		constants: {
			KONY_WIDGET_TYPE: "kwidgettype",
			SELECTED_ITEM: "selecteditem",
			IMAGE_PATH: "images",
			RESOURCES_PATH: "resources",
			TRANSLATION_PATH: "strings",
			TRANSLATION_EXT: "js",
			MODE: "s",
			RUNMODE: "debug",
			APPSTATE: 0
		}		 
	};

    konychannel="wap";      //Global used in appmiddlewareinvokerasync api
    kiden="useragent";      //Global used in appmiddlewareinvokerasync api
	$KI = kony.api;
	$KW = kony.widgets;
    $KG = kony.globals;
    $KIO = kony.io;
	$KG.allforms = {};
    $KG.appbehaviors = {};
    $KG.widgetPositions ={};
    $KG["cwtexists"]=[];
	$KG["retina"] = "";
	$KG["imagecat"] =  "";
    $KG["uniqueId"] = 0; // Incase widgetId not provided in constructor, generate incremental unique id
}
 app= {  
      headers:{},
      footers:{}
} 

$KI.print = kony.print = function(str)
{
    if (kony.constants.RUNMODE == "debug")
    {
        // ?? MODE is never modified
		if (kony.constants.MODE == "s")
		{
			if(typeof JSON != "undefined" && typeof str == "object")
				console.log(JSON.stringify(str,$KU.jsonReplacer));
			else
				console.log(str);
		}
        else
		{
            alert(str);
		}
    }
}

/* console fallback for IE */

if (typeof console === "undefined") 
{
	var alertFallback = false;
	var warnFallback = false;
	var errorFallback = false;
	
	console = {};
	console.log = function(msg) 
	{
		alertFallback && alert(msg);
	};
	console.warn = function(msg) 
	{
		warnFallback && alert(msg);
	};
	console.error = function(msg) 
	{
		errorFallback && alert(msg);
	};
}
kony.appinit = {  
    
	index:0, 	
    JSMapFileCount:0,
	head: document.getElementsByTagName('head')[0],
	foldertype : IndexJL ? "LuaFiles" : "JSFiles",

			vendor: (/webkit/i).test(navigator.userAgent) ? 'webkit' : (/firefox/i).test(navigator.userAgent) ? 'Moz' : 'opera' in window ? 'o' :( (/msie/i).test(navigator.userAgent) ||(/rv:([1][1-9])/i).test(navigator.userAgent) ) ? 'ms' : '',
    isIE: window.navigator.appVersion.match(/MSIE (\d+)/) != null || (/rv:([1][1-9])/i).test(navigator.userAgent),
    isIE7: window.navigator.appVersion.match(/MSIE (\d+)/) != null && RegExp.$1 == "7",
    isIE8: window.navigator.appVersion.match(/MSIE (\d+)/) != null && RegExp.$1 == "8",
	isIE9: window.navigator.appVersion.match(/MSIE (\d+)/) != null && RegExp.$1 == "9",
	isIE10: navigator.userAgent.match(/MSIE (\d+)/) != null && RegExp.$1 == "10",
	isIE11 : (/rv:([1][1-9])/i).test(navigator.userAgent),
    isFirefox: window.navigator.userAgent.indexOf("Firefox") >= 0,
    isChrome: window.navigator.userAgent.indexOf("Chrome") >= 0,
    isSafari: (window.navigator.userAgent.indexOf("Safari") >= 0) && !(window.navigator.userAgent.indexOf("Chrome")>= 0), // Chrome also contains Safari in userAgent
    isOpera: window.navigator.userAgent.indexOf("Opera") >= 0,

    isAndroid: (/android/gi).test(navigator.userAgent),
    isIDevice: (/iphone|ipad/gi).test(navigator.userAgent),
    isiPhone: (/iphone/gi).test(navigator.userAgent),
    isiPod: (/ipod/gi).test(navigator.userAgent),
    isiPad: (/ipad/gi).test(navigator.userAgent),
    isPlaybook: (/playbook/gi).test(navigator.userAgent),
    isBlackBerry:((/bb10/gi).test(navigator.userAgent) || (/blackberry/gi).test(navigator.userAgent)) && typeof bbnth == "undefined",
    isBlackBerry10 : (/bb10/gi).test(navigator.userAgent),
    isBlackBerryNTH: (/blackberry/gi).test(navigator.userAgent) && typeof bbnth != "undefined" && bbnth,
    isTouchPad: (/hp-tablet/gi).test(navigator.userAgent),
    isWindowsPhone: (/Windows Phone/gi).test(navigator.userAgent),
	isWindowsTouch :(/Windows/gi).test(navigator.userAgent) && (/Touch/gi).test(navigator.userAgent),
	isWindowsTablet : (/Windows NT/gi).test(navigator.userAgent) && (/Touch/gi).test(navigator.userAgent),
    isTablet: (/hp-tablet|ipad|playbook/gi).test(navigator.userAgent) || ((/android/gi).test(navigator.userAgent) && !(/mobile/gi).test(navigator.userAgent)),
    isMob: (/mobile/gi).test(navigator.userAgent),
    
    syncFiles: ["jslib/tparty/cal/yahoo-dom-event.js", "jslib/konytextfieldwidget.js"],
    syncJSFiles: ["jslib/konyconstants.js", "jslib/konywidgetdefault.js", "jslib/konyJSLib/ui/konyuiBaseClasses.js", "jslib/konyJSLib/ui/konyuiForm.js", "jslib/konyJSLib/ui/konyuiBox.js"], // As Popup inherits from Form.
    syncLuaFiles: ["jslib/konyLuaLib/ui/windowBaseClasses.js", "jslib/konyLuaLib/ui/windowForm.js", "jslib/konyLuaLib/ui/windowBox.js"], 
    asyncViewFiles: ["jslib/konyconstcommon.js", "jslib/konymodel.js", "jslib/konycore.js", "jslib/konysystem.js", "jslib/konyapi.js", "jslib/konymodule.js", "jslib/konytableapi.js", "jslib/konyosapi.js", "jslib/konystringapi.js", "jslib/konymathapi.js", "jslib/konyutils.js", "jslib/konyi18n.js", "jslib/konywidgets.js", "jslib/konytouchwidgets.js", "jslib/konyformwidget.js", "jslib/konyappmenu.js", "jslib/konynetwork.js","jslib/konyworker.js", "jslib/konylabelwidget.js", "jslib/konybuttonwidget.js", "jslib/konysliderwidget.js", "jslib/konytextfieldautocomplete.js", "jslib/konytextfieldpassword.js", "jslib/konycomboboxgroup.js", "jslib/konyradiobuttongroup.js", "jslib/konylistboxgroup.js", "jslib/konytextareawidget.js", "jslib/konycheckboxgroup.js", "jslib/konylinkwidget.js", "jslib/konyboxwidget.js", "jslib/konyvboxwidget.js",  "jslib/konyflexlayoutengine.js", "jslib/konyflexcontainerwidget.js", "jslib/konyflexscrollcontainerwidget.js", "jslib/konylinewidget.js", "jslib/konysegmentwidget.js", "jslib/konyimagewidget.js", "jslib/konyHorizontalImagewidget.js", "jslib/konyHorizontalImageGallerywidget.js", "jslib/konyslotviewwidget.js", "jslib/konybrowserwidget.js", "jslib/konydatagridwidget.js", "jslib/konymapwidget.js", "jslib/konytabwidget.js", "jslib/konyswitchwidget.js", "jslib/konypopup.js", "jslib/konyphone.js", "jslib/konyscrollerwidget.js", "jslib/konyrichtextwidget.js", "jslib/konyscrollboxwidget.js", "jslib/konymediawidget.js", "jslib/konythemesapi.js", "jslib/tparty/cal/calendar-min.js", "jslib/tparty/cal/element-min.js", "jslib/tparty/cal/container-min.js", "jslib/konycalendarwidget.js", "jslib/konyanimations.js","jslib/konyhybridapi.js",
    "jslib/konydatabaseapi.js","jslib/konydatastoreapi.js","jslib/konygeolocationapi.js", "jslib/konyphoneapi.js", "jslib/konytimerapi.js",  "jslib/konypickerview.js", "jslib/konypickerwidget.js",  "jslib/konycrypto.js",  "jslib/tparty/crypto/cryptojslib-min.js", "jslib/tparty/requirejs/require-min.js"],
    asyncJSFiles: ["jslib/konyJSLib/core/konyJSUtils.js", "jslib/konyJSLib/ui/konyuiBasicWidgets.js", "jslib/konyJSLib/ui/konyuiFlexContainer.js", "jslib/konyJSLib/ui/konyuiCalendar.js", "jslib/konyJSLib/ui/konyuiDataGrid.js", "jslib/konyJSLib/ui/konyuiGroupWidgets.js", "jslib/konyJSLib/ui/konyuiImage.js", "jslib/konyJSLib/ui/konyuiImageGallery.js", "jslib/konyJSLib/ui/konyuiHorizontalImageStrip.js", "jslib/konyJSLib/ui/konyuiMap.js", "jslib/konyJSLib/ui/konyuiBrowser.js", "jslib/konyJSLib/ui/konyuiRichText.js", "jslib/konyJSLib/ui/konyuiScrollBox.js", "jslib/konyJSLib/ui/konyuiSegmentedUI.js", "jslib/konyJSLib/ui/konyuiText.js", "jslib/konyJSLib/ui/konyuiPopup.js", "jslib/konyJSLib/ui/konyuiTabPane.js", "jslib/konyJSLib/ui/konyuiSlider.js", "jslib/konyJSLib/ui/konyuiVideo.js", ],
    JSMapList:["jslib/konyJSLib/core/konyJSMapping.js","jslib/konyJSLib/core/konyapplication.js"],
    asyncLuaFiles: ["jslib/konyLuaLib/ui/konyWidgetNativeMapping.js", "jslib/konyLuaLib/ui/windowBasicWidgets.js", "jslib/konyLuaLib/ui/windowCalendar.js", "jslib/konyLuaLib/ui/windowDataGrid.js", "jslib/konyLuaLib/ui/windowForm.js", "jslib/konyLuaLib/ui/windowGallery.js", "jslib/konyLuaLib/ui/windowGroupWidgets.js", "jslib/konyLuaLib/ui/windowHorizontalImageStrip.js", "jslib/konyLuaLib/ui/windowImage.js", "jslib/konyLuaLib/ui/windowMap.js", "jslib/konyLuaLib/ui/windowPopup.js", "jslib/konyLuaLib/ui/windowRichText.js", "jslib/konyLuaLib/ui/windowScrollBox.js", "jslib/konyLuaLib/ui/windowSegmentedUI.js", "jslib/konyLuaLib/ui/windowText.js", "jslib/konyLuaLib/ui/windowBrowser.js", "jslib/konyLuaLib/ui/windowTabPane.js", "jslib/konyLuaLib/ui/windowSlider.js", "jslib/konyLuaLib/ui/windowVideo.js"],   //"appjs/appmodel.js"], 
    
    setPlatformName : function ()
	{
		var platform;
		var rcid;
		if(this.isiPhone)
		{
			platform = "spaiphone";
			rcid = "spaiphone";
		}
		else if(this.isAndroid && this.isTablet)
		{
			platform = "spaandroidtablet";
			rcid = "spaandroidtab";
		}
		else if(this.isAndroid)
		{
			platform = "spaandroid";
			rcid = "spaandroid";
		}
		else if(this.isBlackBerry)
		{
			platform = "spablackberry";
			rcid = "spabb";
		}
		else if(this.isiPad)
		{
			platform = "spaipad";
			rcid = "spaipad";
		}
		else if(this.isBlackBerryNTH)
		{
			platform = "spabbnth";
			rcid = "spabbnth";
		}
		else if(this.isPlaybook)
		{
			platform = "spaplaybook";
			rcid = "spaother";
		}
		else if(this.isWindowsPhone && this.isIE10)
		{
			platform = "spawinphone8";
			rcid = "spawinphone8";
		}
		else if(this.isWindowsTablet)
		{
			platform = "spawindowstablet";
			rcid = "spawindowstablet";
		}
		else if(this.isWindowsPhone) 
		{
			platform = "spawindows";
			rcid = "spawindows";
		}
		else
		{
			platform = "";
			rcid = "spaother";
		}
		
		if(typeof spaMarkup != "undefined" && spaMarkup){
            platform = spaMarkup;
            rcid = spaMarkup;
        }
		
		$KG["platformver"] = platform + "/";
		$KG["rcid"] = rcid;

		if(this.isiPhone && window.devicePixelRatio == 2)
			$KG["retina"] = "retina/";
		else
			$KG["retina"] = "";
    },
	

    initializeWidgets: function(){
        //Register only available widget events.
        var widgetsSupported = [$KW.Form, $KW.HBox, $KW.VBox, $KW.Button, $KW.Image, $KW.Label, $KW.TextField, $KW.ComboBox, $KW.ListBox, $KW.Link, $KW.RichText, $KW.CheckBoxGroup, $KW.RadioButtonGroup, $KW.Map, $KW.HStrip, $KW.IGallery, $KW.Phone, $KW.Segment, $KW.Appmenu, $KW.ScrollBox, $KW.TabPane, $KW.Calendar, $KW.Switch, $KW.TextArea, $KW.DataGrid,$KW.FlexScrollContainer,  $KW.MenuContainer, $KW.PickerView, $KW.Slider, $KW.Line, $KW.FlexContainer, $KW.FlexScrollContainer];        
        for (var i = 0; i < widgetsSupported.length; i++) {
            if (widgetsSupported[i]) {
                widgetsSupported[i].initialize && widgetsSupported[i].initialize();
            }
        }
    },
    
   	loadlibrarysync: function(){
    
        //Need dynamic loading only in case of spa debug mode. Need to changes this condition later
        var appInit = kony.appinit;        
        if (!($KI.themes)) {
		
				
            if (appInit.index > 0) 
                console.log("File loaded in sync: " + appInit.syncFiles[appInit.index - 1] + "  number: " + appInit.index);
            
            if (appInit.index == appInit.syncFiles.length) {
                appInit.loadlibraryasync(appInit.asyncViewFiles, appInit.ondone);
                return;
            }
            kony.appinit.loadScript(kony.appinit.syncFiles[kony.appinit.index], kony.appinit.loadlibrarysync);
            appInit.index++;
        }
        else {
            $KG["skipproxy"] = true;
			appInit.verifyhref(true);
            
        }        
    },
     
    ondone: function(){
        var appInit = kony.appinit;        
        console.log("File loaded in async: " + appInit.asyncViewFiles[appInit.index] + "  number: " + appInit.index);
        appInit.index++;
        if (appInit.index == appInit.asyncViewFiles.length) {
            //Need JSMappings to be loaded
            IndexJL ? appInit.verifyhref() : kony.appinit.loadJSMap();    
            return;
        }
    },
	
	loadlibraryasync: function(files, cb){
        var appInit = kony.appinit;  
        appInit.index = 0;
        for (var i = 0; i < files.length; i++) {
			appInit.loadScript(files[i], cb);           
        }
    },
    
    loadJSMap: function (){ 
        var appInit = kony.appinit;    
      
        appInit.JSMapList[appInit.JSMapFileCount] && appInit.loadScript(appInit.JSMapList[appInit.JSMapFileCount], appInit.loadJSMap);
        appInit.JSMapFileCount++;	
        (appInit.JSMapFileCount == 2) && appInit.verifyhref();        
	},
    
	
	loadScript: function(src, callback){
		
        var script = document.createElement('script');
		if(kony.appinit.isIE7 || kony.appinit.isIE8 || kony.appinit.isIE9 || (kony.appinit.isWindowsPhone && !kony.appinit.isIE10))
	        script.src = $KG["platformver"] + src +"?ver="+ $KG["version"];
		else
			script.src = $KG["platformver"] + src;// +"?ver="+ $KG["version"];
        script.type = "text/javascript";
		if(!script.addEventListener){
			script.onreadystatechange = function(){
            (this.readyState == 'complete' || this.readyState == 'loaded') && callback();
			};
		}
		else
			script.onload = callback;
        kony.appinit.head.appendChild(script);
	},

    mergeDownloadLists: function() {
        var appInit = kony.appinit;
        var synctype = "sync" +  appInit.foldertype;
        var asynctype = "async" + appInit.foldertype;
        appInit.syncFiles = appInit.syncFiles.concat(appInit[synctype]);
        appInit.asyncViewFiles = appInit.asyncViewFiles.concat(appInit[asynctype]);
    },
	
    
    appcacheeventhndlr: function(event)
	{
        if(!event)
			event = window.event;
			
		switch (event.type) {
            case "checking":
                console.log("Checking for Manifest Version");
                break;
                
            case "downloading":
				/*
				var cacheprog = document.createElement("span");
				cacheprog.id = "__downlaoding";
				cacheprog.innerHTML = "Progress: Downloading...";
				document.body.appendChild(cacheprog);
				*/
				console.log("Downloading of Manifest Resources");
				break;
				
			case "progress":
				/*
				var str = "Progress: " + event.loaded + " of " + event.total + " files downloaded";
				var cacheprog = document.getElementById("__downlaoding");
				if(!cacheprog)
				{
					cacheprog = document.createElement("span");
					cacheprog.id = "__downlaoding";
					document.body.appendChild(cacheprog);
				}
				if(event.loaded && event.total)
					cacheprog.innerHTML = str;
				console.log(str);
				*/
                break;
                
            case "cached":
                console.log("Manifest Resources loading done");
                //kony.appinit.loadlibrarysync();
                break;
                
            case "noupdate":
                console.log("No Change in Manifest File");
                //kony.appinit.loadlibrarysync();
                break;
                
            case "updateready":
                console.log("New manifest resources downloaded,swap the cache");
                try{
	                window.applicationCache.swapCache();
	                window.location.reload();
                }
                catch(e) {
                	console.log("invalid state: swapping the cache");
                }
                //kony.appinit.loadlibrarysync();
                break;
                
            case "obsolete":
                console.log("Cache Manifest file not found. So deleting app cache");
                break;
                
            case "error":
                console.log("Error while loading app cache");
				//when manifest is failed to load, app events are intialized twice. Hence form.show is called twice
                //kony.appinit.loadlibrarysync();
                break;
                
            default:
                console.log("Appcache Event not supported");
        }
    },
    
    // Check for Deeplink (insession/newsession). If not check for hash.							  
	// Hash Found - Could be back key navigation from external site else it is regular app flow	  
	verifyhref : function(skiploadappjs) {		
		//kony.print("verifyhref:URL: " + window.location.href);
		
		//Added the below JSON reqParms,reqHeader, appprops code here along with the decoding value as it is removed from  //prepareHttpHeaders function 
		var konyappprops = document.getElementsByName('_konyAppProperties')[0];
        if(konyappprops && konyappprops.value){
			window["_konyAppProperties"] = JSON.parse($KU.getDecodedPropValue(konyappprops.value));
			}
		else	
			window["_konyAppProperties"] = undefined;
		var konyParams = document.getElementsByName('_reqParams')[0];
        if(konyParams && konyParams.value){
			kony.globals["konyParams"] = JSON.parse($KU.getDecodedPropValue(konyParams.value))
			}
		var reqhdrs = document.getElementsByName('_reqHeaders')[0];
        if(reqhdrs && reqhdrs.value)
		{
			var keys = [];
			var headersJSON = "";
			headersJSON = JSON.parse($KU.getDecodedPropValue(reqhdrs.value).replace(/"="/g, "\":\""));
			for ( p in headersJSON )
			{
				headersJSON[p] = decodeURIComponent(headersJSON[p]);
			}
			kony.globals["httpheaders"] = headersJSON;
            if(Object.keys)
				keys = Object.keys(kony.globals["httpheaders"]);
			else
				for (var j in kony.globals["httpheaders"]) 
					keys.push(j);

			for(var i=0; i < keys.length; i++)
               kony.globals["httpheaders"][keys[i]] = unescape(kony.globals["httpheaders"][keys[i]]);
        }
		
		var searchstr = window.location.search.slice(1);
		//searchstr is empty,it is not a deep link url
		if (searchstr == "") {	
			var hash = window.location.hash.slice(2);
			var lform = null;
			try{
				lform = sessionStorage.getItem("klastform");
			}catch(err){}
			//default launchmode is 1, if no parameters in url
			$KG["__launchmode"]= 1;
			
			if (hash != "") {
				// '#' found indicates insession.Navigate to last form shown
				if (lform == hash) {
					console.log("verifyhref:Last Form Stored: " + lform);															
				}
				else {
					console.log("verifyhref:Last Form Stored: " + lform + " Hash: " + hash);
				}
				if(skiploadappjs)
				    kony.appinit.hashflowshowform();
				else
					kony.appinit.loadappjs(kony.appinit.hashflowshowform);				
				//kony.appinit.loadappjs(kony.appinit.hashflowshowform);
			}
			else {
				//Regular app url, only diff check for existing sessionStorage objects					
				if (lform != null) {
					//Case of url being retyped in the same window.So clear model & lastform data
					try{
						sessionStorage.removeItem("klastform");
						sessionStorage.removeItem("kmodel");
					}catch(err){}
					kony.print("verifyhref: Deleted Existing sessionStorage"); 
				}
				
				if(skiploadappjs)
				    kony.appinit.deeplinkflow();
				else
					kony.appinit.loadappjs(kony.appinit.deeplinkflow);
				
			}
		}
		else {
			//if any parameters in url, launchmode is 3
			$KG["__launchmode"]= 3;
				
			if(skiploadappjs)
				kony.appinit.deeplinkflow();
			else
				kony.appinit.loadappjs(kony.appinit.deeplinkflow);
			
		}						
	},
			
	restorespamodel :	function () {
		// Assign the existing appmodel from storage obj 
		try{
			var modelstr = sessionStorage.getItem("kmodel");
			var modelobj = "";
		}catch(err){}
		if(modelstr)
			modelobj = JSON.parse(modelstr);
		
		if (modelobj) {
			//$KG = modelobj;
			kony.print("restorespamodel:Model Reloaded");
			//TODO: May be we need to register for idletimeout once again if navigated to external site
			return true;
		}
		else {
			kony.print("restorespamodel:Case of Corrupt Model");
			//return false;  //commented because window.openurl is opened in a new window.
			return true;
		}
	},	
			
	appstartup: function() {
		//kony.print("appstartup:Regular applaunch");
		setTimeout("kony.appinit.disablesplash()", 1500);
	},	
	
	hashflowshowform: function () {
		var form = null;
		try{
			form = sessionStorage.getItem("klastform");
		}catch(err){}
		//Restore appmodel & navigate to the last form shown
		if (kony.appinit.restorespamodel() && form) {
			var formobj = window[form];
			kony.print("hashflowshowform: Display Form " + formobj.id);
			formobj && $KW.Form.show(formobj);
		} else {
			kony.print("hashflowshowform:ERROR recovering model so landing on Home Page");
			//disablesplash();
			kony.appinit.deeplinkflow();
		}
	},
			
	deeplinkflow: function() {
		//Deep link flow.Check for insession(!=-1)  or newsession(-1) by kdeeplink key
		var searchstring= window.location.search.slice(1);
	
		var deepobj = {};
		var queryString = searchstring.split("&");
	
		kony.print("deeplinkflow: args:" + queryString.join());
	
		for (var i = 0; i < queryString.length; i++) {
			var s = queryString[i].replace(/\+/g,' ').split("=");
			var key = decodeURIComponent(s[0]);
			var value = decodeURIComponent(s[1]);			
			if(key) deepobj[key] = value;
		}
	
		var path = window.location.href.split("?");
		var sessionflag = searchstring.search("kdeeplink=");
		
		deepobj["deeplinkpath"] = path[0];
		//deepLinkPath with camelcase to make property name inline with other platforms 
		deepobj["deepLinkPath"] = path[0];		
		//storing headers in deeplinkobj to make object content inline with other platforms.
		deepobj['reqheaders'] = kony.globals["httpheaders"];
		if(kony.globals["konyParams"])
		{
			for(var param in kony.globals["konyParams"])
				deepobj[param] = kony.globals["konyParams"][param];
		}
		$KG["kdeepobj"] = deepobj;
		
		if(sessionflag == -1)
			kony.print("deeplinkflow:newsession");
		else
			kony.print("deeplinkflow:insession");

		setTimeout("kony.appinit.disablesplash()", 1500);

	},
			
	 //Load app.js & invoke the callback.						
    loadappjs: function(cb){ 
		kony.appinit.loadScript("appjs/app.js", cb);
		if(window.location.href !== undefined && window.location.href.indexOf(".konycloud.com") !== -1)
			kony.appinit.loadScript("jslib/konylicense.js",cb);
    },
         
	disablesplash: function () {
	
		var styleSheetObjs = window.document.styleSheets;
		$KG["currentStyleSheet"] = styleSheetObjs[$KW.Utils.getKonyStyleSheetIndex(styleSheetObjs)];
		
		kony.print("disabling splash");
        //kony.constants.RUNMODE = $KG["build"];       //commenting  $KG["build"] has to happen in codegen
		kony.appinit.initializeheaders();
		var eventobj=$KG["__konyappevents"];
       
        /*For functional modules: even before appinit is called loadOnStartup modules should load. */
        kony.appinit.konyLoadFunctionalModules();
		kony.print("appmode:not hybrid,invoking initializeapp");   
		initializeApp && initializeApp();      
    },
	
	 setAppHeaderRef: function(){
        
        var setRef = function(headers){
            for (var hbox in headers) {
                var header = headers[hbox];
                var box =  headers[hbox] = window[header][hbox];
                $KU.setChildren(header, box, box.children);
            }
        }
        var headers = kony.app.headers;
        headers && setRef(headers);
        
        var footers = kony.app.footers;
        footers && setRef(footers);
    },
    
    setChildren: function(header, box, children){
        if (children && children.length > 0) {
            for (var i = 0; i < children.length; i++) {
                box[children[i]] = window[header][children[i]];
                this.setChildren(header, box, window[header][children[i]].children);
            }
        }
    },
    
    setImageBasedDP: function(){
        
        var imageCat = "";

        if($KU.isAndroid)
		{
            var dpratio = window.devicePixelRatio;
			if(!$KU.isTablet)
			{
				if (dpratio <= 1)
					imageCat = "320/";
				else if(dpratio > 1 && dpratio <= 1.5)
					imageCat = "360/";
				else if(dpratio > 1.5 && dpratio <= 2)
					imageCat = "400/";
				else if(dpratio > 2)
				  imageCat = "440/";
			}			
			else
			{
				if (dpratio <= 1) {
                             imageCat = "mdpi/";
                           } else if(dpratio <= 1.5){
                               imageCat = "hdpi/";
                           } else if(dpratio > 1.5) {
                               imageCat = "xhdpi/";
                           } 
			}
		}
		// Currently only 320 supported!
		else if($KU.isWindowsPhone)
		{
			
			imageCat = "320/";
		}
		else if($KU.isBlackBerry || $KU.isBlackBerryNTH)
		{
            var orientation = window.orientation;
			var imageCat = window.innerWidth+"/";
			if(orientation)
				imageCat = Math.min(window.innerWidth, window.innerHeight);
			if(orientation && parseInt(imageCat, 10) > 250)
				imageCat = "360/"
			else if( orientation || parseInt(imageCat, 10) < 340)
				imageCat = "320/";
			else
				imageCat = "360/";

			if(window.devicePixelRatio > 2)
                imageCat = "440/";
        }
        if(typeof spaMarkup != "undefined" 
            && spaMarkup && spaMarkup==="spaiphone"){
                         imageCat="";
         }
              
        // TODO: Handle retina and non-retina case for ios
        $KG["imagecat"] = imageCat;

        // Precache imgload.gif and $KG.imagewhiledownloading
        if($KG["imagewhiledownloading"])
            new Image().src = $KU.getImageURL($KG["imagewhiledownloading"]);
        new Image().src = $KU.getImageURL("imgload.gif");
    },

	initializeheaders: function(eventObject) {
    
		if (kony.constants.APPSTATE == 0) {
            kony.constants.APPSTATE = 1;
            kony.appinit.setImageBasedDP();
            kony.appinit.initializeMainContainer();
            kony.app && kony.appinit.setAppHeaderRef();  
            kony.appinit.setPlatformName();
        }
    },
	
	initializeMainContainer: function() {
		var main = $KU.getElementById('__MainContainer');
		if(!main)
		{
			//document.body.innerHTML = "<div id='__MainContainer'></div>";
			var mainContainerEle = document.createElement('div');
			mainContainerEle.setAttribute("id", "__MainContainer");			
			document.body.appendChild(mainContainerEle);
        }
        kony.events.registerDocumentEvents();
    },


	prepareHttpHeaders: function() {
	
		/* The below code is added to get the session is true/false */
		var isnewsession = document.getElementById("isnewsession");
		if(isnewsession != null)
			kony.appinit.isNewSession = isnewsession.innerHTML;
		var sessionId = document.getElementById("sessionId");
		if(sessionId != null)
			kony.appinit.sessionId = isnewsession.innerHTML;

		//Commented the below coded as this is included in(moved to) verifyhref during the excludelist implementaion
		/*
        var konyappprops = document.getElementsByName('_konyAppProperties')[0];
        if(konyappprops && konyappprops.value)
			window["_konyAppProperties"] = JSON.parse(konyappprops.value);
		else	
			window["_konyAppProperties"] = undefined;
		var konyParams = document.getElementsByName('_reqParams')[0];
        if(konyParams && konyParams.value)
			kony.globals["konyParams"] = JSON.parse(konyParams.value);
			
        var reqhdrs = document.getElementsByName('_reqHeaders')[0];
        if(reqhdrs && reqhdrs.value)
		{
			var keys = [];
			var headersJSON = JSON.parse(reqhdrs.value.replace(/"="/g, "\":\""));
			for ( p in headersJSON )
			{
				headersJSON[p] = decodeURIComponent(headersJSON[p]);
			}
			kony.globals["httpheaders"] = headersJSON;
            if(Object.keys)
				keys = Object.keys(kony.globals["httpheaders"]);
			else
				for (var j in kony.globals["httpheaders"]) 
					keys.push(j);

			for(var i=0; i < keys.length; i++)
               kony.globals["httpheaders"][keys[i]] = unescape(kony.globals["httpheaders"][keys[i]]);
        }
		*/

	},
    
	initappcache: function(){
			
		kony.appinit.prepareHttpHeaders();
        
		kony.appinit.setPlatformName();	
		
        
		kony.appinit.mergeDownloadLists();
        //[cache update process begins, begins downloading resources, each resource in the manifest file begins to download,
        //When everything is cached, update process finishes but the manifest file does not change, existing appcache, 
        //the update process finishes new application cache ready for use, cache is no longer so cache deleted, error condition]
        if (document.documentElement.getAttribute("manifest") && !!window.applicationCache) {        
            var appcacheevents = ["checking", "downloading", "progress", "cached", "noupdate", "updateready", "obsolete", "error"];
            
            for (var i = 0; i < appcacheevents.length; i++) {
                window.applicationCache.addEventListener(appcacheevents[i], kony.appinit.appcacheeventhndlr, false);
            }
        }
        else {
            //kony.appinit.loadlibrarysync();
        }
        kony.appinit.loadlibrarysync();
    },
        
    /*
    This is the first function, which will be called before application init as this will load loadOnStartUp modules.
    This is dynamically added to app.js in build.xml when there is 
    */
    konyLoadFunctionalModules : function (){
        if($KG["functionalModules"]){
            var fms = $KG["functionalModules"];
            for(var fm in fms){
                if(fm && (fm !== "KonydefaultModules" ) && (fms[fm].cache || fms[fm].loadOnStartUp)){
                    kony.modules.loadModule(fm);
                }
            }
        }
    }
}

//os.platform
$KI.os = { 
    platform: function () {
        
		var params = {};    
        
		var imagecat = $KG["imagecat"];
        imagecat = imagecat.substring(0, imagecat.length-1);
        var platform = $KU.getPlatform();
        if(platform.name == "iphone")
            if(window.devicePixelRatio == 1)
                imagecat = "320";
            else
                imagecat = "640";

        params["name"] = "thinclient";
        params["model"] = ""
        params["version"] = platform.version;
		params["deviceWidth"] = screen.availWidth;
		params["deviceHeight"] = screen.availHeight;
		params["screenWidth"] = $KU.getWindowWidth();
		params["screenHeight"] = $KU.getWindowHeight();
        params["hascamera"] = false;
        params["hasgps"] = (navigator.geolocation != undefined ? true : false);
        params["hastouchsupport"] = $KU.isTouchSupported;
        params["hasorientationsupport"] = $KU.isOrientationSupported;
        params["iswifiavailable"] = (navigator.onLine != undefined ? navigator.onLine : true);
        params["type"] = "spa";
        params["imagecat"] = imagecat;
        params["deviceid"] ="";
        params["category"] = platform.name;
        params["userAgent"] = navigator.userAgent;

        params["ip"] ="";    
        if($KG["httpheaders"])
            params["httpheaders"] = JSON.stringify($KG["httpheaders"]);
        
        return params;
    },

    useragent: function () {
        return navigator.userAgent;
    },

    setapplicationmode: function(mode) {
        $KG["appmode"] = mode;
        if(mode==2 || mode ==3){
		  $KG["platformver"] = "";
		}		
    },

    getapplicationmode: function(mode) {        
        var mode = $KG["appmode"];
        return !!mode ? mode : 1;       
    }
}

kony.decrement = function(num){
    if(typeof(num) === "number"){
        return num - 1;
    }else{
        return num;
    }
};

kony.increment = function(num){
    if(typeof(num) === "number"){
        return num + 1;
    }else{
        return num;
    }
};

kony.decrementIndices = function(arr){
    var tArr = [];
    for(var i=0; i < arr.length; i++) {
        tArr[i] = arr[i] - 1;       
    }
    return tArr;
};

kony.incrementIndices = function(arr){
    var tArr = [];
    for(var i=0; i < arr.length; i++) {
        tArr[i] = arr[i] + 1;       
    }
    return tArr;
};
