kony = kony || {};
kony.servicesapp = kony.servicesapp || {};
kony.servicesapp.surveyname=kony.servicesapp.surveyname || {};
kony.servicesapp.ContactDetailsKA = kony.servicesapp.ContactDetailsKA || {};

kony.servicesapp.TOUCH_ID_ANDROID_FLAG = false;
/** Login and Sync related constants **/
kony.servicesapp.INITIAL_SYNC = false;
kony.servicesapp.BATCH_DOWNLOAD = true;
kony.servicesapp.IS_SYNC_IN_PROGRESS = false;
kony.servicesapp.LOGIN_BATCH_SIZE = 300000;
kony.servicesapp.APP_TYPE = {
    "APPTYPE": "MFAPP"
};
kony.servicesapp.COMPRESSION_VAL=30;
kony.servicesapp.CONNECTOR="CRM";
kony.servicesapp.paymentDone="";
kony.servicesapp.TaskTypeIDMeasurement = "MEAS";
kony.servicesapp.TaskTypeIDTask = "ORD";
kony.servicesapp.ERROR_SKIN = "sknErrorSkinKA";
kony.servicesapp.SYNC_INCREMENT = 10;
kony.servicesapp.SWITCH_FALSE = 0;
kony.servicesapp.SWITCH_TRUE = 1;
kony.servicesapp.SYNC_BATCH_TIMEOUT = 40000;
kony.servicesapp.REMEMBERMEFLAG = "REMEMBERMEFLAG";
kony.servicesapp.QR_CODE_FLOW = "QR_CODE_FLOW";
kony.servicesapp.OPACITY_0 = 0;
kony.servicesapp.DATA_CLEAN=30;
kony.servicesapp.DISCOUNTVALUE = "0.00$";
/** End of login and Sync related constants **/
kony.servicesapp.TECHNICIAN_CAN_EDIT_TIME = true;
kony.servicesapp.EMPTY_STRING = "";
kony.servicesapp.IDLE_TIMEOUT = "IDLE_TIMEOUT";
kony.servicesapp.ORDER_EXECUTION_STATUS = "ORDER_EXECUTION_STATUS";
kony.servicesapp.TASK_EXECUTION_STATUS = "TASK_EXECUTION_STATUS";
kony.servicesapp.MEASUREMENT_EXECUTION_STATUS = "MEASUREMENT_EXECUTION_STATUS";
kony.servicesapp.remoteTimeZone = "Etc/GMT";
kony.servicesapp.buildNumber = "2.1.0.7";
kony.servicesapp.versionNumber = "3.1";
kony.servicesapp.servicesStatus = {};
kony.servicesapp.NUMOFSTOCKLOCATIONS = 50;
kony.servicesapp.ISFROMORDEREXECUTION = true;
kony.servicesapp.WATCHPOSITIONCALLEDFIRSTTIME = true;
kony.servicesapp.isAppLaunchedFirstTime = false;
kony.servicesapp.APP_OPTIONS = {"access":"offline"};
kony.servicesapp.OE_OBJECT_SERVICE_NAME = "OrderExecution";
kony.servicesapp.AO_OBJECT_SERVICE_NAME = "AvailableOrders";
kony.servicesapp.GPS_OBJECT_SERVICE_NAME = "GPSTracking";
kony.servicesapp.DATE_FORMAT_WITH_TIME = "YYYY-MM-DD HH:mm:ss";
kony.servicesapp.DATE_FORMAT_DDMMYYYY = "DD/MM/YYYY";
kony.servicesapp.DATE_FORMAT_YYYYMMDD="YYYY-MM-DD";
kony.servicesapp.DB_DATE_FORMAT = "YYYYMMDDHHmmss";
kony.servicesapp.DATE_FORMAT_MMDDYY = "MM/DD/YY";
kony.servicesapp.servicesStatus.key = {"Scheduled" : "Scheduled", "Paused": "Paused", "Accepted" : "Accepted", "Started" : "Started","Completed" : "Completed", "Rejected" : "Rejected","OnRoute" : "On Route"};
kony.servicesapp.servicesStatus.meas = {"MEAS" : "MEAS", "ORD": "ORD"};
kony.servicesapp.rowreset = true;	
kony.servicesapp.coords = [];
kony.servicesapp.swipedIndices = {};	
kony.servicesapp.isAnimationInProgress = false;	
kony.servicesapp.currIndices={};											
kony.servicesapp.SCHEDULED = "Scheduled";
kony.servicesapp.REQUESTED = "Requested";
kony.servicesapp.STATUSFORTE="Scheduled";
kony.servicesapp.offlineError = 14;
kony.servicesapp.databaseResetInterval = 35;
kony.servicesapp.dateRangeFilterValueKA = "-30:+100";
kony.servicesapp.mapMyOrderListKAZoomValueKA = 10;
kony.servicesapp.AUTHENTICATING = "Authenticating";
kony.servicesapp.LOADING_METADATA = "Loading Metadata";
kony.servicesapp.SCOPE_STARTED = "Scope Started";
kony.servicesapp.SYNC_STARTED = "Sync Started";
kony.servicesapp.BATCH_SUCCESS = "Batch Processing Success";
kony.servicesapp.APP_ID = "100000002edca5207";
kony.servicesapp.TASK_NUM = 9000;
kony.servicesapp.kmsObject = undefined;
kony.servicesapp.AndroidProjectForNotification = "35503819995";
kony.servicesapp.ENTITY_WORKORDER = "WorkOrder";
kony.servicesapp.ENTITY_STOPWATCH = "StopWatch";
kony.servicesapp.ENTITY_GEOLOCATIONLOG = "GeolocationLog";
kony.servicesapp.ENTITY_INVENTORY = "Inventory";
kony.servicesapp.ENTITY_TASKMATERIAL = "TaskMaterial";
kony.servicesapp.ENTITY_SURVEYRESPONSE = "SurveyResponse";
kony.servicesapp.ENTITY_SURVEYFIELDVALUE = "SurveyFieldValue";
kony.servicesapp.ENTITY_WORKORDERSURVEY = "WorkOrderSurvey";
kony.servicesapp.ENTITY_EVENTSURVEY = "EventSurvey";
kony.servicesapp.ENTITY_MEDIA = "media";
kony.servicesapp.ENTITY_EAMWOATTACHMENT = "EAM_WO_ATTACHMENT";
kony.servicesapp.ENTITY_TASK = "Task";
kony.servicesapp.WORKORDEREXTENDEDATTRIBUTE = "WOEXTENDEDATTRIBUTE";
kony.servicesapp.TASKEXTENDEDATTRIBUTE = "TASKEXTENDEDATTRIBUTE";
kony.servicesapp.RESOURCEEXTENDEDATTRIBUTE = "RESOURCEEXTENDEDATTRIBUTE";
kony.servicesapp.DEFAULT_LATITUDE = "0.0000";
kony.servicesapp.DEFAULT_LONGITUDE = "0.0000";
kony.servicesapp.ORDERLIST_WITH_FILTERS_QUERY=" where WorkOrder.PlannedStartDate BETWEEN '{x}' and '{y}' ";
kony.servicesapp.ORDERLIST_WITH_ASC=" order by WorkOrder.PlannedStartDate asc";
kony.servicesapp.MAXIMUMAGE_GPS=1800000;
kony.servicesapp.GPS_MINIMUMTIMER_FREQUENCY=1800000;
kony.servicesapp.decimalOnly =/^\d*\.?\d{0,2}$/;
/* forms */
kony.servicesapp.FRMEXTENEDEATTRIBUTESKA = "frmExtendedAttributesKA";
kony.servicesapp.FRMTASKRESOURCESLISTKA = "frmTaskResourcesListKA";
kony.servicesapp.FRMRESOURCEEXECUTIONKA = "frmResourceExecutionKA";
kony.servicesapp.FRMTASKDETAILSKA = "frmTaskDetailsKA";
kony.servicesapp.FRMORDERSVIEWSKA = "frmOrdersViewsKA";
kony.servicesapp.FRMORDEREXECUTIONKA = "frmOrderExecutionKA";
kony.servicesapp.FRMORDERATTACHMENTKA = "frmOrderAttachmentsKA";
kony.servicesapp.FRMTASKEXECUTIONKA = "frmTaskExecutionKA";
kony.servicesapp.FRMTASKATTACHMENTKA = "frmTaskAttachmentKA";
kony.servicesapp.FRMPENDINGORDERSLISTKA = "frmPendingOrderListKA";
kony.servicesapp.FRMFRMCOMPLETEORDERKA = "frmCompleteOrderKA";
kony.servicesapp.FRMORDERRESOURCELISTKA = "frmOrderResourcesListKA";
kony.servicesapp.FRMRESOURCESEXECUTIONKA = "frmResourceExecutionKA";
kony.servicesapp.FRMORDERRESOURCEDETAILSKA = "frmOrderResourceDetailsKA";
/* ends here*/

