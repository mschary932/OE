function frmTaskResourcesListKAbtnOptionsKAonClick(eventobject) {
    return p2kwiet1234563580581_btnOptionsKA_onClick_seq0(eventobject);
}

function p2kwiet1234563580581_btnOptionsKA_onClick_seq0(eventobject) {
    try {
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
        controller.performAction("showFilters", [true]);
    } catch (e) {}
}