function frmTaskExecutionMaterialTempPlusOnClickKA(eventobject, context) {
    return AS_Button_97a57949210741d88d57c8670d41ef4e(eventobject, context);
}

function AS_Button_97a57949210741d88d57c8670d41ef4e(eventobject, context) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showStockLocationsFlex");
}