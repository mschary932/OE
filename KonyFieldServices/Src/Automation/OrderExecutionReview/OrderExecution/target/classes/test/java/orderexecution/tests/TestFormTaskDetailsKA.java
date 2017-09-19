package test.java.orderexecution.tests;

import java.lang.reflect.Method;

import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import org.testng.asserts.SoftAssert;

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


public class TestFormTaskDetailsKA extends OrderExecutionBaseTest{
	FormOrderListKA frmOrderListKA; 	
	@BeforeMethod(alwaysRun=true)
	public void setupBeforeTest(Object[] inputParamsOfTestMethod,Method method) throws Exception {
		AppElement ele = null;
		try {
			 ele = new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskDetailsKA_lblTaskDetailsKA"));
		} catch(Exception e){
			 if(ele==null){
				 if(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmFSLoginKA_btnManualSetupKA"),10)){
						FormFSLogInKA frmFSLoginKA = new FormFSLogInKA(); 
						FormTenantKA frmTenantKA = frmFSLoginKA.doManualSetup();	
						FormLogInKA frmLoginKA = frmTenantKA.connectToTenant(sgconfig.getKeyValue("AppKey"), sgconfig.getKeyValue("AppSecret"), sgconfig.getKeyValue("AppConfigServiceURL"), sgconfig.getKeyValue("SyncAppVersion"));
//						frmLoginKA =  new FormLogInKA();//							
						FormOrderListKA frmOrderListKA = frmLoginKA.doLogin(sgconfig.getKeyValue("username"), sgconfig.getKeyValue("password"),true);
						AppElement lblexpect=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
						Assert.assertEquals(lblexpect.getText(),"My Orders");					
				}
			try{
			   if((new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"))).getText().equalsIgnoreCase("My Orders")){
			   FormOrderListKA formOrderListKA=new FormOrderListKA();
			   formOrderListKA.clickWorkorder(OrderState.state);
			   FormOrderExecution frmOrderExecution = new FormOrderExecution();
				 if(!frmOrderExecution.getStatus().equalsIgnoreCase("STARTED")){
				    frmOrderExecution.clickOnRoute();
					frmOrderExecution.clickStart();
				 }
			 }
			}catch(Exception ex){
				System.out.println("*****Its not relaunch*****");
			}
		    FormOrderExecution orderExecutionForm= new FormOrderExecution(); 
		    Thread.sleep(3000);
			orderExecutionForm.navigateToTaskExecution();	
			FormTaskExecutionKA taskExecutionForm =new FormTaskExecutionKA();  
		    taskExecutionForm.clickDetails();
			 }
		}
}
	

	@Test
	public void test_information_visible_task_details() throws Exception{		
		SoftAssert sa = new SoftAssert();
//		FormTaskDetailsKA taskDetailsForm = new FormTaskDetailsKA();
		sa.assertTrue(new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskDetailsKA_lblSceduledTimeKA")).isElementVisible());
		sa.assertTrue(new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskDetailsKA_lblTimeStartedKA")).isElementVisible());
		sa.assertTrue(new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskDetailsKA_lblTimeStartedKA")).isElementVisible());
		sa.assertTrue(new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskDetailsKA_lblResourcesKA")).isElementVisible());
		sa.assertTrue(new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskDetailsKA_lblInstructionKA")).isElementVisible());
		sa.assertTrue(new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskDetailsKA_lblMaterialsKA")).isElementVisible());
    	sa.assertAll();  
	}
	
	@Test
	public void test_back_task_details() throws Exception{	
		SoftAssert sa = new SoftAssert();
        FormTaskDetailsKA taskDetailsForm = new FormTaskDetailsKA();  
	    taskDetailsForm.clickBack();
	    AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblTitleKA"));
		sa.assertEquals(lbl.getText(),"Task Execution");
	    FormTaskExecutionKA taskExecutionForm =new FormTaskExecutionKA();  
	    taskExecutionForm.clickDetails();
	    AppElement lbl1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskDetailsKA_lblTaskDetailsKA"));
		sa.assertEquals(lbl1.getText(),"Task Details");
		sa.assertAll();
	}
	
	@Test
	public void test_description_exceeds() throws Exception{		
		SoftAssert sa = new SoftAssert();
		FormTaskDetailsKA taskDetailsForm=new FormTaskDetailsKA();
		taskDetailsForm.clickInstruction();
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmDescriptionDetailsKA_lblHeaderKA"));
		sa.assertEquals(lbl.getText(),"Instructions Description");
		FormDescriptionDetailsKA descriptionDetailsForm = new FormDescriptionDetailsKA();
		taskDetailsForm = descriptionDetailsForm.clickBack();
		AppElement lbl1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskDetailsKA_lblTaskDetailsKA"));
		sa.assertEquals(lbl1.getText(),"Task Details");
		sa.assertAll();
	}
	
	@AfterClass(alwaysRun=true)
	public void setupAfterClass() throws Exception{
		SoftAssert sa = new SoftAssert();
		try{
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
