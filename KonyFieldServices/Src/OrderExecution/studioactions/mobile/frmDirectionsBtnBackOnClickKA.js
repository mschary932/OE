function frmDirectionsBtnBackOnClickKA(eventobject) {
    return AS_Button_55fc2e89f20249dc80260a0ca2d09aa3(eventobject);
}

function AS_Button_55fc2e89f20249dc80260a0ca2d09aa3(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showPreviousForm", [true]);
}