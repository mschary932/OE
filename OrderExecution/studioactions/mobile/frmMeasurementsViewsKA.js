function frmMeasurementsViewsKA(eventobject) {
    return AS_Button_28d12f7051a24285b39ce3df39a534bc(eventobject);
}

function AS_Button_28d12f7051a24285b39ce3df39a534bc(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    controller.performAction("applyViews", [true]);
}