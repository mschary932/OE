function frmOrderExecutionBtnBackFromMapOnClickKA(eventobject) {
    return AS_Button_1fb0930f53dd460b8b1f571372215383(eventobject);
}

function AS_Button_1fb0930f53dd460b8b1f571372215383(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("backFromMap");
}