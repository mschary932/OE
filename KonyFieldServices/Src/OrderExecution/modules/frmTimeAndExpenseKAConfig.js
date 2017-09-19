var frmTimeAndExpenseKAConfig = {
  "formid": "frmTimeAndExpenseKA",
  "frmTimeAndExpenseKA": {
    "entity": "WorkOrderTimeExpense",
	 "objectServiceOptions":{
      	"access":"offline"
      },
      "objectServiceName":"OrderExecution"
 },
     "SegTimeExpenseKA": {
      "fieldprops": {
			"query":"Select wote.id,wote.Task_id, wote.Type, Description, wote.Duration, wote.Amount, wote.DELETED, wote.Currency_id, wote.Category_id, case wote.Type when 'TIME' Then (select ut.Description from Unit ut where ut.id = wote.DurationUnit_id) when 'EXPE' then (select c.Code from Currency c where c.id = wote.Currency_Id) end as baseUnit, (Select tec.Description from TimeExpenseCategory tec where tec.id = wote.Category_id) as TimeExpenceDesc, case wote.Type when 'TIME' Then wote.Duration when 'EXPE' then wote.Amount end as val from WorkOrderTimeExpense wote where wote.Task_id = '{x}'",
      		"querytype":"sql",
      		"entity": "WorkOrderTimeExpense",
            "widgettype":"Segment",
            "field": {
            "lblvalue1KA": {
              "widgettype": "Label",
              "field": "TimeExpenceDesc",
              "text": "TimeExpenceDesc",
              "alias": "TimeExpenceDesc"
            },
            "lblVal2KA": {
              "widgettype": "Label",
              "field": "Description",
              "text": "Description",
              "alias": "Description"
            },
			     "lblDurationValKA": {
              "widgettype": "Label",
              "field": "val",
              "text": "val",
              "alias": "val"
            },
            "lblHoursKA": {
              "widgettype": "Label",
              "field": "baseUnit",
              "text": "baseUnit",
              "alias": "baseUnit"
            }
        }
      }
    }
};