/* frmOrderListKAControllerExtension */
kony.servicesapp.CALENDAR_BUTTON_NORMAL_SKIN = "sknBtnFFFFFFClanProNews24KA";
kony.servicesapp.CALENDAR_BUTTON_FOCUS_SKIN = "sknBtnE4E8ECBorder1C3F64Font456484KA";
kony.servicesapp.TAB_NORMAL_SKIN = "sknBtnFF5D6EClanProNews28BackgroundFFFFFFKA";
kony.servicesapp.TAB_FOCUS_SKIN = "sknBtnFFFFFFClanProNews28BackgroundFF5D6EKA";
kony.servicesapp.MAP_CURRENT_LOCATION_IMAGE = "current_location.png";
kony.servicesapp.MAP_CALLOUT_DOWN_ARROW_IMAGE = "map_down_arrow.png";
kony.servicesapp.MAP_CURRENT_LOCATION_DESC = "Current Location";
kony.servicesapp.NO_OF_DAYS = 5;
kony.servicesapp.DESCRIPTION_LENGTH = 42;
kony.servicesapp.MAP_DESCRIPTION_LENGTH = 25;
kony.servicesapp.ADDRESS_LENGTH = 46;
kony.servicesapp.NO_OF_DOTS_AFTERTRUNCATION = 3;
kony.servicesapp.DATE_FORMAT = "YYYY-MM-DD";
kony.servicesapp.MAP_GPS_TIMEOUT = 15000;
kony.servicesapp.LBL_HEADER = "lblHeader";
kony.servicesapp.IMG_HEADER = "imgHeader";
kony.servicesapp.TODAY = "Today";
kony.servicesapp.STATUS = "Status";
kony.servicesapp.PRIORITY = "Priority";
kony.servicesapp.NEAR_ME = "Nearme";
kony.servicesapp.WOFINISH="WO_FINISH";
/* ends here */

/* frmTaskExecutionKAControllerExtension */
kony.servicesapp.TIMER_FORMAT = "HH:MM";
kony.servicesapp.TIMER_FREQUENCY = 60;
kony.servicesapp.DESCRIPTION_SEGMENT_LENGTH = 28;
kony.servicesapp.MATERIAL_NUMBER_SEGMENT_LENGTH = 10;
kony.servicesapp.MATERIAL_TYPE_SEGMENT_LENGTH = 20;
kony.servicesapp.DOWNLOAD_IMAGE = "tap_to_download.png";
kony.servicesapp.TRY_AGAIN_IMAGE = "try_again.png";
kony.servicesapp.LBLSTATUS_SKIN = "sknLbl5E5050ClanProBook16KA";
kony.servicesapp.CHILDFLEXCONTAINER_SKIN = "sknFlexDefaultKA";
kony.servicesapp.HIDNLABEL_SKIN = "sknLbl5E5050ClanProBook16KA";
kony.servicesapp.CANCEL_WITH_DOWNLOADING_IMAGE = "cancel_with_downloading.png";
kony.servicesapp.REQHEIGHT = 227;
kony.servicesapp.REQWIDTH = 230;
kony.servicesapp.CHILDFLEXCONTAINER_INTIAL_SKIN = "sknFlx8799ABTrans70KA";
kony.servicesapp.BTNCHECKEDENABLEDKA_SKIN = "sknBtnCheckedEnabledKA";
kony.servicesapp.BTNUNCHECKEDENABLEDKA_SKIN = "sknBtnUncheckedEnabledKA";
kony.servicesapp.BTNRESOURCECHECKED_SKIN = "sknBtnResourceCheckedKA";
kony.servicesapp.BTNRESOURCEUNCHECKED_SKIN = "sknBtnResourceUncheckedKA";
kony.servicesapp.BTNTRANSKA_SKIN = "sknBtnTransKA";
/* ends here*/

