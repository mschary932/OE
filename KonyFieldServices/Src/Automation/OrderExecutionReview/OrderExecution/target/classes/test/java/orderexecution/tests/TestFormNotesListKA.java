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
import test.java.orderexecution.forms.FormFSLogInKA;
import test.java.orderexecution.forms.FormLogInKA;
import test.java.orderexecution.forms.FormNotesListKA;
import test.java.orderexecution.forms.FormOrderExecution;
import test.java.orderexecution.forms.FormOrderListKA;
import test.java.orderexecution.forms.FormTenantKA;

public class TestFormNotesListKA extends OrderExecutionBaseTest{
	
	@BeforeMethod(alwaysRun=true)
	public void setupBeforeTest(Object[] inputParamsOfTestMethod,Method method) throws Exception {
		AppElement ele = null;
		try {
			 ele = new AppElement(OrderExecutionWidgetId.getWidgetId("frmNotesListKA_lblNotesHeaderKA"));
		}  catch(Exception e){
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
			   formOrderListKA.clickWorkorder(OrderState.stateAsStarted);
			 }
			}catch(Exception ex){
				System.out.println("*****Its not relaunch*****");
			}
				FormOrderExecution frmOrderExecution = new FormOrderExecution();
				frmOrderExecution.navigateToOrderNotes();
			}
		}
	}
	
	@Test
	public void testBack() throws Exception{
		SoftAssert sa = new SoftAssert();
		FormNotesListKA notesListForm =new FormNotesListKA();	
	    notesListForm.back();
	    AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		sa.assertEquals(lblValue.getText(),"Order Execution");
		sa.assertAll();
	}

	@AfterClass(alwaysRun=true)
	public void setUpAfterClass() throws Exception{
		SoftAssert sa = new SoftAssert();
		try{
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
