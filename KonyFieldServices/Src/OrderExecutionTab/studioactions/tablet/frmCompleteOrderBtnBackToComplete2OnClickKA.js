function frmCompleteOrderBtnBackToComplete2OnClickKA(eventobject) {
    return AS_Button_9376bc7a12f04410980883ac24a8f857(eventobject);
}

function AS_Button_9376bc7a12f04410980883ac24a8f857(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showCancelPopUpFlex");
}