var frmHistoryConfig = {
    "formid": "frmHistory",
    "frmHistory": {
        "entity": "MeasureValueHistory",
      	"query" : "select mp.Id,mp.Code,mp.Description,mp.Unit_id FROM MeasurePoint mp left join MeasureValueHistory mph ON mp.Id=mph.MeasurePoint_Id where mp.id='{id}'",
        "objectServiceOptions":{
      	"access":"offline"
      },
      "objectServiceName":"OrderExecution"
    },
    "lblMeasurementName": {
      "fieldprops": {
        "entity": "MeasureValueHistory",
        "widgettype": "Label",
        "field": "Code"
      }
    },
    "lblMeasurementDescription": {
      "fieldprops": {
        "entity": "MeasureValueHistory",
        "widgettype": "Label",
        "field": "Description"
      }
    },
    "lblOrderNo": {
      "fieldprops": {
        "entity": "MeasureValueHistory",
        "widgettype": "Label",
        "field": "id"
      }
    },
    "segHistoryKA": {
        "fieldprops": {
            "query": "select mph.Measuredate as MeasureDate, mph.Measuredate as MeasureTime,mph.comment,mph.value FROM MeasurePoint mp left join MeasureValueHistory mph ON mp.Id=mph.MeasurePoint_Id where mp.id='{y}'",
            "querytype": "sql",
            "entity": "MeasureValueHistory",
            "widgettype": "Segment",
            "field": {
                "lblDate": {
                    "widgettype": "Label",
                    "field": "MeasureDate",
                    "text": "MeasureDate",
                    "alias": "MeasureDate"
                },
				"lblTime": {
                    "widgettype": "Label",
                    "field": "MeasureTime",
                    "text": "MeasureTime",
                    "alias": "MeasureTime"
                },
				"lblUnit": {
                    "widgettype": "Label",
                    "field": "Value",
                    "text": "Value",
                    "alias": "Value"
                },
                "lblNotes": {
                    "widgettype": "Label",
                    "field": "Comment",
                    "text": "Comment",
                    "alias": "Comment"
                }
            }
        }
    }
};