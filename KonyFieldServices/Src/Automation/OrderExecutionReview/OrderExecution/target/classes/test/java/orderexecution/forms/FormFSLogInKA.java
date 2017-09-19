package test.java.orderexecution.forms;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;


public class FormFSLogInKA {
	 
	 AppElement btnManualSetup;
	 
	 public FormFSLogInKA() throws Exception{
		btnManualSetup = new AppElement(OrderExecutionWidgetId.getWidgetId("frmFSLoginKA_btnManualSetupKA"));	
	 }
	 
	 public FormTenantKA doManualSetup() throws Exception{		
//       btnManualSetup.click();
//		 return new FormTenantKA();
//		 AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmFSLogInKA_btnManualSetupKA"));
		 btnManualSetup.click();
		 AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTenantKA_btnConnectKA"));
		 return new FormTenantKA();
	 }
}
