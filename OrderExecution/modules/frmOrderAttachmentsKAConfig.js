// config file for frmOrderAttachmentsKA to map the result to widget
var frmOrderAttachmentsKAConfig = {
    "formid": "frmOrderAttachmentsKA",
    "frmOrderAttachmentsKA": {
      "entity": "EAM_WO_ATTACHMENT",
      "objectServiceOptions":{
      	"access":"offline"
      },
      "objectServiceName":"OrderExecution"
    },
    "segOrderAttachmentKA": {
      "fieldprops": {
        "query":"select EAM_WO_ATTACHMENT.BINARY_NAME AS BINARY_NAME,EAM_WO_ATTACHMENT.createdts AS createdts FROM EAM_WO_ATTACHMENT LEFT JOIN media ON EAM_WO_ATTACHMENT.BINARY_NAME = media.name  WHERE LOWER(media.type) = 'documents' AND EAM_WO_ATTACHMENT.ORDER_NUM = '{x}' AND  EAM_WO_ATTACHMENT.OPERATION ='' AND LOWER(EAM_WO_ATTACHMENT.EXTENSION) = 'pdf'",
        "querytype":"sql",
        "widgettype":"Segment",
        "field": {
          "lblDocmtNameKA": {
            "widgettype": "Label",
            "field": "BINARY_NAME",
            "text": "BINARY_NAME",
            "alias": "BINARY_NAME"
          },
          "lblDateKA":{
            "widgettype": "Label",
            "field": "createdts",
            "text": "createdts",
            "alias": "createdts"
          }
        },
        "entity": "EAM_WO_ATTACHMENT"
      }
    }
};