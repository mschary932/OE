var frmMeasurementReadingsConfig = {
    "formid": "frmMeasurementReadings",
    "frmMeasurementReadings": {
        "entity": "MeasureValue",
      	"query" : "select mv.MeasureDate,mp.Description,mp.id,mp.Code,mp.Unit_id,mv.Task_id from MeasurePoint mp left join MeasureValue mv where mp.id = '{id}' order by datetime(mv.MeasureDate) ASC limit 1",
        "objectServiceOptions":{
      	"access":"offline"
      },
      "objectServiceName":"OrderExecution"
    },
    "lblTimeKA": {
      "fieldprops": {
        "entity": "MeasureValue",
        "widgettype": "Label",
        "field": "MeasureDate",
        "parent": "flexDetailsKA"
      }
    },
    "lblMeasurementName": {
      "fieldprops": {
        "entity": "MeasureValue",
        "widgettype": "Label",
        "field": "Code"
      }
    },
    "lblMeasurementDescription": {
      "fieldprops": {
        "entity": "MeasureValue",
        "widgettype": "Label",
        "field": "Description"
      }
    },
    "lblOrderNo": {
      "fieldprops": {
        "entity": "MeasureValue",
        "widgettype": "Label",
        "field": "id"
      }
    },
  	"flxTimeKA": {
      "fieldprops": {
        "entity": "OrderObject",
        "widgettype": "FlexContainer",
        "query": "select oo.Description from OrderObject oo where oo.WorkOrder_id = '{wo_id}' and oo.Code = (select t.Asset_id from Task t where t.Task_num = '{Task_id}')"
      }
    },
  	"flexDetailsKA": {
      "fieldprops": {
        "entity": "MeasureValue",
        "widgettype": "FlexContainer",
        "query": "select mv.MeasureDate from MeasureValue mv where mv.Task_id = '{Task_id}' order by datetime(mv.MeasureDate) ASC limit 1"
      }
    },
    "lblMeasurementDescription": {
      "fieldprops": {
        "entity": "OrderObject",
        "widgettype": "Label",
        "field": "Description",
		"parent": "flxTimeKA"
      }
    },
    "segSwipeKA": {
        "fieldprops": {
            "query": "select mv.id,mv.MeasureDate,mv.Value,	mv.OPMODE from MeasureValue mv where mv.Task_id = '{Task_id}' and mv.MeasurePoint_id = '{MeasurePoint_id}' and (mv.OPMODE is Null OR mv.OPMODE!='D') order by mv.MeasureDate DESC",
            "querytype": "sql",
            "entity": "MeasureValue",
            "widgettype": "Segment",
            "field": {
                "lblReadTime": {
                    "widgettype": "Label",
                    "field": "MeasureDate",
                    "text": "MeasureDate",
                    "alias": "MeasureDate"
                },
				"lblUnit": {
                    "widgettype": "Label",
                    "field": "Value",
                    "text": "Value",
                    "alias": "Value"
                },
				"lblReading": {
                    "widgettype": "Label",
                    "field": "id",
                    "text": "id",
                    "alias": "id"
                }
            }
        }
    }
};