var frmCashPaymentKAConfig = {
    "formid": "frmCashPaymentKA",
    "frmCashPaymentKA": {
        "entity": "Payment",   
        "objectServiceOptions":{
      	"access":"offline"
      },
      "objectServiceName":"OrderExecution"
    },
  	"flxPaymentDetailsKA": {
      "fieldprops": {
        "entity":"Invoice",
        "widgettype": "FlexContainer",
        "query":"select TotalAmount from Invoice where WorkOrder_id='{x}'",
        "queryType":"sql"
      }
    },
  	 "lblTotalValueKA": {
      "fieldprops": {
        "entity":"Invoice",
        "parent":"flxPaymentDetailsKA",
        "widgettype": "Label",
        "field": "TotalAmount"
      }
    },
  	 "tbxAmountKA": {
      "fieldprops": {
        "entity":"Invoice",
        "parent":"flxPaymentDetailsKA",
        "widgettype": "TextBox2",
        "field": "TotalAmount"
      }
    }
 };