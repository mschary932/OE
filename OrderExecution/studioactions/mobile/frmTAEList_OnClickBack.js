function frmTAEList_OnClickBack(eventobject) {
    return AS_Button_ab04c6bb417e462b914d6993ae0b8837(eventobject);
}

function AS_Button_ab04c6bb417e462b914d6993ae0b8837(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack");
}