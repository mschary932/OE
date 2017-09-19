function frmAvailableOrderListMapCalloutKA(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_1206b248aec7497c911f66cc8ea57b77(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_1206b248aec7497c911f66cc8ea57b77(eventobject, sectionNumber, rowNumber) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderBallonOnPinTap");
}