function frmMyOrderimgStatusOnClickKA(eventobject, x, y) {
    return AS_Image_640d7c5e18fe4b198881732b7ef21abb(eventobject, x, y);
}

function AS_Image_640d7c5e18fe4b198881732b7ef21abb(eventobject, x, y) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderExecutionForm");
}