function AS_FlexContainer_4c29d948b2634b6c9543f4da949cc44d(eventobject, x, y) {
    var Controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    var formModel = Controller.getFormModel();
    formModel.setViewAttributeByProperty("flxTimePickerBg", "isVisible", true);
    Controller.performAction("schedulePopUpTime");
}