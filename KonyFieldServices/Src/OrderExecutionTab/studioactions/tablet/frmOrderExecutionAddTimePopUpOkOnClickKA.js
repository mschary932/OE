function frmOrderExecutionAddTimePopUpOkOnClickKA(eventobject) {
    return AS_Button_25974a7b340c4f0db70b6702e61cab5c(eventobject);
}

function AS_Button_25974a7b340c4f0db70b6702e61cab5c(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelAddTimeItemPopUp");
}