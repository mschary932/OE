function frmCompleteOrderbtnBackToCompleteOrder3OnClickKA(eventobject) {
    return AS_Button_05ab527efeff4de0805cdcb222e68097(eventobject);
}

function AS_Button_05ab527efeff4de0805cdcb222e68097(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showCancelPopUpFlex");
}