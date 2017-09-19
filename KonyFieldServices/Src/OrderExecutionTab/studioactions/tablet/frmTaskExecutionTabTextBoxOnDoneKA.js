function frmTaskExecutionTabTextBoxOnDoneKA(eventobject, changedtext) {
    return AS_TextField_41a76720917d4e298dc6555e58d171c3(eventobject, changedtext);
}

function AS_TextField_41a76720917d4e298dc6555e58d171c3(eventobject, changedtext) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOnlineCallsFlex");
}