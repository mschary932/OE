// Cryptography 
if($KI.crypto) {
	kony.crypto = {
			newKey: $KI.crypto.newkey,
			saveKey: $KI.crypto.savekey,
			createHash: $KI.crypto.createhash,
			retrievePublicKey: $KI.crypto.retrievepublickey,
			deleteKey: $KI.crypto.deletekey,
			readKey: $KI.crypto.readkey,
			encrypt: $KI.crypto.encrypt,
			decrypt: $KI.crypto.decrypt
	}
}

//Database JS API
if ($KI.db) {
	kony.db = {
		openDatabase: $KI.db.opendatabase,
		transaction: $KI.db.transaction,
		readTransaction: $KI.db.readtransaction,
		executeSql: $KI.db.executesql,
		sqlResultsetRowItem:$KI.db.sqlresultsetrowitem,
		changeVersion: $KI.db.changeversion	
	}
}

//DataStore JS API (Backwardcompatiblity support)
if($KI.ds) {
	kony.ds = {
		"delete" : $KI.ds.Delete,
		remove: $KI.ds.Delete,
		read : $KI.ds.read,
		save : $KI.ds.save
	}
}

//i18n JS API
if($KI.i18n) {
	kony.i18n = {	
		deleteResourceBundle: $KI.i18n.deleteresourcebundle,
		getLocalizedString: $KI.i18n.getlocalizedstring,
		getCurrentLocale: $KI.i18n.getcurrentlocale,
		isResourceBundlePresent: $KI.i18n.isresourcebundlepresent,
		setCurrentLocale: $KI.i18n.setcurrentlocale,
		setCurrentLocaleAsync: $KI.i18n.setcurrentlocaleasync,
		setDefaultLocale: $KI.i18n.setdefaultlocale,
		setDefaultLocaleAsync: $KI.i18n.setdefaultlocaleasync,
		setResourceBundle: $KI.i18n.setresourcebundle,
		updateResourceBundle:$KI.i18n.updateresourcebundle,	
	    getCurrentDeviceLocale:$KI.i18n.getcurrentdevicelocale,
	    getSupportedLocales:$KI.i18n.getsupportedlocales,
	    isLocaleSupportedByDevice:$KI.i18n.islocalesupportedbydevice
	}
}

//LocalStorage JS API
if($KI.localstorage) {
	kony.store = {	
		key: $KI.localstorage.key,
		getItem: $KI.localstorage.getitem,
		removeItem: $KI.localstorage.removeitem,
		setItem: $KI.localstorage.setitem,
		clear: $KI.localstorage.clear,
		length: $KI.localstorage.length
	}
}

//Location JS API
if($KI.geolocation) {
	kony.location = {
		clearWatch: $KI.geolocation.clearwatch,
		getCurrentPosition: $KI.geolocation.getcurrentposition,
		watchPosition: $KI.geolocation.watchposition	
	}
}



//OS JS API
if($KI.os) {
	kony.os = {
		toNumber: $KI.os.tonumber,
		toCurrency: $KI.os.tocurrency,
		freeMemory: $KI.os.freememory,
		userAgent: $KI.os.useragent,
		deviceInfo: $KI.os.platform,  //TODO: properties are camelcase & additional properties are added
		hasGPSSupport: $KI.os.hasgpssupport,  //TODO
		hasCameraSupport: $KI.os.hascamerasupport,//TODO
		hasTouchSupport: $KI.os.hastouchsupport,//TODO
		hasOrientationSupport: $KI.os.hasorientationsupport,//TODO
		hasAccelerometerSupport: $KI.os.hasaccelerometersupport,//TODO
		getDeviceCurrentOrientation: $KI.os.getdevicecurrentorientation,
		httpheaders: $KI.os.httpheaders,
		getApplicationMode : $KI.os.getapplicationmode,
		setApplicationMode : $KI.os.setapplicationmode,
		setApplicationScrollMode : $KI.os.setapplicationscrollmode,
		getAppContext: $KI.os.getappcontext
	}
}

//Network JS API
if($KI.net) {
	kony.net = {
		HttpRequest         : $KI.net.HttpRequest,
		invokeServiceAsync  : $KI.net.invokeserviceasync,
		invokeService       : $KI.net.invokeService,
		cancel              : $KI.net.cancel,
		isNetworkAvailable  : $KI.net.isNetworkAvailable,
		setNetworkCallbacks : $KI.net.setNetworkCallbacks,
		getActiveNetworkType: $KI.net.getActiveNetworkType
	}
}

//PHONE JS API
if($KI.phone) {
	kony.phone = {
		sendSMS: $KI.phone.sendsms,  //TODO
		dial: $KI.phone.dial,
		openEmail: $KI.phone.openemail, //TODO
		openMediaGallery: $KI.phone.openmediagallery //TODO	
	}
}

//String JS API
if($KI.string) {
	kony.string = {
		rep: $KI.string.rep,
		reverse: $KI.string.reverse,
		trim: $KI.string.trim,
		equalsIgnoreCase: $KI.string.equalsignorecase,
		startsWith: $KI.string.startswith,
		endsWith: $KI.string.endswith,
		isNumeric: $KI.string.isnumeric,
		containsChars: $KI.string.containschars,
		containsOnlyGivenChars: $KI.string.containsonlygivenchars,
		containsNoGivenChars: $KI.string.containsnogivenchars,
		isAsciiAlpha: $KI.string.isasciialpha,
		isAsciiAlphaNumeric: $KI.string.isasciialphanumeric,
		isValidEmail: $KI.string.isvalidemail	
	}
}

//TIMER JS API
if($KI.timer) {
	kony.timer = {	
		schedule: $KI.timer.schedule,
		cancel: $KI.timer.cancel,
		setCallBack: $KI.timer.setcallback   
	}
}

//Theme JS API
if($KI.themes) {
	kony.theme = {
		createTheme: $KI.themes.createtheme,
		deleteTheme: $KI.themes.deletetheme,
		getCurrentThemeData: $KI.themes.getcurrentthemedata,
		getCurrentTheme: $KI.themes.getcurrenttheme,
		getAllThemes: $KI.themes.allthemes,
		isThemePresent: $KI.themes.isthemepresent,
		setCurrentTheme: $KI.themes.setcurrenttheme,
	    packagedthemes:$KI.themes.packagedthemes
	}
}

kony.stream = {
    registerDataStream:tobeimplemented,
    deregisterDataStream:tobeimplemented,
    setCallback:tobeimplemented
};

kony.convertToBase64 = $KI.converttobase64; 
kony.convertToRawBytes = $KI.converttorawbytes; 
//kony.type = $KI.type; // TODO: Object should be returned in JS instead of table as in lua
kony.print = $KI.print;
kony.props = {};
kony.props.getProperty = $KI.props.getProperty;

