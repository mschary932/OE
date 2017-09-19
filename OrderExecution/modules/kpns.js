kony = kony || {};
kony.servicesapp = kony.servicesapp || {};
/**
For subscribe push notificaitons
*/
kony.servicesapp.subscribeKPNS = function(regId,ostype) {
	try{
		var credStore = kony.store.getItem(kony.sdk.mvvm.credStoreName);
		if(kony.os.deviceInfo().name === kony.servicesapp.IPHONE) {
			kony.servicesapp.kmsObject.register("iphone", kony.os.deviceInfo().deviceid, regId, credStore[kony.sdk.mvvm.credStoreUsername].toUpperCase(), kony.servicesapp.KPNSregCallback, kony.servicesapp.failureCallback);
		}else {
			kony.servicesapp.kmsObject.register("androidgcm", kony.os.deviceInfo().deviceid, regId, credStore[kony.sdk.mvvm.credStoreUsername].toUpperCase(), kony.servicesapp.KPNSregCallback, kony.servicesapp.failureCallback);
		}
	} catch(e) { 
		kony.sdk.mvvm.log.error("Error in Blogic subscribeKPNS : " + e);
	}
};
/**
For subscribe push notificaitons failure call back
*/
kony.servicesapp.failureCallback = function() {
	kony.sdk.mvvm.log.error("Error in Blogic failureCallback : ");
};
/**
For subscribe push notificaitons success call back
*/
kony.servicesapp.KPNSregCallback = function(status,result) {
	try{
		if(status["httpresponse"]["responsecode"]==200) {
			kony.store.setItem("isNotificationEnabled",true);
		} else {
			kony.store.setItem("isNotificationEnabled",false); 
		}
	}catch(e){
		kony.sdk.mvvm.log.error("Error in Blogic KPNSregCallback : " + e);
	}			
};
/**
For un subscribe push notificaitons
*/
kony.servicesapp.unsubscribeKPNS = function() {
  try {  
	kony.servicesapp.kmsObject.unregister(KPNSunregCallback, failureCallback);
  }catch(e) {
	  kony.sdk.mvvm.log.error("Error in Blogic unsubscribeKPNS : " + e);
  }
};
/**
For un subscribe push notificaitons success call back
*/
kony.servicesapp.KPNSunregCallback = function(status,result){
	try{
        var utilitiesObj = utilities.getUtilityObj();  
        var message = utilitiesObj.geti18nValueKA("i18n.kpns.unregisterMsg.valueKA");
        if(status["httpresponse"]["responsecode"]==200){	 
			kony.sdk.mvvm.Util.callAlert(message,"info", function(){}, "", "Ok","");
			kony.store.setItem("isNotificationEnabled",false);
		}else{ 
			kony.sdk.mvvm.Util.callAlert("Failed to unsubscribe from KPNS Server!!","info", function(){}, "", "Ok","");
		}
	} catch(e) {
	  kony.sdk.mvvm.log.error("Error in Blogic KPNSunregCallback : " + e);
    }
};
/**
For push notificaitons register
*/
kony.servicesapp.pushRegister = function() {
	try{
		var devName = kony.os.deviceInfo().name;
		if(devName == kony.servicesapp.ANDROID) {
			kony.servicesapp.callbackAndroidSetCallbacks();
			kony.servicesapp.callbackAndroidRegister();
		}else if((devName == kony.servicesapp.IPHONE)||(devName == "iPhone Simulator")) {
			kony.servicesapp.callbackiPhoneSetCallbacks();
			kony.servicesapp.callbackiPhoneRegister();
		}
	}catch(e){
		kony.sdk.mvvm.log.error("Error in Blogic pushRegister : " + e);
	}
};