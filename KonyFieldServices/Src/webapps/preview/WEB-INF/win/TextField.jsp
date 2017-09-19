<%@page import="com.konylabs.vm.LuaNil"%>
<%@include file="common.jsp" %>

<%
            if (widget.map.get(constants.ONDONE) != null) {
                event = "yes";
            } else {
                event = "";
            }
            
            String mode = "text";
            if(widget.map.get("isNewTextbox") != null )
            {
                if(widget.map.get(constants.TEXTINPUTMODE) != null) {
                        mode = (String) widget.map.get(constants.TEXTINPUTMODE);
                        if(mode.equals("P"))
                            mode="password";
                        else if(mode.equals("N"))
                            mode ="numeric";
                        else
                            mode="text";
                }
                if(JSWAPUtil.getBooleanValue(widget.map.get(constants.SECURETEXTENTRY))) 
                    mode = "password";                 
            } 
            else
            {
                    if(widget.map.get(constants.TEXTINPUTMODE)!=null)
                    {
                        mode = (String) widget.map.get(constants.TEXTINPUTMODE);
                        if(mode.equals("A"))
                            mode="text";
                        else if(mode.equals("N"))
                            mode ="numeric";
                       else if(mode.equals("P"))
                            mode="password";
                        else
                            mode="text";
                    }               
            }


            String bjsEnableSize = "";
            if(widget.getTable(KonyServerWidget.BJS_ENABLE_SIZE) != LuaNil.nil)
                 bjsEnableSize = (String)widget.getTable(KonyServerWidget.BJS_ENABLE_SIZE);

            int maxLength=0;            
            if((widget.map.get(KonyServerWidget.LENGTH) != null))
            {                
                maxLength = JSWAPUtil.getIntValue(widget.map.get(KonyServerWidget.LENGTH));                
            }
            else if(widget.map.get(constants.MAXTEXTLENGTH) != null)
            {                 
                 maxLength = JSWAPUtil.getIntValue(widget.map.get(constants.MAXTEXTLENGTH));             
            }
            
            String name = widget.getWidgetID();
            if(request.getAttribute(WEBConstants.FORM_HEADER_ID) != null)
            {
                name = "app.headers."+request.getAttribute(WEBConstants.FORM_HEADER_ID)+"." + name;
            }
            if(request.getAttribute(WEBConstants.FORM_FOOTER_ID) != null)
            {
                name = "app.footers."+request.getAttribute(WEBConstants.FORM_FOOTER_ID)+"." + name;
            }
            if(request.getAttribute("tabpaneid") != null)
            {
                 name = frmId +"." +request.getAttribute("tabpaneid")+"."+name;
            }
            String compWidth ="100%";
            if(request.getAttribute("adjustedCompWeight")!= null) {
                 compWidth = (String)request.getAttribute("adjustedCompWeight");
            }

