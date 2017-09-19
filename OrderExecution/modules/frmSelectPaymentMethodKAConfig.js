var frmSelectPaymentMethodKAConfig = {
    "formid": "frmSelectPaymentMethodKA",
    "frmSelectPaymentMethodKA": {
        "entity": "Invoice",
        "objectServiceOptions":{
      		"access":"offline"
    	},
     	"objectServiceName":"OrderExecution",
    },
    "flxTotalKA": {
        "fieldprops": {
            "entity": "Invoice",
            "widgettype": "FlexContainer",
            "query": "Select TotalAmount from Invoice where WorkOrder_id = '{x}'",
            "querytype": "sql",
            "field": "TotalAmount"
        }
    },
  	"lblTotalValueKA": {
        "fieldprops": {
            "entity": "Invoice",
            "widgettype": "Label",
          	"parent":"flxTotalKA",
            "field": "TotalAmount"
        }
    }
};