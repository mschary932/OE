function frmMyOrderBtnBackToMapKA(eventobject) {
    return AS_Button_043cea2453b24128b85c1214430f91e3(eventobject);
}

function AS_Button_043cea2453b24128b85c1214430f91e3(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("backToMap");
}