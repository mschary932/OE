function frmCompleteOrderSegResourcesListOnRowClickKA(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_e88d2d27741c4b61a9a5434351355e54(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_e88d2d27741c4b61a9a5434351355e54(eventobject, sectionNumber, rowNumber) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showResourceExecutionForm");
}