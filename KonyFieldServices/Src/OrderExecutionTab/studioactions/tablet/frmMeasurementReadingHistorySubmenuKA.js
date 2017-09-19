function frmMeasurementReadingHistorySubmenuKA(eventobject) {
    return AS_FlexContainer_dd126ef1c32144eb8a69a3262ad30521(eventobject);
}

function AS_FlexContainer_dd126ef1c32144eb8a69a3262ad30521(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showHistory");
}