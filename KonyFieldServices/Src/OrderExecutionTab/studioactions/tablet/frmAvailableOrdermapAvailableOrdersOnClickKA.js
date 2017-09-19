function frmAvailableOrdermapAvailableOrdersOnClickKA(eventobject, location) {
    return AS_Map_8e84220871064dc5866a8e53ad049bd0(eventobject, location);
}

function AS_Map_8e84220871064dc5866a8e53ad049bd0(eventobject, location) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("hideOrderBallonOnPinTap");
}