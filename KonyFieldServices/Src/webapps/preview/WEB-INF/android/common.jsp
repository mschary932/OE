<%@page import="com.konylabs.vm.LuaNil"%>
<%@page import="com.konylabs.api.ui.constants.KonyConstantsFactory"%>
<%@page import="com.konylabs.api.ui.constants.Constants"%>
<%@page import="com.konylabs.api.ui.KonyServerWidget"%>
<%@page import="com.konylabs.api.ui.KonyForm"%>
<%@page import="com.kony.web.WEBConstants"%>
<%@page import="com.konylabs.vm.LuaTable"%>
<%@page import="com.kony.web.WebUIState"%>
<%@page import="com.kony.web.util.WAPUtilities"%>
<%@page import="com.kony.web.KonyAppConfig"%>
<%@page import="com.kony.web.util.JSWAPUtil"%>
<%@page import="com.konylabs.api.ui.KonySkin"%>

<%!public Constants constants = KonyConstantsFactory.getPlatformConstants();%>

<%
    KonyAppConfig konyAppConfig = (KonyAppConfig) application.getAttribute(WEBConstants.KONY_APP_CONFIG);
	Boolean adherePercentageStrictly=JSWAPUtil.getBooleanValue(session.getAttribute(constants.ADHERE_PERCENTAGE_STRICTLY));
    String gpath = null;
    String webprotocol = null;
    String contextPath = request.getContextPath();
    WebUIState uiState = (WebUIState) session.getAttribute(WEBConstants.KONY_APP_UI_STATE);
    String frmId = (String) request.getAttribute(WEBConstants.FORM_ID);
    LuaTable form = (LuaTable) uiState.get(frmId);
    if(form.map.get(constants.CONTEXT_PATH) != null)
    	contextPath = (String)form.map.get(constants.CONTEXT_PATH);
    if (request.getScheme().equalsIgnoreCase("https"))
    {
        webprotocol = "https://";
        int securePort = Integer.parseInt(konyAppConfig.getHttpsPort());
        if (securePort == 443)
        {
            gpath = "https://" + request.getServerName() + contextPath;
        }
        else
        {
            gpath = "https://" + request.getServerName() + ":" + securePort + contextPath;
        }

    }
    else
    {
        webprotocol = "http://";
        int nonSecurePort = Integer.parseInt(konyAppConfig.getHttpPort());
        if (nonSecurePort == 80)
        {
            gpath = "http://" + request.getServerName() + contextPath;
        }
        else
        {
            gpath = "http://" + request.getServerName() + ":" + nonSecurePort + contextPath;
        }
    }    
    String deviceCategory = (String) session.getAttribute(WEBConstants.PREFERRED_ML);
    String apppath = gpath + "/" + application.getAttribute(WEBConstants.APP_SERVLET_NAME);

    String conditions = WAPUtilities.checkForSpecialConditions(uiState);
    if (conditions != null && conditions.trim().length() != 0)
    {
        if (uiState.getWebTransactionVariable(WEBConstants.HYBRID_TO_NATIVE) != null)
        {
            out.println(conditions);
        }
        else
        {
            out.println(conditions);
            return;
        }
    }

    String imgpath = gpath + "/" + deviceCategory + "/images/";
    String imageCat = (String) session.getAttribute(com.kony.web.WEBConstants.IMAGE_CAT);
    String preferredML = (String) session.getAttribute(com.kony.web.WEBConstants.PREFERRED_ML);
    if ("android".equalsIgnoreCase(deviceCategory) || "bb".equalsIgnoreCase(deviceCategory)
            || "nth".equalsIgnoreCase(deviceCategory))
    {
        String konydpi = (String) session.getAttribute("konydpi");
        if (konydpi == null)
        {
            imgpath = imgpath + "checkdpi" + "/";
        }
        else
        {
            imageCat = (String) session.getAttribute(com.kony.web.WEBConstants.IMAGE_CAT);
            if (imageCat != null)
            {
                imgpath = imgpath + imageCat + "/";
            }
        }
    }
    else
    {
        if (imageCat != null && !"0".equals(imageCat) && !"iphone".equals(deviceCategory))
        {
            imgpath = imgpath + imageCat + "/";
        }
        else
        {
            imageCat = "";
        }
    }
    
    String widgetId = (String) request.getAttribute(WEBConstants.WIDGET_ID);
    String tabpaneid = (String) request.getAttribute("tabpaneid");
    KonyServerWidget widget = (form != null && widgetId != null) ? (KonyServerWidget)form.map.get(widgetId) : null;
    KonyServerWidget childWidget = null;
    String jspFile = null;
    String widgetDataText1 = "";
    Object objClickable1 = (Object) request.getAttribute("objClickable");
    boolean isCellClickable1 = true;
    String event = "";

    if (tabpaneid != null)
    {
        KonyServerWidget parentInfo = (KonyServerWidget) ((LuaTable) uiState.get(frmId)).map.get(tabpaneid);
        Object obj = ((LuaTable) parentInfo).getTable(widgetId);
        if (obj != LuaNil.nil)
            widget = (KonyServerWidget) obj;
    }

    String headerId = (String) request.getAttribute(WEBConstants.FORM_HEADER_ID);
    if (headerId != null)
    {
        frmId = "app.headers";
        if (!headerId.equals(widgetId))
        {
            if (uiState.get(frmId + "." + headerId) == null)
                frmId = "app.templates." + headerId;
            else
                frmId += "." + headerId;
        }
    }
    String footerId = (String) request.getAttribute(WEBConstants.FORM_FOOTER_ID);
    if (footerId != null)
    {
        frmId = "app.footers";
        if (!footerId.equals(widgetId))
        {
            if (uiState.get(frmId + "." + footerId) == null)
                frmId = "app.templates." + footerId;
            else
                frmId += "." + footerId;
        }
    }
    if(widget == null)
    	widget = (KonyServerWidget) uiState.get(frmId + "." + widgetId);
    if ((headerId != null || footerId != null) && widget == null)
    {
        widget = (KonyServerWidget) uiState.get("app.templates." + widgetId);
        frmId = "app.templates.";
    }
    if (widget == null)
    {
        LuaTable segmentBox = (LuaTable) request.getAttribute("segmentbox");
        if (segmentBox != null)
            widget = (KonyServerWidget) segmentBox.map.get(widgetId);
    }

    if (widget != null && widget.map.get(constants.ONCLICK) != null)
    {
        event = "yes";
    }
    else if (widget != null && widget.map.get(constants.ONSELECTION) != null)
    {
        event = "yes";
    }

    String vboxWidth = "0%";
    if (widget != null && widget.map.get("parent") != null)
    {
        String parentID = widget.map.get("parent").toString();
        KonyServerWidget parentInfo = (KonyServerWidget)form.map.get(parentID);
        if (parentInfo == null && !(frmId.equals(parentID)))
        {
        	KonyServerWidget template = (KonyServerWidget) ((LuaTable) uiState.get(frmId));
        	if(template != null){
	            parentInfo = (KonyServerWidget)template.map.get(parentID);
	            if (parentInfo != null)
	            {
	                if (parentInfo.map.get("orientation") != null)
	                {
	                    if (parentInfo.map.get("orientation").equals("vertical"))
	                    {
	                        vboxWidth = "100%";
	                    }
	                }
	            }
        	}
        }
    }
    String style = "";
%>