/* frmPendingOrderListKAControllerExtension */
kony.servicesapp.NO_OF_DAYS_3 = 3;
kony.servicesapp.ORDERLIST_DATABASE_DATEFORMAT = "YYYY-MM-DD";
kony.servicesapp.MAP_NAVIGATION_IMAGE = "notification_map_navigation.png";
/* ends here*/
kony.servicesapp.FRMTASKATTACHMENTKA="frmTaskAttachmentKA";
kony.servicesapp.FRMORDEREXECUTIONKA="frmOrderExecutionKA";
kony.servicesapp.FRMORDERATTACHMENTSKA="frmOrderAttachmentsKA";
kony.servicesapp.FRMEXTENDEDATTRIBUTESKA="frmExtendedAttributesKA";
kony.servicesapp.FRMTASKEXECUTIONKA="frmTaskExecutionKA";
kony.servicesapp.FRMORDERLISTKA="frmOrderListKA";
kony.servicesapp.FRMORDERDETAILSKA="frmOrderDetailsKA";
kony.servicesapp.FRMCOMPLETEORDERKA="frmCompleteOrderKA";
kony.servicesapp.FRMORDERRESOURCESLISTKA="frmOrderResourcesListKA";
kony.servicesapp.FRMTASKRESOURCESLISTKA="frmTaskResourcesListKA";
kony.servicesapp.FRMPENDINGORDERLISTKA="frmPendingOrderListKA";
kony.servicesapp.FRMORDERSVIEWSKA="frmOrdersViewsKA";
kony.servicesapp.FRMWORKCONFIRMATIONKA="frmWorkConfirmationKA";
kony.servicesapp.FRMORDERHISTORYKA="frmOrderHistoryKA";
kony.servicesapp.FRMHISTORY="frmHistory";
kony.servicesapp.FRMDIRECTIONSKA="frmDirectionsKA";
kony.servicesapp.FRMNOTESLISTKA="frmNotesListKA";
kony.servicesapp.FRMNEWTASKKA="frmNewTaskKA";
kony.servicesapp.FRMSTATUSFILTERKA="frmStatusFilterKA";
kony.servicesapp.FRMCREATENOTESKA="frmCreateNotesKA";
kony.servicesapp.BINARY_CONTENT_RESPONSE_TYPE = "base64string";
kony.servicesapp.BINARY_CONTENT_ATTRIBUTE_NAME = "url";
kony.servicesapp.ORDER_ATTACHMENT_STATUS_FAILED = "failed";
kony.servicesapp.ORDER_ATTACHMENT_DOC_IMAGE = "bf_attachments_pdf.png";
kony.servicesapp.ORDER_ATTACHMENT_MISSING_IMAGE = "bf_attachments_missing.png";
kony.servicesapp.ORDER_ATTACHMENT_STATUS_DOWNLOADED = "Downloaded";
kony.servicesapp.ORDER_ATTACHMENT_ON_DEVICE_IMAGE = "bf_attachments_on_device.png";
kony.servicesapp.ORDER_ATTACHMENT_DOWNLOADING_IMAGE = "bf_attachments_downloading.png";
kony.servicesapp.ORDER_ATTACHMENT_STATUS_AVAILABLE_TEXT = "Available";
kony.servicesapp.ORDER_ATTACHMENT_DOWNLOADING_TEXT = "Downloading";
kony.servicesapp.ORDER_ATTACHMENT_AVAILABLE_IMAGE = "bf_attachments_available.png";
kony.servicesapp.CONFIG_MIME_TYPE_PDF = "application/pdf";
kony.servicesapp.CONFIG_ENCODING_FORMAT = "UTF-8";
kony.servicesapp.ORDER_ATTACHMENT_FILE_NAME = "fileName";
kony.servicesapp.BINARY_NAME = "BINARY_NAME";
kony.servicesapp.ORDER_ATTACHMENT_COUNT = "attachmentCount";
kony.servicesapp.TASK_STATUS_CODE = "statusCode";
kony.servicesapp.TAP_TO_DOWNLOAD = "Tap to Download";
kony.servicesapp.TAP_TO_DOWNLOAD_IMAGE = "tap_to_download.png";
kony.servicesapp.FLEX_ROW_CONTAINER = "flexRowContainer";
kony.servicesapp.BINARY_IMAGE = "binaryImage";
kony.servicesapp.RESOURCELIST_VIEWTYPE_LOCAL_TASK = "TASK_LOCAL";
kony.servicesapp.RESOURCELIST_VIEWTYPE_AVAILABLE = "AVAILABLE";
kony.servicesapp.RESOURCELIST_VIEWTYPE_INTASK= "TASK";
kony.servicesapp.RESOURCELIST_VIEWTYPE_GLOBAL= "GLOBAL";
kony.servicesapp.UNCHECKED_VIEW_IMAGE="notification_circle_unchecked.png";
kony.servicesapp.FORWARD_CARET =  "bf_forward_caret.png";
kony.servicesapp.FILTER_UNCHECKED_SKIN =  "sknBtnUncheckedCheckboxKA";
kony.servicesapp.FILTER_CHECKED_SKIN = "sknBtnCheckedCheckboxKA";
kony.servicesapp.RESOURCES_VIEW = "i18n.task.frmTaskViewFiltersKA.InTask.ValueKA", "i18n.task.frmTaskViewFiltersKA.Local.ValueKA";
kony.servicesapp.BUTTON_CLEAR_SKIN ="sknBtnFF5D6EClanProNews28KA";
kony.servicesapp.VIEW_ENABLED = false;
kony.servicesapp.LAST_SYNC_TIME_STAMP = "lastsynctimestamp";
kony.servicesapp.SOURCE = "src";
kony.servicesapp.MAX_ALLOWED_DAYS = 5;
kony.servicesapp.NOTES_LIST_DISPLAY_FORMAT = "DD MMM, YYYY";
kony.servicesapp.FRMREADINGEXECUTION = "frmReadingExecution";
kony.servicesapp.FRMMEASUREMENTREADINGS = "frmMeasurementReadings";
kony.servicesapp.FRMMEASUREMENTSKA = "frmMeasurementsKA";
kony.servicesapp.ENTITY_MEASUREVALUE = "MeasureValue";
kony.servicesapp.FRMMEASUREMENTEXECUTIONKA = "frmMeasurementExecutionKA";

