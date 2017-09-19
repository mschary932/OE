function frmNewTaskBtnAddClickKA(eventobject) {
    return AS_Button_cbf2c279d3704401abc50a9db5ac2053(eventobject);
}

function AS_Button_cbf2c279d3704401abc50a9db5ac2053(eventobject) {
    var instance = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = instance.getFormController("frmNewTaskKA");
    controller.performAction("saveTaskKA");
}