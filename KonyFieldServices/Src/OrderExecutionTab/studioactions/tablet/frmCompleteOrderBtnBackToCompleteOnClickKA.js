function frmCompleteOrderBtnBackToCompleteOnClickKA(eventobject) {
    return AS_Button_6c9c061eaeca4cbc99029ed75fdd15ee(eventobject);
}

function AS_Button_6c9c061eaeca4cbc99029ed75fdd15ee(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showCancelProgressPopUpFlex");
}