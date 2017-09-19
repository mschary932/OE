package test.java.orderexecution.tests;

import java.lang.reflect.Method;




import org.testng.Assert;
import org.testng.annotations.BeforeMethod;





import test.common.AppElement;
import test.java.orderexecution.OrderExecutionBaseTest;
import test.java.orderexecution.OrderExecutionWidgetId;
import test.java.orderexecution.OrderState;
import test.java.orderexecution.forms.FormAddTimeAndExpenses;
import test.java.orderexecution.forms.FormFSLogInKA;
import test.java.orderexecution.forms.FormLogInKA;
import test.java.orderexecution.forms.FormOrderExecution;
import test.java.orderexecution.forms.FormOrderListKA;
import test.java.orderexecution.forms.FormTaskExecutionKA;
import test.java.orderexecution.forms.FormTenantKA;
import test.java.orderexecution.forms.FormTimeAndExpenses;

public class TestFormAddTimeItem extends OrderExecutionBaseTest {

	
	 @BeforeMethod
	 public void setupBeforeTest(Object[] inputParamsOfTestMethod,Method method) throws Exception {
		 AppElement ele=null;
		 try{
			 ele=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_Head"));
		 }
		 catch(Exception e){
			 if(ele==null){
				 if(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmFSLoginKA_btnManualSetupKA"),10)){
						FormFSLogInKA frmFSLoginKA = new FormFSLogInKA(); 
						FormTenantKA frmTenantKA = frmFSLoginKA.doManualSetup();	
						FormLogInKA frmLoginKA = frmTenantKA.connectToTenant(sgconfig.getKeyValue("AppKey"), sgconfig.getKeyValue("AppSecret"), sgconfig.getKeyValue("AppConfigServiceURL"), sgconfig.getKeyValue("SyncAppVersion"));						
						FormOrderListKA frmOrderListKA = frmLoginKA.doLogin(sgconfig.getKeyValue("username"), sgconfig.getKeyValue("password"),true);
						AppElement lblexpect=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
						Assert.assertEquals(lblexpect.getText(),"My Orders");					
					}
			try{
			   if((new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"))).getText().equalsIgnoreCase("My Orders")){
			   FormOrderListKA formOrderListKA=new FormOrderListKA();
			   formOrderListKA.clickWorkorder(OrderState.state);
			 }
			}catch(Exception ex){
				System.out.println("*****Its not relaunch*****");
			}
				FormOrderExecution frmOrderExecution = new FormOrderExecution();
                frmOrderExecution.navigateToTaskExecution();
                FormTaskExecutionKA frmTaskExecutionKA=new FormTaskExecutionKA();
                frmTaskExecutionKA.navigateToTimeExpenses();
                FormTimeAndExpenses formTimeAndExpenses=new FormTimeAndExpenses();
                formTimeAndExpenses.navigatetoAddTimeAndExpense();  
                FormAddTimeAndExpenses formAddTimeAndExpenses=new FormAddTimeAndExpenses();
                formAddTimeAndExpenses.navigateToAddTime();
		 }
	 }
	 }

	
	//@AfterClass
	public void setupAfterClass() throws Exception{
		 try{	 
		 FormTimeAndExpenses  formTimeAndExpenses=new FormTimeAndExpenses();
		 formTimeAndExpenses.back();
		 FormTaskExecutionKA formTaskExecutionKA=new FormTaskExecutionKA();
		 formTaskExecutionKA.clickBack();
		 AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
	     }
		 catch(Exception e){
				relaunchApp();
				if(doLogin()){
					System.out.println("Login is successful***");
				}
	   }
	 }
}
