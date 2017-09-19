function frmTaskResourcesSegOnRowClickKA(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_492e1ab244b44a9c97efdfc275cc921a(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_492e1ab244b44a9c97efdfc275cc921a(eventobject, sectionNumber, rowNumber) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onSegRowClick");
}