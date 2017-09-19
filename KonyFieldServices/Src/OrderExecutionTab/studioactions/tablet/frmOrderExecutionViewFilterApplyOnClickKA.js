function frmOrderExecutionViewFilterApplyOnClickKA(eventobject) {
    return AS_Button_c5a8ddcd746c4f8e8d7e5340b3716908(eventobject);
}

function AS_Button_c5a8ddcd746c4f8e8d7e5340b3716908(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onHidePopUpCall");
}