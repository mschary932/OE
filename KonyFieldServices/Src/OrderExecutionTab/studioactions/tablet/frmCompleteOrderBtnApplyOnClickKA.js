function frmCompleteOrderBtnApplyOnClickKA(eventobject) {
    return AS_Button_73be8a1f27c640728626d3ec45b61a3e(eventobject);
}

function AS_Button_73be8a1f27c640728626d3ec45b61a3e(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onHidePopUpCall");
}