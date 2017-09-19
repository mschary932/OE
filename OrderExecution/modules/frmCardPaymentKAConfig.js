var frmCardPaymentKAConfig = {
    "formid": "frmCardPaymentKA",
    "frmCardPaymentKA": {
        "entity": "WorkOrder",
        "objectServiceOptions":{
      	"access":"offline"
      },
      "objectServiceName":"OrderExecution",
    },
    "lblStartDateTimeKA": {
      "fieldprops": {
        "entity": "WorkOrder",
        "widgettype": "Label",
        "field": "ActualStartDate"
      }
    },
    "lblEndDateTimeKA": {
      "fieldprops": {
        "entity": "WorkOrder",
        "widgettype": "Label",
        "field": "ActualEndDate"
      }
    },
    "lblOrderNumberKA": {
      "fieldprops": {
        "entity": "WorkOrder",
        "widgettype": "Label",
        "field": "Code"
      }
    },
    "lblOrderDescKA": {
      "fieldprops": {
        "entity": "WorkOrder",
        "widgettype": "Label",
        "field": "Description"
      }
    }
    
  };
  