var appPropertiesServiceManager = Class(AppInitServiceMangerInterface, {
    constructor: function() {},
    fetch: function(successcallback, errorCallback) {
        var uiConfigProvider = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getUIConfigDataProvider();
        uiConfigProvider.getAppMenuJson(successcallback, errorCallback);
    },
    apply: function(response, successcallback, errorCallback) {
        var appProperties = new kony.sdk.mvvm.ApplicationProperties();
        appProperties.setApplicationproperties(response);
        if (kony.sdk.mvvm.KonyApplicationContext.getAppInstance()) kony.sdk.mvvm.KonyApplicationContext.getAppInstance().setApplicationProperties(appProperties);
        successcallback();
    },
    execute: function(params, success, error) {
        var scopeObj = this;
        this.fetch(fetchSuccess, error);

        function fetchSuccess(response) {
            scopeObj.apply(response, success, error);
        }
    }
});