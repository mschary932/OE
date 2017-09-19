function frmAvailableOrderSegAvailableOrdersOnRowClickKA(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_b2d9be712fef4ab48a6d91df59194ada(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_b2d9be712fef4ab48a6d91df59194ada(eventobject, sectionNumber, rowNumber) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showMyOrderListTabForm");
}