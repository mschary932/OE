function frmMyOrderbtnPausedFOnClickKA(eventobject) {
    return AS_Button_58f6702d63034da7b1730933eb88f2c4(eventobject);
}

function AS_Button_58f6702d63034da7b1730933eb88f2c4(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onStatusFilterClick", ['btnPausedFKA']);
}