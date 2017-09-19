function frmOrderExecAddExpenseItemPopUpCancelKA(eventobject) {
    return AS_Button_f390936413c448c7865a0184e59920d0(eventobject);
}

function AS_Button_f390936413c448c7865a0184e59920d0(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelAddExpenseItemPopUp");
}