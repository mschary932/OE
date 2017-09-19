function switch3CallBack(eventobject) {
    return AS_TPW_46aadbffdd714db9a625266d08dda0f1(eventobject);
}

function AS_TPW_46aadbffdd714db9a625266d08dda0f1(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmWorkConfirmationKA");
    controller.performAction("switchSlideCallback", ["3"]);
}