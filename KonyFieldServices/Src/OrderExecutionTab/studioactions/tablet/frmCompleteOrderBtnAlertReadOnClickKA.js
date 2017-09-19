function frmCompleteOrderBtnAlertReadOnClickKA(eventobject) {
    return AS_Button_4b8213f375ca473191f67ecc277e6259(eventobject);
}

function AS_Button_4b8213f375ca473191f67ecc277e6259(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("continueFillingRequiredData");
}