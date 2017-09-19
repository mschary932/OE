function frmTaskResourcesTbxSearchOnDoneKA(eventobject, changedtext) {
    return AS_TextField_b970e3aecb2c4fa8b5f9254513f8c580(eventobject, changedtext);
}

function AS_TextField_b970e3aecb2c4fa8b5f9254513f8c580(eventobject, changedtext) {
    var instance = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var listController = instance.getFormController("frmTaskResourcesListKA");
    listController.performAction("doSearch");
}