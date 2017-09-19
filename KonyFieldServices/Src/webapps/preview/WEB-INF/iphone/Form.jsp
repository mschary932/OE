<%@page import="com.konylabs.api.ThemeLib"%>
<%@page import="com.konylabs.vm.LuaNil"%>
<%@page import="com.konylabs.api.ui.KonyContainer"%>
<%@page import="com.kony.web.WebAlert"%>
<%@page import="java.util.Map"%>
<%@page import="com.konylabs.api.ui.KonyServerWidget"%>
<%@page import="java.util.List"%>
<%@page import="com.konylabs.api.ui.segui.KonySegmentUI"%>
<%@page import="com.konylabs.api.ui.KonyDataGrid"%>
<%@page import="com.konylabs.api.ui.KonyDummyTabWidget"%>
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<%@include file="common.jsp"%>
<%@include file="head.jsp"%>

    <%if(uiState.getWebTransactionVariable(WEBConstants.NEW_PAGE) != null)
        {%>
        <body id="b<%=form.getTable("id")%>" onunload=""
              >
        <input  type="hidden" autocomplete="off"  id="isnewpage" value="true"/>
    <%}%>

        <%
        if (request.getAttribute(WEBConstants.THEME) != null)
        {
        	Object theme = WEBUtil.getTheme().toString().replace("/", "");
        	String value = "";
        	if(session.getAttribute(ThemeLib.URL_THEMES_LIST) != null)
        	{
            	LuaTable themesurl = (LuaTable)session.getAttribute(ThemeLib.URL_THEMES_LIST);
            	
            	if(themesurl.list.contains(theme))
            	{
            		LuaTable themeurlmap = (LuaTable)session.getAttribute(ThemeLib.THEME_URL);
            		value = themeurlmap.getTable(theme).toString();
            	}   
        	}
        %>            
            <input type="hidden" autocomplete="off" id="<%=ThemeLib.CURRENT_THEME %>" value="<%=WEBUtil.getTheme()%>" imagecat="<%=imageCat%>" url="<%=value %>"/>
        <%}
		 %>
		 
	 <%
		 if( form.map.get("title") != null && form.map.get("title") != LuaNil.nil && !"".equals(form.map.get("title"))){ 
		     appTitle = (String)form.map.get("title");
		 } 
	 %>
    <input name="konyformtitle"  type="hidden" autocomplete="off"  value="<%=appTitle%>"/>
	<form id="<%=form.map.get(KonyServerWidget.ID)%>" action="<%=apppath%>/<%=form.getTable("id")%>" method="post" selected ="true"
              imgbaseurl ="<%=imgpath%>"
              <% if(!"".equals(form.getTable(KonyServerWidget.SKIN))) {%> formskin="<%=form.getTable(KonyServerWidget.SKIN)%>"<%}else { %> formskin="konyform"<%}%>
		formonloadjs="<%=form.getTable(constants.FORM_ONLOAD_JS)%>" formunloadjs="<%=form.getTable(constants.FORM_UNLOAD_JS)%>"
		nocache="<%=form.map.get(constants.NO_CACHE) %>"	>

        <input name="formid" type="hidden" value="<%=form.map.get(KonyServerWidget.ID)%>" />
		<input name="cat" type="hidden" value="<%=deviceCategory %>" />
		<% if (uiState.getSessionLevelVariable(KonyServerWidget.REGISTER_FOR_TIMEOUT)!=null && (Boolean) uiState.getSessionLevelVariable(KonyServerWidget.REGISTER_FOR_TIMEOUT) ) { %>
        <input id="enabletimeout" registertimeout="<%=uiState.getSessionLevelVariable("registryfortimeout")%>" tim="<%=uiState.getSessionLevelVariable("idletimeout")%>"   type="hidden" autocomplete="off"  value="<%=uiState.getSessionLevelVariable("idletimeout")%>"/>
        <%}%>
		<%
		  if(JSWAPUtil.getBooleanValue(form.map.get(constants.CAPTURE_GPS)))
		  {
		%>
		<input id="gpseventtrue"  type="hidden" autocomplete="off"  konyffipreevent="true" />
		<%
		  }
		if(request.getAttribute(WEBConstants.CACHE_ID) != null)
		{ %>
		<input name="cacheid" type="hidden" value="<%=request.getAttribute(WEBConstants.CACHE_ID)%>" />
		<%
		  }
			if (WAPUtilities.isSecureTransaction(session))
			{
		%>
		<input name="krfid" type="hidden" value="<%=WAPUtilities.getKRFId(request)%>" />
		<%
			}
			if(JSWAPUtil.getBooleanValue(form.map.get(constants.CAPTURE_GPS)))
			{
		%>
		<input id="gpseventtrue"  type="hidden" autocomplete="off"  konyffipreevent="true" />
		<%
			}
		if (uiState.getSessionLevelVariable(WEBConstants.PREVIOUS_FORM_ID) != null)
			{
		%>
		<input name="<%=WEBConstants.PREVIOUS_FORM_ID%>" type="hidden"
			value="<%=WAPUtilities.escapeHtml((String)uiState.getSessionLevelVariable(WEBConstants.PREVIOUS_FORM_ID))%>" />
		<%
			}
		%>
		<%
			Map<String, String> hiddenFields = (Map<String, String>) uiState.getWebTransactionVariable(WEBConstants.HIDDEN_FIELDS);
			if (hiddenFields != null)
			{
				for (Map.Entry<String, String> hiddenField : hiddenFields.entrySet())
				{
		%>
		<input name="<%=hiddenField.getKey()%>" type="hidden" value="<%=hiddenField.getValue()%>" />
		<%
				}
			}
		%>
