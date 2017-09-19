function AS_Button_f8349ce224124f9d845153533359a5ab(eventobject, context) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("acceptPendingOrderKA");
}