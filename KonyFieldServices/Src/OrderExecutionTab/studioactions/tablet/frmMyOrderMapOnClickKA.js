function frmMyOrderMapOnClickKA(eventobject, location) {
    return AS_Map_73f3460ea9cb4b0db022324e455503ce(eventobject, location);
}

function AS_Map_73f3460ea9cb4b0db022324e455503ce(eventobject, location) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("hideOrderBallonOnPinTap");
}