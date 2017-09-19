function frmTimeAndExpenseKA_OnDeleteButton(eventobject, context) {
    return AS_Button_1e13e090bb0f476f97e5e091f0efe4fa(eventobject, context);
}

function AS_Button_1e13e090bb0f476f97e5e091f0efe4fa(eventobject, context) {
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var formModel = controller.getFormModel();
    formModel.setViewAttributeByProperty("flxDeleteKA", "isVisible", true);
}