function btnDeleteResConfirmOnClickKA(eventobject) {
    return AS_Button_e4ddac650bea4511b2418445235319a6(eventobject);
}

function AS_Button_e4ddac650bea4511b2418445235319a6(eventobject) {
    if (kony.application.getCurrentForm().id == "frmStockLocationListKA" || kony.application.getCurrentForm().id == "frmStockLocationDetailsKA" || kony.application.getCurrentForm().id == "frmResourceExecutionKA") {
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
        var formModel = controller.getFormModel();
        formModel.performActionOnView("flexDetailsKA", "setEnabled", [true]);
        formModel.performActionOnView("btnBackKA", "setEnabled", [true]);
        if (kony.application.getCurrentForm().id == "frmStockLocationDetailsKA") {
            controller.performAction("navigateBackToSearchScreen", [false]);
        } else {
            showHideHamburgerMenuKA(kony.application.getCurrentForm(), frmHamburgerMenuWOKA, false, "flxDeleteKA");
            showHideHamburgerMenuKA(kony.application.getCurrentForm(), frmHamburgerMenuWOKA, false, "flxEditKA");
        }
    } else {
        var resourcesUtility = ResourcesUtility.getUtilityObj();
        /*  var section = kony.servicesapp.currIndices["secIndex"];
          var row = kony.servicesapp.currIndices["rowIndex"];
          var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
          var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
          var formmodel = controller.getFormModel();
          var rowData = formmodel.getViewAttributeByProperty("segSwipeKA", "data")[section][1][row];
          //showHideHamburgerMenuKA(kony.application.getCurrentForm(),frmHamburgerMenuWOKA,false,"flxDeleteKA");
          formmodel.performActionOnView("flexDetailsKA", "setEnabled", [true]);
          formmodel.performActionOnView("btnBackKA", "setEnabled", [true]);*/
        resourcesUtility.deleteQuantity(0);
    }
}