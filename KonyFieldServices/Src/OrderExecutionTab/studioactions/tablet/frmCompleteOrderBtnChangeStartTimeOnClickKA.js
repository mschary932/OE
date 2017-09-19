function frmCompleteOrderBtnChangeStartTimeOnClickKA(eventobject) {
    return AS_Button_7da59b9581e043b69594c219c2c0372f(eventobject);
}

function AS_Button_7da59b9581e043b69594c219c2c0372f(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showTimePopUpFlex");
}