function frmAvailableOrderBtnBackToMapKA(eventobject) {
    return AS_Button_2088660b5a914e2eb95d0b87d84ef7b6(eventobject);
}

function AS_Button_2088660b5a914e2eb95d0b87d84ef7b6(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("backToMap");
}