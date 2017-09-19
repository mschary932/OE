function frmMyOrderImgPinOnClickKA(eventobject, x, y) {
    return AS_Image_84d830a0cd724823a77f3d09def18794(eventobject, x, y);
}

function AS_Image_84d830a0cd724823a77f3d09def18794(eventobject, x, y) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderBallonOnPinTap");
}