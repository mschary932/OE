<%@page import="java.util.Map"%>
<%@page import="java.util.Vector"%>
<%@page import="com.konylabs.api.ui.KonyServerWidget"%>
<%@page import="com.konylabs.api.ui.KonyForm"%>
<%@page import="com.kony.web.WEBConstants"%>
<%@page import="com.konylabs.vm.LuaTable"%>
<%@page import="com.kony.web.WebUIState"%>
<%@page import="com.kony.web.util.WAPUtilities"%>
<%@page import="com.kony.web.KonyAppConfig"%>
<%@page import="com.kony.web.util.JSWAPUtil"%>

<%@include file="common.jsp"%>

<%String segmentid = (String)request.getAttribute("segmentid");
        String wtype = (String)widget.getTable(KonyServerWidget.WTYPE);
        {
            jspFile = wtype + WEBConstants.JSP_EXTENSION;
            if(segmentid != null && ("Button".equals(wtype) || "Line".equals(wtype) || "Link".equals(wtype) || "Label".equals(wtype) || "Image".equals(wtype) || "Image2".equals(wtype) ||  "RichText".equals(wtype) || "Phone".equals(wtype)) )
            {  
                    com.konylabs.vm.LuaTable segmentrec1 = (LuaTable)request.getAttribute("segmentrec");            
                    //SHANKER:17th, Mar 2014: Fix for #18108 formid should be Popup Name(incaseof popup)/Form Name(incaseof Form)[frmId returns popup/form name where as CURRENT_FORM_ID always returns formName as per API implementation]
                	String formid1 = frmId; //(String)uiState.getSessionLevelVariable(WEBConstants.CURRENT_FORM_ID);
                    KonyServerWidget parentInfo1 = null;
                    if (tabpaneid != null)
                    {
                            KonyServerWidget parentInfo = (KonyServerWidget) form.getTable(tabpaneid);
                            parentInfo1 = (KonyServerWidget) parentInfo.getTable(segmentid);
                    }
                    else
                    {
                            parentInfo1 = (KonyServerWidget)((LuaTable)uiState.get(formid1)).getTable(segmentid);
                    }
                    Object obj1 = parentInfo1.getTable(KonyServerWidget.DATA);
                    String segskin1 = "";

                    if (obj1 != null)
                    {
                       java.util.Hashtable segmentmetadata1 = null;
                       java.util.Vector segmentdata1 = ((LuaTable)obj1).list;
                       obj1 = parentInfo1.getTable(constants.WIDGETIDMAP);
                       if (obj1 != null &&  obj1 instanceof java.util.Hashtable)
                        {
                            segmentmetadata1 = (java.util.Hashtable) obj1;
                        }

                       Object wobj1 =  segmentmetadata1.get(widgetId);
                       request.setAttribute(WEBConstants.WIDGET_ID, widgetId);
                       String widgetkey1 = null;

                       if (wobj1 != null) {
                                    widgetkey1 = (String) wobj1;
                                    Object widgetData1 = segmentrec1.getTable(widgetkey1);
                                    String widgetSkin1 = (String)widget.map.get(KonyServerWidget.SKIN);
                                    com.konylabs.vm.LuaTable widgetDataLT1 = null;
                                    if(widgetData1 instanceof com.konylabs.vm.LuaTable)
                                    {
                                        widgetDataLT1 = (com.konylabs.vm.LuaTable)widgetData1;
                                        widgetDataText1 = WAPUtilities.getStringValue(widgetDataLT1.getTable("text"));
                                        if("Image2".equals(wtype) || "Image".equals(wtype))
                                            widgetDataText1 = WAPUtilities.getStringValue(widgetDataLT1.getTable("src"));
                                        
                                        wobj1 = WAPUtilities.getStringValue(widgetDataLT1.getTable(KonyServerWidget.SKIN));
                                        if(!"".equals(wobj1))
                                        {
                                            widgetSkin1 = (String)wobj1;
                                            request.setAttribute("widgetSkin1",(String)wobj1);
                                        }
                                objClickable1 = widgetDataLT1.getTable("enable");
                                if (objClickable1 != null && objClickable1 instanceof Boolean) {
                                    isCellClickable1 = (Boolean) objClickable1;
                                }                       
                                    } else{
                                        if(widgetData1 instanceof String)
                                        widgetDataText1 = (String)widgetData1;
                                    } 
                                    if(("Image2".equals(wtype) || "Image".equals(wtype)) && widgetId.equals(request.getAttribute(constants.IMAGE_IDENTIFIER)))
	           	                      {
	           	                      	widgetDataText1 =  (String)request.getAttribute(constants.UNSELECTED_STATE_IMAGE);	           	                      	 	
	           	                      	Map selectedItems = (Map)request.getAttribute("selectedRows");
                                  		Object sectionId = 0;
                                  		if(request.getAttribute("sectionId") != null)
                                  			sectionId = Double.valueOf(request.getAttribute("sectionId").toString())+constants.INDEXJL;                       	 	
                                  		if(selectedItems != null )	           	                      		
	           	                           {
                                  				Vector selectedRows = (Vector)selectedItems.get(sectionId.toString());
                                  				if(selectedRows != null)
                                      			{
		           	                               for(Object index : selectedRows)
		           	                               {                                	
		           	                                   if(  Double.valueOf(index.toString()) == (Integer)request.getAttribute("currentRow")+(int)constants.INDEXJL)
		           	                                   {
		           	                                   		//if(request.getAttribute("sectionid") != null && request.getAttribute("sectionid").equals(request.getAttribute("sectionId")))
		           	                                   		{
		           	                                   			widgetDataText1 =  (String)request.getAttribute(constants.SELECTED_STATE_IMAGE);
		           	                       		                break;
		           	                                   		}                			
		           	                                  	}
		           	                                   	
		           	                                }
                                      			}
	           	                           }
	           	                      }   
                        request.setAttribute("widgetDataText1",widgetDataText1);
                        if(widgetDataText1.toString().trim().length() != 0 || "Line".equals(wtype))
                        {%>
                         <jsp:include page="<%=jspFile%>" />
                        <% 
                        }
                    }
                    }}}
        request.removeAttribute("widgetSkin1");
                    %>