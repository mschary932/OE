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

var shown=frmOrderExecutionTabKA.flexOnePendingTasksKA;
var animationInProgress=false;
var hasShownHamburger = false;
var hasShownShadow = false;
			

kony.sdk.mvvm.frmOrderExecutionTabKAControllerExtension = Class(kony.sdk.mvvm.BaseFormControllerExtension, {
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
           	var formModel =this.getController().getFormModel();
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
	backToListView: function() {
        var formmodel = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmTaskExecutionTabKA").getFormModel();
        formmodel.showView();

	 },	
	 submenu: function() { 

	  var scopeObj = this;
	  var formModel = scopeObj.getController().getFormModel();
	  
			formModel.setViewAttributeByProperty("flexTasksKA", "skin", "sknFlexSubmenuKA");
			formModel.setViewAttributeByProperty("flexIndicator1KA", "isVisible", false);	
			formModel.setViewAttributeByProperty("flexOrderDetailsKA", "skin", "sknFlexSubmenuKA");
			formModel.setViewAttributeByProperty("flexIndicator2KA", "isVisible", false);             
			formModel.setViewAttributeByProperty("flexOrderHistoryKA", "skin", "sknFlexSubmenuKA");
			formModel.setViewAttributeByProperty("flexIndicator3KA", "isVisible", false);     		
			formModel.setViewAttributeByProperty("flexOrderResourcesKA", "skin", "sknFlexSubmenuKA");
			formModel.setViewAttributeByProperty("flexIndicator4KA", "isVisible", false);           
			formModel.setViewAttributeByProperty("flexOrderObjectKA", "skin", "sknFlexSubmenuKA");
			formModel.setViewAttributeByProperty("flexIndicator5KA", "isVisible", false);
			formModel.setViewAttributeByProperty("flexOrderNotesKA", "skin", "sknFlexSubmenuKA");
			formModel.setViewAttributeByProperty("flexIndicator6KA", "isVisible", false);            
			formModel.setViewAttributeByProperty("flexAttachmentsKA", "skin", "sknFlexSubmenuKA");
			formModel.setViewAttributeByProperty("flexIndicator7KA", "isVisible", false);           
			formModel.setViewAttributeByProperty("flexImagesKA", "skin", "sknFlexSubmenuKA");
			formModel.setViewAttributeByProperty("flexIndicator8KA", "isVisible", false);
			formModel.setViewAttributeByProperty("flexTimeExpenseKA", "skin", "sknFlexSubmenuKA");
			formModel.setViewAttributeByProperty("flexIndicator9KA", "isVisible", false);
			formModel.setViewAttributeByProperty("flexExtendedAttributesKA", "skin", "sknFlexSubmenuKA");
			formModel.setViewAttributeByProperty("flexIndicator10KA", "isVisible", false);
           
       
	  },
	 showMap: function() { 
		if(animationInProgress==false){
	  var scopeObj = this;
	  var formModel = scopeObj.getController().getFormModel();
	  
       
       scopeObj.hideFlex();
		scopeObj.showFlex(frmOrderExecutionTabKA.flexMapKA);
			
		}
		 		   
	 },
	 backFromMap: function() { 
		if(animationInProgress==false){
	        var scopeObj = this;
	        var formModel = scopeObj.getController().getFormModel();
	        scopeObj.hideFlex();
		    scopeObj.showFlex(shown);
			
		}
		 		   
	 },
	 
    showTaskList: function() {
		if(animationInProgress==false){
	        var scopeObj = this;
	        var formModel = scopeObj.getController().getFormModel();
       	    scopeObj.submenu();
		    formModel.setViewAttributeByProperty("flexTasksKA", "skin", "sknFlexSubmenuActiveBackgroundKA");
            formModel.setViewAttributeByProperty("flexIndicator1KA", "isVisible", true);
            scopeObj.hideFlex();
	        scopeObj.showFlex(frmOrderExecutionTabKA.flexOnePendingTasksKA);
	        shown=frmOrderExecutionTabKA.flexOnePendingTasksKA;
		}
	 },
    showOrderDetails: function() {
		if(animationInProgress==false){
	        var scopeObj = this;
	        var formModel = scopeObj.getController().getFormModel();
	        scopeObj.submenu();
	        formModel.setViewAttributeByProperty("flexOrderDetailsKA", "skin", "sknFlexSubmenuActiveBackgroundKA");
            formModel.setViewAttributeByProperty("flexIndicator2KA", "isVisible", true);
            scopeObj.hideFlex();
	        scopeObj.showFlex(frmOrderExecutionTabKA.flexTwoOrderDetailsKA);
			shown=frmOrderExecutionTabKA.flexTwoOrderDetailsKA;
		}
	},
	
    showOrderHistory: function() {
		if(animationInProgress==false){
            var scopeObj = this;
	        var formModel = scopeObj.getController().getFormModel();
            scopeObj.submenu();
		    formModel.setViewAttributeByProperty("flexOrderHistoryKA", "skin", "sknFlexSubmenuActiveBackgroundKA");
            formModel.setViewAttributeByProperty("flexIndicator3KA", "isVisible", true);
		    scopeObj.hideFlex();
	        scopeObj.showFlex(frmOrderExecutionTabKA.flexThreeOrderHistoryKA);
	        shown=frmOrderExecutionTabKA.flexThreeOrderHistoryKA;
		}

	 },
    showOrderResources: function() {
		if(animationInProgress==false){
            var scopeObj = this;
	        var formModel = scopeObj.getController().getFormModel();
            scopeObj.submenu();
		    formModel.setViewAttributeByProperty("flexOrderResourcesKA", "skin", "sknFlexSubmenuActiveBackgroundKA");
            formModel.setViewAttributeByProperty("flexIndicator4KA", "isVisible", true);
		    scopeObj.hideFlex();
	        scopeObj.showFlex(frmOrderExecutionTabKA.flexFourOrderResourcesKA);
			shown=frmOrderExecutionTabKA.flexFourOrderResourcesKA;
		}
	 },
	 showOrderObject: function() {
		 if(animationInProgress==false){
	        var scopeObj = this;
	        var formModel = scopeObj.getController().getFormModel();
            scopeObj.submenu();
		    formModel.setViewAttributeByProperty("flexOrderObjectKA", "skin", "sknFlexSubmenuActiveBackgroundKA");
            formModel.setViewAttributeByProperty("flexIndicator5KA", "isVisible", true);
            scopeObj.hideFlex();
	        scopeObj.showFlex(frmOrderExecutionTabKA.flexFiveOrderObjectKA);
			shown=frmOrderExecutionTabKA.flexFiveOrderObjectKA;
		 }

	 },
    showOrderNotes: function() {
		if(animationInProgress==false){
            var scopeObj = this;
	        var formModel = scopeObj.getController().getFormModel();
            scopeObj.submenu();
		    formModel.setViewAttributeByProperty("flexOrderNotesKA", "skin", "sknFlexSubmenuActiveBackgroundKA");
            formModel.setViewAttributeByProperty("flexIndicator6KA", "isVisible", true);
			scopeObj.hideFlex();
		    scopeObj.showFlex(frmOrderExecutionTabKA.flexSixOrderNotesKA);
			shown=frmOrderExecutionTabKA.flexSixOrderNotesKA;
		}
	 },
    showAttachments: function() {
		if(animationInProgress==false){
        var scopeObj = this;
	  var formModel = scopeObj.getController().getFormModel();
        scopeObj.submenu();
		  formModel.setViewAttributeByProperty("flexAttachmentsKA", "skin", "sknFlexSubmenuActiveBackgroundKA");
          formModel.setViewAttributeByProperty("flexIndicator7KA", "isVisible", true);
			 scopeObj.hideFlex();
	 scopeObj.showFlex(frmOrderExecutionTabKA.flexSevenAttachmentsKA);
	      shown=frmOrderExecutionTabKA.flexSevenAttachmentsKA;
		}

	 },
    showImages: function() {
		if(animationInProgress==false){
        var scopeObj = this;
	  var formModel = scopeObj.getController().getFormModel();
			scopeObj.submenu();
		  formModel.setViewAttributeByProperty("flexImagesKA", "skin", "sknFlexSubmenuActiveBackgroundKA");
          formModel.setViewAttributeByProperty("flexIndicator8KA", "isVisible", true);
          				 scopeObj.hideFlex();
	 scopeObj.showFlex(frmOrderExecutionTabKA.flexEightImagesKA);
	        shown=frmOrderExecutionTabKA.flexEightImagesKA;
		}

	 }, 
	 showTimeExpense: function() {
		 if(animationInProgress==false){
	  var scopeObj = this;
	  var formModel = scopeObj.getController().getFormModel();
	  formModel.setViewAttributeByProperty("btnTimeKA", "skin", "sknBtnTimeExpenseKA");
		formModel.setViewAttributeByProperty("btnExpenseKA", "skin", "sknBtnTimeExpenseKA");
		formModel.setViewAttributeByProperty("btnBothKA", "skin", "sknBtnTimeExpenseFocusKA");
       
	   			scopeObj.submenu();

		  formModel.setViewAttributeByProperty("flexTimeExpenseKA", "skin", "sknFlexSubmenuActiveBackgroundKA");
          formModel.setViewAttributeByProperty("flexIndicator9KA", "isVisible", true);
          
 scopeObj.hideFlex();
	 scopeObj.showFlex(frmOrderExecutionTabKA.flexNineTimeExpenseKA);
	     shown=frmOrderExecutionTabKA.flexNineTimeExpenseKA;
		 }

	 },
    showExtendedAttributes: function() {
		if(animationInProgress==false){
       var scopeObj = this;
	  var formModel = scopeObj.getController().getFormModel();
scopeObj.submenu();
		  formModel.setViewAttributeByProperty("flexExtendedAttributesKA", "skin", "sknFlexSubmenuActiveBackgroundKA");
          formModel.setViewAttributeByProperty("flexIndicator10KA", "isVisible", true);

 scopeObj.hideFlex();
	 scopeObj.showFlex(frmOrderExecutionTabKA.flexTenExtendedAttributesKA);
	      shown=frmOrderExecutionTabKA.flexTenExtendedAttributesKA;
		}
	 },
	 showDetailedInstruction: function() {
		 
      var scopeObj = this;
	  var formModel = scopeObj.getController().getFormModel();
      formModel.setViewAttributeByProperty("flexScrollOrderDetailsKA", "isVisible", false);
	  formModel.setViewAttributeByProperty("flexTwoInnerInstructionDescriptionKA", "isVisible", false);
	  formModel.setViewAttributeByProperty("flexContactKA", "isVisible", false);
	  formModel.setViewAttributeByProperty("flexThreeInnerInstructionKA", "isVisible",true);
	 },
	 showContactDetails: function() {
      var scopeObj = this;
	  var formModel = scopeObj.getController().getFormModel();
      formModel.setViewAttributeByProperty("flexScrollOrderDetailsKA", "isVisible", false);
	  formModel.setViewAttributeByProperty("flexTwoInnerInstructionDescriptionKA", "isVisible", false);
      formModel.setViewAttributeByProperty("flexContactKA", "isVisible", true);
	  formModel.setViewAttributeByProperty("flexThreeInnerInstructionKA", "isVisible", false);
	 },
	 showDetailedDescription: function() {
      var scopeObj = this;
	  var formModel = scopeObj.getController().getFormModel();
      formModel.setViewAttributeByProperty("flexScrollOrderDetailsKA", "isVisible", false);
	  formModel.setViewAttributeByProperty("flexTwoInnerInstructionDescriptionKA", "isVisible", true);
	  formModel.setViewAttributeByProperty("flexContactKA", "isVisible", false);
	  formModel.setViewAttributeByProperty("flexThreeInnerInstructionKA", "isVisible", false);
	 },
	 showResourceExecutionForm: function() {
        var formmodel = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmResourceExecutionTabKA").getFormModel();
        formmodel.showView();

	 },
	 showSegment: function() {
      var scopeObj = this;
	  var formModel = scopeObj.getController().getFormModel();
      formModel.setViewAttributeByProperty("lblNoNotesAvailableKA", "isVisible", false);
	  formModel.setViewAttributeByProperty("segNotesListKA", "isVisible", true);
      formModel.setViewAttributeByProperty("flxQuePopUpKA", "isVisible", false);
	 },
	 showDetailsOfNotes: function() {
      var scopeObj = this;
	  var formModel = scopeObj.getController().getFormModel();
      formModel.setViewAttributeByProperty("flexMainOrderNotesKA", "isVisible", false);
	  formModel.setViewAttributeByProperty("flexOrderNotesDetailsKA", "isVisible", true);
	 },
	 showNotesList: function() {
      var scopeObj = this;
	  var formModel = scopeObj.getController().getFormModel();
      formModel.setViewAttributeByProperty("flexOrderNotesDetailsKA", "isVisible", false);
	  formModel.setViewAttributeByProperty("flexMainOrderNotesKA", "isVisible", true);
	 },
	 BackToOrderDetails: function() {
      var scopeObj = this;
	  var formModel = scopeObj.getController().getFormModel();
      formModel.setViewAttributeByProperty("flexScrollOrderDetailsKA", "isVisible", true);
	  formModel.setViewAttributeByProperty("flexTwoInnerInstructionDescriptionKA", "isVisible", false);
	  formModel.setViewAttributeByProperty("flexContactKA", "isVisible", false);
	  formModel.setViewAttributeByProperty("flexThreeInnerInstructionKA", "isVisible", false);
	 },
	 BackToOrderDetailsTwo: function() {
      var scopeObj = this;
	  var formModel = scopeObj.getController().getFormModel();
      formModel.setViewAttributeByProperty("flexScrollOrderDetailsKA", "isVisible", true);
	  formModel.setViewAttributeByProperty("flexTwoInnerInstructionDescriptionKA", "isVisible", false);
	  formModel.setViewAttributeByProperty("flexContactKA", "isVisible", false);
	  formModel.setViewAttributeByProperty("flexThreeInnerInstructionKA", "isVisible", false);
	 },
	 showMyOrdersForm: function() {
        var formmodel = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmMyOrderListTabKA").getFormModel();
        formmodel.showView();

	 },
	 showScreenTaskMeasurementOption: function() {
      var scopeObj = this;
	  var formModel = scopeObj.getController().getFormModel();
	  formModel.setViewAttributeByProperty("flexAddTaskMeasurmentKA", "isVisible", true);
	 },
	 showCompleteOrderForm: function() {
		var formmodel = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCompleteOrderTabKA").getFormModel();
		formmodel.showView();
	},	
	closeScreenTaskMeasurement: function() {
      var scopeObj = this;
	  var formModel = scopeObj.getController().getFormModel();
	  formModel.setViewAttributeByProperty("flexAddTaskMeasurmentKA", "isVisible", false);
	 },
	  showTimeSegment: function() {
		 var scopeObj = this;
	     var formModel = scopeObj.getController().getFormModel();
	  	
		formModel.setViewAttributeByProperty("btnTimeKA", "skin", "sknBtnTimeExpenseFocusKA");
		formModel.setViewAttributeByProperty("btnExpenseKA", "skin", "sknBtnTimeExpenseKA");
		formModel.setViewAttributeByProperty("btnBothKA", "skin", "sknBtnTimeExpenseKA");
	 },
	 showExpenseSegment: function() {
		 var scopeObj = this;
		 var formModel = scopeObj.getController().getFormModel();
	  
		formModel.setViewAttributeByProperty("btnTimeKA", "skin", "sknBtnTimeExpenseKA");
		formModel.setViewAttributeByProperty("btnExpenseKA", "skin", "sknBtnTimeExpenseFocusKA");
		formModel.setViewAttributeByProperty("btnBothKA", "skin", "sknBtnTimeExpenseKA");
	 },
	  showBothSegment: function() {
		 var scopeObj = this;
		 var formModel = scopeObj.getController().getFormModel();
	  
		formModel.setViewAttributeByProperty("btnTimeKA", "skin", "sknBtnTimeExpenseKA");
		formModel.setViewAttributeByProperty("btnExpenseKA", "skin", "sknBtnTimeExpenseKA");
		formModel.setViewAttributeByProperty("btnBothKA", "skin", "sknBtnTimeExpenseFocusKA");
	 },
	  showBackFromTimeDetails: function() {
		  var scopeObj = this;
	  var formModel = scopeObj.getController().getFormModel();
	  
		formModel.setViewAttributeByProperty("flexTimeExpenseItemsListContainerKA", "isVisible", true);
		formModel.setViewAttributeByProperty("flexTimeDetailsContainerKA", "isVisible", false);

	 },
	  showExpenseDetailsForm: function() {
		 var formmodel = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmExpenseDetailsTabKA").getFormModel();
        formmodel.showView();
	 },
	 
	  showAddTimeExpense: function() {
		  var scopeObj = this;
	  var formModel = scopeObj.getController().getFormModel();
	  
		formModel.setViewAttributeByProperty("flexAddTimeExpenseKA", "isVisible", true);
	 },
	 
	  closeAddTimeExpense: function() {		
	  var scopeObj = this;
	  var formModel = scopeObj.getController().getFormModel();
	  
		formModel.setViewAttributeByProperty("flexAddTimeExpenseKA", "isVisible", false);
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
	 doNothingOnDeviceBackKA: function() {},
	 showViewFilter: function() {		
	  var scopeObj = this;
	  var formModel = scopeObj.getController().getFormModel();
	  
		formModel.setViewAttributeByProperty("flxViewContainerKA", "isVisible", true);
	},
	onHidePopUpCall: function() {		
	  var scopeObj = this;
	  var formModel = scopeObj.getController().getFormModel();
	  
		formModel.setViewAttributeByProperty("flxViewContainerKA", "isVisible", false);
	},
	AddMeasurement: function() {
		var scopeObj = this;
		 var formModel = scopeObj.getController().getFormModel();
	  
		formModel.setViewAttributeByProperty("flexAddMeasurementPopUpKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexCreateMeasurementKA", "isVisible", false);
        formmodel = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmMeasurementExecutionKA").getFormModel();
        formmodel.showView();

	 },
	 CreateMeasurementPopUpShow: function() {
		var scopeObj = this;
		 var formModel = scopeObj.getController().getFormModel();
	  
		formModel.setViewAttributeByProperty("flexAddMeasurementPopUpKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexCreateMeasurementKA", "isVisible", true);
	 },
	 CreateMeasurementPopUpHide: function() {
		var scopeObj = this;
		 var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("flexCreateMeasurementKA", "isVisible", false);
	 },
	 AddNotePopUp: function() {
         var scopeObj = this;
		 var formModel = scopeObj.getController().getFormModel();
	  
		formModel.setViewAttributeByProperty("flxQuePopUpKA", "isVisible", true);
	 },
	cancelAddNotes: function() {
         var scopeObj = this;
		 var formModel = scopeObj.getController().getFormModel();
	  
		formModel.setViewAttributeByProperty("flxQuePopUpKA", "isVisible", false);
	 },
	 showAddTaskPopUp: function() {
         var scopeObj = this;
		 var formModel = scopeObj.getController().getFormModel();
	  
		formModel.setViewAttributeByProperty("flexAddTaskKA", "isVisible", true);
		formModel.setViewAttributeByProperty("flexAddTaskMeasurmentKA", "isVisible", false);
		
	 },
	 cancelAddTask: function() {
         var scopeObj = this;
		 var formModel = scopeObj.getController().getFormModel();
	  
		formModel.setViewAttributeByProperty("flexAddTaskKA", "isVisible", false);
	 },
	 showAddMeasurementPopUp: function() {
         var scopeObj = this;
		 var formModel = scopeObj.getController().getFormModel();
	  
		formModel.setViewAttributeByProperty("flexAddMeasurementPopUpKA", "isVisible", true);
		formModel.setViewAttributeByProperty("flexAddTaskMeasurmentKA", "isVisible", false);

	 },
	 cancelMeasurementPopUp: function() {
         var scopeObj = this;
		 var formModel = scopeObj.getController().getFormModel();
	  
		formModel.setViewAttributeByProperty("flexAddMeasurementPopUpKA", "isVisible", false);
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
	 hideFlex: function() {
	  var scopeObj = this;
	  var formModel = scopeObj.getController().getFormModel();
        formModel.setViewAttributeByProperty("flexOnePendingTasksKA", "left", "100%");
		formModel.setViewAttributeByProperty("flexTwoOrderDetailsKA", "left", "100%");
		formModel.setViewAttributeByProperty("flexThreeOrderHistoryKA", "left", "100%");
		formModel.setViewAttributeByProperty("flexFourOrderResourcesKA", "left", "100%");
		formModel.setViewAttributeByProperty("flexFiveOrderObjectKA", "left", "100%");
		formModel.setViewAttributeByProperty("flexSixOrderNotesKA", "left", "100%");
		formModel.setViewAttributeByProperty("flexSevenAttachmentsKA", "left", "100%");
		formModel.setViewAttributeByProperty("flexEightImagesKA", "left", "100%");
		formModel.setViewAttributeByProperty("flexNineTimeExpenseKA", "left", "100%");
		formModel.setViewAttributeByProperty("flexTenExtendedAttributesKA", "left", "100%");
		formModel.setViewAttributeByProperty("flexMapKA", "left", "100%");
	 },
	 showFlex: function(flex) {
		 animationInProgress=true;
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
        flex.animate(
           kony.ui.createAnimation(pageDisplayAnim), {
                  "delay": 0,
                  "iterationCount": 1,
                  "fillMode": kony.anim.FILL_MODE_FORWARDS,
                  "duration": 0.2
                },  {
                     "animationEnd": function(){animationInProgress=false;}
					}
          ); 

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
	showHamburgerMenu:function(){
		 if(!hasShownHamburger){
        frmOrderExecutionTabKA.flexMainKA.animate(
           kony.ui.createAnimation({
             "100": {
            "left": "35%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0.5
    }, {
        "animationEnd": function(){
			
		}
    }); 
	
	    frmOrderExecutionTabKA.flxMainMenuKA.animate(
           kony.ui.createAnimation({
             "100": {
            "left": "0%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0.5
    }, {
        "animationEnd": function(){
			
		}
    });
	
	hasShownHamburger = true;
		 }
		 else{
			 frmOrderExecutionTabKA.flexMainKA.animate(
           kony.ui.createAnimation({
             "100": {
            "left": "0%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0.5
    }, {
        "animationEnd": function(){
			
		}
    }); 
	
	    frmOrderExecutionTabKA.flxMainMenuKA.animate(
           kony.ui.createAnimation({
             "100": {
            "left": "-35%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0.5
    }, {
        "animationEnd": function(){
			
		}
    });
	hasShownHamburger = false;
		 }

	},
	showAndHideShadow:function(){

		var scopeObj = this;
	    var formModel = scopeObj.getController().getFormModel();
		if(!hasShownShadow){
		formModel.setViewAttributeByProperty("flxShadowKA", "isVisible", true);	
		hasShownShadow = true;
		}
		else{
		formModel.setViewAttributeByProperty("flxShadowKA", "isVisible", false);	
		hasShownShadow = false;	
		}
	},
	showSettingScreen:function(){
		var scopeObj = this;
	    var formModel = scopeObj.getController().getFormModel();
  		formModel.setViewAttributeByProperty("flexMainMenuContainerKA", "isVisible", false);
        formModel.setViewAttributeByProperty("FlexMainSettingsKA", "isVisible", true);		
	 },
	 showPanicScreen:function(){
		var scopeObj = this;
	    var formModel = scopeObj.getController().getFormModel();
  		
        formModel.setViewAttributeByProperty("flexPanicPopUpKA", "isVisible", true);		
	 },
	 showMyOrderListForm: function() {
        var formmodel = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmMyOrderListTabKA").getFormModel();
        formmodel.showView();

	 },
	 showAvailableOrderListForm: function() {
        var formmodel = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmAvailableOrderListTabKA").getFormModel();
        formmodel.showView();

	 },
	 backFromSettingScreen:function(){
		var scopeObj = this;
	    var formModel = scopeObj.getController().getFormModel();
  		formModel.setViewAttributeByProperty("flexMainMenuContainerKA", "isVisible", true);
        formModel.setViewAttributeByProperty("FlexMainSettingsKA", "isVisible", false);		
	 },
	 backFromPanicScreen:function(){
		var scopeObj = this;
	    var formModel = scopeObj.getController().getFormModel();
  		
        formModel.setViewAttributeByProperty("flexPanicPopUpKA", "isVisible", false);		
	 },
	  startStepNavigation: function() {		
	  var scopeObj = this;
	  var formModel = scopeObj.getController().getFormModel();
	  
		formModel.setViewAttributeByProperty("flexStepNavigationKA", "isVisible", true);
		formModel.setViewAttributeByProperty("flexMapKA", "isVisible", false);

	 },
	 backToMap: function() {		
	  var scopeObj = this;
	  var formModel = scopeObj.getController().getFormModel();
	  
		formModel.setViewAttributeByProperty("flexStepNavigationKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flexMapKA", "isVisible", true);

	 }
});