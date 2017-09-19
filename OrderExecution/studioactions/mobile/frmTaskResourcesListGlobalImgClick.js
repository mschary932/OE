function frmTaskResourcesListGlobalImgClick(eventobject, x, y) {
    return AS_Image_0c7864ac51fd4500b7de72b6b57dff0e(eventobject, x, y);
}

function AS_Image_0c7864ac51fd4500b7de72b6b57dff0e(eventobject, x, y) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("triggerGlobalSearch");
}