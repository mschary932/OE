var frmInvoicePdfKAConfig = {
    "formid": "frmInvoicePdfKA",
    "frmInvoicePdfKA": {
        "entity": "Invoice",
        "query": "Select inv.id, inv.TotalAmount, inv.WorkOrder_id, inv.InvoiceDateTime FROM Invoice inv where inv.id = '{x}'",
        "objectServiceOptions": {
            "access": "offline"
        },
        "objectServiceName": "OrderExecution",

    },
    "lblInvoiceTotalKA": {
        "fieldprops": {
            "entity": "Invoice",
            "widgettype": "Label",
            "field": "TotalAmount"
		}
    },
    "lblInvoiceIDKA": {
        "fieldprops": {
            "entity": "Invoice",
            "widgettype": "Label",
            "field": "id"
        }
    },
   	"lblInvDurationKA": {
    	"fieldprops": {
    		"entity": "Invoice",
    		"widgettype": "Label",
    		"field": "InvoiceDateTime"
    	}
    },
    "lblInvDateKA": {
    	"fieldprops": {
    		"entity": "Invoice",
    		"widgettype": "Label",
    		"field": "InvoiceDateTime"
    	}
    },
  	"FlxEmailKA": {
      "fieldprops": {
        "entity":"Contact",
        "widgettype": "FlexContainer",
        "query":"select Email from Contact where id in (select Contact_id from WorkOrderContact where WorkOrder_Id ='{x}')",
        "queryType":"sql"
      }
    },
    "tbxEmailKA": {
        "fieldprops": {
            "parent":"FlxEmailKA",
            "entity": "Contact",
            "widgettype": "Label",
            "field": "Email"
        }
    }
};