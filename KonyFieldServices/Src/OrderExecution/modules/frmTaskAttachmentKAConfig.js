var frmTaskAttachmentKAConfig = {
    "formid": "frmTaskAttachmentKA",
    "frmTaskAttachmentKA": {
      "widgettype": "Label",
      "entity": "EAM_WO_ATTACHMENT",
        "objectServiceOptions":{
      	"access":"offline"
      },
      "objectServiceName":"OrderExecution",
      "query":"select EAM_WO_ATTACHMENT.BINARY_NAME FROM EAM_WO_ATTACHMENT LEFT JOIN media ON EAM_WO_ATTACHMENT.BINARY_NAME = media.name  WHERE  LOWER(EAM_WO_ATTACHMENT.DOC_TYPE) != 'signature' AND EAM_WO_ATTACHMENT.ORDER_NUM = '{x}' and EAM_WO_ATTACHMENT.OPERATION = '' and  (LOWER(EAM_WO_ATTACHMENT.EXTENSION) = 'png'  OR LOWER(EAM_WO_ATTACHMENT.EXTENSION) = 'jpeg' OR LOWER(EAM_WO_ATTACHMENT.EXTENSION) = 'jpg')"
    },
    "lblDayandTimeKA": {
      "fieldprops": {
        "entity": "EAM_WO_ATTACHMENT",
        "widgettype": "Label",
        "field": "BINARY_NAME"
      }
    },
     "lblExtension": {
      "fieldprops": {
        "entity": "EAM_WO_ATTACHMENT",
        "widgettype": "Label",
        "field": "extension"
      }
    }
  };