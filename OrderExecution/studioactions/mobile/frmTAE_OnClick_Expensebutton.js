function frmTAE_OnClick_Expensebutton(eventobject) {
    return AS_Button_85e5034fc2c44cf092314020b1bee90d(eventobject);
}

function AS_Button_85e5034fc2c44cf092314020b1bee90d(eventobject) {
    frmTimeAndExpenseKA.BtnTimeKA.skin = sknBtnFF5D6EClanProNews28BackgroundFFFFFFKA;
    frmTimeAndExpenseKA.BtnBothKA.skin = sknBtnFF5D6EClanProNews28BackgroundFFFFFFKA;
    frmTimeAndExpenseKA.BtnExpenseKA.skin = sknBtnFFFFFFClanProNews28BackgroundFF5D6EKA;
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateToExpense");
}