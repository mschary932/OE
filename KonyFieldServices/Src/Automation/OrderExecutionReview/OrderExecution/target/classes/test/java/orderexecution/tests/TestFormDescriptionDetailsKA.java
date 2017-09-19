package test.java.orderexecution.tests;

import java.lang.reflect.Method;




import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import org.testng.asserts.SoftAssert;

import test.common.AppBaseTest;
import test.common.AppElement;
import test.java.orderexecution.OrderExecutionBaseTest;
import test.java.orderexecution.OrderExecutionWidgetId;
import test.java.orderexecution.OrderState;
import test.java.orderexecution.forms.FormDescriptionDetailsKA;
import test.java.orderexecution.forms.FormFSLogInKA;
import test.java.orderexecution.forms.FormLogInKA;
import test.java.orderexecution.forms.FormOrderExecution;
import test.java.orderexecution.forms.FormOrderListKA;
import test.java.orderexecution.forms.FormTaskDetailsKA;
import test.java.orderexecution.forms.FormTaskExecutionKA;
import test.java.orderexecution.forms.FormTenantKA;

public class TestFormDescriptionDetailsKA extends OrderExecutionBaseTest{
	
	
   FormOrderExecution frmOrderExecution;
	@BeforeMethod(alwaysRun=true)
	public void setupBeforeTest(Object[] inputParamsOfTestMethod,Method method) throws Exception {
		AppElement ele = null;
		try {
			 ele = new AppElement(OrderExecutionWidgetId.getWidgetId("frmDescriptionDetailsKA_Head"));
		} catch(Exception e){
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
		  FormOrderExecution orderExecutionForm= new FormOrderExecution(); 
		  orderExecutionForm.navigateOnlyToTaskExecution();	
		  FormTaskExecutionKA taskExecutionForm=new FormTaskExecutionKA();
		  taskExecutionForm.clickDetails();
		  FormTaskDetailsKA taskDetailsForm =new FormTaskDetailsKA();
		  taskDetailsForm.clickInstruction();
			 }
		}	 
}
	
	@Test
	public void test_description_back() throws Exception{
		  SoftAssert sa = new SoftAssert();
		  FormDescriptionDetailsKA descriptionDetailsForm = new FormDescriptionDetailsKA();
		  descriptionDetailsForm.clickBack();
		  AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTaskDetailsKA_lblTaskDetailsKA"));
		  FormTaskDetailsKA taskDetailsForm=new FormTaskDetailsKA();
		  AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskDetailsKA_lblTaskDetailsKA"));
		  sa.assertEquals(lblValue.getText(),"Task Details");
		  taskDetailsForm.clickInstruction();
	}
	
	@AfterClass(alwaysRun=true)
	public  void setupAfterClass() throws Exception{
		SoftAssert sa = new SoftAssert();
		try{
		  FormDescriptionDetailsKA descriptionDetailsForm = new FormDescriptionDetailsKA();
		  descriptionDetailsForm.clickBack();
		  FormTaskDetailsKA taskDetailsForm=new FormTaskDetailsKA();
		  taskDetailsForm.clickBack();	
		  FormTaskExecutionKA taskExecutionForm=new FormTaskExecutionKA();
		  taskExecutionForm.clickBack();
		  AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		  FormOrderExecution frmOrderExecution=new FormOrderExecution();
		  frmOrderExecution.clicknavigatebackOrderLists();
		  AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
		  sa.assertEquals(lblValue1.getText(),"My Orders");
	      sa.assertAll();	
		}catch(Exception e){
			relaunchApp();
			if(doLogin()){
				System.out.println("Login is successful***");
			}			
		}
	}
	
}
