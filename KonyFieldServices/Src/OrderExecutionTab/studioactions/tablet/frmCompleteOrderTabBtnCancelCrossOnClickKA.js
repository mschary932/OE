function frmCompleteOrderTabBtnCancelCrossOnClickKA(eventobject) {
    return AS_Button_97c63b82bc5e42c3ad08a19fb1d83520(eventobject);
}

function AS_Button_97c63b82bc5e42c3ad08a19fb1d83520(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelConfirmationAndCancelPopUp");
}