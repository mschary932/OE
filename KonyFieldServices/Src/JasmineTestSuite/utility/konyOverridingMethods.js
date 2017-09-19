
kony.appfoundation.v2.KonyApplicationContext.showLoadingScreen = function() {
	kony.appfoundation.print("Overrided 'Show loading screen' method");
	return;
}

kony.appfoundation.v2.KonyApplicationContext.dismissLoadingScreen = function(){
	kony.appfoundation.print("Overrided 'Dismiss loading screen' method");
	return;
}

var overrridedKonyFormShow = function(){
	kony.appfoundation.print("Overrided 'konyform.show' method");
	return;
}
var overridedgetChannelName = function(){
	var Channel = "mobile";
	kony.appfoundation.print("Overrided 'getChannelName()' method");
	return Channel;
}
var overridedgetPlatformName = function(){
	var Platform = "android";
	kony.appfoundation.print("Overrided 'getPlatformName()' method");
	return Platform;
}
var overriddenisAndroidTablet = function(){
	return false;
}
var overriddeninitializeAppSettings = function(APPtype){
	appType = APPtype;
	console.log("APPTYPE :",appType);
	if(appType === "salesforce"){
		/*frmLoginVA.kCrmUserIDVA.isVisible = false;
		frmLoginVA.line12669166102232.isVisible= false;
		frmLoginVA.kCrmPasswordVA.isVisible = false;
		frmLoginVA.line1984968924384.isVisible= false;
		frmLoginVA.textbox219849689244441.placeholder = "Cluster URL";*/
	}
	else if(appType === "standalone"){
	console.log("startsbajcbdsjk");
		//frmLoginVA.kCrmUserIDVA.isVisible = true;
		//frmLoginVA.kCrmPasswordVA.isVisible = true;
	}
	console.log("startend");
	//frmLoginVA.labelbuildnumber.text = kony.appfoundation.constants.version;
}
var overriddenloginAction = function(user,pass,tenat,tenantSuff,host,applicationSuccessCallback,applicationErrorCallback){
	var username = user;
	var password = pass;
	var tenant = tenat;
	var tenantSuffix = tenantSuff;
	//var hostName = host;
	var tenantSuffixLength = tenantSuffix.length;
	var isOnline = true;
	hostName = tenantSuffix;
	if(tenantSuffix.indexOf("saas.") === 0 && tenantSuffix.indexOf("konycloud.com") === (tenantSuffixLength - 13)){
		hostName = "https://" + tenant + "." +tenantSuffix;
		kony.appfoundation.constants["ISCLOUD"] = true;}		
	if(appType === "salesforce"){
		kony.appfoundation.SaaSApplication.login("", "", tenant, hostName, false, applicationSuccessCallback, applicationErrorCallback);
	}
	else{
		kony.appfoundation.SaaSApplication.login(username, password, tenant, hostName, false, applicationSuccessCallback, applicationErrorCallback);
	}
}
var overriddenreadTheLoginFlagSelection = function(response,succCallback,errCallback){

	finalSyncSuccCallbackLogin = succCallback;
	finalSyncErrCallbackLogin = errCallback;
	loginKey = "login";
	kony.appfoundation.log.info("selected loginKey is "+loginKey);
	var isProcessed = false;
	kony.appfoundation.log.info("response from authenticate service is *******",response);
	
	syncSessionToken = response.token;
	syncTenant = response.tenant;
	
	if(response !== undefined && response !== null){
		if(response["isTenantSyncEnabled"] !== undefined && response["isTenantSyncEnabled"] !== null 
			&& response["isTenantSyncEnabled"] === true){
			isOnline = false;
		}
		else{
			isOnline = true;
			return isProcessed;
		}
	}
	kony.appfoundation.log.debug("inside the selection  :: "+loginKey);
	
	if(loginKey === "login"){
		kony.appfoundation.checkAndSyncApplication(succCallback,errCallback);
	}
	else if(loginKey === "resetAfterLogin"){
		kony.appfoundation.initSyncSession(kony.appfoundation.initSuccessCallbackLogin, kony.appfoundation.initErrorCallbackLogin);
		kony.appfoundation.storeSyncInfo();
	}
	else if(loginKey === "rollbackAfterLogin"){
		kony.appfoundation.initSyncSession(kony.appfoundation.initSuccessCallbackLogin, kony.appfoundation.initErrorCallbackLogin);
		kony.appfoundation.storeSyncInfo();
	}
	else if(loginKey === "selectOption"){
		//do nothing
	}
}
kony.appfoundation.isNetworkAvailabile = function(){
	return true;
};
var overriddenisNetworkAvailable = function(net){
	return true;
}

kony.appfoundation.initializeHostSettings("http://127.0.0.1:9080");

kony.appfoundation.Utils.isIphone = function(){
	return true;
}

kony.appfoundation.Utils.isIpad = function(){
	return true;
}

$KI.type = function (arg) {
	return "null";
}

$KI.i18n.getlocalizedstring = function(i18nkey){
	var i18nValue = jQuery.i18n.prop(i18nkey);
	return typeof(i18nValue) === "undefined"? null : i18nValue.split('~|~')[0];
}