<% 
    if (request.getAttribute(WEBConstants.THEME) != null)
    {%>
        <input type="hidden" autocomplete="off" id="currenttheme" value="<%=WEBUtil.getTheme()%>" imagecat="<%=imageCat%>"/>
    <%}
                    // form title
                    if(deviceCategory.equalsIgnoreCase("iphone") && "true".equals(form.map.get("title")))
                     {
                        String title  = (String)form.map.get("title");
                     %>
                        <input name="konyformtitle"  type="hidden" autocomplete="off"  value="<%=title%>"/>
                        <div id="konytitlebar" class="titlebar">
                           <h1><%=title%></h1>
                        </div>
                     <%
                     }

                %>

		<%
                    //parsing form headers.
                    LuaTable headers = (LuaTable)form.map.get(WEBConstants.FORM_HEADERS);
		   if(headers == null) //for backward compatability
                        headers = (LuaTable)form.map.get(constants.FORM_GLOBAL_HEADERS);
                    if(headers != null && headers.list != null && !headers.list.isEmpty())
                    {
                        String tmpFrmId = frmId;
                        KonyServerWidget header = null;
                        for( int i = 0 ; i < headers.list.size(); i++)
                        {
                            header = (KonyServerWidget)headers.list.get(i);
                            if(JSWAPUtil.getBooleanValue(header.getTable(constants.ISVISIBLE)))
                            {
                                request.setAttribute(WEBConstants.WIDGET_ID, header.getTable("id"));
                                request.setAttribute(WEBConstants.FORM_HEADER_ID, header.getTable("id"));
                                jspFile = header.getWidgetType() + WEBConstants.JSP_EXTENSION;
                                %>
                                 <jsp:include page="<%=jspFile%>" />
                                <%
                           }
                        }
                        request.removeAttribute("FORM_HEADER_ID");
                        request.setAttribute(WEBConstants.FORM_ID, tmpFrmId);
                    }
		%>
                <%
                     // parsing form Hbox headers based on position.
			LuaTable children = (LuaTable) form.map.get(WEBConstants.CHILDREN);
			List<String> childWidgets = children.list;
                        for (String s : childWidgets)
			{
                            childWidget = (KonyServerWidget) form.getTable(s);
                            if(childWidget instanceof KonyContainer &&("header".equals(childWidget.getTable("position")) ||
                                    ("segheader".equals(childWidget.getTable("position"))))){
                                jspFile = childWidget.getWidgetType() + WEBConstants.JSP_EXTENSION;
                                request.setAttribute(WEBConstants.WIDGET_ID, childWidget.getWidgetID());
                                 if(jspFile.equals("HBox.jsp") && JSWAPUtil.getBooleanValue(childWidget.getTable(constants.ISVISIBLE))) {
                 %>
                                    <jsp:include page="<%=jspFile%>" />
                 <%
                                }
                            }
                        }
                 %>

		<%
			for (String s : childWidgets)
			{
				childWidget = (KonyServerWidget) form.getTable(s);
				jspFile = childWidget.getWidgetType() + WEBConstants.JSP_EXTENSION;                                
				request.setAttribute(WEBConstants.WIDGET_ID, childWidget.getWidgetID());
				if((Boolean)childWidget.getTable(constants.ISVISIBLE))
				{
					if(!(childWidget instanceof KonyContainer)&& !(childWidget instanceof KonySegmentUI) && !(childWidget instanceof KonyDummyTabWidget) && !(childWidget instanceof KonyDataGrid))
					{
					    String widgetAlignment = (String)JSWAPUtil.getWidgetAlignmentSkinForPalm(childWidget);

		%>

		<div class =" ktable kwt100 " columns="1" style=" border: none;" >
			<div  class ="krow kwt100" style=" border: none;"  >
				<div class="kcell kwt100 <%=widgetAlignment%>" style=" border: none;"  >
					<%
					}
                if(childWidget instanceof KonyContainer && childWidget.getWidgetType().equals("HBox")
                                 &&!(childWidget.getTable("position").equals("normal")|| childWidget.getTable("position").equals("") 
                                         || childWidget.getTable("position") == LuaNil.nil)){
                    continue;
                    }else {
 %>
 <jsp:include page="<%=jspFile%>" />
 <%
 }
					if(!(childWidget instanceof KonyContainer)&& !(childWidget instanceof KonySegmentUI) && !(childWidget instanceof KonyDummyTabWidget) && !(childWidget instanceof KonyDataGrid))
					{
		%>
				</div>
			</div>
		</div>
		<%
					}
				}
			}
                  %>

                <%
                     for (String s : childWidgets)
			{
                            childWidget = (KonyServerWidget) form.map.get(s);
                            if(childWidget instanceof KonyContainer &&(("footer".equals(childWidget.map.get("position")))||
                                    ("segfooter".equals(childWidget.map.get("position"))))){
                                jspFile = childWidget.getWidgetType() + WEBConstants.JSP_EXTENSION;
                                request.setAttribute(WEBConstants.WIDGET_ID, childWidget.getWidgetID());
                                 if(jspFile.equals("HBox.jsp") && JSWAPUtil.getBooleanValue(childWidget.getTable(constants.ISVISIBLE))) {
                 %>
                                    <jsp:include page="<%=jspFile%>" />
                 <%
                                }
                            }
                        }

    LuaTable footers = (LuaTable)form.map.get(WEBConstants.FORM_FOOTERS);
    if(footers == null)
        footers = (LuaTable)form.map.get(constants.FORM_GLOBAL_FOOTERS);
    if(footers != null && footers.list != null && !footers.list.isEmpty())
    {
    	KonyServerWidget footer = null;
       for( int i = 0 ; i < footers.list.size(); i++)
       {
            footer = (KonyServerWidget)footers.list.get(i);
            if(JSWAPUtil.getBooleanValue(footer.getTable(constants.ISVISIBLE)))
            {            
                request.setAttribute(WEBConstants.WIDGET_ID, footer.getTable("id"));
                request.setAttribute(WEBConstants.FORM_FOOTER_ID, footer.getTable("id"));
                jspFile = footer.getWidgetType() + WEBConstants.JSP_EXTENSION;
                %>
                 <jsp:include page="<%=jspFile%>" />
                <%
            }
       }

    }