%>
<%if((request.getAttribute("layout")!= null && request.getAttribute("layout").equals("nonpercent")) ||
                    bjsEnableSize.equals("true"))
    {%>
<input  <%if(!(widget.map.get(KonyServerWidget.TEXT) instanceof LuaNil)){%>
             value = "<%=(widget.map.get(KonyServerWidget.TEXT) instanceof String) ? WAPUtilities.escapeHtml((String)widget.map.get(KonyServerWidget.TEXT)) : widget.map.get(KonyServerWidget.TEXT)%>"
        <%} else {%>
            value ="" <%}%>  konywidgettype="Ktextfield"
        style=" <%=JSWAPUtil.getWidgetStyleInfoForIE(widget, false)%> 
        <%if("N".equals(mode) && maxLength > 0){%> -wap-input-format:'<%=maxLength%>n';<%} else if("N".equals(mode)){%> -wap-input-format: '*n' <%}%>"
        <%if(widget.map.get(KonyServerWidget.SKIN)!= null){%> class="<%=widget.map.get(KonyServerWidget.SKIN)%>" <%}%>
        name="<%=name%>" id="<%=name%>" type="<%=mode%>"
        <%="yes".equals(event) ? "event=\"yes\"" : "" %>   
        <%if(widget.map.get(constants.ON_BEGIN_EDITING) != null && widget.map.get(constants.ON_BEGIN_EDITING) != LuaNil.nil){ %> onfocus="<%=widget.map.get(constants.ON_BEGIN_EDITING)%>(event || window.event, this, 'bjs')" <%}%>
        <%if(widget.map.get(constants.ON_END_EDITING) != null && widget.map.get(constants.ON_END_EDITING) != LuaNil.nil){ %> onblur="<%=widget.map.get(constants.ON_END_EDITING)%>(event || window.event, this, 'bjs')" <%}%>
        <%if(widget.map.get(constants.ON_TEXT_CHANGE_JS) != null && widget.map.get(constants.ON_TEXT_CHANGE_JS) != LuaNil.nil){ %> onkeyup="<%=widget.map.get(constants.ON_TEXT_CHANGE_JS)%>(event || window.event, this, 'bjs')" <%}%>
        <%if(bjsEnableSize.equals("true")){%>
            size ="<%=JSWAPUtil.getIntValue(widget.getTable("bjssize"+imageCat))%>"
        <%}%>
         <%
          if(maxLength > 0)
          {
          %>  
            maxLength = <%=maxLength %>
         <%        
          }
          %>
        <% if(widget.map.get(constants.PLACE_HOLDER) != null) {%>
            placeholder="<%=widget.map.get(constants.PLACE_HOLDER)%>"
        <%} %>
        autocomplete = "off"
         <%=widget.map.get(WEBConstants.ENABLED) %> 
/>
<% } else { %>
<input  <%if(!(widget.map.get(KonyServerWidget.TEXT) instanceof LuaNil)){%>
             value = "<%=(widget.map.get(KonyServerWidget.TEXT) instanceof String) ? WAPUtilities.escapeHtml((String)widget.map.get(KonyServerWidget.TEXT)) : widget.map.get(KonyServerWidget.TEXT)%>"
        <%} else {%>
            value ="" <%}%>  konywidgettype="Ktextfield"
        style=" <%=JSWAPUtil.getWidgetStyleInfoForIE(widget, true)%>   width: <%=compWidth%>
        <%if("N".equals(mode) && maxLength > 0){%> -wap-input-format:'<%=maxLength%>n';<%} else if("N".equals(mode)){%> -wap-input-format: '*n' <%}%> "
        <%if(widget.map.get(KonyServerWidget.SKIN)!= null){%> class="<%=widget.map.get(KonyServerWidget.SKIN)%>" <%}%>
        name="<%=name%>" id="<%=name%>" type="<%=mode%>"
        <%="yes".equals(event) ? "event=\"yes\"" : "" %>
        <%if(widget.map.get(constants.ON_BEGIN_EDITING) != null && widget.map.get(constants.ON_BEGIN_EDITING) != LuaNil.nil){ %> onfocus="<%=widget.map.get(constants.ON_BEGIN_EDITING)%>(event || window.event, this, 'bjs')" <%}%>
        <%if(widget.map.get(constants.ON_END_EDITING) != null && widget.map.get(constants.ON_END_EDITING) != LuaNil.nil){ %> onblur="<%=widget.map.get(constants.ON_END_EDITING)%>(event || window.event, this, 'bjs')" <%}%>
        <%if(widget.map.get(constants.ON_TEXT_CHANGE_JS) != null && widget.map.get(constants.ON_TEXT_CHANGE_JS) != LuaNil.nil){ %> onkeyup="<%=widget.map.get(constants.ON_TEXT_CHANGE_JS)%>(event || window.event, this, 'bjs')" <%}%>
         <%
          if(maxLength > 0)
          {
          %>  
            maxLength = <%=maxLength %>
         <%        
          }
          %>
        <% if(widget.map.get(constants.PLACE_HOLDER) != null) {%>
            placeholder="<%=widget.map.get(constants.PLACE_HOLDER)%>"
        <%} %>
        autocomplete = "off"
         <%=widget.map.get(WEBConstants.ENABLED) %> 
/>
<%} %>