/** Animation constants */
kony.servicesapp.ANIMATION_OPICITY_ZERO = 0;
kony.servicesapp.ANIMATION_OPICITY_ONE = 1;
kony.servicesapp.ANIMATION_OPICITY_ZERO_DECIMAL_FIVE = 0.5;
kony.servicesapp.ANIMATION_DELAY_ZERO_DECIMAL_NINE = 0.9;
kony.servicesapp.ANIMATION_DELAY_ZERO_DECIMAL_TWO =0.2;
kony.servicesapp.ANIMATION_DELAY_ZERO_DECIMAL_FIVE = 0.5;
kony.servicesapp.ANIMATION_DELAY_ZERO_DECIMAL_ONE = 0.1;
kony.servicesapp.ANIMATION_DELAY_ONE = 1;
kony.servicesapp.ANIMATION_DURATION_ONE = 1;
kony.servicesapp.ANIMATION_DURATION_ONE_DECIMAL_TWO = 1.2;
kony.servicesapp.ANIMATION_DURATION_ZERO_DECIMAL_FIVE = 0.5;
kony.servicesapp.ANIMATION_IMGLOGOKA_CENTERY = "93%";
kony.servicesapp.ANIMATION_IMGLOGOKA_WIDTH = "65dp";
kony.servicesapp.ANIMATION_IMGLOGOKA_HEIGHT = "20dp";
kony.servicesapp.ANIMATION_IMGLOGOKA_LEFT = "49.3%";
kony.servicesapp.ANIMATION_LBLPOWEREDBYKA_WIDTH = "150dp";
kony.servicesapp.ANIMATION_FLXVERSIONKA_TOP = "95%";
kony.servicesapp.ANIMATION_FLXINNERKA_TOP_STARTING = "114dp";
kony.servicesapp.ANIMATION_FLXINNERKA_TOP_ENDING = "140dp";
kony.servicesapp.ANIMATION_FLXTOUCHID_TOP_STARTING ="73%";
kony.servicesapp.ANIMATION_FLXTOUCHID_TOP_ENDING ="474dp";
kony.servicesapp.ANIMATION_BTNLOGINKA_TOP = "306dp";
kony.servicesapp.ANIMATION_TBX_TOP = "183dp";
kony.servicesapp.ANIMATION_TBXPASSWORD_TOP = kony.servicesapp.ANIMATION_TBX_TOP;
kony.servicesapp.ANIMATION_TBXUSERID_TOP_STARTING = "136dp";
kony.servicesapp.ANIMATION_TBXUSERID_TOP_ENDING = "166dp";
kony.servicesapp.ANIMATION_FLXRECONNECT_TOP_STARTING = "384dp";
kony.servicesapp.ANIMATION_FLXRECONNECT_TOP_ENDING ="404dp";
kony.servicesapp.ANIMATION_LBLTITLEKA_TOP_STARTING = "81dp";
kony.servicesapp.ANIMATION_LBLTITLEKA_TOP_ENDING = "111dp";
kony.servicesapp.ANIMATION_FLXINNERKA_HEIGHT = "250dp";
kony.servicesapp.ANIMATION_TBXUSERID_WIDTH = "72.5%";
kony.servicesapp.ANIMATION_FLXSWITCHKA_WIDTH = "72.5%";
kony.servicesapp.ANIMATION_BTNLOGINKA_WIDTH = "72.5%";
kony.servicesapp.ANIMATION_TBXUSERID_WIDTH = "72.5%";
kony.servicesapp.ANIMATION_FLXSWITCHKA_TOP = "251dp";
kony.servicesapp.ANIMATION_BTNMANUALSETUP_TOP_STARTING = "396dp";
kony.servicesapp.ANIMATION_BTNMANUALSETUP_TOP_ENDING = "426dp";
kony.servicesapp.ANIMATION_LBLOPTION_TOP_STARTING = "361dp";
kony.servicesapp.ANIMATION_LBLOPTION_TOP_ENDING = "391dp";
kony.servicesapp.ANIMATION_FLXINNER_TOP_STARTING = "95dp";
kony.servicesapp.ANIMATION_FLXINNER_TOP_ENDING = "130dp";
kony.servicesapp.ANIMATION_LBLTITLE_TOP = "15dp";
kony.servicesapp.HASANIMATEDLOGINSCREEN = false;
kony.servicesapp.HASANIMATEDSPLASHSCREEN = false;
kony.servicesapp.WOCHECKLIST="WO_CHECKLIST";
kony.servicesapp.WOACCEPTANCE="WO_ACCEPTANCE";

