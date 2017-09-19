var frmCreateMeasurementKAConfig = {
    "formid": "frmCreateMeasurementKA",
    "frmCreateMeasurementKA": {
        "entity": "OrderObject",
        "objectServiceOptions":{
      	"access":"offline"
      },
      "objectServiceName":"OrderExecution"
    },
    "segOptionKA": {
        "fieldprops": {
            "query": "select WorkCenter_id,O.Description,O.Plant_id,O.code,O.FunctionalLocation_id,O.ObjectType from WorkOrder WO LEFT JOIN orderObject O ON O.workOrder_id = WO.id where  WO.id = '{WoId}'",
            "querytype": "sql",
            "entity": "OrderObject",
            "widgettype": "Segment",
            "field": {
                "lblTaskNameKA": {
                    "widgettype": "Label",
                    "field": "Description",
                    "text": "Functional Location",
                    "alias": "Functional Location"
                }
            }
        }
    }
};