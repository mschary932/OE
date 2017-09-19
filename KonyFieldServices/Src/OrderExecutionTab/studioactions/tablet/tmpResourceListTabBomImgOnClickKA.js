function tmpResourceListTabBomImgOnClickKA(eventobject, x, y) {
    return AS_Image_b39ac7d464b34a2784cdc850cb45097b(eventobject, x, y);
}

function AS_Image_b39ac7d464b34a2784cdc850cb45097b(eventobject, x, y) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showBomFlex");
}