function frmBillOfMaterialflxBackToOrderObjectOnCLickKA(eventobject) {
    return AS_FlexContainer_b10d4e9464104eb886c2ba6a1fb7fa64(eventobject);
}

function AS_FlexContainer_b10d4e9464104eb886c2ba6a1fb7fa64(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("backToFirst");
}