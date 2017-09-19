var frmSummaryKAConfig = {
    "formid": "frmSummaryKA",
    "frmSummaryKA": {
        "entity": "WorkOrder",
        "objectServiceOptions": {
            "access": "offline"
        },
        "objectServiceName": "OrderExecution",
    },
    "flxSummaryKA": {
        "fieldprops": {
            "entity": "WorkOrder",
            "widgettype": "Label",
            "query": "Select wo.ActualEndDate , wo.id, wo.Code , wo.Description , wo.ActualStartDate FROM WorkOrder wo where wo.id = '{x}'",
            "querytype": "sql",
            "field": "Description"
        }
    },
	"flxDataKA": {
        "fieldprops": {
            "entity": "WorkOrder",
            "widgettype": "Label",
            "query":"select tte.Description,tte.Amount,tte.Type,tte.Duration,tte.DELETED,tte.IsCustomerBillable,tte.WorkOrder_id,tte.Category_id,tec.id,tec.BasePrice from TaskTimeExpense tte JOIN TimeExpenseCategory tec ON tte.Category_id  = tec.id where tte.WorkOrder_id = '{y}'  and tte.IsCustomerBillable = 'X'",
            "querytype": "sql",
            "field": "Description"
        }
    },
	"SegItemDetailsKA": {
        "fieldprops": {
            "query": "select wote.Description,wote.Amount,wote.Type,wote.Duration,wote.DELETED,wote.IsCustomerBillable,wote.WorkOrder_id,wote.Category_id,tec.id,tec.BasePrice from WorkOrderTimeExpense wote JOIN TimeExpenseCategory tec ON wote.Category_id  = tec.id where wote.WorkOrder_id = '{y}'  and wote.IsCustomerBillable = 'X'",
            "querytype": "sql",
            "entity": "WorkOrderTimeExpense",
            "widgettype": "Segment",
            "field": {
                "lblItemNameKA": {
                    "widgettype": "Label",
                    "field": "Description",
                    "text": "id",
                    "alias": "id"
                },
                "lblItemValKA": {
                    "widgettype": "Label",
                    "field": "Amount",
                    "text": "Amount",
                    "alias": "Amount"
                }
            }
        }
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