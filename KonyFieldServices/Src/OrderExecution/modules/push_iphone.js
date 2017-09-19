/**
For push notificaiton - IPhone register call back
*/
kony.servicesapp.callbackiPhoneRegister = function() {
	kony.push.register([0, 1, 2]);
};
/**
For push notificaiton - IPhone setting call backs
*/
kony.servicesapp.callbackiPhoneSetCallbacks = function() {
	var callbacksTable = {
		onsuccessfulregistration: kony.servicesapp.regSuccessiPhoneCallback, 
		onfailureregistration: kony.servicesapp.regFailureiPhoneCallback, 
		onlinenotification: kony.servicesapp.onlinePushNotificationiPhoneCallback, 
		offlinenotification: kony.servicesapp.offlinePushNotificationiPhoneCallback, 
		onsuccessfulderegistration: kony.servicesapp.unregSuccessiPhoneCallback, 
		onfailurederegistration: kony.servicesapp.unregFailureiPhoneCallback
	}; 
	kony.push.setCallbacks(callbacksTable);
};
/**
For push notificaiton - IPhone register success call back
*/
kony.servicesapp.regSuccessiPhoneCallback = function(regId) {
    kony.servicesapp.subscribeKPNS(regId,"iphone");
};
/**
For push notificaiton - IPhone register failure call back
*/
kony.servicesapp.regFailureiPhoneCallback = function(errormsg) {
	kony.sdk.mvvm.log.info("************ JS regFailureCallback() called *********");
	kony.sdk.mvvm.log.info(errormsg);
};
/**
For Online push notificaiton - IPhone push call back
*/
kony.servicesapp.onlinePushNotificationiPhoneCallback = function(msg) {
	kony.sdk.mvvm.log.info("************ JS onlinePushNotificationCallback() called *********");
	kony.servicesapp.triggerSync = function(){
		if (kony.sdk.mvvm.isNetworkAvailabile()) {
            kony.servicesapp.startManualSync(true,false);
        }
	};
	var parsed = new Function('return ' + msg["module"])();
	kony.sdk.mvvm.Util.callAlert(utilities.getUtilityObj().geti18nValueKA("i18n.common.kpnsNewMessageKA")+" "+parsed, "info", kony.servicesapp.triggerSync, "", "Ok", "");
};
/**
For offline push notificaiton - IPhone push call back
*/
kony.servicesapp.offlinePushNotificationiPhoneCallback  = function(msg) {
	kony.sdk.mvvm.log.info("************ JS offlinePushNotificationCallback() called *********");
	var msgs = new Array();
	for(var key in msg)
		msgs.push({"lblkey":key,"lblval":msg[key]});
	kony.sdk.mvvm.log.info(msg);
};
/**
For unsubscribe push notificaiton - IPhone call back
*/
kony.servicesapp.unregSuccessiPhoneCallback = function() {
    alert("Unregisterd Sucesfully!!"); //CREATE I18N
	kony.servicesapp.unsubscribeKPNS();
};
/**
For unsubscribe push notificaiton - IPhone failure call back
*/
kony.servicesapp.unregFailureiPhoneCallback = function(errormsg) {
	alert("Unregistration Failed!!"); //CREATE I18N
	alert("Error message: " + JSON.stringify(errormsg)); //CREATE I18N
	kony.sdk.mvvm.log.error(errormsg);
};