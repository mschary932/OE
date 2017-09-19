function tmpResourcesSegChevronImgClick(eventobject, x, y) {
    return AS_Image_cda2094e1b2240baad448f1171601944(eventobject, x, y);
}

function AS_Image_cda2094e1b2240baad448f1171601944(eventobject, x, y) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onSegChevronClick");
}