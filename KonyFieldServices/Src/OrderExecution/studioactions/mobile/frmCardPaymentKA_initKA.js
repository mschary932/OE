function frmCardPaymentKA_initKA(eventobject) {
    return AS_Form_8e08c649ad7747dea283ae97933e4dee(eventobject);
}

function AS_Form_8e08c649ad7747dea283ae97933e4dee(eventobject) {
    function handleRequestCallback(browserWidget, params) {
        kony.print("handleRequest event triggered");
        var result = params["originalURL"];
        var returnURL = "www.google.co.in";
        if (result.indexOf(returnURL) != -1) {
            var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
            var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
            var keyValues = result.split("?")[1].split("&");
            var keyValuesObj = {};
            for (var a in keyValues) {
                keyValuesObj[keyValues[a].split("=")[0]] = keyValues[a].split("=")[1];
            }
            var amount = keyValuesObj.amt;
            amount = decodeURI(amount);
            controller.performAction("createPaymentRecord", [amount]);
        }
        return false; //If false is returned, platform will load the originalurl in the browser widget.
    }
    frmCardPaymentKA.browserPayPalKA.handleRequest = handleRequestCallback;
}