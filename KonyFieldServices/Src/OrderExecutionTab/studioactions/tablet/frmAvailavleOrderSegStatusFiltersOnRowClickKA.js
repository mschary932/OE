function frmAvailavleOrderSegStatusFiltersOnRowClickKA(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_bc1a6fc3881f4d53b738bd666b72d28f(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_bc1a6fc3881f4d53b738bd666b72d28f(eventobject, sectionNumber, rowNumber) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showNoOfSelectedRows");
}