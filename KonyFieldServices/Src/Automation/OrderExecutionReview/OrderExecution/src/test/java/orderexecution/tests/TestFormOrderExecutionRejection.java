package test.java.orderexecution.tests;

import java.lang.reflect.Method;




import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionBaseTest;
import test.java.orderexecution.OrderExecutionWidgetId;
import test.java.orderexecution.OrderState;
import test.java.orderexecution.forms.FormFSLogInKA;
import test.java.orderexecution.forms.FormLogInKA;
import test.java.orderexecution.forms.FormOrderExecution;
import test.java.orderexecution.forms.FormOrderListKA;
import test.java.orderexecution.forms.FormTenantKA;


public class TestFormOrderExecutionRejection extends OrderExecutionBaseTest{
	@BeforeMethod(alwaysRun=true)
	public void setupBeforeTest(Object[] inputParamsOfTestMethod,Method method) throws Exception {
		AppElement ele = null;
		try {
			 ele = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		} catch (Exception e) {
			if (ele == null){
				if(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmFSLoginKA_btnManualSetupKA"),10)){
					FormFSLogInKA frmFSLoginKA = new FormFSLogInKA(); 
					FormTenantKA frmTenantKA = frmFSLoginKA.doManualSetup();	
					FormLogInKA frmLoginKA = frmTenantKA.connectToTenant(sgconfig.getKeyValue("AppKey"), sgconfig.getKeyValue("AppSecret"), sgconfig.getKeyValue("AppConfigServiceURL"), sgconfig.getKeyValue("SyncAppVersion"));
//					frmLoginKA =  new FormLogInKA();//							
					FormOrderListKA frmOrderListKA = frmLoginKA.doLogin(sgconfig.getKeyValue("username"), sgconfig.getKeyValue("password"),true);
					AppElement lblexpect=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
					Assert.assertEquals(lblexpect.getText(),"My Orders");					
				}
				System.out.println("TestMyOrdersList.setupBeforeTest(): Not on the Order Execution Form");
				FormOrderListKA orderListForm = new FormOrderListKA();		
				orderListForm.clickWorkorder(OrderState.state);				
			}
				else
				System.out.println("TestMyOrdersList.setupBeforeTest(): Something went worng form");
			}

	}
	
	//To Reject a Work Order
	@Test
	public void RejectWorkOrder() throws Exception{
		FormOrderExecution frmorderExecutionForm = new FormOrderExecution();	
		frmorderExecutionForm.verifystatusScheduled();
		frmorderExecutionForm.clickReject();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
	    AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
		if(frmorderExecutionForm instanceof FormOrderExecution)Assert.assertEquals(lblValue1.getText(),"My Orders");
		
		}
}
