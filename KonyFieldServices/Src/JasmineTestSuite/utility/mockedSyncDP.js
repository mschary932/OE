kony = kony || {};
kony.appfoundation = kony.appfoundation || {};
kony.appfoundation.log = kony.appfoundation.log || {};
kony.appfoundation.constants = kony.appfoundation.constants || {};

kony.appfoundation.MockDataService = Class(kony.appfoundation.DataService, {
	constructor : function(isServerOn) {
		this.isOnline = isServerOn;
	},
	getDataProvider : function(sessionToken) {
		this.dataProviderInstance = new kony.appfoundation.mockSyncDbProvider(sessionToken);
		return this.dataProviderInstance;
	}

});
kony.appfoundation.MockUIConfigService = Class(kony.appfoundation.UIConfigService, {
	constructor: function(){
		this.uiConfigProviderInstance = null;
	},
	getUIConfigProvider : function(sessionToken){
		this.uiConfigProviderInstance = new kony.appfoundation.MockUIConfigProvider(sessionToken);
		return this.uiConfigProviderInstance;
	}
});

kony.appfoundation.MockUIConfigProvider = Class(kony.appfoundation.UIConfigDataProvider, {
	constructor: function(sessionToken){
		this.sessionToken = sessionToken;
		this.db = sqldb;
	},
	getAppMenuJson : function(successCallback, errorCallback){
		function parseResponse(res){
			var finalObj = [];
			if(res){
				var columns = res[0].columns;
				var values = res[0].values;
				for(var i=0; i<values.length; i++){
					var obj = {};
					for(var j=0; j<columns.length; j++){
						obj[columns[j]] = values[i][j];
					}
					finalObj.push(obj);
				}
			}
			return finalObj;
		}
		try {
			var query = "select ap.key, ap.value as value from applicationproperties ap ";
			var res = this.db.exec(query);
			var response = parseResponse(res);
			for(var i=0; i<response.length; i++){
				response[i]["value"] = JSON.parse(response[i]["value"]);
			}
			successCallback(response);
		} catch(e){
			kony.print("Error fetching application properties - "+JSON.stringify(e));
			errorCallback(e);
		}

	}
});
kony.appfoundation.MockMetadataService = Class(kony.appfoundation.MetadataService, {
	constructor : function(serverStatus) {
		this.isOnline = serverStatus;
	},
	getMetadataProvider : function(sessionToken) {
		this.metadataProviderInstance = new kony.appfoundation.metadataMockSyncProvider(sessionToken);
		return this.metadataProviderInstance;
	}
});