kony.servicesapp.ContactDetailsKA.skins = {
	"lblDisabled": "sknLbl5E5050ClanProBook28Opacity20KA",
	"lblEnabled": "sknLbl5E5050ClanProBook28KA",
	"btnEmailDisabled": "sknBtnEmailDisbaledKA",
	"btnEmail": "sknBtnEmailKA",
	"btnEmailFocus": "sknBtnEmailFocKA",
	"btnCall": "sknBtnCallKA",
	"btnCallFocus": "sknBtnCallFocKA",
	"btnCallDisabled": "sknbtnPhoneDisabledKA",
	"btnMessage": "sknBtnMessageKA",
	"btnMessageDisabled": "sknbtnMessageDisabledKA",
	"btnMessageFocus": "sknBtnMessageFocKA"
};
kony.servicesapp.DEFAULT_SURVEY_CONFIG = {
    "formid": "frmSurveyKA",
    "frmSurveyKA": {
        "entity":kony.servicesapp.ENTITY_SURVEYRESPONSE,
        "objectServiceOptions": {
            "access": "offline"
        },
        "objectServiceName": "OrderExecution"
    },
  	"lblSurveyResponseID": {
        "fieldprops": {
            "entity": kony.servicesapp.ENTITY_SURVEYRESPONSE,
            "widgettype": "Label",
            "field": "id",
            "text": "id"
        }
    },
    "lblSurveyDefinitionID": {
        "fieldprops": {
            "entity": kony.servicesapp.ENTITY_SURVEYRESPONSE,
            "widgettype": "Label",
            "field": "SurveyDefinition_id",
            "text": "SurveyDefinition_id"
        }
    },
    "flxSurveyKA": {
        "fieldprops": {
            "entity": kony.servicesapp.ENTITY_WORKORDER,
            "widgettype": "Label",
            "query": "select res.* from (select que.*, sr.id as response_id from (select foi.FieldOptionGroup_id, foi.id, foi.code, foi.label as optionitem_name,sfd.DataType_id as datatype_id, sfd.name, sfd.surveydefinition_id,sfd.isRequired, sfd.label,sd.name as surveyname , ss.name as surveysectionname, ss.id as surveysection_id, sfv.fieldvalue, sfv.surveyresponse_id, sfv.id as surveyfieldvalue_id, sfd.id as surveyfielddefinition_id from SurveyFieldDefinition as sfd left join FieldOptionItem as foi on foi.FieldOptionGroup_id = sfd.FieldOptionGroup_id left join SurveySectionField as ssf on ssf.FieldDefinition_id=sfd.id and ssf.SurveyDefinition_id= sfd.SurveyDefinition_id  left join SurveyDefinition as sd on sd.id = sfd.SurveyDefinition_id left join  SurveySection as ss on ss.id=ssf.SurveySection_id left join SurveyFieldValue as sfv on sfv.SurveyFieldDefintion_id=sfd.id and sfv.surveyresponse_id = (select wos.surrveyresponse_id from EventSurvey wos where wos.workorder_id='{x}' and wos.eventtype_id='{y}')  where sfd.SurveyDefinition_id = (select wos.SurveyDefinition_id from EventSurveyDefinition wos where wos.eventtype_id='{y}')) as que left join SurveyResponse as sr on sr.id=que.surveyresponse_id order by length(surveyfielddefinition_id)) as res",
            "querytype": "sql",
            "field": "Description"
        }
    },
   "flxEventSurveyKA":{
  		"fieldprops":{
  			"entity": kony.servicesapp.ENTITY_EVENTSURVEY,
            "widgettype": "Label",
            "parent" : "frmSurveyKA"
		}
  
	},
  	"lblEventTypeid":{
      "fieldprops":{
  			"entity": kony.servicesapp.ENTITY_EVENTSURVEY,
            "widgettype": "Label",
        	"parent":"flxEventSurveyKA",
        	"field":"EventType_id",
        	"text":"EventType_id"
		}
    },
  	"lblEventSurveyDefinitionid":{
      "fieldprops":{
  			"entity": kony.servicesapp.ENTITY_EVENTSURVEY,
            "widgettype": "Label",
        	"parent":"flxEventSurveyKA",
        	"field":"SurveyDefinition_id",
        	"text":"SurveyDefinition_id"
		}
    },
  	"lblWorkorderid":{
      "fieldprops":{
  			"entity": kony.servicesapp.ENTITY_EVENTSURVEY,
            "widgettype": "Label",
        	"parent":"flxEventSurveyKA",
        	"field":"Workorder_id",
        	"text":"Workorder_id"
		}
    },
  	"lblUserid":{
      "fieldprops":{
  			"entity": kony.servicesapp.ENTITY_EVENTSURVEY,
            "widgettype": "Label",
        	"parent":"flxEventSurveyKA",
        	"field":"User_id",
        	"text":"User_id"
		}
    },
  	"lblStatusId":{
      "fieldprops":{
  			"entity": kony.servicesapp.ENTITY_SURVEYRESPONSE,
            "widgettype": "Label",
        	"field":"Status_id",
        	"text":"Status_id"
		}
    }
  
};
kony.servicesapp.SECTION_LABEL = kony.i18n.getLocalizedString("i18n.surveys.sectionLabel.ValueKA").split(',');

kony.servicesapp.MAP_CURRENT_LOCATION_IMAGE= "blank.png";
kony.servicesapp.MAP_CURRENT_LOCATION_DESC= "Current Location";
kony.servicesapp.MAP_DESTINATION_LOCATION_IMAGE= "mapfocuspin.png";
kony.servicesapp.MAP_DIRECTION_IMAGE= "current_location.png";
kony.servicesapp.MAP_ALTERNATIVE_ROUTE = false;
kony.servicesapp.MAP_NO_OF_DECIMAL_PLACES = 3;
kony.servicesapp.MAP_ROUTE_COLOR =["0000FFFF","FF00FFFF","FF0000FF","FFFF00FF","0x000000FF"];
kony.servicesapp.MAP_ROUTE_LINE_WIDTH = 4;
kony.servicesapp.MAP_CALLOUT_DOWN_ARROW_IMAGE= "map_down_arrow.png";
kony.servicesapp.MAP_NAVIGATION_IMAGE = "navigationicon.png";
kony.servicesapp.MAP_MAXIMUM_AGE_GPS_LOCATION = 360000;
kony.servicesapp.WATCHID = "";
kony.servicesapp.DIRECTIONSERVICEURL = "https://maps.googleapis.com/maps/api/directions/json";
kony.servicesapp.MAPAPIKEY = "AIzaSyAJOkl-7hJ08jbE5sBZs9Da9qrHP_XhXro";
kony.servicesapp.FRMORDEREXECUTIONKA = "frmOrderExecutionKA";
kony.servicesapp.FRMTIMEANDEXPENSEKA="frmTimeAndExpenseKA"
kony.servicesapp.FRMDIRECTIONSKA = "frmDirectionsKA";
kony.servicesapp.FRMDIRECTIONSTEPSKA = "frmDirectionStepsKA";
/* kpns */
kony.servicesapp.ANDROID = "android";
kony.servicesapp.IPHONE = "iPhone";
kony.imageDownloadingCount = 0;
/* ends here */
/**
Sync bar related
*/
kony.servicesapp.BACKGROUNDSYNCINPROGRESS = false;
kony.servicesapp.SYNCSTARTPOINT = 0;
kony.servicesapp.SYNCENDPOINT = 0;
kony.servicesapp.PREVIOUSFORM = undefined;
kony.servicesapp.FORMSONHIDEUPDATED = [];
kony.servicesapp.FORMSWITHSYNCANIMATION = [];




