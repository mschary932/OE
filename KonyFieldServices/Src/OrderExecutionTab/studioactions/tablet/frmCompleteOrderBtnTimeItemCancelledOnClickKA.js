function frmCompleteOrderBtnTimeItemCancelledOnClickKA(eventobject) {
    return AS_Button_2090553763b941cb9b81ee22e3a39774(eventobject);
}

function AS_Button_2090553763b941cb9b81ee22e3a39774(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelAddTimeItemPopUp");
}