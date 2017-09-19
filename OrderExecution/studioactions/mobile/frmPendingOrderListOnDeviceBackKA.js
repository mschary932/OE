function frmPendingOrderListOnDeviceBackKA(eventobject) {
    return AS_Form_90851bf424834bd5800b815d6b3dc526(eventobject);
}

function AS_Form_90851bf424834bd5800b815d6b3dc526(eventobject) {
    if (hamburgerMenu.IS_MENU_SHOWN) {
        new hamburgerMenu().execute();
    } else {
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var controller = INSTANCE.getFormController("frmOrderExecutionKA");
        controller.performAction("showPreviousForm", [true]);
    }
}