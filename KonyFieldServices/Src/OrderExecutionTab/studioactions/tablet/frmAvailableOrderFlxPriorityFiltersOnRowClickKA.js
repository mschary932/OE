function frmAvailableOrderFlxPriorityFiltersOnRowClickKA(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_805d1f804ef94cf19f24f8d0b734c00a(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_805d1f804ef94cf19f24f8d0b734c00a(eventobject, sectionNumber, rowNumber) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showNoOfSelectedRows2");
}