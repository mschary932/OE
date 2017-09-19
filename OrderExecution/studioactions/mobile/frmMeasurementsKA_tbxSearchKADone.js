function frmMeasurementsKA_tbxSearchKADone(eventobject, changedtext) {
    return AS_TextField_199498d76a0c42439759d388bc35bbff(eventobject, changedtext);
}

function AS_TextField_199498d76a0c42439759d388bc35bbff(eventobject, changedtext) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    controller.performAction("doSearch");
}