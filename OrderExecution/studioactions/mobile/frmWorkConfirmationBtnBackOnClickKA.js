function frmWorkConfirmationBtnBackOnClickKA(eventobject) {
    return AS_Button_63dd8b4ce9cd41f0a05809a47af55b92(eventobject);
}

function AS_Button_63dd8b4ce9cd41f0a05809a47af55b92(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmWorkConfirmationKA");
    controller.performAction("cancelOrderComplete");
}