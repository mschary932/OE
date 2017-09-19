function frmMyOrderBtnPanicOnClickKA(eventobject) {
    return AS_Button_c7bcad550f9b48158b5764b05354de3f(eventobject);
}

function AS_Button_c7bcad550f9b48158b5764b05354de3f(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showPanicScreen");
}