/**frmSurveyKA*/
kony.servicesapp.STATUSCANCEL="CANCELLED";
kony.servicesapp.STATUSCOMPLETE="COMPLETED";
kony.servicesapp.surveyname.MAXLENGTH=20;
kony.servicesapp.surveyname.NO_OF_CHARS_TO_TRUNCATE=3;
kony.servicesapp.surveyname.ANSWER_MAXLENGTH = 40;

kony.servicesapp.constants = Class( {
     $statics : {
	    scopeObj : null,
		getServiceConstantsObj : function(){
			if(kony.servicesapp.constants.scopeObj){
				return kony.servicesapp.constants.scopeObj;
			}else{
				kony.servicesapp.constants.scopeObj = new kony.servicesapp.constants();
				return kony.servicesapp.constants.scopeObj;
			}
		}
	},
    /**
     * constructor method.
     */
	constructor : function() {
		try{
	    	var  idleTimeOut = 10;
	    	var statusKey = kony.servicesapp.servicesStatus.key;
	    	var orderExecutionStatus = {"Scheduled" : [kony.i18n.getLocalizedString("i18n.common.statusMechine.onRouteKA"),kony.i18n.getLocalizedString("i18n.common.statusMechine.rejectKA")],
			  	"On Route" : [kony.i18n.getLocalizedString("i18n.common.statusMechine.startKA")],
			  	"Started" : [kony.i18n.getLocalizedString("i18n.common.statusMechine.pauseKA"),kony.i18n.getLocalizedString("i18n.common.statusMechine.completeKA")],
			  	"Paused" : [kony.i18n.getLocalizedString("i18n.common.statusMechine.resumeKA")],
			  	"Completed" : [],
			  	"Rejected" : []
		  	};
			var taskExecutionStatus  = {"Scheduled" : [kony.i18n.getLocalizedString("i18n.common.statusMechine.startKA")],
				"Started" : [kony.i18n.getLocalizedString("i18n.common.statusMechine.pauseKA"),kony.i18n.getLocalizedString("i18n.common.statusMechine.completeKA")],
				"Paused" : [kony.i18n.getLocalizedString("i18n.common.statusMechine.resumeKA")],
				"Completed" : [],
				"Rejected" : []
			};
           var measurementExecutionStatus  = {"Scheduled" : [kony.i18n.getLocalizedString("i18n.common.statusMechine.startKA")],
				"Started" : [kony.i18n.getLocalizedString("i18n.common.statusMechine.completeKA")],
				"Paused" : [kony.i18n.getLocalizedString("i18n.common.statusMechine.resumeKA")],
				"Completed" : [],
				"Rejected" : []
			};
			this.getValue = function(key,value){
				switch(key){
					case "IDLE_TIMEOUT" : 
						return idleTimeOut;
					case "ORDER_EXECUTION_STATUS" : 
						return orderExecutionStatus[value] ? orderExecutionStatus[value] : [];
					case "TASK_EXECUTION_STATUS" : 
						return taskExecutionStatus[value] ? taskExecutionStatus[value] : [];
                    case "MEASUREMENT_EXECUTION_STATUS" :
                    	return measurementExecutionStatus[value] ? measurementExecutionStatus[value] : [];
					case "BUILD_NUMBER":
						return kony.i18n.getLocalizedString("i18n.common.buildKA")+ " - "+ kony.servicesapp.buildNumber;
					case "VERSION_NUMBER":
						return kony.i18n.getLocalizedString("i18n.common.versionKA")+ " - "+ kony.servicesapp.versionNumber;
				}
			};
          	this.getDateTimeFormat = function(val){
				try {
					return (kony.servicesapp.DATETIMEFORMAT[kony.servicesapp.Country][val] == null ? "MM/DD/YYYY" : kony.servicesapp.DATETIMEFORMAT[kony.servicesapp.Country][val]);
				} catch (err) {
					kony.sdk.mvvm.log.error("error in Blogic getDateTimeFormat : " + err);
				}	
			};
			this.getUOM = function(val){
				try {
					return (kony.servicesapp.UNITOFMEASUREMENT[kony.servicesapp.Country][val] == null ? "MILES" : kony.servicesapp.UNITOFMEASUREMENT[kony.servicesapp.Country][val]);
				} catch (err) {
					kony.sdk.mvvm.log.error("error in Blogic getUOM : " + err);
				}	
			};
		}catch(err){
			kony.print("==error in resourcesSegmentOnClickKA==>");
			kony.print(err.toString());
		}
	}
 });
