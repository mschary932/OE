function frmCompleteOrderListBoxProblem1OnSelectionKA(eventobject) {
    return AS_ListBox_71421a771394479e886da317d23e4f30(eventobject);
}

function AS_ListBox_71421a771394479e886da317d23e4f30(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("listSelection");
}