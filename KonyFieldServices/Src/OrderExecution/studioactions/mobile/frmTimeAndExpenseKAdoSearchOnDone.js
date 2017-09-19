function frmTimeAndExpenseKAdoSearchOnDone(eventobject, changedtext) {
    return AS_TextField_9821c5bc6b3a49f49aa5b18a8a977775(eventobject, changedtext);
}

function AS_TextField_9821c5bc6b3a49f49aa5b18a8a977775(eventobject, changedtext) {
    var instance = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var listController = instance.getFormController("frmTimeAndExpenseKA");
    listController.performAction("doSearch");
}