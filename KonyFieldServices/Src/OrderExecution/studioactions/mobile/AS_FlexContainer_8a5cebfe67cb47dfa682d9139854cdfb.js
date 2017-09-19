function AS_FlexContainer_8a5cebfe67cb47dfa682d9139854cdfb(eventobject) {
    var Controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    var formModel = Controller.getFormModel();
    Controller.performAction("scheduleDate");
    formModel.setViewAttributeByProperty("flxCalenderrBg", "isVisible", true);
}