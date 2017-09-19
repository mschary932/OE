function frmOrderViewBtnSeletfilterOnClickKA(eventobject, context) {
    return AS_Button_21cc8a0116064269890b316189268078(eventobject, context);
}

function AS_Button_21cc8a0116064269890b316189268078(eventobject, context) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmOrdersViewsKA");
    controller.performAction("checkUncheckFilter");
}