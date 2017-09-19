function frmOrderExecutionBtnCompleteKA(eventobject) {
    return AS_Button_49756e549ba64f2c870d625890df9f8a(eventobject);
}

function AS_Button_49756e549ba64f2c870d625890df9f8a(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showCompleteOrderForm");
}