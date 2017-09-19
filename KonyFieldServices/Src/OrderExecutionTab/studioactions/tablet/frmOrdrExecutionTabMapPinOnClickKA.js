function frmOrdrExecutionTabMapPinOnClickKA(eventobject, x, y) {
    return AS_Image_f5d50a3858b6422994304c383096d980(eventobject, x, y);
}

function AS_Image_f5d50a3858b6422994304c383096d980(eventobject, x, y) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showMap");
}