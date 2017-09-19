function frmCompleteOrderlblProblemSolvedValOnTouchEndKA(eventobject, x, y) {
    return AS_Label_3e2781a317524c158e1674f195203096(eventobject, x, y);
}

function AS_Label_3e2781a317524c158e1674f195203096(eventobject, x, y) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showDatePopUpFlex");
}