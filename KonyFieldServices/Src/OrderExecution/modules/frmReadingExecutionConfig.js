var frmReadingExecutionConfig = {
    "formid": "frmReadingExecution",
    "frmReadingExecution": {
        "entity": "MeasureValue",
        "objectServiceOptions":{
      	"access":"offline"
      },
      "objectServiceName":"OrderExecution"
    },
	"flxTimeKA": {
      "fieldprops": {
        "entity": "MeasurePoint",
        "widgettype": "FlexContainer",
        "query": "select mp.id,mp.Description,mp.UpperLimit,mp.Unit_id,mp.LowerLimit from MeasurePoint mp where mp.id='{id}'"
      }
    },
    "lblMeasurementName": {
      "fieldprops": {
        "entity": "MeasurePoint",
        "widgettype": "Label",
        "field": "Description",
		"parent": "flxTimeKA"
      }
    },
    "lblOrderNo": {
      "fieldprops": {
        "entity": "MeasurePoint",
        "widgettype": "Label",
        "field": "id",
		"parent": "flxTimeKA"
      }
    },
    "lblUnitValue": {
      "fieldprops": {
        "entity": "MeasurePoint",
        "widgettype": "Label",
        "field": "Unit_id",
		"parent": "flxTimeKA"
      }
    },
    "lblRangeValue": {
      "fieldprops": {
        "entity": "MeasurePoint",
        "widgettype": "Label",
        "field": "UpperLimit",
		"parent":"flxTimeKA"
      }
    },
	"flxValue": {
      "fieldprops": {
        "entity": "MeasureValue",
        "widgettype": "FlexContainer",
        "query": "select mv.id,mv.MeasureDate,mv.Value,mv.Comment from MeasureValue mv where mv.id='{id}'"
      }
    },
	"lblReadingKA": {
      "fieldprops": {
        "entity": "MeasureValue",
        "widgettype": "Label",
        "field": "id",
		"parent":"flxValue"
      }
    },
	"lblTimeKA": {
      "fieldprops": {
        "entity": "MeasureValue",
        "widgettype": "Label",
        "field": "MeasureDate",
		"parent":"flxValue"
      }
    },
	"tbxValue": {
      "fieldprops": {
        "entity": "MeasureValue",
        "widgettype": "TextBox",
        "field": "Value",
		"parent":"flxValue"
      }
    },
	"tbxNote": {
      "fieldprops": {
        "entity": "MeasureValue",
        "widgettype": "TextBox",
        "field": "Comment",
		"parent":"flxValue"
      }
    },
  	"flxUnit": {
      "fieldprops": {
        "entity": "OrderObject",
        "widgettype": "FlexContainer",
        "query": "select oo.Description from OrderObject oo where oo.WorkOrder_id = '{wo_id}' and oo.Code = (select t.Asset_id from Task t where t.Task_num = '{Task_id}')"
      }
    },
    "lblMeasurementDescription": {
      "fieldprops": {
        "entity": "OrderObject",
        "widgettype": "Label",
        "field": "Description",
		"parent": "flxUnit"
      }
    }
};