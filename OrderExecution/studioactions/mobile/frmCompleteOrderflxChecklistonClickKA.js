function frmCompleteOrderflxChecklistonClickKA(eventobject) {
    return AS_FlexContainer_890136ced0d54df4a855703ca4a448f4(eventobject);
}

function AS_FlexContainer_890136ced0d54df4a855703ca4a448f4(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCompleteOrderKA");
    controller.performAction("showCheckListform");
}