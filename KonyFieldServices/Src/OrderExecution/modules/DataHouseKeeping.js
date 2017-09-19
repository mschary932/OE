kony = kony || {};
kony.servicesapp = kony.servicesapp || {};

kony.servicesapp.DataHouseKeeping = function(){
	var appID = konysyncClientSyncConfig["AppID"];//App ID from KonySyncScopes
	var makeTransaction = function(myTransactionCallback){
		var databaseObjectId =kony.db.openDatabase(appID,"1.0", appID, 5*1024*1024);
		kony.db.transaction(databaseObjectId, myTransactionCallback, myTransactionErrorCallback, mySuccessCallback);
		function myTransactionErrorCallback(SQLError){
			kony.print(SQLError);
		}
		function mySuccessCallback(){
			kony.print("Data House keeping successful");
		}
	}
	var getFinalDateTimeString = function(noOfDaysDataToBeDeleted){
		var date = new Date();
		var newDate = new Date(date.setDate(date.getDate()-parseInt(noOfDaysDataToBeDeleted)));
		var year = newDate.getUTCFullYear()+"";
		var month = ((newDate.getUTCMonth()+1)+"").length == 1 ? "0"+(newDate.getUTCMonth()+1):(newDate.getUTCMonth()+1)+"";
		var d = (newDate.getUTCDate()+"").length == 1 ? "0"+newDate.getUTCDate():newDate.getUTCDate()+"";
		var hour = (newDate.getUTCHours()+"").length == 1 ? "0"+newDate.getUTCHours():newDate.getUTCHours()+"";
		var min = (newDate.getUTCMinutes()+"").length == 1 ? "0"+newDate.getUTCMinutes():newDate.getUTCMinutes()+"";
		var seconds = (newDate.getUTCSeconds()+"").length == 1 ? "0"+newDate.getUTCSeconds():newDate.getUTCSeconds()+"";
		return year+month+d+hour+min+seconds;
	}
	
	this.cleanUpData = function(parent, dateColumnForParent, noOfDaysDataToBeDeleted, objectService, metaDataObj){
		kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Data house keeping in progress..");
		var metaData = metaDataObj==undefined? kony.sdk.APP_META : metaDataObj;
		if(metaDataObj == undefined){
			metaData.objectsvc_meta.OrderExecution["media"].relationshipList = [{"entityPageTemplateId":0,"relationshipDisplayName":"","relationshipType":"OneToMany","entityName":"media","custom":false,"relatedEntity":"konysyncBLOBSTOREMANAGER","operationType":"","relationshipFields":[{"referencedField":"id","referencingField":"blobref_url"}],"id":0,"junctionTableName":""}];
		}
		var oeObjectService = metaData.objectsvc_meta[objectService];//OrderExecution for OE	
		var parentObject = oeObjectService[parent];
		var relationsToParent = parentObject.relationshipList;
		var newDateString = getFinalDateTimeString(noOfDaysDataToBeDeleted);
		
		//Below is the Parent Condition on which the data has to be deleted for all the chile entities.
		var parentCondition = " where "+ parent+"."+parentObject["primaryKey"][0]+" NOT IN (Select "+parent+"."+parentObject["primaryKey"][0]+" from " + parent +" where "+ parent+"."+dateColumnForParent+ " > '"+ newDateString+"') AND "+ parent+"."+parentObject["primaryKey"][0]+" IN (Select "+parent+"."+parentObject["primaryKey"][0]+" from " + parent +" where "+ parent+"."+dateColumnForParent+ " < '"+ newDateString+"')";
		
		var myTransactionCallback = function(txId){
			var executeSqlDeleteStatement = function(txId, sqlStatement, successCallBack, errorCallBack){
				kony.db.executeSql(txId, sqlStatement, null,function(txId,resultSet){
					kony.print("Success in Executing "+sqlStatement);
					//alert(typeof successCallBack);
					if(typeof successCallBack == 'function') successCallBack(resultSet);
				},function(){
					kony.print("Error in Executing "+sqlStatement);
					if(typeof errorCallback == 'function') errorCallBack(resultSet);
				});
			}
			var executeSqlSelectStatement = function(txId, sqlStatement, successCallBack){
				var result = kony.db.executeSql(txId, sqlStatement, null,function(txId,resultSet){
						kony.print("Success in Executing "+sqlStatement);
						//alert(typeof successCallBack);
                  if(typeof successCallBack == 'function')successCallBack(resultSet);
					},function(){
						kony.print("Error in Executing "+sqlStatement);
					});
				if(result !== null && result !== false) {
					if(typeof successCallBack == 'function')successCallBack(result);
				}
			}
			var startHouseKeeping = function(txId, relationsToParent, currentEntity, parentCondition){
				var count = 0;
				while(relationsToParent.length != count){
					var entity = relationsToParent[count];
					var relatedEntityName = entity["relatedEntity"];
					var entityObject = oeObjectService[relatedEntityName];
						var parentCondition1 = " where "+ entity["relatedEntity"]+"."+entity["relationshipFields"][0]["referencedField"]+" in (select "+entity["entityName"]+"."+entity["relationshipFields"][0]["referencingField"] + " from "+entity["entityName"] +parentCondition+")";
						if(relatedEntityName!="konysyncBLOBSTOREMANAGER" && entityObject.relationshipList.length != 0){
							startHouseKeeping(txId, entityObject.relationshipList,relatedEntityName, parentCondition1);
						}
						if(entity["relatedEntity"]=="konysyncBLOBSTOREMANAGER"){
							var sql = "Select * from "+entity["relatedEntity"]+parentCondition1;
							executeSqlSelectStatement(txId, sql, function(response){
								kony.print("Blobref response"+JSON.stringify(response));
								for(var i=0;i<response.rows.length;i++){
									var rowItem = kony.db.sqlResultsetRowItem(txId, response, i);
									blobRef= rowItem["localPath"];
									binary.util.deleteBlobFile(blobRef);
								}
							});
							sql = "delete from "+entity["relatedEntity"]+parentCondition1;
							executeSqlDeleteStatement(txId,sql);
						}else{
							var sql = "delete from "+entity["relatedEntity"]+parentCondition1;
							executeSqlDeleteStatement(txId,sql);
						}
					count++;
				}
				if(parent==currentEntity){
					var sqlStatement = "delete from "+ parent + parentCondition;
					executeSqlDeleteStatement(txId,sqlStatement,function(){
						kony.print("Data House Keeping End = "+new Date());
						kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
					});
				}
			}
			try{
				startHouseKeeping(txId, relationsToParent, parent, parentCondition);	
			}catch(err){
				alert(err);
				kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
			}
		}
		kony.print("Data House Keeping Start = "+new Date());
		makeTransaction(myTransactionCallback);
	}
}
