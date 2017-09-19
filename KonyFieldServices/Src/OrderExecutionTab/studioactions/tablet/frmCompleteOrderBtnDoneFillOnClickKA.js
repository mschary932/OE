function frmCompleteOrderBtnDoneFillOnClickKA(eventobject) {
    return AS_Button_f2724c3aacef436b853a9b2c07b8337c(eventobject);
}

function AS_Button_f2724c3aacef436b853a9b2c07b8337c(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("suggestFillingRequiredData");
}