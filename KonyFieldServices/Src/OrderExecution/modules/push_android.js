/**
For push notificaiton - Android register call back
*/
kony.servicesapp.callbackAndroidRegister = function() {
	kony.push.register({
		senderid:kony.servicesapp.AndroidProjectForNotification
	});
};
/**
For push notificaiton - Android setting call backs
*/
kony.servicesapp.callbackAndroidSetCallbacks = function() {
 	kony.push.setCallbacks({
		onsuccessfulregistration: kony.servicesapp.regSuccessAndroidCallback, 
		onfailureregistration: kony.servicesapp.regFailureAndroidCallback, 
		onlinenotification: kony.servicesapp.onlinePushNotificationAndroidCallback, 
		offlinenotification: kony.servicesapp.offlinePushNotificationAndroidCallback, 
		onsuccessfulderegistration: kony.servicesapp.unregSuccessAndroidCallback, 
		onfailurederegistration: kony.servicesapp.unregFailureAndroidCallback 
	});
};
/**
For push notificaiton - Android register success call back
*/
kony.servicesapp.regSuccessAndroidCallback = function(regId) {
	kony.servicesapp.subscribeKPNS(regId,"androidgcm");
};
/**
For push notificaiton - Android register failure call back
*/
kony.servicesapp.regFailureAndroidCallback = function(errormsg) {
	kony.sdk.mvvm.log.error("************ JS regFailureCallback() called *********");
	kony.sdk.mvvm.log.error(errormsg);
};
/**
For Online push notificaiton - Android push call back
*/
kony.servicesapp.onlinePushNotificationAndroidCallback = function(msg) {
	kony.sdk.mvvm.log.info("************ JS onlinePushNotificationCallback() called *********");
	kony.servicesapp.triggerSync = function(){
		if (kony.sdk.mvvm.isNetworkAvailabile()) {
            kony.servicesapp.startManualSync(true, false);
        }
	};
	var parsed = new Function('return ' + msg["module"])();
	kony.sdk.mvvm.Util.callAlert(utilities.getUtilityObj().geti18nValueKA("i18n.common.kpnsNewMessageKA")+" "+parsed, "info", kony.servicesapp.triggerSync, "", "Ok", "");	
};
/**
For offline push notificaiton - Android push call back
*/
kony.servicesapp.offlinePushNotificationAndroidCallback = function(msg) {
	kony.sdk.mvvm.log.info("************ JS offlinePushNotificationCallback() called *********");
	kony.sdk.mvvm.log.info(msg);
	kony.sdk.mvvm.log.info("Message Received..\n "+msg["content"]);	
};
/**
For unsubscribe push notificaiton - Android call back
*/
kony.servicesapp.unregSuccessAndroidCallback = function() {
	kony.servicesapp.unsubscribeKPNS();
};
/**
For unsubscribe push notificaiton - Android failure call back
*/
kony.servicesapp.unregFailureAndroidCallback = function(errormsg) {
	alert("Unregistration Failed!!"); //CREATE I18N
	kony.sdk.mvvm.log.error(errormsg);	
};