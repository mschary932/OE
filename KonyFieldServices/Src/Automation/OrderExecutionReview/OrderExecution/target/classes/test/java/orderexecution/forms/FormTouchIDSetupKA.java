package test.java.orderexecution.forms;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormTouchIDSetupKA {
	
	public FormTouchIDSetupKA(){
		
	}

	public void clickAccept() throws Exception {
		AppElement btnAcceptKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmTouchIDSetupKA_btnAcceptKA"));
		btnAcceptKA.click();
	}
	
	public void clickReject() throws Exception {
		AppElement btnRejectKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmTouchIDSetupKA_btnRejectKA"));
		btnRejectKA.click();
	}

}
