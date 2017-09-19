function AS_FlexContainer_2de9998db7764544bcb75ee38a226eda(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOnePendingTasks");
}