kony.servicesapp.FORMS_SYNC_PROGRESS_BAR = {
	"frmCompleteImagesKA" : {"processBar" : true, "refresh" : true},
	"frmCustomerSignOffKA" : {"processBar" : false, "refresh" : false},
	"frmCompleteOrderKA" : {"processBar" : true, "refresh" : true},
	"frmCompleteOrderSummaryKA" : {"processBar" : true, "refresh" : true},
	"frmContactDetailsKA" : {"processBar" : true, "refresh" : true},
	"frmCreateNotesKA" : {"processBar" : true, "refresh" : false},
	"frmDateFilterKA" : {"processBar" : false, "refresh" : false},
	"frmDescriptionDetailsKA" : {"processBar" : true, "refresh" : true},
	"frmDirectionsKA" : {"processBar" : false, "refresh" : false},
	"frmDirectionStepsKA" : {"processBar" : true, "refresh" : true},
	"frmEditTaskResourcesKA" : {"processBar" : true, "refresh" : true},
	"frmExtendedAttributesKA" : {"processBar" : true, "refresh" : true},
	"frmFSLoginKA" : {"processBar" : false, "refresh" : false},
	"frmHamburgerMenuWOKA" : {"processBar" : false, "refresh" : false},
	"frmLoginKA" : {"processBar" : false, "refresh" : false},
	"frmMeasurementExecutionKA" : {"processBar" : true, "refresh" : true},
    "frmNotesDetailsKA" : {"processBar" : true, "refresh" : false},
	"frmNotesListKA" : {"processBar" : true, "refresh" : true},
	"frmOrderAttachmentBrowserKA" : {"processBar" : true, "refresh" : true},
	"frmOrderAttachmentsKA" : {"processBar" : true, "refresh" : true},
	"frmWorkConfirmationKA" : {"processBar" : false, "refresh" : false},
	"frmOrderDetailsKA" : {"processBar" : true, "refresh" : true},
	"frmOrderExecutionKA" : {"processBar" : true, "refresh" : true},
	"frmOrderHistoryKA" : {"processBar" : true, "refresh" : true},
	"frmOrderListKA" : {"processBar" : true, "refresh" : true},
	"frmOrderResourceDetailsKA" : {"processBar" : true, "refresh" : true},
	"frmOrderResourcesListKA" : {"processBar" : true, "refresh" : true},
	"frmOrdersViewsKA" : {"processBar" : false, "refresh" : false},
	"frmPendingOrderListKA" : {"processBar" : true, "refresh" : true},
	"frmResourceExecutionKA" : {"processBar" : true, "refresh" : false},
	"frmSettingsKA" : {"processBar" : true, "refresh" : true},
	"frmStatusFilterKA" : {"processBar" : false, "refresh" : false},
	"frmTaskAttachmentImageKA" : {"processBar" : true, "refresh" : true},
	"frmTaskAttachmentKA" : {"processBar" : true, "refresh" : true},
	"frmTaskDetailsKA" : {"processBar" : true, "refresh" : true},
	"frmTaskExecutionKA" : {"processBar" : true, "refresh" : true},
    "frmMeasurementExecutionKA" : {"processBar" : true, "refresh" : true},
	"frmTaskResourcesListKA" : {"processBar" : true, "refresh" : true},
	"frmTaskViewFiltersKA" : {"processBar" : false, "refresh" : false},
	"frmTenantKA" : {"processBar" : false, "refresh" : false},
	"frmTimeAndExpenseKA" : {"processBar" : true, "refresh" : true},
	"frmTouchIDSetupKA" : {"processBar" : false, "refresh" : false},
	"frmURLKA" : {"processBar" : false, "refresh" : false},
  	"frmOrderAssetKA" : {"processBar" : true, "refresh" : true}
};
kony.servicesapp.UNITOFMEASUREMENT = {
  "MX":{ 
	UOM : "KMS"
      },
  "US":{
	UOM : "MILES"
  },
  "SG":{
	UOM : "KMS"
  },
  "CA":{
	UOM : "KMS"
  },
  "IN":{
	UOM : "KMS"
  },
  "HK":{
	UOM : "KMS"
  },
  "BR":{
	UOM : "KMS"
  },
  "AR":{
	UOM : "KMS"
  },
  "AU":{
	UOM : "KMS"
  },
  "GB":{
	UOM : "KMS"
  },
  "DK":{	
	UOM : "KMS"
  },
  "FR":{
	UOM : "KMS"
  },
  "DE":{
	UOM : "KMS"
  }
};		
		

kony.servicesapp.DATETIMEFORMAT = {
 "MX":{ 
 "SHORTDATE":"DD.MM.YYYY",
 "MONTHANDDATE":"DD.MM[, ]hh:mm A",
 "TIMEHOURSANDMIN":"hh:mm A",
 "TIMEANDDAY":"hh:mm A[, ]ddd",
 "DAYANDTIME":"ddd[, ]hh:mm A"
      },
  "US":{
 "SHORTDATE":"DD/MM/YYYY",
 "MONTHANDDATE":"DD/MM[, ]hh:mm A",
 "TIMEHOURSANDMIN":"hh:mm A",
 "TIMEANDDAY":"hh:mm A[, ]ddd",
 "DAYANDTIME":"ddd[, ]hh:mm A"
  },
  
  "SG":{
 "SHORTDATE":"DD/MM/YYYY",
 "MONTHANDDATE":"DD/MM[, ]hh:mm A",
 "TIMEHOURSANDMIN":"hh:mm A",
 "TIMEANDDAY":"hh:mm A[, ]ddd",
 "DAYANDTIME":"ddd[, ]hh:mm A"
  },
  "CA":{
 "SHORTDATE":"DD/MM/YYYY",
 "MONTHANDDATE":"DD/MM[, ]hh:mm A",
 "TIMEHOURSANDMIN":"hh:mm A",
 "TIMEANDDAY":"hh:mm A[, ]ddd",
 "DAYANDTIME":"ddd[, ]hh:mm A"
  },
  "IN":{
 "SHORTDATE":"DD-MM-YYYY",
 "MONTHANDDATE":"DD-MM[, ]hh:mm A",
 "TIMEHOURSANDMIN":"hh:mm A",
 "TIMEANDDAY":"hh:mm A[, ]ddd",
 "DAYANDTIME":"ddd[, ]hh:mm A"
  },
  "HK":{
 "SHORTDATE":"DD/MM/YYYY",
 "MONTHANDDATE":"DD/MM[, ]hh:mm A",
 "TIMEHOURSANDMIN":"hh:mm A",
 "TIMEANDDAY":"hh:mm A[, ]ddd",
 "DAYANDTIME":"ddd[, ]hh:mm A"
  },
  "BR":{
 "SHORTDATE":"DD/MM/YYYY",
 "MONTHANDDATE":"DD/MM[, ]hh:mm A",
 "TIMEHOURSANDMIN":"hh:mm A",
 "TIMEANDDAY":"hh:mm A[, ]ddd",
 "DAYANDTIME":"ddd[, ]hh:mm A"
  },
  "AR":{
 "SHORTDATE":"DD/MM/YYYY",
 "MONTHANDDATE":"DD/MM[, ]hh:mm A",
 "TIMEHOURSANDMIN":"hh:mm A",
 "TIMEANDDAY":"hh:mm A[, ]ddd",
 "DAYANDTIME":"ddd[, ]hh:mm A"
  },
  "AU":{
 "SHORTDATE":"DD/MM/YYYY",
 "MONTHANDDATE":"DD/MM[, ]hh:mm A",
 "TIMEHOURSANDMIN":"hh:mm A",
 "TIMEANDDAY":"hh:mm A[, ]ddd",
 "DAYANDTIME":"ddd[, ]hh:mm A"
  },
  "GB":{
 "SHORTDATE":"DD/MM/YYYY",
 "MONTHANDDATE":"DD/MM[, ]hh:mm A",
 "TIMEHOURSANDMIN":"hh:mm A",
 "TIMEANDDAY":"hh:mm A[, ]ddd",
 "DAYANDTIME":"ddd[, ]hh:mm A"
  },
  "DK":{
 "SHORTDATE":"DD-MM-YYYY",
 "MONTHANDDATE":"DD-MM[, ]hh:mm A",
 "TIMEHOURSANDMIN":"hh:mm A",
 "TIMEANDDAY":"hh:mm A[, ]ddd",
 "DAYANDTIME":"ddd[, ]hh:mm A"
  },
  "FR":{
 "SHORTDATE":"DD-MM-YYYY",
 "MONTHANDDATE":"DD-MM[, ]hh:mm A",
 "TIMEHOURSANDMIN":"hh:mm A",
 "TIMEANDDAY":"hh:mm A[, ]ddd",
 "DAYANDTIME":"ddd[, ]hh:mm A"
  },
  "DE":{
 "SHORTDATE":"DD.MM.YYYY",
 "MONTHANDDATE":"DD.MM[, ]hh:mm A",
 "TIMEHOURSANDMIN":"hh:mm A",
 "TIMEANDDAY":"hh:mm A[, ]ddd",
 "DAYANDTIME":"ddd[, ]hh:mm A"
  }
};
kony.servicesapp.globalOrdersViewsKA	=	{
  "view"	:	"Today",
  "filters"	:	{
		"date"	:	{
				"text"	:	"Today",	
				"value"	:	moment().format("YYYY-MM-DD"),
				"index"	:	null
			},
      "status"	:	{
				"indices"	:	null,
				"values"	:	null,
				"formatValues"	:	null
         
      },
       "priorities"	:	{
                
				"indices"	:	null,
				"values"	:	null,
				"formatValues"	:	null 
       }
      
      
	}  
};