%>

     <%if(uiState.getAppMenuItems() != null)
     {
    	 boolean launchappmenu = false;
    	 if(form.map.get(constants.NEED_APPLEVEL_MENU) != null && form.map.get(constants.NEED_APPLEVEL_MENU) != LuaNil.nil)
    	 {
    		 launchappmenu = JSWAPUtil.getBooleanValue(form.map.get(constants.NEED_APPLEVEL_MENU));
    	 }
    	 else if(JSWAPUtil.getBooleanValue(form.map.get(constants.NEED_APPMENU)))
    	 {
    		 launchappmenu = JSWAPUtil.getBooleanValue(form.map.get(constants.NEED_APPMENU));
    	 }
    	 if(launchappmenu)     
	     { 
	      %>
	      <br/><br/><br/>
	
	        <%
	        if("palm".equalsIgnoreCase(preferredML)|| "nth".equalsIgnoreCase(preferredML))
	        {
	        %>
	            <div  style="width:100%">
	                <jsp:include page="appmenu.jsp" />
	            </div>
	        <%} else {%>
	            <div id= "<%=form.getTable("id")%>konyappmenudiv" style="position:absolute;width:100%">
	                <jsp:include page="appmenu.jsp" />
	            </div>
	          <%}
    	  }}%>

        </form>

    <% if (uiState.getWebTransactionVariable(WEBConstants.NEW_PAGE) != null){%>
         <style>
         #JavaScriptDisabledErrorMsg { display:none; }
         </style>

    <noscript>
        <style type='text/css'>
        form {
                display: none !important
        }

        html {
                display: block
        }

        #JavaScriptDisabledErrorMsg {
                display: block;
        }
        </style>
    </noscript>
	<div id="JavaScriptDisabledErrorMsg"><%=noScriptMessage%></div>
	     <%}%>
	     
	<% if("iphone".equalsIgnoreCase(preferredML))
	        {%>
	        <script type="text/javascript">
if ((/iphone|ipod|ipad.*os 5/gi).test(navigator.appVersion)) {
  window.onpageshow = function(evt) {
    // If persisted then it is in the page cache, force a reload of the page.
    if (evt.persisted) {
      document.body.style.display = "none";
      location.reload();
    }
  };
}
</script>    
	        <%} %> 
	        <script>
	        if(typeof evalCategory != "undefined"){
				var category = evalCategory(); 
				if(document.getElementById("CURRENT_THEME") != null)
					document.getElementById("CURRENT_THEME").setAttribute("imagecat",category);
	        }	
			</script>
</body>
</html>