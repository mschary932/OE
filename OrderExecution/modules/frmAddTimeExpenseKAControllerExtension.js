/** 
 *	In this class, developer can change/override the existing methods or can create new methods if required
 */
/*
 * bussiness/orchestration/mediation logic class for frmAddTimeExpenseKA.
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmAddTimeExpenseKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
      	var taskId = null;
    },    
    fetchData: function() {
        try {
            var scopeObj = this;
          	scopeObj.recordID =scopeObj.getController().getContextData().getCustomInfo("recordID");
            scopeObj.$class.$superp.fetchData.call(scopeObj, success, error);
        } catch (err) {
            kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension"+err.toString());
        }
        function success(response) {
            kony.sdk.mvvm.log.info("success fetching data ", response);
            scopeObj.bindData(response);
        }
        function error(err) {
            kony.sdk.mvvm.log.info("In fetchData errorcallback in controller extension "+JSON.stringify(err));
        }
    },    
  	bindData:function(data)
  	{
  		var formmodel=this.getController().getFormModel();
      	formmodel.showView();
	},
    navigateTo: function(formId, navObject) {
        this.$class.$superp.navigateTo.call(this, formId, navObject);
    },
    navigateBack: function() {
        try {
            this.$class.$superp.showPreviousForm.call(this, true, "frmTimeAndExpenseKA");
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateBack action : " + err);
        }
    },
  	
  	  navigateToAddScreen: function(flag)
   {
        try {
            var scopeObj = this;
          	var recordInfo = scopeObj.getController().getContextData().getCustomInfo("woTimeExpnsInfo");
            var formmodel = scopeObj.getController().getFormModel();                                    
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            navigationObject.setDataModel(null, kony.sdk.mvvm.OperationType.ADD, "form");
          	//navigationObject.addCustomInfo("from","ADD");
           	//scopeObj.navigateTo("frmAddEditTimeItemKA", navigationObject);
            navigationObject.addCustomInfo("Navigation", "List");
            navigationObject.addCustomInfo("woTimeExpnsInfo", recordInfo);
          	if(flag === "Time")
              {
                navigationObject.addCustomInfo("from","ADD");
           		  scopeObj.navigateTo("frmAddEditTimeItemKA", navigationObject);
              }
          	else
              {
               	navigationObject.addCustomInfo("ExpenseHeader","Add Expense Item");
           		  scopeObj.navigateTo("frmAddEditExpenseItemKA", navigationObject);
               
              }
        
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateToAddEditTime/ExpenseForm from AddTimeExpenseKA: " + err);
        }
    }
});