function frmCompleteOrderBtnDoneFill3OnClickKA(eventobject) {
    return AS_Button_c9d2ac22a5d946fcab5243b1e9fa3f55(eventobject);
}

function AS_Button_c9d2ac22a5d946fcab5243b1e9fa3f55(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("suggestFillingRequiredData");
}