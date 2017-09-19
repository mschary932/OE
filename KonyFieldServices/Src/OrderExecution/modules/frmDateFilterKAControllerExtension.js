
    /** 
 *	In this class, developer can change/override the existing methods or can create new methods if required
 */
/*
 * bussiness/orchestration/mediation logic class for frmDateFilterKA.
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmDateFilterKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {
    $statics: {
	    UNCHECKED_VIEW_IMAGE : "notification_circle_unchecked.png",
	    DATE_FILTER_ORDER: ["Today", "Select Date"],
	    SELECTED_TODAY_FILTER : "Today",
	    SELECTED_DATE_FILTER : "DATE",
	    DATE_FORMAT: "YYYY-MM-DD"
	    
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
           var imgSelect = kony.sdk.mvvm.frmDateFilterKAControllerExtension.UNCHECKED_VIEW_IMAGE;
           var controller = scopeObj.getController();          
           var formmodel = controller.getFormModel();
           formmodel.clear();
           var appContext = controller.getApplicationContext();
           var ordeViewscontrollerExtension = appContext.getFormController("frmOrdersViewsKA").getControllerExtensionObject();
		   var orderListControllerExtension = appContext.getFormController("frmOrderListKA").getControllerExtensionObject();
		   var processedSegData = [];
		   var processedSegRowData;
		   formmodel.setViewAttributeByProperty("calenderKA", "isVisible", false);
		   scopeObj.setDateRange();
		   var dateFilterList = kony.sdk.mvvm.frmDateFilterKAControllerExtension.DATE_FILTER_ORDER;
		   var viewValues = "";
		   dataMap = [];
		   var utilitiesObj = utilities.getUtilityObj();
		    	for(var i in dateFilterList){
		        	processedSegRowData = {};
		        	if(dateFilterList[i] == kony.sdk.mvvm.frmDateFilterKAControllerExtension.SELECTED_TODAY_FILTER){
		        		viewValues = utilitiesObj.geti18nValueKA("i18n.common.today.filterValueKA");
		        	}else{
		        		viewValues = utilitiesObj.geti18nValueKA("i18n.frmDateFiltersKA.lblSelectDateKA");
		        	}
		    	    processedSegRowData["lblTaskViewKA"] = viewValues;
		    	    processedSegRowData["imgSelectViewKA"] = imgSelect;
		    	    processedSegData.push(processedSegRowData);
		    	}
		   dataMap["segDateFilterKA"] = {};
	       dataMap["segDateFilterKA"]["segDateFilterKA"] = processedSegData;
	       this.$class.$superp.bindData.call(this,dataMap);
           /*for (var widgetGroupId in dataMap) {
                bindDataObj = scopeObj.bLogicContextObj.getFetchDataStrategy(widgetGroupId);
                bindDataObj.bind(formmodel, dataMap[widgetGroupId], scopeObj.bLogicContextObj.getContext(widgetGroupId)["widgets"]);
           }
           */
		  /* var selectedDate = scopeObj.getFormModelInfo("DateApplied"); 
           var flag = scopeObj.getFormModelInfo("DateFilter") ? false : true;         
           if(flag){           	
           		scopeObj.setFormModelInfo("DateFilter",null);   
           		scopeObj.setFormModelInfo("DateFilterIndex",null);         
           }else{
          		var selectedDateFilter = scopeObj.getFormModelInfo("DateFilterIndex");  
				var selectedDate1 = moment(selectedDate,kony.servicesapp.DATE_FORMAT).format("DD-MM-YYYY");
				var formatDate = selectedDate1.split('-');
          		scopeObj.selectDateFilter(selectedDateFilter,formatDate);
          		        
           }
           
            var viewApplied = ordeViewscontrollerExtension.getFormModelInfo("ViewApplied"); 
			scopeObj.checkIfViewApplied(viewApplied,selectedDate);
            */
			kony.servicesapp.temp.fromDate = true;
			if(kony.servicesapp.date.text == "Today")
				formmodel.setViewAttributeByProperty("segDateFilterKA", "selectedRowIndex",[0,0]);
            else{
				var selectedDate = kony.servicesapp.date.value;
				var selectedDate1 = moment(selectedDate,kony.servicesapp.DATE_FORMAT).format("DD-MM-YYYY");
				var formatDate = selectedDate1.split('-');
				formmodel.setViewAttributeByProperty("segDateFilterKA", "selectedRowIndex",[0,1]);
				formmodel.setViewAttributeByProperty("calenderKA", "isVisible", true);
				formmodel.setViewAttributeByProperty("calenderKA", "dateComponents",formatDate);
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
		   var selectedIndex = formmodel.getViewAttributeByProperty("segDateFilterKA", "selectedRowIndex");  
		   var selectedDate;
		   var selectedValue;
		   var controllerOrderView = controller.getApplicationContext().getFormController("frmOrdersViewsKA");
           var controllerExtension = controllerOrderView.getControllerExtensionObject();
		   var orderListControllerExtension = controller.getApplicationContext().getFormController("frmOrderListKA").getControllerExtensionObject();
           var utilitiesObj = utilities.getUtilityObj();
           var todayVal = utilitiesObj.geti18nValueKA("i18n.common.today.filterValueKA");
           var dateFormat = utilitiesObj.geti18nValueKA("i18n.common.dateFormat.filterValueKA");
           var flagApplyView = false;
		   /*scopeObj.setFormModelInfo("changeDateSelection",true);
		   var viewApplied = ordeViewscontrollerExtension.getFormModelInfo("ViewApplied");
		   if(selectedIndex && selectedIndex.length > 1){
		   	    switch (selectedIndex[1]) {
	                case 0.0:
	                    selectedValue = todayVal;
	                    if(viewApplied && viewApplied == "Today"){
					 		flagApplyView = true;
							scopeObj.setFormModelInfo("changeDateSelection",false);
					 	}else{
						 	selectedDate = (moment().format(kony.sdk.mvvm.frmDateFilterKAControllerExtension.DATE_FORMAT)) ;
		                    scopeObj.setFormModelInfo("DateFilter",selectedDate);
		                    scopeObj.setFormModelInfo("DateFilterIndex",kony.sdk.mvvm.frmDateFilterKAControllerExtension.SELECTED_TODAY_FILTER);
					 	
					 	}
	                    break;
	
	                case 1.0:
						var slectedDateComp = formmodel.getViewAttributeByProperty("calenderKA", "dateComponents");
						selectedDate = slectedDateComp[2]+"-"+slectedDateComp[1]+"-"+slectedDateComp[0];
						selectedValue = moment(selectedDate,kony.sdk.mvvm.frmDateFilterKAControllerExtension.DATE_FORMAT).format(dateFormat);
						var selectedDate1 =  moment(selectedDate,kony.sdk.mvvm.frmDateFilterKAControllerExtension.DATE_FORMAT).format("DD-MM-YYYY");
						var dateApplied = scopeObj.getFormModelInfo("DateApplied");
						var date;
						if(dateApplied){
							date = moment(dateApplied,kony.servicesapp.DATE_FORMAT).format("DD-MM-YYYY");
						}
						if(viewApplied && date && date == selectedDate1){
							flagApplyView = true;
							scopeObj.setFormModelInfo("changeDateSelection",false);
							
						}else{							
							scopeObj.setFormModelInfo("DateFilter", slectedDateComp);
							var val = moment(selectedDate,kony.sdk.mvvm.frmDateFilterKAControllerExtension.DATE_FORMAT).format(kony.servicesapp.DATE_FORMAT);
							scopeObj.setFormModelInfo("DateApplied",val);
							scopeObj.setFormModelInfo("DateFilterIndex",kony.sdk.mvvm.frmDateFilterKAControllerExtension.SELECTED_DATE_FILTER);
							//orderListControllerExtension.setFormModelInfo("selectedDate",val)
							break;
						}
            }
               controllerExtension.setFilterValue(0,selectedValue,flagApplyView);
			    if(!flagApplyView){
					controllerExtension.setFormModelInfo("defaultFilterApplied1",false);
			   }
			   }else{
		   	   var utilitiesObj = utilities.getUtilityObj();
               var msg = utilitiesObj.geti18nValueKA("i18n.order.frmStatusFilterKA.alertSelectFilter.ValueKA");
		   	   alert(msg);
		   }*/
		   if(selectedIndex && selectedIndex.length > 1){
			  switch (selectedIndex[1]) {
	                case 0.0:
					    kony.servicesapp.date.value = moment().format("YYYY-MM-DD");
						kony.servicesapp.date.text = "Today";
	                    selectedValue = kony.servicesapp.date.text;
	                    break;
	
	                case 1.0:
						var slectedDateComp = formmodel.getViewAttributeByProperty("calenderKA", "dateComponents");
						selectedDate = slectedDateComp[2]+"-"+slectedDateComp[1]+"-"+slectedDateComp[0];
						kony.servicesapp.date.value = selectedDate;
						selectedValue = moment(selectedDate,kony.sdk.mvvm.frmDateFilterKAControllerExtension.DATE_FORMAT).format(dateFormat);
						kony.servicesapp.date.text = selectedValue;
						var selectedDate1 =  moment(selectedDate,kony.sdk.mvvm.frmDateFilterKAControllerExtension.DATE_FORMAT).format("DD-MM-YYYY");
						var dateApplied = scopeObj.getFormModelInfo("DateApplied");
						var dateFilter;
						if(dateApplied){
							dateFilter = moment(dateApplied,kony.servicesapp.DATE_FORMAT).format("DD-MM-YYYY");
						}	break;
						}
            }  
		   
			controllerExtension.setFilterValue(0,selectedValue,flagApplyView);
			scopeObj.showPreviousForm(false);
		   
    },
    clearFilters : function(){
	    try{
	    	var scopeObj = this;
	    	var controller = scopeObj.getController();  
			var appContext = controller.getApplicationContext();			
	        var formmodel = controller.getFormModel();
	        var controllerOrderView = controller.getApplicationContext().getFormController("frmOrdersViewsKA");
			var orderListControllerExtension = controller.getApplicationContext().getFormController("frmOrderListKA").getControllerExtensionObject();
            var ordeViewscontrollerExtension = controllerOrderView.getControllerExtensionObject();
			var viewApplied = ordeViewscontrollerExtension.getFormModelInfo("ViewApplied"); 
			var dateApplied = orderListControllerExtension.getFormModelInfo("selectedDate");
			if(viewApplied){
				scopeObj.checkIfViewApplied(viewApplied,dateApplied);
			}else{			 
				scopeObj.setFormModelInfo("DateFilter",null);
				scopeObj.setFormModelInfo("DateFilterIndex",null);
				var statusFilterControllerExtension = appContext.getFormController("frmStatusFilterKA").getControllerExtensionObject();
				if(utilities.getUtilityObj().isObjectEmpty(statusFilterControllerExtension.getFormModelInfo("orderViewFilters"))){
					ordeViewscontrollerExtension.reselectView();
					scopeObj.checkIfViewApplied(ordeViewscontrollerExtension.getFormModelInfo("ViewApplied"),dateApplied);
				}else{
					formmodel.setViewAttributeByProperty("segDateFilterKA", "selectedRowIndex",null); 
					formmodel.setViewAttributeByProperty("calenderKA", "isVisible", false);
					var setDate = moment().format("DD/MM/YYYY");	       
					setDate = setDate.split('/');
					formmodel.setViewAttributeByProperty("calenderKA", "dateComponents",setDate);          	
					ordeViewscontrollerExtension.setFilterValue(0,"");
					scopeObj.setFormModelInfo("changeDateSelection",false);
				}
			}
	    }catch (err) {
	            kony.sdk.mvvm.log.error("error in Blogic clearFilters : " + err);
	    } 
    },
    onRowClickOfSegFilter : function(contextData){
    	try{
	    	var scopeObj = this;
	    	var controller = scopeObj.getController();          
	        var formmodel = controller.getFormModel();
	        var isVisible = false;
	       	if(contextData == 1.0){
	       		isVisible = true;
	       		var setDate = moment().format("DD/MM/YYYY");	       
           		setDate = setDate.split('/');
           		formmodel.setViewAttributeByProperty("calenderKA", "dateComponents",setDate);
	       	}	        
	        formmodel.setViewAttributeByProperty("calenderKA", "isVisible", isVisible);
	    }catch (err) {
	            kony.sdk.mvvm.log.error("error in Blogic onRowClickOfSegFilter : " + err);
	    } 
    
    },
    selectDateFilter : function(selectedDateFilter,selectedDate){
    	try{
	    	var scopeObj = this;
	    	var controller = scopeObj.getController();          
	        var formmodel = controller.getFormModel();
	    	var lclSelectedIndex;
	    	switch(selectedDateFilter){
		    	case kony.sdk.mvvm.frmDateFilterKAControllerExtension.SELECTED_TODAY_FILTER :
		    		lclSelectedIndex = [0,0];
					formmodel.setViewAttributeByProperty("calenderKA", "isVisible", false);
		    		break;
		    	case kony.sdk.mvvm.frmDateFilterKAControllerExtension.SELECTED_DATE_FILTER:
		    		lclSelectedIndex = [0,1];
		    		formmodel.setViewAttributeByProperty("calenderKA", "isVisible", true);
		    		formmodel.setViewAttributeByProperty("calenderKA", "dateComponents",selectedDate);
		    		break;
	    	
	    	}
	    	formmodel.setViewAttributeByProperty("segDateFilterKA", "selectedRowIndex", lclSelectedIndex);
	    }catch (err) {
	            kony.sdk.mvvm.log.error("error in Blogic onRowClickOfSegFilter : " + err);
	    } 
    
    },
    setDateRange : function(){
    	try{
	   		var scopeObj = this;
		    var controller = scopeObj.getController();          
		    var formmodel = controller.getFormModel();
		    var utilitiesObj = utilities.getUtilityObj();
		    var dateVal = kony.servicesapp.dateRangeFilterValueKA;
           	if(dateVal && dateVal.indexOf(":") != -1){ 
           		var dateRange = dateVal.split(":");
           		var startDate = moment().add('days',dateRange[0]).format("DD/MM/YYYY");
           		startDate = startDate.split('/');
           		var endDate = moment().add('years', dateRange[1]).format("DD/MM/YYYY");
           		endDate = endDate.split('/');       		
           		//formmodel.performActionOnView("calenderKA", "enableRangeOfDates", [startDate,endDate, "sknWhiteCellBlueFontKA", true]);
           		formmodel.setViewAttributeByProperty("calenderKA", "validStartDate", startDate);
           		formmodel.setViewAttributeByProperty("calenderKA", "validEndDate", endDate);
           	}
    	 }catch (err) {
	            kony.sdk.mvvm.log.error("error in Blogic setDateRange : " + err);
	    }
    },
	
	  checkIfViewApplied :function(viewApplied,dateApplied){
		  try{
				var scopeObj = this;
				var controller = scopeObj.getController();
				var orderListControllerExtension = controller.getApplicationContext().getFormController("frmOrderListKA").getControllerExtensionObject();
				if(viewApplied && viewApplied == "Today"){
					scopeObj.selectDateFilter(kony.sdk.mvvm.frmDateFilterKAControllerExtension.SELECTED_TODAY_FILTER);
				}else{
					scopeObj.setFormModelInfo("DateApplied",dateApplied);
					if(scopeObj.getFormModelInfo("DateFilterIndex") == kony.sdk.mvvm.frmDateFilterKAControllerExtension.SELECTED_TODAY_FILTER){
							scopeObj.selectDateFilter(kony.sdk.mvvm.frmDateFilterKAControllerExtension.SELECTED_TODAY_FILTER);		   
					}else{
						if(dateApplied){
							var date = moment(dateApplied,kony.servicesapp.DATE_FORMAT).format("DD-MM-YYYY");
							var formatDate = date.split('-');
							scopeObj.selectDateFilter(kony.sdk.mvvm.frmDateFilterKAControllerExtension.SELECTED_DATE_FILTER,formatDate);
						}
					}
				}
		  }catch (err) {
					kony.sdk.mvvm.log.error("error in Blogic setDateRange : " + err);
		  }
	  }
});