var frmMeasurementsKAConfig = {
    "formid": "frmMeasurementsKA",
    "frmMeasurementsKA": {
        "entity": "MeasurePoint",
        "objectServiceOptions":{
      	"access":"offline"
      },
      "objectServiceName":"OrderExecution"
    },
    "segMeasurementPointsKA": {
        "fieldprops": {
            "query": "select mp.id,mp.Code,mp.Description, (SELECT COUNT(*) from MeasureValue WHERE MeasureValue.MeasurePoint_id=mp.id and MeasureValue.Task_id = '{Task_id}' and (MeasureValue.OPMODE is Null OR MeasureValue.OPMODE!='D')) as reading_count FROM MeasurePoint mp  where ((mp.Asset_id = (select t.Asset_id from Task t where t.Task_num = '{Task_id}') and mp.Asset_id is not null) or (mp.FunctionalLocation_id = (select t.FunctionalLocation_id from Task t where t.Task_num = '{Task_id}') and mp.FunctionalLocation_id is not null)) and (mp.id like '{search_text}' or mp.description like '{search_text}') group by mp.id",
            "querytype": "sql",
            "entity": "MeasurePoint",
            "widgettype": "Segment",
            "field": {
                "lblMeasurementNumberKA": {
                    "widgettype": "Label",
                    "field": "id",
                    "text": "id",
                    "alias": "id"
                },
				"lblMeasurementName": {
                    "widgettype": "Label",
                    "field": "Description",
                    "text": "Description",
                    "alias": "Description"
                },
                "lblNumberOfreadingsKA": {
                    "widgettype": "Label",
                    "field": "reading_count",
                    "text": "reading_count",
                    "alias": "reading_count"
                }
            }
        }
    }
};