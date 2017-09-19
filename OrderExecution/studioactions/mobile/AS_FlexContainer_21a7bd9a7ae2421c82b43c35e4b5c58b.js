function AS_FlexContainer_21a7bd9a7ae2421c82b43c35e4b5c58b(eventobject) {
    var Controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    var formModel = Controller.getFormModel();
    Controller.performAction("scheduleDate");
    formModel.setViewAttributeByProperty("flxCalenderrBg", "isVisible", true);
}