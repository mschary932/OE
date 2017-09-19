function frmCompleteOrderSegResourcesListOnClickKA(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_75aa96edd74f488abd1807965b3bebaf(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_75aa96edd74f488abd1807965b3bebaf(eventobject, sectionNumber, rowNumber) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showResourceExecutionForm");
}