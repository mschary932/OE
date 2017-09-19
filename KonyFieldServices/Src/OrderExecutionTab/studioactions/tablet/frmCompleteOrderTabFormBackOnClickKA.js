function frmCompleteOrderTabFormBackOnClickKA(eventobject) {
    return AS_Button_d75ce7c592d541008574d40dd2745848(eventobject);
}

function AS_Button_d75ce7c592d541008574d40dd2745848(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showTaskExecutionForm");
}