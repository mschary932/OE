/** 
 *	In this class, developer can change/override the existing methods or can create new methods if required
 */
/*
 * bussiness/orchestration/mediation logic class for frmTaskAttachmentImageKA.
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmTaskAttachmentImageKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {

    constructor: function(controllerObj) {
        this.$class.$super.call(this,controllerObj);
        this.controllerExtensionGen = undefined;
        this.taskID = null;
        this.taskNumber = null;
        this.tStatusID = null;
        this.tDuration = 0;
        this.woID = null;
        this.woStatusID = null;
        this.materialIDs = [];

    },
    fetchData: function() {
      try{
    	//no need to fetch data,image url and attachment name is stored in navigationObject
		var scopeObj= this;
        this.$class.$superp.fetchData.call(this, success, errCallback);
      
      	function success(response){
          	if ((response["form"].length) == 0){
              var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();				
              var controller = INSTANCE.getFormController("frmTaskAttachmentKA");
              var msg = "error occured,refreshing the current page";              
              kony.sdk.mvvm.Util.callAlert(msg, "info",function(){}, "", "Ok", "");
             
              if (controller) {
                var controllerExtension = controller.getControllerExtensionObject();
                controllerExtension.fetchData();
              }
              return;
              
            }            	
          	var obj = {};
          	obj.extension = response["form"][0]["extension"];
          	obj.name = response["form"][0]["name"];
          	obj.description = response["form"][0]["description"];
            scopeObj.fetchBinaryContent(obj.name,succCallBack,errCallback);

            function succCallBack(binaryData){
                obj.binaryData = binaryData;
                scopeObj.bindData(obj);
            }  
        }
		
		function errCallback(err){
			kony.sdk.mvvm.log.info("error in controller extension"+JSON.stringify(err));
		}
      }catch(e){
        kony.sdk.mvvm.log.info("error in controller extension"+JSON.stringify(e));
      }
    },
    navigateTo: function(formId, navObject) {
        this.$class.$superp.navigateTo.call(this, formId, navObject);
    },
    bindData: function(obj) {
        var extension = obj.extension.toLowerCase();
      	var formModel = this.getController().getFormModel();
        formModel.setViewAttributeByProperty("BrowserImageKA","enableCache",false);
      	formModel.setViewAttributeByProperty("BrowserImageKA","htmlString",null);
		var fileName = obj.description;
        var base64string = obj.binaryData;
		formModel.setViewAttributeByProperty("lblHeaderKA","text",fileName);
        if(extension !== "png")
            extension = "jpeg";
        var browserString="<html>\n<body>\n<div id=\"pdf\" >\n<object data=\"data:image/"+extension+";base64,"+base64string+"\""+"width=\"100%\">\n</div>\n</body>\n</html>";
        formModel.setViewAttributeByProperty("BrowserImageKA","htmlString",browserString);
        var konyform = formModel.getView().getKonyForm();
        TAG.NC.applyFormTransitions(konyform);
		formModel.showView();
    },
    navigateBack: function(){ 
	     try{ 
           	var formModel = this.getController().getFormModel();
        	formModel.setViewAttributeByProperty("BrowserImageKA","htmlString",null);
			formModel.getView().getKonyForm().destroy();
			this.$class.$superp.showPreviousForm.call(this,false,"frmTaskAttachmentKA");	    
         }        
         catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateBack action : " + err);
         }
    },
    clear: function(){
    	formmodel.performActionOnView("flexDetailsKA", "removeAll");
    	formmodel.performActionOnView("flexDetailsKA", "forceLayout");
    },
	fetchBinaryContent: function(binaryName,succCallBack,errorCallBack){
    	var scopeObj = this;
    	var configOptions = scopeObj.getController().getConfig().getObjectServiceOptions();
        var serviceName = scopeObj.getController().getConfig().getObjectServiceName();
        var objSvc = scopeObj.getController().getApplicationContext().getObjectService(configOptions, serviceName);
        var dataObject = new kony.sdk.dto.DataObject("media");
        dataObject.addField("name", binaryName);
        objSvc.getBinaryContent({
            "dataObject": dataObject,
            "binaryAttrName": "url",
            "responsetype":"base64string"
        }, success, error);

        function success(binaryData) {
            succCallBack(binaryData);
        }

        function error(err) {
            errorCallBack(err);
            kony.sdk.mvvm.log.error("error while downloading image from media entity");
        }
    }
});