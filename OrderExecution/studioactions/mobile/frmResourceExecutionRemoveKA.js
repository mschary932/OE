function frmResourceExecutionRemoveKA(eventobject) {
    return p2kwiet1234563580488_btnDeleteKA_onClick_seq0(eventobject);
}

function p2kwiet1234563580488_btnDeleteKA_onClick_seq0(eventobject) {
    try {
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var controller = INSTANCE.getFormController("frmResourceExecutionKA");
        controller.performAction("updateQuantity", [false]);
    } catch (err) {}
}