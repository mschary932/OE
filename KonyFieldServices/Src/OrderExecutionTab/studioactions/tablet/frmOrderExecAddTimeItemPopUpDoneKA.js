function frmOrderExecAddTimeItemPopUpDoneKA(eventobject) {
    return AS_Button_2ae9e4eaefbf454fa02f06d5fab5edb5(eventobject);
}

function AS_Button_2ae9e4eaefbf454fa02f06d5fab5edb5(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelAddTimeItemPopUp");
}