/** 
*	In this class, developer can change/override the existing methods or can create new methods if required
*/
/*
* bussiness/orchestration/mediation logic class for frmAvailableOrderListTabKA.
*/
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
var hasShownHamburger = false;
var hasShownShadow = false;

var dateFilterFlexShown = false;
var statusFilterFlexShown = false;
var priorityFilterFlexShown = false;


kony.sdk.mvvm.frmAvailableOrderListTabKAControllerExtension = Class(kony.sdk.mvvm.BaseFormControllerExtension, {
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
	showMyOrderListTabForm: function() {
        var formmodel = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmMyOrderListTabKA").getFormModel();
        formmodel.showView();

	 },
	  onImgDownCall: function(){
	   var scopeObj = this;
	     var formModel = scopeObj.getController().getFormModel();
	 // formModel.setViewAttributeByProperty("flxViewContainerKA", "isVisible", true);
	    frmAvailableOrderListTabKA.flxViewContainerKA.animate(
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
        "duration": 0.0001
    }, {
        "animationEnd": function(){
			
		}
    }); 	 
   },
	onImgDown2Call:function(){
	var scopeObj = this;
	     var formModel = scopeObj.getController().getFormModel();
	   // formModel.setViewAttributeByProperty("flxFilterContainerKA", "isVisible", true);
	frmAvailableOrderListTabKA.flxFilterContainerKA.animate(
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
        "duration": 0.0001
    }, {
        "animationEnd": function(){
			
		}
    }); 	   
	}, 
	
	onHidePopUpCall:function(){
	     var scopeObj = this;
	     var formModel = scopeObj.getController().getFormModel();
		 //formModel.setViewAttributeByProperty("flxViewContainerKA", "isVisible", false);
	     //formModel.setViewAttributeByProperty("flxFilterContainerKA", "isVisible", false); 
	       frmAvailableOrderListTabKA.flxViewContainerKA.animate(
           kony.ui.createAnimation({
             "100": {
            "left": "100%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0.0001
    }, {
        "animationEnd": function(){
			
		}
    });
	       frmAvailableOrderListTabKA.flxFilterContainerKA.animate(
           kony.ui.createAnimation({
             "100": {
            "left": "100%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0.0001
    }, {
        "animationEnd": function(){
			
		}
    }); 			 
	},
	doNothingOnDeviceBackKA: function() {},
	showHamburgerMenu:function(){
		 if(!hasShownHamburger){
        frmAvailableOrderListTabKA.flxMainKA.animate(
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
	
	    frmAvailableOrderListTabKA.flxMainMenuKA.animate(
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
			 frmAvailableOrderListTabKA.flxMainKA.animate(
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
	
	    frmAvailableOrderListTabKA.flxMainMenuKA.animate(
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

	showMyOrderListForm: function() {
        var formmodel = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmMyOrderListTabKA").getFormModel();
        formmodel.showView();

	 },
	showAvailableOrderListForm: function() {
        var formmodel = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmAvailableOrderListTabKA").getFormModel();
        formmodel.showView();

	 },
	showOrderBallonOnPinTap:function(){
	var scopeObj = this;
	     var formModel = scopeObj.getController().getFormModel();
	    formModel.setViewAttributeByProperty("flexcontainsBaloonKA", "isVisible", true); 
	},
	hideOrderBallonOnPinTap:function(){
	var scopeObj = this;
	     var formModel = scopeObj.getController().getFormModel();
	    formModel.setViewAttributeByProperty("flexcontainsBaloonKA", "isVisible",false); 
	},
	changeDateFocusSkin:function(){
	var scopeObj = this;
	     var formModel = scopeObj.getController().getFormModel();
	    formModel.setViewAttributeByProperty("btnDay0KA", "skin", "sknBtnFFFFFFClanProNews24KA");
		formModel.setViewAttributeByProperty("btnDay1KA", "skin", "sknBtnFFFFFFClanProNews24KA");
		formModel.setViewAttributeByProperty("btnDay2KA", "skin", "sknBtnFFFFFFClanProNews24KA");
	},
    onDayButtonClick:function(e){
		var scopeObj = this;
	    var formModel = scopeObj.getController().getFormModel();
	    switch (e) {
         case 'btnDay0KA':
		 
			  scopeObj.changeDateFocusSkin();
			  formModel.setViewAttributeByProperty("btnDay0KA", "skin", "sknBtnE4E8ECBorder1C3F64CN24KA");  
		  
          
          break;
         case 'btnDay1KA':
		  scopeObj.changeDateFocusSkin();
			  formModel.setViewAttributeByProperty("btnDay1KA", "skin", "sknBtnE4E8ECBorder1C3F64CN24KA");  
                   
          break;
         case 'btnDay2KA':
		 scopeObj.changeDateFocusSkin();
			  formModel.setViewAttributeByProperty("btnDay2KA", "skin", "sknBtnE4E8ECBorder1C3F64CN24KA");  
        
          } 
    },
    onFilterDrill:function(e){
		var scopeObj = this;
	    var formModel = scopeObj.getController().getFormModel();		
	    switch (e) {
         case 'flxDateFilterKA':
		  if(!dateFilterFlexShown){
		    formModel.setViewAttributeByProperty("flxDateDrillKA", "isVisible", true);	
		    dateFilterFlexShown = true;			  
		  }
		  else{
		    formModel.setViewAttributeByProperty("flxDateDrillKA", "isVisible", false);	
		    dateFilterFlexShown = false;				 
		  }
          break;
         case 'flxStatusFilterKA':
		  if(!statusFilterFlexShown){
		    formModel.setViewAttributeByProperty("flxStausDrillKA", "isVisible", true);	
		    statusFilterFlexShown = true;			  
		  }	
		  else{
		    formModel.setViewAttributeByProperty("flxStausDrillKA", "isVisible", false);	
		    statusFilterFlexShown = false;			  
		  }
		  break;
         case 'flxPriorityFilterKA':
		  if(!priorityFilterFlexShown){
		    formModel.setViewAttributeByProperty("flxPriorityDrillKA", "isVisible", true);	
		    priorityFilterFlexShown = true;			  
		  }	
		  else{
		    formModel.setViewAttributeByProperty("flxPriorityDrillKA", "isVisible", false);	
		    priorityFilterFlexShown = false;			  
		  }		 
		}		  
	},


     showNoOfSelectedRows:function(){
		var scopeObj = this;
	    var formModel = scopeObj.getController().getFormModel();
		
		try{
			if(frmAvailableOrderListTabKA.segStatusFiltersKA.selectedRowIndices[0][1].length > 0){
				formModel.setViewAttributeByProperty("imgSelecDateFilters2KA","src","tickmark.png");
               	//frmAvailableOrderListTabKA.imgSelecDateFilters2KA.src = "tickmark.png";			
			}
		}
		//alert(frmAvailableOrderListTabKA.segViewFiltersKA.selectedRowIndices[0][1].length);
		catch(err){
		formModel.setViewAttributeByProperty("imgSelecDateFilters2KA","src","filterblanktick.png");			
	
		}
	 },
     showNoOfSelectedRows2:function(){
		var scopeObj = this;
	    var formModel = scopeObj.getController().getFormModel();
		
		try{
			if(frmAvailableOrderListTabKA.segPriorityFiltersKA.selectedRowIndices[0][1].length > 0){
				formModel.setViewAttributeByProperty("imgSelecDateFilters3KA","src","tickmark.png");
               	//frmAvailableOrderListTabKA.imgSelecDateFilters2KA.src = "tickmark.png";			
			}
		}
		//alert(frmAvailableOrderListTabKA.segViewFiltersKA.selectedRowIndices[0][1].length);
		catch(err){
		formModel.setViewAttributeByProperty("imgSelecDateFilters3KA","src","filterblanktick.png");			
	
		}
	 },
     selectAnyDateFromCalender:function(){
		var scopeObj = this;
	    var formModel = scopeObj.getController().getFormModel();

		formModel.setViewAttributeByProperty("imgSelectAnyDateFiltersKA","src","boxtickmark.png");	
		formModel.setViewAttributeByProperty("imgSelectTodayFiltersKA","src","boxtick_mark_blank.png");
	 },
	 selectToday:function(){
		var scopeObj = this;
	    var formModel = scopeObj.getController().getFormModel();
		formModel.setViewAttributeByProperty("imgSelectTodayFiltersKA","src","boxtickmark.png");	
		formModel.setViewAttributeByProperty("imgSelectAnyDateFiltersKA","src","boxtick_mark_blank.png");		
	 },
	 indicateIfAnyDateSelected:function(){
		var scopeObj = this;
	    var formModel = scopeObj.getController().getFormModel();
        if((frmAvailableOrderListTabKA.imgSelectTodayFiltersKA.src ==  "boxtickmark.png") || (frmAvailableOrderListTabKA.imgSelectAnyDateFiltersKA.src ==  "boxtickmark.png")){
			
		formModel.setViewAttributeByProperty("imgSelecDateFiltersKA","src","tickmark.png");			
		}
        else{
		formModel.setViewAttributeByProperty("imgSelecDateFiltersKA","src","filterblanktick.png");				
		}		
	 },
	 showSettingScreen:function(){
		var scopeObj = this;
	    var formModel = scopeObj.getController().getFormModel();
  		formModel.setViewAttributeByProperty("flexMainMenuContainerKA", "isVisible", false);
        formModel.setViewAttributeByProperty("FlexMainSettingsKA", "isVisible", true);		
	 },
	 backFromSettingScreen:function(){
		var scopeObj = this;
	    var formModel = scopeObj.getController().getFormModel();
  		formModel.setViewAttributeByProperty("flexMainMenuContainerKA", "isVisible", true);
        formModel.setViewAttributeByProperty("FlexMainSettingsKA", "isVisible", false);		
	 },
	 showPanicScreen:function(){
		var scopeObj = this;
	    var formModel = scopeObj.getController().getFormModel();
  		
        formModel.setViewAttributeByProperty("flexPanicPopUpKA", "isVisible", true);		
	 },
	 backFromPanicScreen:function(){
		var scopeObj = this;
	    var formModel = scopeObj.getController().getFormModel();
  		
        formModel.setViewAttributeByProperty("flexPanicPopUpKA", "isVisible", false);		
	 },
	  backToMap: function() {		
	  var scopeObj = this;
	  var formModel = scopeObj.getController().getFormModel();
	  
		formModel.setViewAttributeByProperty("flexStepNavigationKA", "isVisible", false);
		formModel.setViewAttributeByProperty("flxOrderMapKA", "isVisible", true);

	 },
	  startStepNavigation: function() {		
	  var scopeObj = this;
	  var formModel = scopeObj.getController().getFormModel();
	  
		formModel.setViewAttributeByProperty("flexStepNavigationKA", "isVisible", true);
		formModel.setViewAttributeByProperty("flxOrderMapKA", "isVisible", false);

	 }	 
	});