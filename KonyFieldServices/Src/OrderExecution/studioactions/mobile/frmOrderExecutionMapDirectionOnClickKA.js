function frmOrderExecutionMapDirectionOnClickKA(eventobject, x, y) {
    return AS_Image_e169a974f2ce41b28596a19b237892e9(eventobject, x, y);
}

function AS_Image_e169a974f2ce41b28596a19b237892e9(eventobject, x, y) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showFrmDirectionKA");
}