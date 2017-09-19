function frmMeasurementReadingsOnSwipeOnTouchStartKA(eventobject, x, y) {
    return AS_Segment_6b74a27a47ae4848981b2fdcf4993d2f(eventobject, x, y);
}

function AS_Segment_6b74a27a47ae4848981b2fdcf4993d2f(eventobject, x, y) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    controller.performAction("segmentOnTouchStart");
}