/*
 * Model Extension class for Task object under OrderExecution object service group
 * Developer can add validation logic here
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.ObjectServices = kony.sdk.mvvm.ObjectServices || {};
kony.sdk.mvvm.ObjectServices.OrderExecution = kony.sdk.mvvm.ObjectServices.OrderExecution || {};

kony.sdk.mvvm.ObjectServices.OrderExecution.TaskModelExtension = Class({
    constructor: function(modelObj) {
        var model = modelObj;

        this.getModel = function() {
            return model;
        };
        this.setModel = function(modelObj) {
            model = modelObj;
        };

    },
    validate: function(dataObject, validationType) {
        //TO-DO add custom validation
		var record = dataObject.getRecord();
      	/*if(!record["id"]){  
			if((!record["Description"]) || (!record["Description"].trim())){
                throw new Error("Description");
            }
        }else{
          	return true;
        }*/
      	return true;
    }
});