kony = kony || {};
kony.servicesapp = kony.servicesapp || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.log = kony.sdk.mvvm.log || {};
kony.sdk.mvvm.constants = kony.sdk.mvvm.constants || {};
kony.servicesapp.loadAndConfigureApp = function(userID, backendUrl, success){
	//var backendUrl = "http://appsqa.konylabs.net/services/data/v1";
    if(backendUrl.charAt(4)==":")
    backendUrl = backendUrl.replace("/authService/100000002/appconfig","/services/data/v1");
     else
	backendUrl = kony.sdk.getCurrentInstance().mainRef.config.services_meta.OrderExecution.metadata_url.split("/services")[0]+"/services/data/v1";	
  	//     backendUrl=backendUrl.replace(".", "/qa-konycloud.com/services/data/v1"); 
    var contextObject = {};
	contextObject.type = "User";
	contextObject.userID = userID;
    AppConfigurationController.init(backendUrl);
	var appController = AppConfigurationController.getInstance(backendUrl);
	appController.getConfigurations(contextObject, function(configurationObject) {//"EAM_QA2"
		//SkinConfigHandller.getInstance().loadConfigurationBasedSkinsAndApply(configurationObject);
		//ImageAssetConfigHandler.getInstance().loadConfigurationBasedImages(configurationObject);
		PreferenceConfigHandeller.getInstance().loadConfigurationBasedPreferences(configurationObject);
		success();
	},kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY));
}

var SkinConfigHandller = (function(){
	var instance;
	function createInstance(){
		this.loadConfigurationBasedSkinsAndApply = function(configurationObject){
			var defTheme = kony.servicesapp.defaultTheme;//kony.theme.getCurrentThemeData();
				var jsonString = configurationObject.getConfigurationsBasedOnType("SKIN"); //JSON.stringify(theme);
				function onsuccesscallback() {}
				function onerrorcallback() {}
				for(var c in jsonString){
					jsonString[c] = JSON.parse(jsonString[c]);
				}
				kony.theme.createThemeFromJSONString(JSON.stringify(jsonString), "MyTheme1", onsuccesscallback, onerrorcallback);
				kony.theme.setCurrentTheme("MyTheme1", onsuccesscallback, onerrorcallback);
		};
	}
	return {
		getInstance : function(){
			if(!instance) instance = new createInstance();
			return instance;
		}
	}
})();

var ImageAssetConfigHandler = (function(){//ImageAssetConfigHandler
	var instance;
	function createInstance(){
		var imagesObject;
		this.loadConfigurationBasedImages = function(configurationObject){
				var imagesObject = configurationObject.getConfigurationsBasedOnType("IMAGE");
				function fetchImage(image){
					var httpclient = new kony.net.HttpRequest();
					httpclient.open(constants.HTTP_METHOD_GET, imagesObject[image]);
					httpclient.send();
					httpclient.onReadyStateChange = function() {
						if (this.readyState == constants.HTTP_READY_STATE_DONE) {
							var rb = httpclient.response;
							var myfile = new kony.io.File(kony.io.FileSystem.getDataDirectoryPath() + "/"+image+".jpg");
							myfile.write(rb, true);
						}
					}
				}
				for(var image in imagesObject){
					fetchImage(image);
				}
			//});
		};
		this.getImage = function(imageName){
			var imageFile = kony.io.FileSystem.getFile(kony.io.FileSystem.getDataDirectoryPath() + "/"+imageName+".jpg");
			return imageFile.read()!=undefined?imageFile.read():null;
		};

	}
	return {
		getInstance : function(){
			if(!instance) instance = new createInstance();
			return instance;
		}
	}
})();

var PreferenceConfigHandeller = (function(){
	var instance;
	function createInstance(){
	    var preferences = {};
		this.loadConfigurationBasedPreferences = function(configurationObject){
			var preference = configurationObject.getConfigurationsBasedOnType("PREFERENCE");
          	preferences = preference;
		};
		this.getPreferenceValue = function(key){
			var pref = preferences[key]!=undefined?preferences[key]:null;
          return pref;
		}
	}
	return{
		getInstance : function(){
			if(!instance) instance = new createInstance();
			return instance;
		}
	}

})();
