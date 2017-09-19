function frmOrderResourcesListKAbtnOptionOnClick(eventobject) {
    return p2kwiet1234563580429_btnOptionsKA_onClick_seq0(eventobject);
}

function p2kwiet1234563580429_btnOptionsKA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showFilters", [true]);
}