function AS_Button_878ea2006cc74ae2a7e25e6f8fe66546(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelEditExpenseItemPopUp");
}