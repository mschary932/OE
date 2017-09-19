function frmMyOrderbtnMediumOnClickKA(eventobject) {
    return AS_Button_7f49c0089c8e4021adbac2528bd7837c(eventobject);
}

function AS_Button_7f49c0089c8e4021adbac2528bd7837c(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onPriorityFilterClick", ['btnMediumKA']);
}