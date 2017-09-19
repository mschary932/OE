function frmCompleteOrderbtnBackToCompleteOrderOnClickKA(eventobject) {
    return AS_Button_766b8bd63a094620856a1c0fa6b680d1(eventobject);
}

function AS_Button_766b8bd63a094620856a1c0fa6b680d1(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showCancelPopUpFlex");
}