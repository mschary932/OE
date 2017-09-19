function frmMyOrderImgStatusAOnClickKA(eventobject, x, y) {
    return AS_Image_4296dea08f5342ccb89b79c3271eb572(eventobject, x, y);
}

function AS_Image_4296dea08f5342ccb89b79c3271eb572(eventobject, x, y) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderExecutionForm");
}