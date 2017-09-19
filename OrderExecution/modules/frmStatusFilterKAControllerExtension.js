
    /** 
 *	In this class, developer can change/override the existing methods or can create new methods if required
 */
/*
 * bussiness/orchestration/mediation logic class for frmStatusFilterKA.
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmStatusFilterKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
    $statics: {
	    FILTER_BY_CHECKBOX : "imagedrag.png",
	    STATUS_DISPLAY_ORDER: ["Completed", "On Route", "Paused" , "Rejected", "Scheduled" , "Started"],
	    PRIORITY_DISPLAY_ORDER: ["Critical", "High", "Low", "Medium"]
    },
    constructor: function(controllerObj) {
        this.$class.$super.call(this,controllerObj);
        this.controllerExtensionGen = undefined;
    },

     fetchData: function() {       
         try {
            var scopeObj = this;
            //this.$class.$superp.fetchData.call(this, success, error);
        } catch (err) {
            kony.appfoundation.log.error("Error in fetchData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.appfoundation.log.error(exception.toString());
        }

        function success(response) {
            kony.appfoundation.log.info("success fetching data ", response);
            scopeObj.formatData(response);
        }

        function error(err) {
            //Error fetching data
            kony.appfoundation.log.error("In fetchData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.appfoundation.log.error(exception.toString());
        }
        
    },
    performFetchAndBindFormData: function(successcallback, errorcallback) {
        try {
            this.$class.$superp.performFetchAndBindFormData.call(this, successcallback, errorcallback);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic perform fetch and bind data : " + error);
        }
    },

    prepareFetchAndBindDataStrategy: function() {
        try {
            this.$class.$superp.prepareFetchAndBindDataStrategy.call(this);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic prepare fetch and bind data : " + error);
        }
    },

    updateBLogicContextData: function(widgetMapping) {
        try {
            this.$class.$superp.updateBLogicContextData.call(this, widgetMapping);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic update context data : " + error);
        }
    },

    fetchAndBindDataByWidgetGroup: function(widgetGroupId) {
        try {
            this.$class.$superp.fetchAndBindDataByWidgetGroup.call(this, widgetGroupId);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic fetch data for widget : " + error);
        }
    },

    bindData: function(dataMap) {
        try {
           kony.print("success");
           var scopeObj = this;
           var imgSelect = kony.sdk.mvvm.frmStatusFilterKAControllerExtension.FILTER_BY_CHECKBOX;
           var controller = scopeObj.getController();          
           var formmodel = controller.getFormModel();
           formmodel.clear();
           var appContext = controller.getApplicationContext();
           var ordeViewscontrollerExtension = appContext.getFormController("frmOrdersViewsKA").getControllerExtensionObject();
		   var filterType = ordeViewscontrollerExtension.getFormModelInfo("filterType"); 
		   var viewType = ordeViewscontrollerExtension.getFormModelInfo("viewType");
		   var processedSegData = [];
		   var processedSegRowData;
		   var utilitiesObj = utilities.getUtilityObj();     
		   var viewValues = "";  
		   var selectedIndices;
		   dataMap = [];   
		   if(filterType == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_STATUS){
		   	 var statusList = kony.sdk.mvvm.frmStatusFilterKAControllerExtension.STATUS_DISPLAY_ORDER;
		    	for(var i in statusList){
		        	processedSegRowData = {};
		        	viewValues = statusList[i].replace(/\s/g, "");
		        	viewValues = "i18n.order.frmStatusFilterKA."+viewValues+".ValueKA";
			   		viewValues = utilitiesObj.geti18nValueKA(viewValues);
		    	    processedSegRowData["lblTaskViewKA"] = viewValues;
		    	    processedSegRowData["imgSelectViewKA"] = imgSelect;
		    	    processedSegData.push(processedSegRowData);
		    	}
		    	 var statusHeader = utilitiesObj.geti18nValueKA("i18n.order.frmStatusFilterKA.title.ValueKA");
		    	 formmodel.setViewAttributeByProperty("lblHeaderKA", "text", statusHeader);
		   }else if(filterType == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_PRIORITY){
		        var priorityList = kony.sdk.mvvm.frmStatusFilterKAControllerExtension.PRIORITY_DISPLAY_ORDER;
		    	for(var i in priorityList){
		        	processedSegRowData = {};
		        	viewValues = "i18n.order.frmStatusFilterKA."+priorityList[i]+".ValueKA";
			   		viewValues = utilitiesObj.geti18nValueKA(viewValues);
		    	    processedSegRowData["lblTaskViewKA"] = viewValues;
		    	    processedSegRowData["imgSelectViewKA"] = imgSelect;
		    	    processedSegData.push(processedSegRowData);
		    	}
		    	var priorityHeader = utilitiesObj.geti18nValueKA("i18n.order.frmPriorityFilterKA.title.ValueKA");
		    	formmodel.setViewAttributeByProperty("lblHeaderKA", "text", priorityHeader);
		   }
		   dataMap["segDateFilterKA"] = {};
	       dataMap["segDateFilterKA"]["segDateFilterKA"] = processedSegData;
	       this.$class.$superp.bindData.call(this,dataMap);
          /* for (var widgetGroupId in dataMap) {
                bindDataObj = scopeObj.bLogicContextObj.getFetchDataStrategy(widgetGroupId);
                bindDataObj.bind(formmodel, dataMap[widgetGroupId], scopeObj.bLogicContextObj.getContext(widgetGroupId)["widgets"]);
           }*/
         /*  var flag = scopeObj.getFormModelInfo("orderViewFilters") ? false : true;
           var selectedFilter = {};
           
           if(flag){           	
           		scopeObj.setFormModelInfo("orderViewFilters",selectedFilter);         
           }else{
          		selectedFilter = scopeObj.getFormModelInfo("orderViewFilters");   
          		flag = selectedFilter[filterType]  ? true : false;     
          		if(flag){
	          		var selectedIndex = selectedFilter[filterType]; 
	         		selectedIndices = [ [0, selectedIndex ] ];
	         		//selectedIndices[0][0] = 0;   
	         		//selectedIndices[0][1] = selectedIndex;
			   		formmodel.setViewAttributeByProperty("segDateFilterKA", "selectedRowIndices",selectedIndices);
			   	}
          		        
           }
           
            var viewApplied = ordeViewscontrollerExtension.getFormModelInfo("ViewApplied"); 
			scopeObj.checkIfViewApplied(viewApplied);
           */
			if(kony.servicesapp.temp.value==="Status")	{
				if(kony.servicesapp.status.values!==null)	{
					var selectedIndex = kony.servicesapp.status.indices; 
					selectedIndices = [ [0, selectedIndex ] ];
				}
				formmodel.setViewAttributeByProperty("segDateFilterKA", "selectedRowIndices",selectedIndices);
			}
			else if(kony.servicesapp.temp.value==="Priority"){
				if(kony.servicesapp.priorities.values!==null){
					var selectedIndex = kony.servicesapp.priorities.indices; 
	         		selectedIndices = [ [0, selectedIndex ] ];
				}
				formmodel.setViewAttributeByProperty("segDateFilterKA", "selectedRowIndices",selectedIndices);
			}
          
          
		   scopeObj.getController().getFormModel().formatUI();
			formmodel.showView();
          
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic bind data : " + error);
        }
    },
	fetchMasterData: function(serviceName, options, successcallback, errorcallback) {
        try {
			var configObj = this.getController().getConfig();
            var serviceName = configObj.getObjectServiceName();
            var options = configObj.getObjectServiceOptions();
			this.$class.$superp.fetchMasterData.call(this, serviceName, options, successcallback, errorcallback);
        } catch (e) {
            kony.appfoundation.log.error("Error in fetchingMasterData", e);
        }
    },
	fetchMasterDataForWidget: function(propertyId, contextData, successcallback, errorcallback) {
        try {
			this.$class.$superp.fetchMasterDataForWidget.call(this, propertyId, contextData, successcallback, errorcallback);
        } catch (e) {
            kony.appfoundation.log.error("Error in fetchingMasterDataForWidget", e);
        }
    },

    saveRecord: function(recordObject, entityName, onSuccess, onError) {
        try {
            this.$class.$superp.saveRecord.call(this, recordObject, entityName, onSuccess, onError);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic save entity : " + error);
        }
    },

    saveRecords: function(recordsArray, successcallback, errorcallback) {
        try {
            this.$class.$superp.saveRecords.call(this, recordsArray, successcallback, errorcallback);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic save entities : " + error);
        }
    },
    getEntitiesDataMap: function() {
        try {
            return this.$class.$superp.getEntitiesDataMap.call(this);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic prepare entity data map : " + error);
        }
    },

   saveData: function() {
        try {
            var scopeObj = this;
            this.$class.$superp.saveData.call(this, success, error);
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.appfoundation.log.error(exception.toString());
        }

        function success(res) {
            //Successfully created record
            kony.appfoundation.log.info("success saving record ", res);
        }

        function error(err) {
            //Handle error case
            kony.appfoundation.log.error("In saveData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.appfoundation.log.error(exception.toString());
        }

    },
    deleteData: function() {
        try {
            var scopeObj = this;
            this.$class.$superp.deleteData.call(this, success, error);
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.appfoundation.log.error(exception.toString());
        }

        function success(res) {
            //Successfully deleting record
            kony.appfoundation.log.info("success deleting record " + JSON.stringify(res));
        }

        function error(err) {
            //Handle error case
            kony.appfoundation.log.error("In deleteData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.appfoundation.log.error(exception.toString());
        }
    },
    formatData: function(data) {
        try {
            var scopeObj = this;
            var formattedData = this.$class.$superp.formatData.call(this, data);
            this.bindData(formattedData);
        } catch (err) {
            //kony.appfoundation.log.error("Error in formatData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_FORMATDATA_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_FORMATDATA_IN_CONTROLLER_EXTENSION, err);
            kony.appfoundation.log.error(exception.toString());
        };

    },

    performAction: function(actionName, argsArray) {
        try {
            return this.$class.$superp.performAction.call(this, actionName, argsArray);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic perform action : " + err);
        }
    },

    showPreviousForm: function(doReload) {
        this.$class.$superp.showPreviousForm.call(this, doReload);
    },

    navigateTo: function(formId, navObject) {
        this.$class.$superp.navigateTo.call(this, formId, navObject);
    },
    selectFilters : function(){
           var scopeObj = this;
    	   var controller = scopeObj.getController();          
           var formmodel = controller.getFormModel();
           var appContext = controller.getApplicationContext();
           var ordeViewscontrollerExtension = appContext.getFormController("frmOrdersViewsKA").getControllerExtensionObject();
		   var orderViewFormModel = appContext.getFormController("frmOrdersViewsKA").getFormModel();
		   var utilitiesObj = utilities.getUtilityObj();
		   var selectedIndices = formmodel.getViewAttributeByProperty("segDateFilterKA", "selectedRowIndices");  
           var selectedValue;
           var selectedFilters;
           var index;
           var i;
           var flagApplyView = false;
		   if(selectedIndices){
                 if(kony.servicesapp.temp.value === "Status"){
					index = 1;
					selectedFilters = selectedIndices[0][1];
					kony.servicesapp.status.indices = selectedIndices[0][1];
					kony.servicesapp.status.values = null;
					for(i in selectedFilters){
						if(kony.servicesapp.status.values!==null)
						kony.servicesapp.status.values = kony.servicesapp.status.values +"," + kony.sdk.mvvm.frmStatusFilterKAControllerExtension.STATUS_DISPLAY_ORDER[selectedFilters[i]];
						else
						kony.servicesapp.status.values = kony.sdk.mvvm.frmStatusFilterKAControllerExtension.STATUS_DISPLAY_ORDER[selectedFilters[i]];
					}
					if(selectedFilters.length>1){
                       selectedValue = kony.servicesapp.status.values.split(",");
                       selectedValue = String(selectedValue[0])+",more";
                    }
					else{
						selectedValue = kony.servicesapp.status.values;
					}
					kony.servicesapp.status.formatValues = selectedValue;
					ordeViewscontrollerExtension.setFilterValue(index,selectedValue,flagApplyView);
               }
              else if(kony.servicesapp.temp.value==="Priority"){
					index = 2;
					selectedFilters = selectedIndices[0][1];
					kony.servicesapp.priorities.indices = selectedIndices[0][1];
					kony.servicesapp.priorities.values=null;
					for(i in selectedFilters){
						if(kony.servicesapp.priorities.values!==null)
							kony.servicesapp.priorities.values = kony.servicesapp.priorities.values+","+kony.sdk.mvvm.frmStatusFilterKAControllerExtension.PRIORITY_DISPLAY_ORDER[selectedFilters[i]];
						else
							kony.servicesapp.priorities.values = kony.sdk.mvvm.frmStatusFilterKAControllerExtension.PRIORITY_DISPLAY_ORDER[selectedFilters[i]];
					}
				   
					if(selectedFilters.length > 1){
                       selectedValue = kony.servicesapp.priorities.values.split(",");
                       selectedValue = String(selectedValue[0])+",more";
                    }
					else{
						selectedValue = kony.servicesapp.priorities.values;
					}
					kony.servicesapp.priorities.formatValues = selectedValue;
					ordeViewscontrollerExtension.setFilterValue(index,selectedValue,flagApplyView);
               }
            
			scopeObj.showPreviousForm(false);  
		   
        
		 /*  if(selectedIndices){
			   var selectedFilters = selectedIndices[0][1];
               var selectedFiltersLen = selectedFilters.length;
	           var selectedValue;
	           var flagApplyView = false;
	           
	           if(selectedFiltersLen > 0){
				   orderViewFilters[filterType] = selectedFilters;
				   scopeObj.setFormModelInfo("orderViewFilters",orderViewFilters);
				    var index;  
				    var viewValues = "";				    
			        if(filterType == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_STATUS){
					 	index = 1;  
					 	var listOfStatus = kony.sdk.mvvm.frmStatusFilterKAControllerExtension.STATUS_DISPLAY_ORDER;
						selectedValue = listOfStatus[orderViewFilters[filterType][0]];
						viewValues = selectedValue.replace(/\s/g, "");
						viewValues = "i18n.order.frmStatusFilterKA."+viewValues+".ValueKA";
				   		selectedValue = utilitiesObj.geti18nValueKA(viewValues);
						scopeObj.setFormModelInfo("changeStatusFilterSelection",true);
					 	if(viewApplied && selectedFiltersLen == 1 && viewApplied == "Scheduled"  || viewApplied == "Started"){
					 		if(selectedValue == "Scheduled" && viewApplied == "Scheduled" ){
					 			flagApplyView = true;
								scopeObj.setFormModelInfo("changeStatusFilterSelection",false);
					 		}else if(selectedValue == "Started" && viewApplied == "Started"){
					 			flagApplyView = true;
								scopeObj.setFormModelInfo("changeStatusFilterSelection",false);
					 		}
					 	}
					}else{
						index = 2;
						var listOfPriority = kony.sdk.mvvm.frmStatusFilterKAControllerExtension.PRIORITY_DISPLAY_ORDER;
						selectedValue = listOfPriority[orderViewFilters[filterType][0]];
						viewValues = "i18n.order.frmStatusFilterKA."+selectedValue+".ValueKA";
			   			selectedValue = utilitiesObj.geti18nValueKA(viewValues);
					}
					if(selectedFiltersLen > 1){
						var moreVal = utilitiesObj.geti18nValueKA("i18n.common.more.filterValueKA");     
						selectedValue = selectedValue + moreVal;
					}
					ordeViewscontrollerExtension.setFilterValue(index,selectedValue,flagApplyView);
					if(!flagApplyView){
						ordeViewscontrollerExtension.setFormModelInfo("defaultFilterApplied1",false);
					}
				   scopeObj.showPreviousForm(false);
			   }*/
		   }else{	
               var msg = utilitiesObj.geti18nValueKA("i18n.order.frmStatusFilterKA.alertSelectFilter.ValueKA");
		   	   alert(msg);
		   }
    } ,
    clearFilters : function(){
    try{
    	var scopeObj = this;
    	var controller = scopeObj.getController();          
        var formmodel = controller.getFormModel();
		var index;
		var appContext = controller.getApplicationContext();
		var ordeViewscontrollerExtension = appContext.getFormController("frmOrdersViewsKA").getControllerExtensionObject();
		if(kony.servicesapp.temp.value === "Status"){
			kony.servicesapp.status.values = null;
			kony.servicesapp.status.indices = null;
			kony.servicesapp.status.formatValues = null;
			index = 1;
        }
		else if(kony.servicesapp.temp.value === "Priority" ){
			kony.servicesapp.priorities.values = null;
			kony.servicesapp.priorities.indices = null;
			kony.servicesapp.priorities.formatValues = null;
			index = 2;
		}
		ordeViewscontrollerExtension.setFilterValue(index,"",false);
		formmodel.setViewAttributeByProperty("segDateFilterKA", "selectedRowIndices",null); 
		var selectedIndices;
		if(kony.servicesapp.temp.view == "Scheduled"){
			selectedIndices = [ [0, [4] ] ];
			formmodel.setViewAttributeByProperty("segDateFilterKA", "selectedRowIndices",selectedIndices);
			appContext.getFormController("frmOrdersViewsKA").getFormModel().setViewAttributeByProperty("segOrderViewKA", "selectedRowIndex", [0,4]);
		}
		else if(temp.view == "Started"){
			selectedIndices = [ [0, [5] ] ];
			formmodel.setViewAttributeByProperty("segDateFilterKA", "selectedRowIndices",selectedIndices);
			appContext.getFormController("frmOrdersViewsKA").getFormModel().setViewAttributeByProperty("segOrderViewKA", "selectedRowIndex", [0,5]);
		}
       	/*var appContext = controller.getApplicationContext();
        var ordeViewscontrollerExtension = appContext.getFormController("frmOrdersViewsKA").getControllerExtensionObject();
        var dateFilterControllerExtension = appContext.getFormController("frmDateFilterKA").getControllerExtensionObject();
        var viewApplied = ordeViewscontrollerExtension.getFormModelInfo("ViewApplied"); 
        var selectedIndices;
		var filterType = ordeViewscontrollerExtension.getFormModelInfo("filterType"); 
       	if(viewApplied){
			scopeObj.checkIfViewApplied(viewApplied,filterType);
        }else{    
			var orderViewFilters = {};
			orderViewFilters = scopeObj.getFormModelInfo("orderViewFilters");
			if(orderViewFilters){
				 delete orderViewFilters[filterType];
				 scopeObj.setFormModelInfo("orderViewFilters",orderViewFilters);
			}
			if(!dateFilterControllerExtension.getFormModelInfo("changeDateSelection") && utilities.getUtilityObj().isObjectEmpty(orderViewFilters)){
				ordeViewscontrollerExtension.reselectView();
				if(filterType == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_STATUS){
					scopeObj.checkIfViewApplied(ordeViewscontrollerExtension.getFormModelInfo("ViewApplied"),filterType);
				}
			}else{
				var index = 2;
				if(filterType == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_STATUS){
					index = 1;  
				}
				ordeViewscontrollerExtension.setFilterValue(index,"");
			}
		}
		*/
    }catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic clearFilters : " + err);
    }
    
    
    },
	checkIfViewApplied :function(viewApplied,filterType){
		  try{
			var scopeObj = this;
			var controller = scopeObj.getController();          
			var formmodel = controller.getFormModel();
			var selectedIndices;
			if(viewApplied && viewApplied == "Scheduled"){
            	selectedIndices = [ [0, [4] ] ];
            	formmodel.setViewAttributeByProperty("segDateFilterKA", "selectedRowIndices",selectedIndices);
            }else if(viewApplied && viewApplied == "Started"){
            	selectedIndices = [ [0, [5] ] ];
            	formmodel.setViewAttributeByProperty("segDateFilterKA", "selectedRowIndices",selectedIndices);
            }else if(filterType && filterType == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_STATUS){
				scopeObj.setFormModelInfo("changeStatusFilterSelection",false);
			}
		  }catch (err) {
					kony.sdk.mvvm.log.error("error in Blogic setDateRange : " + err);
		  }
	  }
});