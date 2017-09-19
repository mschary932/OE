function frmCompleteOrderBtnTimeAddOnClickKA(eventobject) {
    return AS_Button_c521aeb208e84e898b3f90a1de5d20f4(eventobject);
}

function AS_Button_c521aeb208e84e898b3f90a1de5d20f4(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showAddTimePopUp");
}