kony.appfoundation.mockSyncDbProvider = Class(kony.appfoundation.DataProvider, {
	constructor: function(sessionToken, mockDevice) {
        this.db = sqldb;
    },
	executeSelectQuery : function(selectQuery, succCallback, errCallback){
		function parseResponse(res){
    		var finalObj = [];
		    var columns = res[0].columns;
		    var values = res[0].values;
			var obj;
		    for(var i=0; i< values.length; i++){
		        obj = {};
		        for(var j=0; j<columns.length; j++){
		            obj[columns[j]] = values[i][j];    
		        }
		        finalObj.push(obj);
		    }
		    return finalObj;
    	};
		var executeSelectQueryTS = new Date();
		var res = this.db.exec(selectQuery);
		var result = parseResponse(res);
		succCallback(result);
	},
	fetch : function(selectQuery, successCallback, errorCallback){
		kony.print("**** selectQuery ** ");
		function parseResponse(res){
    		var finalObj = [];
		    var columns = res[0].columns;
		    var values = res[0].values;
		    for(var i=0; i<values.length; i++){
		        var obj = {};
		        for(var j=0; j<columns.length; j++){
		            obj[columns[j]] = values[i][j];    
		        }
		        finalObj.push(obj);
		    }
		    return finalObj;
    	}
		var query = null;
		var scopeObj = this;
	    for (var i = 0; i < selectQuery.tables.length; i++) {
	        var tName = selectQuery.tables[i].getName();
	        if (!selectQuery.tables[i].isJunction() && kony.appfoundation.KonyApplicationContext && !kony.appfoundation.KonyApplicationContext.hasPermission(tName, "", "retrieve")) {
	            //new kony.appfoundation.AppFoundationException(kony.appfoundation.AppFoundationExceptionCode.CD_RESOURCE_NO_READ_PERMISSION,kony.appfoundation.AppFoundationExceptionCode.MSG_RESOURCE_NO_READ_PERMISSION.replace("{}",tName)).alert(true);
	            errorCallback(new kony.appfoundation.AppFoundationException(kony.appfoundation.AppFoundationExceptionCode.CD_RESOURCE_NO_READ_PERMISSION, kony.appfoundation.AppFoundationExceptionCode.MSG_RESOURCE_NO_READ_PERMISSION.replace("{}", tName)));
	            return;
	        }
	    }
	    kony.print("**** selectQuery ** "+ JSON.stringify(selectQuery));
	    selectQuery.toString(toStringSuccessCallback, toStringErrorCallback, kony.appfoundation.Providers.MOCK);
	    function toStringSuccessCallback(response) {
	    	kony.print("**** in toStringSuccessCallback fetch mock sync provider ****" + response);
	        query = response;
	        var FetchSelectExecuteTS = new Date();

	        try {
	        	var res = scopeObj.db.exec(query);
	        	kony.print("**** response *** "+ JSON.stringify(res));
		        var responseJSONArray = [];
		        if (res != null && res.length > 0) {
		        	res = parseResponse(res);
	                for (var i in res) {
	                    var responseObject = res[i];
	                    var responseJSONObject = {};
	                    if (selectQuery.getColumns().length !== 0) {
	                        for (var j = 0; j < selectQuery.getColumns().length; j++) {
	                            var eachColumn = selectQuery.getColumns()[j];
	                            var columnName = eachColumn.getName();
	                            var columnType = eachColumn.dataType;
	                            var columnParentFieldName = eachColumn.parentFieldName;
	                            if (columnType !== null && columnType !== undefined && columnType === kony.appfoundation.constants["extendedfield"] && columnParentFieldName !== null && columnParentFieldName !== undefined) {
	                                responseJSONObject[columnName] = responseObject[columnParentFieldName];
	                            } else {
	                                responseJSONObject[columnName] = responseObject[columnName];
	                            }
	                        }
	                    }
	                    responseJSONArray.push(responseJSONObject);
	                }
	            }
	            var FetchSelectExecuteEndTS = new Date();
	            kony.appfoundation.Utils.perftimecal("Fetch records " + query + " >>", "Fetch records end >>", FetchSelectExecuteTS, FetchSelectExecuteEndTS);
	            if (typeof(successCallback) == 'function') {
	                successCallback(responseJSONArray);
	            }
		        
	        } catch(error){
	        	var eMsg = kony.appfoundation.AppFoundationExceptionCode.MSG_ERROR_FAILED_TO_QUERY_DATA;
	            if (typeof(errorCallback) == 'function') {
	                if (error.errorMessage) {
	                    eMsg = eMsg + " : " + error.errorMessage;
	                }
	                errorCallback(new kony.appfoundation.AppFoundationException(kony.appfoundation.AppFoundationExceptionCode.CD_ERROR_FAILED_TO_QUERY_DATA, eMsg, error));
	            }
	        }

	    }
	    function toStringErrorCallback(error) {
	    	kony.print("**** in toStringErrorCallback fetch mock sync provider **** "+JSON.stringify(error));
	        if (typeof(errorCallback) == 'function')
	            errorCallback("Error occurred while constructing the select query with error message '" + error.message + "'");
	    };
	},
	create: function(model, successCallback, errorCallback) {
		kony.appfoundation.log.info(" create@@@@ ");
	    var isJunction = (model.entityDetails) ? ((model.entityDetails["isjunction"]) ? model.entityDetails["isjunction"] : false) : false;
	    if (!isJunction && kony.appfoundation.KonyApplicationContext && !kony.appfoundation.KonyApplicationContext.hasPermission(model.entityName, "", "create")) {
	        //new kony.appfoundation.AppFoundationException(kony.appfoundation.AppFoundationExceptionCode.CD_RESOURCE_NO_CREATE_PERMISSION,kony.appfoundation.AppFoundationExceptionCode.MSG_RESOURCE_NO_CREATE_PERMISSION.replace("{}",model.entityName)).alert(true);
	        errorCallback(new kony.appfoundation.AppFoundationException(kony.appfoundation.AppFoundationExceptionCode.CD_RESOURCE_NO_CREATE_PERMISSION, kony.appfoundation.AppFoundationExceptionCode.MSG_RESOURCE_NO_CREATE_PERMISSION.replace("{}", model.entityName)));
	        return;
	    }
	   /* var result = kony.appfoundation.validateFormDataModel(model, true);
	    if (!result.isValid) {
	        errorCallback(result);
	        return;
	    }*/


	    var baseTable = new kony.appfoundation.Table(model.entityName);
	    var insertQuery = new kony.appfoundation.InsertQuery(baseTable);

	    for (var columnName in model.fields) {
	        if (model.fields.hasOwnProperty(columnName)) {
	            var primaryKeyName = "" + model.entityDetails.primaryKeyName;
	            if (columnName.toUpperCase() !== primaryKeyName.toUpperCase()) {
	                var col = new kony.appfoundation.Column(baseTable, columnName);
	                insertQuery.addColumn(col, model.fields[columnName])
	            }
	        }
	    }

	    var valid = kony.appfoundation.Utils.validateInput(insertQuery.listColumns(),
	        insertQuery.listValues());
	    if (valid) {
	    	try {
	    		var idCol = new kony.appfoundation.Column(baseTable, model.entityDetails.primaryKeyName);
	    		var insertIdValue = getIdToInsert();
	    		insertQuery.addColumn(idCol, insertIdValue);
	    		var res = this.db.run(insertQuery.toString(), insertQuery.listValues());
				var primaryKeyName = model.entityDetails.primaryKeyName;
				res = {};
				res[primaryKeyName] = insertIdValue;
				res["status"] = 200;
	    		insertSuccessCallback(res);
	    	} catch(e){
	    		kony.print("*** Error creating ** "+e.toString());
	    		insertErrorCallback(e);
	    	}
	    	
	        //doInsert(insertQuery, insertSuccessCallback, insertErrorCallback);

	        function insertSuccessCallback(response) {
	            if (typeof(successCallback) == 'function') {
	                successCallback(response);
	            }
	        }

	        function insertErrorCallback(errMessage) {
	            if (typeof(errorCallback) == 'function') {
	                errorCallback(errMessage);
	            }
	        }

	    } else {
	        return errorCallback(kony.appfoundation.DataAccessAppsExceptionCode.CD_ERROR_INSERT + " : " + kony.appfoundation.DataAccessAppsExceptionCode.MSG_ERROR_INSERT);
	    }
	},
	update: function(model, successCallback, errorCallback){
		var result = kony.appfoundation.validateFormDataModel(model, false); 
		if(!result.isValid){
			errorCallback(result);
			return;
		}
		var baseTable = new kony.appfoundation.Table(model.entityName);
		var updateQuery = new kony.appfoundation.UpdateQuery(baseTable);
		var valuesTable = {};
		for (var columnName in model.fields) {
			if (model.fields.hasOwnProperty(columnName)) {
				if (columnName.toUpperCase() !== model.entityDetails.primaryKeyName.toUpperCase()) {
					var col = new kony.appfoundation.Column(baseTable,columnName);
					updateQuery.addColumn(col,model.fields[columnName]);
				}
			}
		}
		
		var values = [];
		for ( var prop in updateQuery.getColumnValueMap()) {
			if (updateQuery.getColumnValueMap().hasOwnProperty(prop)) {
				values.push(updateQuery.getColumnValueMap()[prop]);
			}
		}
		
		var id = "";
		if (model.fields[model.entityDetails.primaryKeyName] !== null
				&& model.fields[model.entityDetails.primaryKeyName] !== undefined) {
			id = model.fields[model.entityDetails.primaryKeyName];
		}
		var criteria = new kony.appfoundation.Match(baseTable,model.entityDetails.primaryKeyName, kony.appfoundation.MatchType.EQUALS,id);
		updateQuery.addCriteria(criteria);

		try {
			var res = this.db.run(updateQuery.toString(), values);
			res = {};
			res["status"] = 200;
			updateSuccCallback(res);	
		} catch(e){
			kony.print("Error updating record -> "+ e.toString());
			updateErrCallback(e);
		}
		
		//syncMock.updateRecord(updateQuery, values, updateSuccCallback, updateErrCallback);
		function updateSuccCallback(response) {
			if (typeof (successCallback) == 'function') {
				successCallback(response);
			}
		}
		function updateErrCallback(error) {
			if (typeof (errorCallback) == 'function') {
				errorCallback(error);
			}
		}
	},
	deleteRecord: function(model, id, successCallback, errorCallback){
		var baseTable = new kony.appfoundation.Table(model.entityName);
		var deleteQueryObj = new kony.appfoundation.DeleteQuery(baseTable);
		kony.appfoundation.log.info("value of id is "+id)
		if(id != undefined && id != null && id !=""){
			var criteria = new kony.appfoundation.Match(baseTable,model.entityDetails.primaryKeyName, kony.appfoundation.MatchType.EQUALS,id);
			deleteQueryObj.addCriteria(criteria);	
		}
		
				
		var deleteQuery = deleteQueryObj.toString();
		kony.appfoundation.log.info("deleteQuery string is "+deleteQuery);
		try {
			var x = this.db.run(deleteQuery, []);
			delSuccCallback(x);
		}catch(e){
			kony.print("Error deleting record -> "+ e.toString());
			delErrCallback(e);
		}
		function delSuccCallback(response) {
			if (typeof (successCallback) == 'function') {
				successCallback(response);
			}
		}
		function delErrCallback(error) {
			if (typeof (errorCallback) == 'function') {
				errorCallback(error);
			}
		}
	}
});
	
