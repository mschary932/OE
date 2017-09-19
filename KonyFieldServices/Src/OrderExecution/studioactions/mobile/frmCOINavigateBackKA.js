function frmCOINavigateBackKA(eventobject) {
    return AS_Button_f2274af9550e4057a27103d3362f4958(eventobject);
}

function AS_Button_f2274af9550e4057a27103d3362f4958(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack");
}