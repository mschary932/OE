/*
 * i18n
*/
$KI.i18n = 
{
	// Public functions
	setcurrentlocaleasync: function(locale, onsuccess, onfailure, info) {
		if(!locale)
		{
			console.warn("No locale specified");
			return;
		}
		
		$KG["oldlocale"] = $KI.i18n.getcurrentlocale();
		//$KG["currentlocale"] = locale;
		$KI.i18n.initializeI18n(locale, null, onsuccess, onfailure, info);
	},
	
	setdefaultlocaleasync: function(locale, onsuccess, onfailure, info) {
		if(!locale)
		{
			console.warn("No locale specified");
			return;
		}
		try{
			var localeVersion = (localStorage && localStorage.getItem("i18nVersion")) || "";		
			if(!$KG["i18nVersion"] || localeVersion != $KG["i18nVersion"])
			{
				try{
					localStorage.setItem("i18nVersion", $KG["i18nVersion"]); 
				}catch (e) {
					if (localStorage && (e.name == "QUOTA_EXCEEDED_ERR" || e.name == "QuotaExceededError")) {
						if(localStorage.length === 0 ){
							console.warn("Private Browsing is switched ON");
						} else {
							console.warn("Data storage limit has exceeded");
						}
					}
					else
						console.warn("localStorage is not available");
				}
				$KI.i18n.cleanupI18nCache();
			}
		}catch(err){}
		
		$KG["oldlocale"] = $KG["defaultlocale"];
        $KG["defaultlocale"] = locale;
	 	
		// determine locale
		var locale = $KI.i18n.determineCurrentLocale();
		$KI.i18n.initializeI18n(locale, null, onsuccess, onfailure, info);
	},
	
	setdefaultlocale: function()
	{	
	 	var locale = arguments[0] || null, successcallback = arguments[1] || null,errorcallback = arguments[2] || null,initializeFn = arguments[3] || null;
	 	
		if(!locale)
	 	{
	 		console.warn("No locale specified");
	 		return;
	 	}
	 	if(initializeFn)
	 	{
	 		$KG["locales"] = $KG["locales"].split(",");
	 		try{
		 		var localeVersion = (localStorage && localStorage.getItem("i18nVersion")) || "";
		 		if(!$KG["i18nVersion"] || localeVersion != $KG["i18nVersion"])
		 		{
					try {
						localStorage.setItem("i18nVersion", $KG["i18nVersion"]); 
					} catch (e) {
						if (localStorage && (e.name == "QUOTA_EXCEEDED_ERR" || e.name == "QuotaExceededError")) {
							if(localStorage.length === 0 ){
								console.warn("Private Browsing is switched ON");
							} else {
								console.warn("Data storage limit has exceeded");
							}
						}
						else
							console.warn("localStorage is not available");
					}
		 			$KI.i18n.cleanupI18nCache();
		 		}
	 		}catch(err){}
	 	}

		// determine current locale
		var locale = $KI.i18n.determineCurrentLocale();
		$KI.i18n.initializeI18n(locale, initializeFn, successcallback, errorcallback);
	},
	
	setcurrentlocale: function(locale)
	{
		if(!locale)
			return;
		//$KG["currentlocale"] = locale;
		$KI.i18n.initializeI18n(locale);
	},
	
	getcurrentlocale: function()	
	{
		return $KG["currentlocale"];
	},	

	getsupportedlocales: function()
	{	
		console.warn("getsupportedlocales: Not supported!");
		var lang = $KU.getBrowserLanguage();
		return IndexJL ?  [null, lang] : [lang] ;
	},
	
	getcurrentdevicelocale: function()
	{
		var lang = $KU.getBrowserLanguage();
		var languageArr = lang.split("-");
		var retObj = {};
		retObj.language = languageArr[0];
		retObj.country = languageArr[1];
		retObj.name = lang;
		return retObj;
	},
	
	updateresourcebundle: function(bundle, locale) 
	{ 
		// TODO: Assume bundle is not already loaded and user calls updateresourcebundle!
		//kony.print("In updateresourcebundle");
		
		if (!locale || !bundle) 
			return;
			
		var existingBundle = {};
		var lsKey = $KG["appid"] + "_" + locale;
		
		try{
			if($KG[lsKey]){
				existingBundle = $KG[lsKey];
			}
			else if(localStorage){
				var strRetrieved = localStorage.getItem(lsKey);
				if(strRetrieved)
					existingBundle = JSON.parse(strRetrieved);				
			}	
		}catch(err){}
		
		$KU.mergeObjects(existingBundle, bundle);			
		
		try{
			try {
				if(!$KG[lsKey]){
					var bundleString = JSON.stringify(existingBundle);
					localStorage.setItem(lsKey, bundleString); 
				}
			} catch (e) {			
				$KG[lsKey] = existingBundle;			
				if (localStorage && (e.name == "QUOTA_EXCEEDED_ERR" || e.name == "QuotaExceededError")) {
					if(localStorage.length === 0 ){
						console.warn("Private Browsing is switched ON");
					} else {
						console.warn("Data storage limit has exceeded");
					}
				}
				else
					console.warn("localStorage is not available");
			}
		}catch(err){}
			
		if($KG[lsKey]){
			$KG[lsKey] = existingBundle;
		}
		if($KG["currentlocale"] == locale)
				$KG["i18nArray"] = $KU.convertObjectToArray(existingBundle);
		var locales = $KG["locales"];
		if(!$KU.inArray(locales, locale, true))
			locales.push(locale);
	},
	
	setresourcebundle: function(bundle, locale)
	{
		//kony.print("In setresourcebundle");

		if (!locale || !bundle) 
			return;
		
		var bundleString = JSON.stringify(bundle);
	
		var lsKey = $KG["appid"] + "_" + locale;
		try{
			try {
				localStorage.setItem(lsKey, bundleString);  // overrides existing key
			}
			catch (e) {			
				$KG[lsKey] = bundle;			
				if (localStorage && (e.name == "QUOTA_EXCEEDED_ERR" || e.name == "QuotaExceededError")) {
					if(localStorage.length === 0 ){
						console.warn("Private Browsing is switched ON");
					} else {
						console.warn("Data storage limit has exceeded");
					}
				}
				else
					console.warn("localStorage is not available");
				
			}
		}catch(err){}
	
		if($KG["currentlocale"] == locale)
		{
			var JSONObj = JSON.parse(bundleString);
			$KG["i18nArray"] = $KU.convertObjectToArray(JSONObj);
		}		
		var locales = $KG["locales"];
		if(!$KU.inArray(locales, locale, true))
			locales.push(locale);
	},	
	
	deleteresourcebundle: function(locale)
	{
		//kony.print("In deleteresourcebundle");
		var lsKey = $KG["appid"] + "_" + locale;
		try{
			localStorage && localStorage.removeItem(lsKey);
		}catch(err){}
		$KG[lsKey] = "";
		
		if($KG["currentlocale"] == locale)
		{
			$KG["i18nArray"]= [];
		}
		$KU.removeArray($KG["locales"], locale);
	},	
	
	isresourcebundlepresent: function(locale)
	{
		//kony.print("In isresourcebundlepresent");
		
		if (!locale) 
			return false;

		var res = $KU.inArray($KG["locales"], locale, true);
		if(res)
			return true;
		else
		{
			// Handling dynamic setresourcebundle
			var lsKey = $KG["appid"] + "_" + locale;
			var strRetrieved = null;
			try{
				strRetrieved = (localStorage && localStorage.getItem(lsKey)) || $KG[lsKey];
			}catch(err){}
			if (strRetrieved)
				return true;
			else
				return false;
		}
	},
	
	islocalesupportedbydevice: function(locale)
	{
		console.warn("islocalesupportedbydevice: Method Not supported")
		return false;
	},
		
	getlocalizedstring: function(i18nkey)
	{
		//return $KG["i18nArray"][i18nkey] || i18nkey;
		//var i18nValue = $KG["i18nArray"][i18nkey];
		//return typeof(i18nValue) == "undefined"? null : i18nValue;
		//return "test";
		//var i18nValue = messageResource.get(i18nkey, 'i18n');
		var i18nValue = jQuery.i18n.prop(i18nkey);
		return typeof(i18nValue) === "undefined"? null : i18nValue.split('~|~')[0];
	},
	
	// Non-public functions
	determineCurrentLocale: function()
	{
	 	var supportedLocales = $KG["locales"];
	  	var defaultlocale = $KG["defaultlocale"];
		var lang = $KU.getBrowserLanguage();
	  	var deviceLocale = lang.replace("-", "_");
	  	var currentLocale = "";
	  	
	  	var res = $KU.inArray(supportedLocales, deviceLocale, true);
	  	if(res)
	  		currentLocale = deviceLocale;
	  	else
	  	{
	  		var lang = deviceLocale.split("_")[0];
	  		var res2 = $KU.inArray(supportedLocales, lang, true);
	  		if(res2)
	  			currentLocale = lang;
	  		else
	  			currentLocale = defaultlocale;
	  	}
	  	return currentLocale;
	},
	
	initializeI18n: function(locale, initializeFn, successcallback, errorcallback, info)
	{
		if(!$KG["i18nArray"])
			$KG["i18nArray"]= [];
			
		var lsKey = $KG["appid"] + "_" + locale;
		var strRetrieved;
		
		try{
			if(localStorage)
				strRetrieved = localStorage.getItem(lsKey);
		}catch(err){}
		
		if(!strRetrieved)
			$KI.i18n.getResource(locale, initializeFn, successcallback, errorcallback, info);        
		else
		{
			var JSONObj = JSON.parse(strRetrieved);
			$KG["i18nArray"] = $KU.convertObjectToArray(JSONObj);
			$KG["i18nInitialized"] = true;
			$KG["currentlocale"] = locale;
			initializeFn && initializeFn();
			successcallback && successcallback($KG["oldlocale"],locale, info);
		}
	},
	
	// script version
	getResource: function(locale, initializeFn, successcallback, errorcallback, info)
	{
		var filePath = "";

		if($KG["appmode"] == constants.APPLICATION_MODE_NATIVE)
			filePath = $KG["platformver"] + kony.constants.RESOURCES_PATH + "/" + kony.constants.TRANSLATION_PATH + "/" + locale + "." + kony.constants.TRANSLATION_EXT+"?ver="+ $KG["version"];
		else
			filePath =  kony.constants.RESOURCES_PATH + "/" + kony.constants.TRANSLATION_PATH + "/" + locale + "." + kony.constants.TRANSLATION_EXT+"?ver="+ $KG["version"];			
			
		// TODO: Use XMLHttpRequest instead of script
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.src = filePath;

		var timer = setTimeout(function(){
				console.error("Timeout while loading resource bundle.");
				$KG["i18nInitialized"] = true;
				initializeFn && initializeFn();
			}, 60000);
      /*
		script.onload = function()
		{
			//Resource file exists so store it in the database
			kony.print("i18n resource loaded successfully");
			clearTimeout(timer);
			$KG["i18nInitialized"]= true;
			$KG["currentlocale"] = locale;
			if(typeof i18nObject != "undefined" && i18nObject)
			{
				$KI.i18n.insertDB(i18nObject, locale);
				i18nObject = "";
			}
			initializeFn && initializeFn();
			successcallback && successcallback();

		};

		script.onerror = function()
		{
			console.error("An error has occurred while loading i18 locales");
			clearTimeout(timer);
			$KG["i18nInitialized"] = true;
			initializeFn && initializeFn();
			errorcallback && errorcallback();
		};  */
		
        var sCallback = function(){
            //Resource file exists so store it in the database
            kony.print("i18n resource loaded successfully");
            clearTimeout(timer);
            $KG.i18nInitialized = true;
			$KG["currentlocale"] = locale;
            if (typeof i18nObject != "undefined" && i18nObject) {
                $KI.i18n.insertDB(i18nObject, locale);
                i18nObject = "";
            }
            initializeFn && initializeFn();
            successcallback && successcallback($KG["oldlocale"], $KI.i18n.getcurrentlocale(), info);            
        };
		
        var eCallback = function(){
            console.error("An error has occurred while loading i18 locales");
            clearTimeout(timer);
            $KG.i18nInitialized = true;
            initializeFn && initializeFn();
            errorcallback && errorcallback($KG["oldlocale"], $KI.i18n.getcurrentlocale(), info);
        };
		
		if (!script.addEventListener) {
			script.onreadystatechange = function(){
				if (this.readyState == 'complete' || this.readyState == 'loaded') {
					script.onreadystatechange = null;
					sCallback();
				}
			}
		}
		else {
			script.onload = sCallback;
			script.onerror = eCallback;
		}
		head.appendChild(script);
	},
	
	// xhr version
	/*
	getResource: function(locale, initializeFn)
	{
		var filePath = "";
		if(kony.model.appModel.appmode == constants.APPLICATION_MODE_NATIVE)
			filePath = $KG["platformver"] + kony.constants.RESOURCES_PATH + "/" + kony.constants.TRANSLATION_PATH + "/" + locale + "." + kony.constants.TRANSLATION_EXT;
		else
			filePath = "/" + kony.constants.RESOURCES_PATH + "/" + kony.constants.TRANSLATION_PATH + "/" + locale + "." + kony.constants.TRANSLATION_EXT;
			
		var req = new XMLHttpRequest();
		req.open("GET", filePath, true);
		req.timeout = 60000;
		
		req.onreadystatechange = function()
		{
			if(this.readyState == 4)
			{
				$KG.i18nInitialized = true;
				$KG["currentlocale"] = locale;
				if (this.status == 200) 
				{
					if (this.responseText && this.responseText.length > 0) 
					{
						//Resource File exists so store it in the database
						$KI.i18n.insertDB(this.responseText, locale);
					}
					initializeFn && initializeFn();
				}
				else 
				{
					kony.print("i81n Ajax Request Failed: " + this.statusText);
					initializeFn && initializeFn();
				}
			}
		};
		
		req.ontimeout = function()
		{
			console.error("Timeout while loading resource bundle.");
			$KG.i18nInitialized = true;
			initializeFn && initializeFn();
		};
		req.send(null);
	},
	*/
	
	insertDB: function(JSONData, locale)
	{
		var lsKey = $KG["appid"] + "_" + locale;
		var JSONObj, lsStr;
		if(typeof JSONData == "string")
		{
			JSONObj = JSON.parse(JSONData);
			lsStr = JSONData;
		}
		else
		{
			JSONObj = JSONData;
			lsStr = JSON.stringify(JSONData);
		}

		try{
			try {
				localStorage.setItem(lsKey, lsStr);			
			} catch (e) {
							
				$KG[lsKey] = JSONObj;
				localStorage && localStorage.removeItem("i18nVersion");
				if (localStorage && (e.name == "QUOTA_EXCEEDED_ERR" || e.name == "QuotaExceededError")) {
					if(localStorage.length === 0 ){
						console.warn("Private Browsing is switched ON");
					} else {
						console.warn("Data storage limit has exceeded");
					}
				}
				else
					console.warn("localStorage is not available");
			}
		}catch(err){}
		$KG["i18nArray"] = $KU.convertObjectToArray(JSONObj);
	},
	
	// @deprecated
	/*
	saveFormModel: function(formModel)
	{
		if(!$KG["localization"])
			return;
		
		for(var child in formModel)
		{
			var widgetModel = formModel[child];
			if(typeof widgetModel != "object" || $KU.isArray(widgetModel) || !widgetModel)
				continue;

			if(widgetModel.wType == "Switch")
			{
				if(widgetModel.leftSideText && widgetModel.i18n_leftSideText)
				{
					widgetModel._leftSideText = widgetModel.leftSideText;
				}				
				if(widgetModel.rightSideText && widgetModel.i18n_rightSideText)
				{
					widgetModel._rightSideText = widgetModel.rightSideText;
				}
			}
			else if(widgetModel.wType == "TabPane")
			{
				// Iterate through children of TabPane for Tab
				var tabpages = widgetModel.children;
				for(var i=0; i<tabpages.length; i++)
				{
					var tabpageModel = widgetModel[tabpages[i]];
					if(tabpageModel.tabname && tabpageModel.i18n_tabname)
					{
						tabpageModel._tabname = tabpageModel.tabname;
					}			
				}
			}
			else if($KU.inArray($KU.translatableWidgets, widgetModel.wType, true))
			{
				if(widgetModel.text && widgetModel.i18n_text)
				{
					widgetModel._text = widgetModel.text;
				}
				if(widgetModel.wType == "TextField" && widgetModel.placeholder && widgetModel.i18n_placeholder)
				{
					widgetModel._placeholder = widgetModel.placeholder;
				}
			}
		}
	},
	*/
	
	// The actual translation function
	translateFormModel: function(formModel)
	{
		for(var child in formModel)
		{
			var widgetModel = formModel[child];
			if(typeof widgetModel != "object" || $KU.isArray(widgetModel) || !widgetModel)
				continue;
			
			if($KU.inArray($KU.translatableWidgets, widgetModel.wType, true))
			{
				if(widgetModel.i18n_text && widgetModel.i18n_text.toLowerCase().indexOf("i18n.getlocalizedstring") != -1)
				{
					widgetModel.canUpdateUI = false;
					widgetModel.text = $KU.getI18NValue(widgetModel.i18n_text);
					widgetModel.canUpdateUI = true;
				}				
			}
		}
	},
	
	// Once the text value of a widget, for which i18n-text is set, is modified, the widget becomes non-translatable (automatic)
	checkI18nStatus: function(widgetModel, attribute)
	{
		/*
		if(attribute != "text" && attribute != "placeholder")
			return;
		*/
			
		if(!$KG["localization"] || typeof widgetModel != "object" || $KU.isArray(widgetModel))
			return;
			
		if(attribute == "text" && widgetModel.i18n_text)
		{
			widgetModel.i18n_text = "";
		}
		// @removed
		/*
		else if(attribute == "placeholder" && widgetModel.placeholder_text)
		{
			widgetModel.placeholder_text = "";
		}
		*/
	},
	
	cleanupI18nCache: function()
	{
		var supportedLocales = $KG["locales"];
		for(var i=0; i<supportedLocales.length; i++)
		{
			var locale = supportedLocales[i];
			var lsKey = $KG["appid"] + "_" + locale;
			try{
				localStorage && localStorage.removeItem(lsKey);
			}catch(err){}
			$KG[lsKey] = "";	
		}
	},
	
	getI18nTitle: function(formModel)
	{
		var title = formModel.title;
		if(formModel.i18n_title && formModel.i18n_title.toLowerCase().indexOf("i18n.getlocalizedstring") != -1){
			return $KU.getI18NValue(formModel.i18n_title);
		}	
		else
			return title;
	}
}
