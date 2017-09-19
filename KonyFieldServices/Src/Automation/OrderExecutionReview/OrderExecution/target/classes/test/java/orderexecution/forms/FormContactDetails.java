package test.java.orderexecution.forms;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormContactDetails {

	AppElement btnBackKA;
	public FormContactDetails() throws Exception {
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmContactDetailsKA_lblHeaderKA"));
	}
	 public FormOrderExecution clicknevigatebackOrderDetailsfromContact() throws Exception{
		 btnBackKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmContactDetailsKA_btnBackKA"));
		 btnBackKA.click();
		 AppElement isVisible=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderDetailsKA_lblHeaderKA"));
		 if(isVisible.isElementVisible()){return new FormOrderExecution();}
			return null;
		 }
		 }
	
	