kony.appfoundation.metadataMockSyncProvider = Class(kony.appfoundation.MetadataProvider, {
    constructor: function(sessionToken, mockDevice) {
        this.db = sqldb;
    },
    getEntities: function(fetchSuccessCallback, serviceErrorCallback) {
    	function parseResponse(res){
    		var finalObj = [];
		    var columns = res[0].columns;
		    var values = res[0].values;
		    for(var i=0; i<values.length; i++){
		        var obj = {};
		        for(var j=0; j<columns.length; j++){
		            obj[columns[j]] = values[i][j];    
		        }
		        finalObj.push(obj);
		    }
		    return finalObj;
    	}
    	try {
    		var query = kony.appfoundation.constants["GET_METADATA_OBJECT_FIELDS"]
	        query = query.replace("AND lower(ent.name) = lower(?) AND fm.sourcefieldname is not null AND trim(fm.sourcefieldname) <> ''","");
	        kony.print("**** query *** "+ query);
	        var response = parseResponse(this.db.exec(query));

	        //kony.print("**** entities 124*** "+ JSON.stringify(response));
	        var entities = kony.appfoundation.parseEntityMetadataResponse(response,"getEntities");
	        //kony.print("**** entities *** "+ JSON.stringify(entities));
			kony.appfoundation.cacheMetadata(entities);
    		fetchSuccessCallback(entities);

    	} catch(e){
    		serviceErrorCallback("Error executing getEntities statement from db -> "+ JSON.stringify(e));
    	}
    	
    },
    getEntity : function(entityName, entitySuccessCallback, serviceErrorCallback) {
    	function parseResponse(res){
    		var finalObj = [];
		    var columns = res[0].columns;
		    var values = res[0].values;
		    for(var i=0; i<values.length; i++){
		        var obj = {};
		        for(var j=0; j<columns.length; j++){
		            obj[columns[j]] = values[i][j];    
		        }
		        finalObj.push(obj);
		    }
		    return finalObj;
    	}
		try {
			kony.print("**** in getEntity ** mock sync metadata provder");
			if (kony.appfoundation.getCachedEntityMetadata(entityName) && kony.appfoundation.getCachedEntityMetadata(entityName)["childRelationshipList"]) {
				kony.print("**** in getEntity ** mock sync metadata provder - if");
				entitySuccessCallback(kony.appfoundation.getCachedEntityMetadata(entityName));
			}else{
				kony.print("**** in getEntity ** mock sync metadata provder - else");
				var query = kony.appfoundation.constants["GET_METADATA_OBJECT_FIELDS"];
	        	query = query.replace("?", "'"+entityName+"'");
	        	var entityResponse = this.db.exec(query);
	        	if(entityResponse != null && entityResponse.length != 0){
	        		entityResponse = parseResponse(entityResponse);
	        	}
	        	var entity = kony.appfoundation.parseEntityMetadataResponse(entityResponse,"getEntity");

	        	var relationsQuery =kony.appfoundation.constants["FETCH_ENTITY_RELATIONS_BY_ENTITYID"];
	    		relationsQuery = relationsQuery.replace("er.referenced_entity_id = ?","er.referenced_entity_id = '"+entity["entityTypeID"]+"'");
		        relationsQuery = relationsQuery.replace("er.referencing_entity_id = ?", "er.referencing_entity_id = '"+entity["entityTypeID"]+"'");
		        var relationsResponse = this.db.exec(relationsQuery);
		        if(relationsResponse != null && relationsResponse.length != 0){
	        		relationsResponse = parseResponse(relationsResponse);
	        	}
		        var relations = kony.appfoundation.parseEntityRelationshipResponse(relationsResponse);
		        entity["childRelationshipList"] = relations;
		        kony.appfoundation.cacheEntityMetadata(entity);
	    		entitySuccessCallback(entity);
			}
		} catch(e){
			serviceErrorCallback("Error executing getENtity statement from db -> "+ JSON.stringify(e));
		}
    },
    getEntityRelations:function(tx, entityName){
    	
	},	
    getUiConfig: function(fetchSuccessCallback, fetchErrorCallback) {
    	 
    },
    changesSince: function(timestamp) {}
});
