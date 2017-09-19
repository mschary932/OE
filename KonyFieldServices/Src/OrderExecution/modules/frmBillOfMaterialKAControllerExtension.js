/*
 * Controller Extension class for frmBillOfMaterialKA
 * Developer can edit the existing methods or can add new methods if required
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmBillOfMaterialKAControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmBillOfMaterialKAControllerExtension = Class(kony.sdk.mvvm.BaseFormControllerExtension, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
      	this.ParentArray=[];
      	this.ParentIndex=0;
      	this.Parent_id=null;
        this.firstObjectType=null;
        this.isSearch=false;
      	this.MatObject=false;
    },
    /** 
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config 
     * @memberof frmBillOfMaterialKAControllerExtension#
     */
    fetchData: function() {
        try {
            var scopeObj = this;
          	var utilitiesObj = utilities.getUtilityObj();
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.msg.loadingDataKA"));
          	scopeObj.ParentArray[scopeObj.ParentIndex++]=scopeObj.getController().getContextData().getCustomInfo("WOId");
          	scopeObj.firstObjectType = scopeObj.getController().getContextData().getCustomInfo("Obj_type");
            this.$class.$superp.fetchData.call(this, success, error);
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

        function success(response) {
            kony.sdk.mvvm.log.info("success fetching data ", response);
            scopeObj.getController().processData(response);
        }

        function error(err) {
            //Error fetching data
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("In fetchData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
    /** 
     * This method processes fetched data. Developer can edit.
     * Default implementation processes the provided data to required format for bind.
     * @param {Object} data - fetched data. (Default : data map, group id as key and records array as value)
     * @memberof frmBillOfMaterialKAControllerExtension#
     * @returns {Object} - processed data
     */
    processData: function(data) {
        try {
          	var utilitiesObj = utilities.getUtilityObj();
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.msg.loadingDataKA"));
            var scopeObj = this;
          	var formmodel = this.getController().getFormModel();
          	if(scopeObj.ParentIndex<2)
             formmodel.setViewAttributeByProperty("flxBackToOrderObjectKA","isVisible",false);
          	else
              formmodel.setViewAttributeByProperty("flxBackToOrderObjectKA","isVisible",true);
          	if(scopeObj.isSearch!=true)
            scopeObj.setParentDetails(data["segBOMKA"]);
          	var records = scopeObj.setBOMIcon(data["segBOMKA"]);
          	data["segBOMKA"]=records;
          	formmodel.setViewAttributeByProperty("lblBOMResCountKA","text",records.length+" Resources");
            var processedData = this.$class.$superp.processData.call(this, data);
            this.getController().bindData(processedData);
            return processedData;
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in processData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        };
    },
    /** 
     * This method binds the processed data to the form. Developer can edit.
     * Default implementation binds the data to widgets in the form.
     * @param {Object} data - processed data.(Default : data map for each group, widget id as key and widget data as value)
     * @memberof frmBillOfMaterialKAControllerExtension#
     */
    bindData: function(data) {
        try {
            var formmodel = this.getController().getFormModel();
            formmodel.clear();
            this.$class.$superp.bindData.call(this, data);
            this.getController().getFormModel().formatUI();
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            this.getController().showForm();
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in bindData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

    },
    /** 
     * This method is entry point for save flow. Developer can edit.
     * Default implementation saves the entity record from the data of widgets defined in form config 
     * @memberof frmBillOfMaterialKAControllerExtension#
     */
    saveData: function() {
        try {
            var scopeObj = this;
            this.$class.$superp.saveData.call(this, success, error);
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

        function success(res) {
            //Successfully created record
            kony.sdk.mvvm.log.info("success saving record ", res);
        }

        function error(err) {
            //Handle error case
            kony.sdk.mvvm.log.error("In saveData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

    },
    /** 
     * This method is entry point for delete/remove flow. Developer can edit.
     * Default implementation deletes the entity record displayed in form (primary keys are needed)
     * @memberof frmBillOfMaterialKAControllerExtension#
     */
    deleteData: function() {
        try {
            var scopeObj = this;
            this.$class.$superp.deleteData.call(this, success, error);
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

        function success(res) {
            //Successfully deleting record
            kony.sdk.mvvm.log.info("success deleting record " + JSON.stringify(res));
        }

        function error(err) {
            //Handle error case
            kony.sdk.mvvm.log.error("In deleteData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
    /** 
     * This method shows form.
     * @memberof frmBillOfMaterialKAControllerExtension#
     */
    showForm: function() {
        try {
            var formmodel = this.getController().getFormModel();
            formmodel.showView();
        } catch (e) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SHOWFORM_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SHOWFORM_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
  	setParentDetails:function(records){
      var scopeObj=this;
      var formmodel = scopeObj.getController().getFormModel();
      var utilitiesObj = utilities.getUtilityObj();
      scopeObj.Parent_id=records[0].Parent_id;
      var Parent_id = records[0].Parent_id.replace(/^(0+)/g, '');    
      formmodel.setViewAttributeByProperty("lblObjectIdKA","text",Parent_id);
      var truncDesc = utilitiesObj.dataTruncation(records[0].ParentDescription,30,3, "...");
      formmodel.setViewAttributeByProperty("lblObjectNameKA","text",truncDesc.value);
    },
  	/*2nd level onwards fetch*/
  	fetchChildObjects:function(segmentRow){
      try{
      var utilitiesObj = utilities.getUtilityObj();
      kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.msg.loadingDataKA"));
      var scopeObj=this;
      var formmodel = scopeObj.getController().getFormModel();
      var index = segmentRow[1];
      if(kony.application.getPreviousForm().id!="frmOrderAssetKA")
         formmodel.setViewAttributeByProperty("lblBackToOrderObjectKA","text",utilitiesObj.geti18nValueKA("i18n.common.BackToMaineResourcesKA"));
      else
         formmodel.setViewAttributeByProperty("lblBackToOrderObjectKA","text",utilitiesObj.geti18nValueKA("i18n.common.BackToOrderAssetKA"));
      var groupwidgetcontext = scopeObj.createGroupWidgetsContext();
      var contextData = scopeObj.getController().getContextData();
      var succ=function(response){scopeObj.processData(response); scopeObj.MatObject = true; kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();}
      var fail=function(err){ kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();}
      var Object_id = frmBillOfMaterialKA.segBOMKA.data[index]["Child_id"];
      scopeObj.ParentArray[scopeObj.ParentIndex++]=Object_id;
      var query = "&$filter=Parent_id eq '{x}'";
      contextData.setQuery("segBOMKA",query,"odata")
      contextData.setQueryParams("segBOMKA",{
        "x":Object_id,
      });
        
       groupwidgetcontext.fetchDataForGroupWidget("segBOMKA", succ, fail);
      }
      catch(e){
        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
        kony.sdk.mvvm.log.error("error in Blogic fetchChildObjects action : " + e);
      }
      
    },
  	/*set BOM ICON visibility*/
  	setBOMIcon:function(records){
      var scopeObj=this;
      var utilitiesObj = utilities.getUtilityObj();
      if(scopeObj.isSearch==true){
        for(var i=0;i<records.length;i++)
        {
            records[i]["IsLeaf"] ={"text":"XX","isVisible":false};
        }
      }
      else
      for(var i=0;i<records.length;i++)
        {
          if(records[i]["IsLeaf"]!='X')
            records[i]["IsLeaf"] ={"text":"XX","isVisible":false};
          var truncDesc = utilitiesObj.dataTruncation(records[i].ChildDescription,30,3, "...");
          records[i].ChildDescription=truncDesc.value;
        }
      return records;
      
    },
  	/*Back Navigation Online Calls*/
  	backNavigationCalls:function(){
      try{
        var scopeObj = this;
        var formmodel = scopeObj.getController().getFormModel();
        var utilitiesObj = utilities.getUtilityObj();
        kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.msg.loadingDataKA"));
        if(scopeObj.isSearch==true)
          scopeObj.searchBack();
        else{
      	var groupwidgetcontext = this.createGroupWidgetsContext();
      	var contextData = this.getController().getContextData();
      	var succ=function(response){
          scopeObj.processData(response);
          formmodel.setViewAttributeByProperty("flxNoResult","isVisible",false);
          formmodel.setViewAttributeByProperty("segBOMKA","isVisible",true);
          kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();}
      	var fail=function(err){ kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();}
        if(scopeObj.ParentIndex<2)
          {
            scopeObj.navigateBack();
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
          }
      	else if(scopeObj.ParentIndex==2)
        {
          var query;
          if(scopeObj.firstObjectType =='MAT')
          	query= "&$filter=Parent_id eq '{x}'";  
          else
         	 query = "&$filter=Parent_id eq '{x}' and ObjectType eq '{y}'";
          var Object_id = scopeObj.ParentArray[scopeObj.ParentIndex-2];
          scopeObj.ParentIndex--;
          contextData.setQuery("segBOMKA",query,"odata");
          if(scopeObj.firstObjectType =='MAT')
          contextData.setQueryParams("segBOMKA",{
          "x":Object_id,
        });
          else
           contextData.setQueryParams("segBOMKA",{
          "x":Object_id,
          "y":scopeObj.firstObjectType
        });
        scopeObj.MatObject=false;
        groupwidgetcontext.fetchDataForGroupWidget("segBOMKA", succ, fail);
        }
        else
        {
          	var query = "&$filter=Parent_id eq '{x}'";
          	var Object_id = scopeObj.ParentArray[scopeObj.ParentIndex-2];
          	scopeObj.ParentIndex--;
            contextData.setQuery("segBOMKA",query,"odata");
            contextData.setQueryParams("segBOMKA",{
              "x":Object_id,
            });
          groupwidgetcontext.fetchDataForGroupWidget("segBOMKA", succ, fail);
        }
      }
      }
      catch(e){
        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
        kony.sdk.mvvm.log.error("error in Blogic backNavigationCalls action : " + e);
      }
      
    },
  	searchObject:function(){
      try{
            var scopeObj=this;
        	var searchObject;
            var formmodel = scopeObj.getController().getFormModel();
            var searchText = formmodel.getViewAttributeByProperty("tbxBomSearchKA","text");
            if(searchText!=""){
                  var utilitiesObj = utilities.getUtilityObj();
            	  kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.msg.loadingDataKA"));
                  var groupwidgetcontext = scopeObj.createGroupWidgetsContext();
                  var contextData = scopeObj.getController().getContextData();
                  var succ=function(response){
                    scopeObj.isSearch=true;
                    if(response.segBOMKA.length>0){
                      formmodel.setViewAttributeByProperty("flxNoResult","isVisible",false);
                      formmodel.setViewAttributeByProperty("segBOMKA","isVisible",true);
                      scopeObj.processData(response);
                    }
                    else{
                      formmodel.setViewAttributeByProperty("flxNoResult","isVisible",true);
                      formmodel.setViewAttributeByProperty("segBOMKA","isVisible",false);
                      kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
                  	}
                  }
                  var fail=function(err){ kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();}
                  var Object_id = scopeObj.Parent_id;
              	  searchObject = scopeObj.MatObject?"MAT":scopeObj.firstObjectType;
                  var query = "&$filter=Parent_id eq '{x}' and ObjectType eq '{y}' and (substringof(Child_id,'{z}') or substringof(ChildDescription,'{z}'))";
                  contextData.setQuery("segBOMKA",query,"odata")
                  contextData.setQueryParams("segBOMKA",{
                    "x":Object_id,
                    "y":searchObject+"S",
                    "z":searchText

                  });

                  groupwidgetcontext.fetchDataForGroupWidget("segBOMKA", succ, fail);
        }
        else{
          if(scopeObj.isSearch===true)
          	scopeObj.backNavigationCalls();
          else{
            formmodel.setViewAttributeByProperty("flxNoResult","isVisible",false);
            formmodel.setViewAttributeByProperty("segBOMKA","isVisible",true);
            }
        }
      }
      catch(e){
        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
        kony.sdk.mvvm.log.error("error in Blogic searchObject action : " + e);
      }
    },
  	searchBack:function(){
      try{
        var scopeObj=this;
        var formmodel = scopeObj.getController().getFormModel();
        var groupwidgetcontext = this.createGroupWidgetsContext();
        var contextData = this.getController().getContextData();
        var succ=function(response){
          scopeObj.processData(response);
          formmodel.setViewAttributeByProperty("tbxBomSearchKA","text","");
          formmodel.setViewAttributeByProperty("flxNoResult","isVisible",false);
          formmodel.setViewAttributeByProperty("segBOMKA","isVisible",true);
          kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
        }
        var fail=function(err){ kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();}
        var Object_id = scopeObj.ParentArray[scopeObj.ParentIndex-1];
        if(scopeObj.ParentIndex==1)
        {
          var query;
          scopeObj.isSearch=false;
          if(scopeObj.firstObjectType=='MAT'){
            query = "&$filter=Parent_id eq '{x}'";
          contextData.setQuery("segBOMKA",query,"odata");
            contextData.setQueryParams("segBOMKA",{
            "x":Object_id,
          });
          }
          else{
            query = "&$filter=Parent_id eq '{x}' and ObjectType eq '{y}'";
            scopeObj.isSearch=false;
          contextData.setQuery("segBOMKA",query,"odata");
            contextData.setQueryParams("segBOMKA",{
            "x":Object_id,
            "y":scopeObj.firstObjectType
          });
            
          }
          
        }
        else
        {
          	scopeObj.isSearch=false;
            var query = "&$filter=Parent_id eq '{x}'";
            contextData.setQuery("segBOMKA",query,"odata");
              contextData.setQueryParams("segBOMKA",{
              "x":Object_id,
            });
    
        }
        groupwidgetcontext.fetchDataForGroupWidget("segBOMKA", succ, fail);
      }
      catch(e){
        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
        kony.sdk.mvvm.log.error("error in Blogic searchBack action : " + e);
      }
    },
  navigateBack: function() {
        try {
          	var scopeObj=this; 
          	var formmodel=scopeObj.getController().getFormModel();
            scopeObj.showPreviousForm(false,kony.application.getPreviousForm().id);
          	formmodel.setViewAttributeByProperty("tbxBomSearchKA","text","");
          	formmodel.setViewAttributeByProperty("flxNoResult","isVisible",false);
          	formmodel.setViewAttributeByProperty("segBOMKA","isVisible",true);
          	scopeObj.ParentArray=[];
          	scopeObj.ParentIndex=0;
      		scopeObj.firstObjectType=null;
          	this.Parent_id=null;
            scopeObj.isSearch=false;
          	scopeObj.MatObject=false;
        } catch (err) {
          	kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("error in Blogic navigateBack action : " + err);
        }
    },
  	showPreviousForm: function(doReload, formName) {
		try {
			var utilitiesObj = utilities.getUtilityObj();
			kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.showLoadingKA"));
			var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
			var navigateTo = formName ? formName : kony.application.getPreviousForm().id;
			var prevController = INSTANCE.getFormController(navigateTo);
			if (doReload) {			
				prevController.loadDataAndShowForm(prevController.getContextData());	
			} else {
				var konyform = prevController.getFormModel().getView().getKonyForm();
                TAG.NC.applyFormTransitions(konyform);
				prevController.getFormModel().showView();
				kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
			}
		} catch (error) {
			kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_GO_TO_PREV_FORM, error);
            throw new kony.sdk.mvvm.Exception(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_GO_TO_PREV_FORM, kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_GO_TO_PREV_FORM, error);
        }
    },
  	backToFirst:function(){
      try{
        var scopeObj=this;
        if(scopeObj.isSearch==true)
          scopeObj.ParentIndex=1;
        else
          scopeObj.ParentIndex=2;
        scopeObj.backNavigationCalls();
      }
      catch(err){
        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
        kony.sdk.mvvm.log.error("error in Blogic backToFirst action : " + err);
      }
    }
  	
  	
});