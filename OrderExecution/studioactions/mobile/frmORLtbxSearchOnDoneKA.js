function frmORLtbxSearchOnDoneKA(eventobject, changedtext) {
    return AS_TextField_8117f8874b234afdbabd4b4a7cfca400(eventobject, changedtext);
}

function AS_TextField_8117f8874b234afdbabd4b4a7cfca400(eventobject, changedtext) {
    var instance = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var listController = instance.getFormController("frmOrderResourcesListKA");
    listController.performAction("doSearch");
}