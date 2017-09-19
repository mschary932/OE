function frmOrderExecutionViewFilterClearOnClickKA(eventobject) {
    return AS_Button_fda5f667985b488fb4f81d1c1bc31363(eventobject);
}

function AS_Button_fda5f667985b488fb4f81d1c1bc31363(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onHidePopUpCall");
}