kony.servicesapp.date =	{
	"text"	:	"Today",	
	"value"	:	moment().format("YYYY-MM-DD"),
	"index"	:	null
};
kony.servicesapp.status	=	{
  "indices"	:	null,
	"values":	null,
 "formatValues"	:	null
};

kony.servicesapp.priorities	=	{
	"indices"	:	null,
	"values"	:	null,
  "formatValues"	:	null
};

kony.servicesapp.temp	=	{
  "view"	:	null,
  "value"	:	null,
  "fromDate"	:	false
};
kony.servicesapp.EVENT_SURVEY_WORK_ORDER_TRIGGERS = {
 'WO_START' : {
  'CURRENT_STATUS' : kony.servicesapp.servicesStatus.key.OnRoute,
  'UPDATED_STATUS' : kony.servicesapp.servicesStatus.key.Started
 },
 'WO_PAUSE' : {
  'CURRENT_STATUS' : kony.servicesapp.servicesStatus.key.Started,
  'UPDATED_STATUS' : kony.servicesapp.servicesStatus.key.Paused
 },
 'WO_RESUME' : {
  'CURRENT_STATUS' : kony.servicesapp.servicesStatus.key.Paused,
  'UPDATED_STATUS' : kony.servicesapp.servicesStatus.key.Started
 },
 'WO_ON_ROUTE' : {
  'CURRENT_STATUS' : kony.servicesapp.servicesStatus.key.Scheduled,
  'UPDATED_STATUS' : kony.servicesapp.servicesStatus.key.OnRoute
 }
};
kony.servicesapp.EVENT_SURVEY_DATATYPE_WIDGET_MAPPINGS = {
 'BOOL' : {
  'WIDGET' : 'RADIO',
  'POSSIBLE_WIDGETS' : ['RADIO', 'LIST_BOX'],
  'DEFAULT_FALLBACK_WIDGET' : 'RADIO'
 },
 'TEXT' : {
  'WIDGET' : 'TEXT_AREA',
  'POSSIBLE_WIDGETS' : ['TEXT_AREA'],
  'DEFAULT_FALLBACK_WIDGET' : 'TEXT_AREA'
 },
 'TXT' : {
  'WIDGET' : 'TEXT_AREA',
  'POSSIBLE_WIDGETS' : ['TEXT_AREA'],
  'DEFAULT_FALLBACK_WIDGET' : 'TEXT_AREA'
 },
 'NUM' : {
  'WIDGET' : 'TEXT_BOX_NUM',
  'POSSIBLE_WIDGETS' : ['TEXT_BOX_NUM'],
  'DEFAULT_FALLBACK_WIDGET' : 'TEXT_BOX_NUM'
 },
 'TIME' : {
  'WIDGET' : 'TIME_PICKER',
  'POSSIBLE_WIDGETS' : ['TIME_PICKER'],
  'DEFAULT_FALLBACK_WIDGET' : 'TIME_PICKER'
 },
 'DATE' : {
  'WIDGET' : 'CALENDAR',
  'POSSIBLE_WIDGETS' : ['CALENDAR'],
  'DEFAULT_FALLBACK_WIDGET' : 'CALENDAR'
 },
 'PICKLIST_SINGLE' : {
  'WIDGET' : 'LIST_BOX',
  'POSSIBLE_WIDGETS' : ['LIST_BOX', 'RADIO'],
  'DEFAULT_FALLBACK_WIDGET' : 'LIST_BOX'
 }
};
kony.servicesapp.configurations=[
  "PREF_CONNECTOR","PREF_DATA_CLEAN","PREF_COMPRESSION_VAL","PREF_DESCRIPTION_LENGTH","PREF_TIMER_FORMAT","PREF_DATE_FORMAT","PREF_DATE_FORMAT_WITH_TIME","PREF_MAXIMUMAGE_GPS","PREF_GPS_MINIMUMTIMER_FREQUENCY",
  "PREF_MAP_GPS_TIMEOUT","PREF_DATE_FORMAT_DDMMYYYY","PREF_NO_OF_DAYS","PREF_DB_DATE_FORMAT","PREF_DATE_FORMAT_MMDDYY","PREF_NO_OF_DOTS_AFTERTRUNCATION",
  "PREF_MAP_ROUTE_LINE_WIDTH","PREF_MAPAPIKEY","PREF_ADDRESS_LENGTH"
];

