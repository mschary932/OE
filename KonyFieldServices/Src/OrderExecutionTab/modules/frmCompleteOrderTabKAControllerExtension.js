/** 
 *	In this class, developer can change/override the existing methods or can create new methods if required
 */
/*
 * bussiness/orchestration/mediation logic class for frmDetailsKA.
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
var animationInProgress = false;
var paymentsDone = true;
var nextFlow;
kony.sdk.mvvm.frmCompleteOrderTabKAControllerExtension = Class(kony.sdk.mvvm.BaseFormControllerExtension, {
	constructor: function(controllerObj) {
		this.$class.$super.call(this, controllerObj);
	},
	fetchData: function() {
		try {
			var scopeObj = this;
			this.$class.$superp.fetchData.call(this, success, error);
		} catch (err) {
			kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
		}
	},
	bindData: function(data) {
		try {
			var formModel = this.getController().getFormModel();
			formModel.showView();
		} catch (err) {
			kony.sdk.mvvm.log.error("Error in bindData of controllerExtension");
		}
	},
	fetchMasterData: function(successcallback, errorcallback) {
		try {
			this.$class.$superp.fetchMasterData.call(this, successcallback, errorcallback);
		} catch (e) {
			kony.sdk.mvvm.log.error("Error in fetchingMasterData", e);
		}
	},
	fetchMasterDataForWidget: function(propertyId, contextData, successcallback, errorcallback) {
		try {
			this.$class.$superp.fetchMasterDataForWidget.call(this, propertyId, contextData, successcallback, errorcallback);
		} catch (e) {
			kony.sdk.mvvm.log.error("Error in fetchingMasterDataForWidget", e);
		}
	},
	saveData: function() {
		var scopeObj = this;
		this.$class.$superp.saveData.call(this, success, error);
	},
	deleteData: function() {
		try {
			var scopeObj = this;
			this.$class.$superp.deleteData.call(this, success, error);
		} catch (err) {
			kony.sdk.mvvm.log.error(exception.toString());
		}
	},
	submenu: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
	  formModel.setViewAttributeByProperty("flexOrderCompletionKA", "skin", "sknFlexSubmenuKA");
      formModel.setViewAttributeByProperty("flexIndicatorOneKA", "isVisible", false);
	  formModel.setViewAttributeByProperty("flexTimeExpenseKA", "skin", "sknFlexSubmenuKA");
      formModel.setViewAttributeByProperty("flexIndicator6KA", "isVisible", false);
	  formModel.setViewAttributeByProperty("flexOrderSummaryKA", "skin", "sknFlexSubmenuKA");
      formModel.setViewAttributeByProperty("flexIndicator1KA", "isVisible", false);
	  formModel.setViewAttributeByProperty("flexOrderHistoryKA", "skin", "sknFlexSubmenuKA");
      formModel.setViewAttributeByProperty("flexIndicator2KA", "isVisible", false);
	  formModel.setViewAttributeByProperty("flexOrderResourcesKA", "skin", "sknFlexSubmenuKA");
      formModel.setViewAttributeByProperty("flexIndicator3KA", "isVisible", false);
	  formModel.setViewAttributeByProperty("flexAttachmentsKA", "skin", "sknFlexSubmenuKA");
      formModel.setViewAttributeByProperty("flexIndicator4KA", "isVisible", false);
	  formModel.setViewAttributeByProperty("flexImagesKA", "skin", "sknFlexSubmenuKA");
      formModel.setViewAttributeByProperty("flexIndicator5KA", "isVisible", false);	  
	},
	showOrderSummary: function() {
		var scopeObj = this;
			var formModel = scopeObj.getController().getFormModel();
		if (animationInProgress == false && paymentsDone == false) {
			formModel.setViewAttributeByProperty("flexPaymentInterruptPopUpKA", "isVisible", true);
			nextFlow=scopeObj.showOrderSummary;
		}
		if (animationInProgress == false && paymentsDone == true) {
			scopeObj.submenu();
			formModel.setViewAttributeByProperty("flexOrderSummaryKA", "skin", "sknFlexSubmenuActiveBackgroundKA");
			formModel.setViewAttributeByProperty("flexIndicator1KA", "isVisible", true);
			scopeObj.hideFlex();
			scopeObj.showFlex(frmCompleteOrderTabKA.flexOrderSummaryMainKA);
		}
	},
	showOrderCompletion: function() {
		var scopeObj = this;
			var formModel = scopeObj.getController().getFormModel();
		if (animationInProgress == false && paymentsDone == false) {
			formModel.setViewAttributeByProperty("flexPaymentInterruptPopUpKA", "isVisible", true);
			nextFlow=scopeObj.showOrderCompletion;
		}
		if (animationInProgress == false && paymentsDone == true) {
			scopeObj.submenu();
			formModel.setViewAttributeByProperty("flexOrderCompletionKA", "skin", "sknFlexSubmenuActiveBackgroundKA");
			formModel.setViewAttributeByProperty("flexIndicatorOneKA", "isVisible", true);
			scopeObj.hideFlex();
			scopeObj.showFlex(frmCompleteOrderTabKA.flexOrderCompletionMainKA);
		}
	},
	
	showTimeExpense: function() {
		var scopeObj = this;
			var formModel = scopeObj.getController().getFormModel();
		if (animationInProgress == false && paymentsDone == false) {
			formModel.setViewAttributeByProperty("flexPaymentInterruptPopUpKA", "isVisible", true);
			nextFlow=scopeObj.showTimeExpense;
		}
		if (animationInProgress == false && paymentsDone == true) {
			 formModel.setViewAttributeByProperty("btnTimeKA", "skin", "sknBtnTimeExpenseKA");
			formModel.setViewAttributeByProperty("btnExpenseKA", "skin", "sknBtnTimeExpenseKA");
			formModel.setViewAttributeByProperty("btnBothKA", "skin", "sknBtnTimeExpenseFocusKA");
			scopeObj.submenu();
			formModel.setViewAttributeByProperty("flexTimeExpenseKA", "skin", "sknFlexSubmenuActiveBackgroundKA");
			formModel.setViewAttributeByProperty("flexIndicator6KA", "isVisible", true);
			scopeObj.hideFlex();
			scopeObj.showFlex(frmCompleteOrderTabKA.flexTimeExpenseMainKA);
		}
	},
	closeAddTimeExpense: function() {		
	  var scopeObj = this;
	  var formModel = scopeObj.getController().getFormModel();
	  
		formModel.setViewAttributeByProperty("flexAddTimeExpenseKA", "isVisible", false);
	 },

	 showAddTimeExpense: function() {
		  var scopeObj = this;
	  var formModel = scopeObj.getController().getFormModel();
	  
		formModel.setViewAttributeByProperty("flexAddTimeExpenseKA", "isVisible", true);
	 },
	 showExpenseDetailsForm: function() {
		 var formmodel = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmExpenseDetailsTabKA").getFormModel();
        formmodel.showView();
	 },
	 showTimeSegment: function() {
		 var scopeObj = this;
	     var formModel = scopeObj.getController().getFormModel();
	  	
		formModel.setViewAttributeByProperty("btnTimeKA", "skin", "sknBtnTimeExpenseFocusKA");
		formModel.setViewAttributeByProperty("btnExpenseKA", "skin", "sknBtnTimeExpenseKA");
		formModel.setViewAttributeByProperty("btnBothKA", "skin", "sknBtnTimeExpenseKA");
	 },
	 showBothSegment: function() {
		 var scopeObj = this;
		 var formModel = scopeObj.getController().getFormModel();
	  
		formModel.setViewAttributeByProperty("btnTimeKA", "skin", "sknBtnTimeExpenseKA");
		formModel.setViewAttributeByProperty("btnExpenseKA", "skin", "sknBtnTimeExpenseKA");
		formModel.setViewAttributeByProperty("btnBothKA", "skin", "sknBtnTimeExpenseFocusKA");
	 },
	 showExpenseSegment: function() {
		 var scopeObj = this;
		 var formModel = scopeObj.getController().getFormModel();
	  
		formModel.setViewAttributeByProperty("btnTimeKA", "skin", "sknBtnTimeExpenseKA");
		formModel.setViewAttributeByProperty("btnExpenseKA", "skin", "sknBtnTimeExpenseFocusKA");
		formModel.setViewAttributeByProperty("btnBothKA", "skin", "sknBtnTimeExpenseKA");
	 },
	showOrderHistory: function() {
		var scopeObj = this;
			var formModel = scopeObj.getController().getFormModel();
		if (animationInProgress == false && paymentsDone == false) {
			formModel.setViewAttributeByProperty("flexPaymentInterruptPopUpKA", "isVisible", true);
			nextFlow=scopeObj.showOrderHistory;
		}
		if (animationInProgress == false && paymentsDone == true) {
			
			scopeObj.submenu();
			formModel.setViewAttributeByProperty("flexOrderHistoryKA", "skin", "sknFlexSubmenuActiveBackgroundKA");
			formModel.setViewAttributeByProperty("flexIndicator2KA", "isVisible", true);
			scopeObj.hideFlex();
			scopeObj.showFlex(frmCompleteOrderTabKA.flexOrderHistoryDetailsKA);
		}
	},
	showOrderResources: function() {
		var scopeObj = this;
			var formModel = scopeObj.getController().getFormModel();
		if (animationInProgress == false && paymentsDone == false) {
			formModel.setViewAttributeByProperty("flexPaymentInterruptPopUpKA", "isVisible", true);
			nextFlow=scopeObj.showOrderResources;
		}
		if (animationInProgress == false && paymentsDone == true) {
			
			scopeObj.submenu();
			formModel.setViewAttributeByProperty("flexOrderResourcesKA", "skin", "sknFlexSubmenuActiveBackgroundKA");
			formModel.setViewAttributeByProperty("flexIndicator3KA", "isVisible", true);
			scopeObj.hideFlex();
			scopeObj.showFlex(frmCompleteOrderTabKA.flexOrderResourcesDetailsKA);
		}
	},
	showOrderAttachments: function() {
		var scopeObj = this;
			var formModel = scopeObj.getController().getFormModel();
		if (animationInProgress == false && paymentsDone == false) {
			formModel.setViewAttributeByProperty("flexPaymentInterruptPopUpKA", "isVisible", true);
			nextFlow=scopeObj.showOrderAttachments;
		}
		if (animationInProgress == false && paymentsDone == true) {
			
			scopeObj.submenu();
			formModel.setViewAttributeByProperty("flexAttachmentsKA", "skin", "sknFlexSubmenuActiveBackgroundKA");
			formModel.setViewAttributeByProperty("flexIndicator4KA", "isVisible", true);
			scopeObj.hideFlex();
			scopeObj.showFlex(frmCompleteOrderTabKA.flexAttachmentsDetailsKA);
		}
	},
	showOrderImages: function() {
		var scopeObj = this;
			var formModel = scopeObj.getController().getFormModel();
		if (animationInProgress == false && paymentsDone == false) {
			formModel.setViewAttributeByProperty("flexPaymentInterruptPopUpKA", "isVisible", true);
			nextFlow=scopeObj.showOrderImages;
		}
		if (animationInProgress == false && paymentsDone == true) {
			
			scopeObj.submenu();
			formModel.setViewAttributeByProperty("flexImagesKA", "skin", "sknFlexSubmenuActiveBackgroundKA");
			formModel.setViewAttributeByProperty("flexIndicator5KA", "isVisible", true);
			scopeObj.hideFlex();
			scopeObj.showFlex(frmCompleteOrderTabKA.flexImagesDetailsKA);
		}
	},
	showPayment: function() {
		var scopeObj = this;
			var formModel = scopeObj.getController().getFormModel();
		if (animationInProgress == false && paymentsDone == false) {
			formModel.setViewAttributeByProperty("flexPaymentInterruptPopUpKA", "isVisible", true);
			nextFlow=scopeObj.showPayment;
		}
		if (animationInProgress == false && paymentsDone == true) {
			paymentsDone=false;
			scopeObj.hideFlex();
			scopeObj.showFlex(frmCompleteOrderTabKA.flexPaymentMainKA);
		}
	},
	showPaymentReceipt:function(){
		var scopeObj = this;
			var formModel = scopeObj.getController().getFormModel();
		if (animationInProgress == false && paymentsDone == true) {
			
			scopeObj.hideFlex();
			scopeObj.showFlex(frmCompleteOrderTabKA.flexPaymentMainKA);
		}
	},
	showTaskExecutionForm: function() {
		var formmodel = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmTaskExecutionTabKA").getFormModel();
		formmodel.showView();
	},
	backFromBom: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexBomKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexResourcesKA", "isVisible", true);
	},
	showBomFlex: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexBomKA", "isVisible", true);
		formModel.setViewAttributeByProperty("flexResourcesKA", "isVisible", false);
	},
	showWorkConfirmationFlex: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flxBodyWorkConfirmationKA", "isVisible", true);
		formModel.setViewAttributeByProperty("flexBodyKA", "isVisible", false);
	},
	showSignOffFlex: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flxBodySignOffKA", "isVisible", true);
		formModel.setViewAttributeByProperty("flexBodyKA", "isVisible", false);
	},
	showSurveyFlex: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flxBodySurveyKA", "isVisible", true);
		formModel.setViewAttributeByProperty("flexBodyKA", "isVisible", false);
	},
	showCompleteOrderMainPageOne: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexBodyKA", "isVisible", true);
		formModel.setViewAttributeByProperty("flxBodySurveyKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexConfirmationPopUpKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexCancelPopUpKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flxBodySignOffKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flxBodyWorkConfirmationKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexInformationSavedKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexCancelAlertKA", "isVisible", false);
	},
	showTimePopUpFlex: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexTimePopUpKA", "isVisible", true);
	},
	hideTimePopUpFlex: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexTimePopUpKA", "isVisible", false);
	},
	showDatePopUpFlex: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexDatePopUpKA", "isVisible", true);
	},
	hideDatePopUpFlex: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexDatePopUpKA", "isVisible", false);
	},
	showConfirmationPopUpFlex: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexConfirmationPopUpKA", "isVisible", true);
	},
	cancelConfirmationAndCancelPopUp: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexConfirmationPopUpKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexCancelPopUpKA", "isVisible", false);
	},
	showCancelPopUpFlex: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexCancelPopUpKA", "isVisible", true);
	},
	onCancelInterruptedPopUp: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexPaymentInterruptPopUpKA", "isVisible", false);
	},
	onTickInterruptedPaymentPopUpCall: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexPaymentInterruptPopUpKA", "isVisible", false);
		paymentsDone=true;
		nextFlow.bind(this)();
	},
	showViewFilter: function() {		
	  var scopeObj = this;
	  var formModel = scopeObj.getController().getFormModel();
	  
		formModel.setViewAttributeByProperty("flxViewContainerKA", "isVisible", true);
	},
	hideFlex: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexOrderSummaryMainKA", "left", "100%");
		formModel.setViewAttributeByProperty("flexOrderHistoryDetailsKA", "left", "100%");
		formModel.setViewAttributeByProperty("flexOrderResourcesDetailsKA", "left", "100%");
		formModel.setViewAttributeByProperty("flexAttachmentsDetailsKA", "left", "100%");
		formModel.setViewAttributeByProperty("flexImagesDetailsKA", "left", "100%");
		formModel.setViewAttributeByProperty("flexPaymentMainKA", "left", "100%");
		formModel.setViewAttributeByProperty("flexTimeExpenseMainKA", "left", "100%");
		formModel.setViewAttributeByProperty("flexOrderCompletionMainKA", "left", "100%");
	},
	showFlex: function(flex) {
		animationInProgress = true;
		var pageDisplayAnim = {
			"0": {
				"opacity": 1,
				"stepConfig": {
					"timingFunction": kony.anim.EASE
				}
			},
			"100": {
				"left": "0%",
				"stepConfig": {
					"timingFunction": kony.anim.EASE
				}
			}
		};
		flex.animate(kony.ui.createAnimation(pageDisplayAnim), {
			"delay": 0,
			"iterationCount": 1,
			"fillMode": kony.anim.FILL_MODE_FORWARDS,
			"duration": 0.2
		}, {
			"animationEnd": function() {
				animationInProgress = false;
			}
		});
	},
	showflexPaymentMainContainerKA:function(){
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexPaymentMainContainerKA", "isVisible", true);
        formModel.setViewAttributeByProperty("flexPaymentModesKA", "isVisible", false);	
        formModel.setViewAttributeByProperty("flexPaymentModesDrillKA", "isVisible", false);
        formModel.setViewAttributeByProperty("flexInvoiceReceiptKAKA", "isVisible", false);		
	},
	showflexPaymentModesKA:function(){
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexPaymentModesKA", "isVisible", true);
        formModel.setViewAttributeByProperty("flexPaymentMainContainerKA", "isVisible", false);	
        formModel.setViewAttributeByProperty("flexPaymentModesDrillKA", "isVisible", false);
        formModel.setViewAttributeByProperty("flexInvoiceReceiptKAKA", "isVisible", false);			
	},
	showflexPaymentModesDrillKA:function(){
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexPaymentModesDrillKA", "isVisible", true);	
		        formModel.setViewAttributeByProperty("flexPaymentModesKA", "isVisible", false);	
        formModel.setViewAttributeByProperty("flexPaymentMainContainerKA", "isVisible", false);
        formModel.setViewAttributeByProperty("flexInvoiceReceiptKAKA", "isVisible", false);	
	},
	showflexInvoiceReceiptKAKA:function(){
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexInvoiceReceiptKAKA", "isVisible", true);
        formModel.setViewAttributeByProperty("flexPaymentModesKA", "isVisible", false);	
        formModel.setViewAttributeByProperty("flexPaymentModesDrillKA", "isVisible", false);
        formModel.setViewAttributeByProperty("flexPaymentMainContainerKA", "isVisible", false);			
	},	
	
	showflexPaymentAcknowledgePopUpKA:function(){
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexPaymentAcknowledgePopUpKA", "isVisible", true);	
	},
	
	paymentNotYetComplete:function(){
			var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexPaymentAcknowledgePopUpKA", "isVisible", false);	
	},
	paymentInCashComplete:function(){
			var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexPaymentAcknowledgePopUpKA", "isVisible", false);	
		formModel.setViewAttributeByProperty("flexPaymentMainContainerKA", "isVisible", false);
        formModel.setViewAttributeByProperty("flexPaymentModesKA", "isVisible", false);	
        formModel.setViewAttributeByProperty("flexPaymentModesDrillKA", "isVisible", false);
        formModel.setViewAttributeByProperty("flexInvoiceReceiptKAKA", "isVisible", false);	
        formModel.setViewAttributeByProperty("flexPaymentMainKA", "left", "100%");
        formModel.setViewAttributeByProperty("flexOrderCompletionMainKA", "left", "0%");
		formModel.setViewAttributeByProperty("flexInvoiceReceiptFinalKAKA", "isVisible", true); 
		formModel.setViewAttributeByProperty("btnNumber3KA","skin","sknBtnNumberSquare18A4A3KA");
		formModel.setViewAttributeByProperty("flexPaymentAfterKA", "isVisible", true);
        paymentsDone = true;		
		
	},
	onHidePopUpCall: function() {		
	  var scopeObj = this;
	  var formModel = scopeObj.getController().getFormModel();
	  
		formModel.setViewAttributeByProperty("flxViewContainerKA", "isVisible", false);
	},
	showSendEmailKA:function(){
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexBodyKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexInVoiceEmailSendKA", "isVisible", true);			
	},
	backFromSendEmailKA:function(){
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexInVoiceEmailSendKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexBodyKA", "isVisible", true);			
	},
	showEmailPopUp:function(){
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexInvoiceEmailKA", "isVisible", true);
			
	},
	cancelEmailPopUp:function(){
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexInvoiceEmailKA", "isVisible", false);
			
	},
	showAddTimePopUp: function() {
         var scopeObj = this;
		 var formModel = scopeObj.getController().getFormModel();
	  
		formModel.setViewAttributeByProperty("flexAddTimePopupKA", "isVisible", true);
		formModel.setViewAttributeByProperty("flexAddTimeExpenseKA", "isVisible", false);

	 },
	 cancelAddTimeItemPopUp: function() {
         var scopeObj = this;
		 var formModel = scopeObj.getController().getFormModel();
	  
		formModel.setViewAttributeByProperty("flexAddTimePopupKA", "isVisible", false);
	 },
	 showAddExpensePopUp: function() {
         var scopeObj = this;
		 var formModel = scopeObj.getController().getFormModel();
	  
		formModel.setViewAttributeByProperty("flexAddExpensePopupKA", "isVisible", true);
		formModel.setViewAttributeByProperty("flexAddTimeExpenseKA", "isVisible", false);

	 },
	 cancelAddExpenseItemPopUp: function() {
         var scopeObj = this;
		 var formModel = scopeObj.getController().getFormModel();
	  
		formModel.setViewAttributeByProperty("flexAddExpensePopupKA", "isVisible", false);
	 },
	 doNothing:function(){},
	 giveDiscountInPercent:function(){
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("btnPercentageKA", "skin", "sknBtnSelectedKA");	
		formModel.setViewAttributeByProperty("btnDiscountAmountKA", "skin", "sknBtnUnselectedKA");
		formModel.setViewAttributeByProperty("lblDollarOrPercentKA", "text", "%");
	 },
	 giveDiscountInAmount:function(){
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("btnDiscountAmountKA", "skin", "sknBtnSelectedKA");	
		formModel.setViewAttributeByProperty("btnPercentageKA", "skin", "sknBtnUnselectedKA");
		formModel.setViewAttributeByProperty("lblDollarOrPercentKA", "text", "$");		 
	 },
	showDateSpinner: function() {
		
			var scopeObj = this;
			var formModel = scopeObj.getController().getFormModel();
			formModel.setViewAttributeByProperty("flexCalendarKA", "isVisible", true);
	
	},
	hideDateSpinner: function() {
		
			var scopeObj = this;
			var formModel = scopeObj.getController().getFormModel();
			formModel.setViewAttributeByProperty("flexCalendarKA", "isVisible", false);
	
	},
	showDateSpinnerOne: function() {
		
			var scopeObj = this;
			var formModel = scopeObj.getController().getFormModel();
			formModel.setViewAttributeByProperty("flexCalendar1KA", "isVisible", true);
	
	},
	hideDateSpinnerOne: function() {
		
			var scopeObj = this;
			var formModel = scopeObj.getController().getFormModel();
			formModel.setViewAttributeByProperty("flexCalendar1KA", "isVisible", false);
	
	},
	switchToggle:function(){
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		if(frmCompleteOrderTabKA.switchProblemSolved1KA.selectedIndex == 1){
			//alert("no");
			formModel.setViewAttributeByProperty("lblProblemSolvedValue1KA","text","No");
			formModel.setViewAttributeByProperty("ListBoxProblem1KA", "isVisible", true);			
		}
		else{
			//alert("yes");
			formModel.setViewAttributeByProperty("lblProblemSolvedValue1KA","text","Yes");
			formModel.setViewAttributeByProperty("ListBoxProblem1KA", "isVisible", false);
			formModel.setViewAttributeByProperty("tbxProblemSolvedKA", "isVisible", false);
		}
			
	 
	 },
	 listSelection:function(){
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		
			if(frmCompleteOrderTabKA.ListBoxProblem1KA.selectedKeyValue[1] == "Other"){
				//alert("Other");
				formModel.setViewAttributeByProperty("tbxProblemSolvedKA", "isVisible", true);
			}
			else{
				formModel.setViewAttributeByProperty("tbxProblemSolvedKA", "isVisible", false);
			}
		
	},
	switchToggleConfirmation:function(idx){
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		var currentSwitch = "switchProblemSolved"+idx+"KA";
		var currentTbx = "TextAreaNo"+idx+"KA";
		var currentLbl = "lblProblemSolvedVal" + idx + "KA";
		if(formModel.getViewAttributeByProperty(currentSwitch,"selectedIndex") == 1){
			//alert("no");
			formModel.setViewAttributeByProperty(currentLbl,"text","No");
			formModel.setViewAttributeByProperty(currentTbx, "isVisible", true);			
		}
		else{
			//alert("yes");
			formModel.setViewAttributeByProperty(currentLbl,"text","Yes");
			formModel.setViewAttributeByProperty(currentTbx, "isVisible", false);
			
		}
			
	 
	 },
	saveMyCurrentInformation: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexInformationSavedKA", "isVisible", true);
		formModel.setViewAttributeByProperty("flexCancelAlertKA", "isVisible", false);

	},
	showCancelProgressPopUpFlex: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexCancelAlertKA", "isVisible", true);
	},	
	suggestFillingRequiredData: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexFillCumpalsaryPopUpKA", "isVisible", true);
	},
	continueFillingRequiredData: function() {
		var scopeObj = this;
		var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexFillCumpalsaryPopUpKA", "isVisible", false);
	}
	 
});