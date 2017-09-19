function frmTAE_OnClick_Bothbutton(eventobject) {
    return AS_Button_0d6542d1500c49769b3a4182b927bea8(eventobject);
}

function AS_Button_0d6542d1500c49769b3a4182b927bea8(eventobject) {
    frmTimeAndExpenseKA.BtnTimeKA.skin = sknBtnFF5D6EClanProNews28BackgroundFFFFFFKA;
    frmTimeAndExpenseKA.BtnBothKA.skin = sknBtnFFFFFFClanProNews28BackgroundFF5D6EKA;
    frmTimeAndExpenseKA.BtnExpenseKA.skin = sknBtnFF5D6EClanProNews28BackgroundFFFFFFKA;
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateToBoth");
}