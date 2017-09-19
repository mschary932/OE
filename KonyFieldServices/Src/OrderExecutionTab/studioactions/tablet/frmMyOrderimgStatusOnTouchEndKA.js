function frmMyOrderimgStatusOnTouchEndKA(eventobject, x, y) {
    return AS_Image_d960a81ee23b4ee194ac20eaf3c41dc8(eventobject, x, y);
}

function AS_Image_d960a81ee23b4ee194ac20eaf3c41dc8(eventobject, x, y) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderBallonOnPinTap");
}