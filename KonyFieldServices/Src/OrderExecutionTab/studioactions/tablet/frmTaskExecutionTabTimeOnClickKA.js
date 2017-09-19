function frmTaskExecutionTabTimeOnClickKA(eventobject) {
    return AS_Button_903da1183fb54dd48441b295127f1ec6(eventobject);
}

function AS_Button_903da1183fb54dd48441b295127f1ec6(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showTimeSegment");
}