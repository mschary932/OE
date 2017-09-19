function frmTaskExecutionBtnTimeAddOnClickKA(eventobject) {
    return AS_Button_58b3d60a043c481abe8caf978ee7e883(eventobject);
}

function AS_Button_58b3d60a043c481abe8caf978ee7e883(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showAddTimePopUp");
}