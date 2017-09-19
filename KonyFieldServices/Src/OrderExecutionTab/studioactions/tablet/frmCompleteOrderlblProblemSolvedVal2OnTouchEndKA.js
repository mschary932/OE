function frmCompleteOrderlblProblemSolvedVal2OnTouchEndKA(eventobject, x, y) {
    return AS_Label_9aea1317abb244c9b7a9df8d0508bebb(eventobject, x, y);
}

function AS_Label_9aea1317abb244c9b7a9df8d0508bebb(eventobject, x, y) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showTimePopUpFlex");
}