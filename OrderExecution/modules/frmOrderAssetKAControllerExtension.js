/*
 * Controller Extension class for frmOrderAssetKA
 * Developer can edit the existing methods or can add new methods if required
 *
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};

/**
 * Creates a new Form Controller Extension.
 * @class frmOrderAssetKAControllerExtension
 * @param {Object} controllerObj - Form Controller.
 */
kony.sdk.mvvm.frmOrderAssetKAControllerExtension = Class(kony.sdk.mvvm.BaseFormControllerExtension, {
    constructor: function(controllerObj) {
        this.$class.$super.call(this, controllerObj);
        this.Object_id = "";
        this.Object_type = "";
        this.ObjType = "";
      	this.finalData = null;
    },
    /** 
     * This method is an entry point for all fetch related flows. Developer can edit.
     * Default implementation fetches data for the form based on form config 
     * @memberof frmOrderAssetKAControllerExtension#
     */
    fetchData: function() {
        try {
            var scopeObj = this;
            kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading Form");
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
     * @memberof frmOrderAssetKAControllerExtension#
     * @returns {Object} - processed data
     */
    processData: function(data) {
        try {
          	var utilitiesObj = utilities.getUtilityObj();
            var scopeObj = this;
            var datamap = {};
            var form = [];
            var formdata = data["form"];
            var index = 0,
                isAsset = false;
            for (var i = 0; i < formdata.length; i++) {
                if (formdata[i]["ObjectType"] == 'IE') {
                    isAsset = true;
                    index = i;
                    break;
                }
            }

            form[0] = formdata[index];
            scopeObj.ObjType = form[0]["ObjectType"];
            if (kony.servicesapp.CONNECTOR == 'CRM') {
                if (formdata[i]["ObjectType"] == 'IF') {
                    form[0]["ObjectType"] = form[0]["FunctionalLocation_id"];
                }
            } else {
                if (formdata[i]["ObjectType"] == 'IE') {
                    scopeObj.Object_id = form[0]["Code"];
                    scopeObj.Object_type = form[0]["ObjectType"];
                } else {
                    form[0]["ObjectType"] = form[0]["FunctionalLocation_id"];
                    scopeObj.Object_id = form[0]["FunctionalLocation_id"];
                    scopeObj.Object_type = form[0]["ObjectType"];
                }
            }
            if (form[0]["WarrantStartDate"] != "" && form[0]["WarrantExpirationDate"] != "")
                form[0]["WarrantStartDate"] = scopeObj.setDateFormat(form[0]["WarrantStartDate"]) + "    "+utilitiesObj.geti18nValueKA("i18n.common.TextToKA")+"    " + scopeObj.setDateFormat(form[0]["WarrantExpirationDate"]);
            else
                form[0]["WarrantStartDate"] = "";
            if (form[0]["InstallationDate"] != "")
                form[0]["InstallationDate"] = scopeObj.setDateFormat(form[0]["InstallationDate"]);
            else
                form[0]["InstallationDate"] = "";
            if (form[0]["ManufactureDate"] != "")
                form[0]["ManufactureDate"] = scopeObj.setDateFormat(form[0]["ManufactureDate"]);
            else
                form[0]["ManufactureDate"] = "";
            datamap = form;
          	scopeObj.finalData=form;
            scopeObj.setBOMVisibility(form[0]["IsLeaf"]);

            /*var datamap={};
          	var form=[];
          	var formdata = data["form"];
          	for(var i=0;i<formdata.length;i++){
              if(formdata[i]["ObjectType"]=='IE')
                {
                  isAsset=true;
                  index=i;
                  break;
                }
            }
          	form[0]=formdata[index];
          	if(form[0]["ObjectType"]=='IE')
              {
                scopeObj.Object_id = form[0]["Code"];
                scopeObj.Object_type = form[0]["ObjectType"];
                form[0]["ObjectType"]="Asset";
                
              }
              else{
                scopeObj.Object_id = form[0]["FunctionalLocation_id"];
                scopeObj.Object_type = form[0]["ObjectType"];
                form[0]["ObjectType"]="Functional Location";
              }
          	if(form[0]["WarrantStartDate"]!="")
                if(form[0]["WarrantExpirationDate"]!="")
                 	form[0]["WarrantStartDate"] =form[0]["WarrantStartDate"].substring(6,8)+"/"+form[0]["WarrantStartDate"].substring(4,6)+"/"+form[0]["WarrantStartDate"].substring(0,4) + "    to    "+form[0]["WarrantExpirationDate"].substring(6,8)+"/"+form[0]["WarrantExpirationDate"].substring(4,6)+"/"+form[0]["WarrantExpirationDate"].substring(0,4);
          		else
              		form[0]["WarrantStartDate"]="NA";
          	else form[0]["WarrantStartDate"]="NA";
          	if((form[0]["InstallationDate"]!=null)||(form[0]["InstallationDate"]!=""))
            {
              form[0]["InstallationDate"] =form[0]["InstallationDate"].substring(6,8)+"/"+form[0]["InstallationDate"].substring(4,6)+"/"+form[0]["InstallationDate"].substring(0,4);
              if(form[0]["InstallationDate"]=="00/00/0000")
                form[0]["InstallationDate"]="";
            }
          	else
              form[0]["InstallationDate"] ="";
          	if((form[0]["ManufactureDate"]!=null)||(form[0]["ManufactureDate"]!=""))
            {
              form[0]["ManufactureDate"] =form[0]["ManufactureDate"].substring(6,8)+"/"+form[0]["ManufactureDate"].substring(4,6)+"/"+form[0]["ManufactureDate"].substring(0,4);
              if(form[0]["ManufactureDate"]=="00/00/0000")
                form[0]["ManufactureDate"]="";
            }
          	else
              form[0]["ManufactureDate"] ="";
          	
          	
          	datamap=form;
          	
          	scopeObj.setBOMVisibility(form[0]["IsLeaf"]);
          	scopeObj.setFunctionalLocationDetails(isAsset);
            */
            var processedData = scopeObj.$class.$superp.processData.call(scopeObj, datamap);
            scopeObj.getController().bindData(processedData);
            return processedData;
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in processData of controllerExtension");
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_PROCESSDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }
    },
    /** 
     * This method binds the processed data to the form. Developer can edit.
     * Default implementation binds the data to widgets in the form.
     * @param {Object} data - processed data.(Default : data map for each group, widget id as key and widget data as value)
     * @memberof frmOrderAssetKAControllerExtension#
     */
    bindData: function(data) {
        try {

            var scopeObj = this;
            var formmodel = scopeObj.getController().getFormModel();
            formmodel.clear();
            scopeObj.$class.$superp.bindData.call(scopeObj, data);
            scopeObj.getController().getFormModel().formatUI();
          	scopeObj.setFormData();
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            scopeObj.getController().showForm();
        } catch (err) {
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            kony.sdk.mvvm.log.error("Error in bindData of controllerExtension");
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, err);
            kony.sdk.mvvm.log.error(exception.toString());
        }

    },
    /** 
     * This method is entry point for save flow. Developer can edit.
     * Default implementation saves the entity record from the data of widgets defined in form config 
     * @memberof frmOrderAssetKAControllerExtension#
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
     * @memberof frmOrderAssetKAControllerExtension#
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
     * @memberof frmOrderAssetKAControllerExtension#
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
    setBOMVisibility: function(IsLeaf) {
        var scopeObj = this;;
        var formmodel = scopeObj.getController().getFormModel();
        if ((IsLeaf == 'X') && (kony.servicesapp.CONNECTOR != "CRM"))
            formmodel.setViewAttributeByProperty("btnBOMHeaderKA", "isVisible", true);
        else
            formmodel.setViewAttributeByProperty("btnBOMHeaderKA", "isVisible", false);
    },
    setFunctionalLocationDetails: function(isAsset) {
        var scopeObj = this;
        var formmodel = scopeObj.getController().getFormModel();
        if (!isAsset) {
            formmodel.setViewAttributeByProperty("flxObjectWarrantyKA", "isVisible", false);
            formmodel.setViewAttributeByProperty("flxObjectManufacturerKA", "isVisible", false);
            formmodel.setViewAttributeByProperty("flxObjectManufacturedDateKA", "isVisible", false);
            formmodel.setViewAttributeByProperty("flxObjectSerialNumberKA", "isVisible", false);
            formmodel.setViewAttributeByProperty("flxObjectProductNumberKA", "isVisible", false);
        }
    },
    navigateToBOM: function() {
        try {
            var scopeObj = this;
            var ObjectId = scopeObj.Object_id;
            var objecttype = scopeObj.Object_type;
            var datamodel = new kony.sdk.mvvm.DataModel();
            //datamodel.setPrimaryKeyValueMap({"Parent_id":ObjectId});
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            //   navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
            navigationObject.setQueryParams("segBOMKA", {
                "x": ObjectId,
                "y": objecttype
            });
            navigationObject.addCustomInfo("WOId", ObjectId);
            navigationObject.addCustomInfo("Obj_type", objecttype);
            scopeObj.navigateTo("frmBillOfMaterialKA", navigationObject);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateToBOM : " + err);
        }
    },
    navigateTo: function(formId, navObject) {
        try {
            var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
            var formController = INSTANCE.getFormController(formId);
            if (!navObject || !(navObject instanceof kony.sdk.mvvm.NavigationObject)) {
                navObject = new kony.sdk.mvvm.NavigationObject();
            }
            formController.loadDataAndShowForm(navObject);
        } catch (error) {
            kony.sdk.mvvm.log.error(kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_NAVIGATE_TO, error);
            throw new kony.sdk.mvvm.Exception(kony.servicesapp.AppExceptionCodes.CD_ERROR_CONTROLLER_EXT_NAVIGATE_TO, kony.servicesapp.AppExceptionCodes.MSG_ERROR_CONTROLLER_EXT_NAVIGATE_TO, error);
        }
    },
    navigateBack: function() {
        try {
            var scopeObj = this;
            var preForm = scopeObj.getController().getContextData().getCustomInfo("prevFormName");
            scopeObj.showPreviousForm(false, preForm);

        } catch (err) {
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
    setFormData: function() {
        var scopeObj = this;
        var formmodel = scopeObj.getController().getFormModel();
        if (scopeObj.finalData[0]["Description"] == ""||scopeObj.finalData[0]["Description"] == null||scopeObj.finalData[0]["Description"] == "NULL") {
            formmodel.setViewAttributeByProperty("flxObjectNameKA", "isVisible", false);
            formmodel.setViewAttributeByProperty("lblLineObject1KA", "isVisible", false);
        } else {
            formmodel.setViewAttributeByProperty("flxObjectNameKA", "isVisible", true);
            formmodel.setViewAttributeByProperty("lblLineObject1KA", "isVisible", true);
        }
        if (scopeObj.finalData[0]["Name"] == ""||scopeObj.finalData[0]["Name"] == null||scopeObj.finalData[0]["Name"] == "NULL") {
            formmodel.setViewAttributeByProperty("flxObjectCategoryKA", "isVisible", false);
            formmodel.setViewAttributeByProperty("lblLineObject2KA", "isVisible", false);
        } else {
            formmodel.setViewAttributeByProperty("flxObjectCategoryKA", "isVisible", true);
            formmodel.setViewAttributeByProperty("lblLineObject2KA", "isVisible", true);
        }
        if (scopeObj.finalData[0]["CompDescription"] == ""||scopeObj.finalData[0]["CompDescription"] == null||scopeObj.finalData[0]["CompDescription"] == "NULL") {
            formmodel.setViewAttributeByProperty("flxCompKA", "isVisible", false);
            formmodel.setViewAttributeByProperty("lblLineObject10KA", "isVisible", false);
        } else {
            formmodel.setViewAttributeByProperty("flxCompKA", "isVisible", true);
            formmodel.setViewAttributeByProperty("lblLineObject10KA", "isVisible", true);
        }
        if (scopeObj.finalData[0]["Name"] == ""||scopeObj.finalData[0]["Name"] == null||scopeObj.finalData[0]["Name"] == "NULL") {
            formmodel.setViewAttributeByProperty("flxCompNameKA", "isVisible", false);
            formmodel.setViewAttributeByProperty("lblLineObject11KA", "isVisible", false);
        } else {
            formmodel.setViewAttributeByProperty("flxCompNameKA", "isVisible", true);
            formmodel.setViewAttributeByProperty("lblLineObject11KA", "isVisible", true);
        }
        if (scopeObj.finalData[0]["WarrantStartDate"] == ""||scopeObj.finalData[0]["WarrantStartDate"] == null||scopeObj.finalData[0]["WarrantStartDate"] == "NULL") {
            formmodel.setViewAttributeByProperty("flxObjectWarrantyKA", "isVisible", false);
            formmodel.setViewAttributeByProperty("lblLineObject3KA", "isVisible", false);
        } else {
            formmodel.setViewAttributeByProperty("flxObjectWarrantyKA", "isVisible", true);
            formmodel.setViewAttributeByProperty("lblLineObject3KA", "isVisible", true);
        }
        if (scopeObj.finalData[0]["Manufacturer"] == ""||scopeObj.finalData[0]["Manufacturer"] == null||scopeObj.finalData[0]["Manufacturer"] == "NULL") {
            formmodel.setViewAttributeByProperty("flxObjectManufacturerKA", "isVisible", false);
            formmodel.setViewAttributeByProperty("lblLineObject4KA", "isVisible", false);
        } else {
            formmodel.setViewAttributeByProperty("flxObjectManufacturerKA", "isVisible", true);
            formmodel.setViewAttributeByProperty("lblLineObject4KA", "isVisible", true);
        }
        if (scopeObj.finalData[0]["ManufactureDate"] == ""||scopeObj.finalData[0]["ManufactureDate"] == null||scopeObj.finalData[0]["ManufactureDate"] == "NULL") {
            formmodel.setViewAttributeByProperty("flxObjectManufacturedDateKA", "isVisible", false);
            formmodel.setViewAttributeByProperty("lblLineObject5KA", "isVisible", false);
        } else {
            formmodel.setViewAttributeByProperty("flxObjectManufacturedDateKA", "isVisible", true);
            formmodel.setViewAttributeByProperty("lblLineObject5KA", "isVisible", true);
        }
        if (scopeObj.finalData[0]["InstallationDate"] == ""||scopeObj.finalData[0]["InstallationDate"] == null||scopeObj.finalData[0]["InstallationDate"] == "NULL") {
            formmodel.setViewAttributeByProperty("flxObjectStartUpDateKA", "isVisible", false);
            formmodel.setViewAttributeByProperty("lblLineObject6KA", "isVisible", false);
        } else {
            formmodel.setViewAttributeByProperty("flxObjectStartUpDateKA", "isVisible", true);
            formmodel.setViewAttributeByProperty("lblLineObject6KA", "isVisible", true);
        }
        if (scopeObj.finalData[0]["SerialNumber"] == ""||scopeObj.finalData[0]["SerialNumber"] == null||scopeObj.finalData[0]["SerialNumber"] == "NULL") {
            formmodel.setViewAttributeByProperty("flxObjectSerialNumberKA", "isVisible", false);
            formmodel.setViewAttributeByProperty("lblLineObject7KA", "isVisible", false);
        } else {
            formmodel.setViewAttributeByProperty("flxObjectSerialNumberKA", "isVisible", true);
            formmodel.setViewAttributeByProperty("lblLineObject7KA", "isVisible", true);
        }
        if (scopeObj.finalData[0]["Plant_id"] == ""||scopeObj.finalData[0]["Plant_id"] == null||scopeObj.finalData[0]["Plant_id"] == "NULL") {
            formmodel.setViewAttributeByProperty("flxObjectMaintenancePlanKA", "isVisible", false);
            formmodel.setViewAttributeByProperty("lblLineObject8KA", "isVisible", false);
        } else {
            formmodel.setViewAttributeByProperty("flxObjectMaintenancePlanKA", "isVisible", true);
            formmodel.setViewAttributeByProperty("lblLineObject8KA", "isVisible", true);
        }
        if (scopeObj.finalData[0]["Material_id"] == ""||scopeObj.finalData[0]["Material_id"] == null||scopeObj.finalData[0]["Material_id"] == "NULL") {
            formmodel.setViewAttributeByProperty("flxObjectProductNumberKA", "isVisible", false);
            formmodel.setViewAttributeByProperty("lblLineObject9KA", "isVisible", false);
        } else {
            formmodel.setViewAttributeByProperty("flxObjectProductNumberKA", "isVisible", true);
            formmodel.setViewAttributeByProperty("lblLineObject9KA", "isVisible", true);
        }

    },
    setDateFormat: function(Date) {
        if(Date == '00000000' ||Date=="NULL")
            Date = "";
        else
            Date = Date.substring(6, 8) + "/" + Date.substring(4, 6) + "/" + Date.substring(0, 4);
      	return Date;
    }

});