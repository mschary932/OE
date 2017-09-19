function frmStockLocationsImgResourceChevronClick(eventobject, x, y) {
    return AS_Image_571968fe1a534a53a1178e65d7db88b5(eventobject, x, y);
}

function AS_Image_571968fe1a534a53a1178e65d7db88b5(eventobject, x, y) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateToResourceExecution");
}