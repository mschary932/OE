package test.java.orderexecution.tests;

import java.lang.reflect.Method;






import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import org.testng.asserts.SoftAssert;

import test.common.Alerts;
import test.common.AppElement;
import test.java.orderexecution.OrderExecutionBaseTest;
import test.java.orderexecution.OrderExecutionWidgetId;
import test.java.orderexecution.OrderState;
import test.java.orderexecution.forms.FormCreateNotesKA;
import test.java.orderexecution.forms.FormFSLogInKA;
import test.java.orderexecution.forms.FormLogInKA;
import test.java.orderexecution.forms.FormNotesListKA;
import test.java.orderexecution.forms.FormOrderExecution;
import test.java.orderexecution.forms.FormOrderListKA;
import test.java.orderexecution.forms.FormTenantKA;

public class TestFormCreateNotesKA extends OrderExecutionBaseTest{

	
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
				 if(!frmOrderExecution.getStatus().equalsIgnoreCase("STARTED")){
				    frmOrderExecution.clickOnRoute();
					frmOrderExecution.clickStart();
				 }
		    frmOrderExecution.navigateToOrderNotes();
		    FormNotesListKA notesListForm=new FormNotesListKA();
		    notesListForm.navigateToCreateNotes();
			 }
		}
	}
	
	@Test
	public void test_check_notes_alert() throws Exception{
		SoftAssert sa = new SoftAssert();
		AppElement tbxTitleValueKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCreateNotesKA_tbxTitleValueKA"));
		tbxTitleValueKA.type("New Notes");
		AppElement btnDoneKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCreateNotesKA_btnDoneKA"));
		btnDoneKA.click();
		sa.assertTrue(Alerts.validateAlertMsg("Enter Notes Description"));
		Alerts.btnClickLable("OK");
		sa.assertAll();
	}
	
	@Test
	public void test_create_notes() throws Exception{
		SoftAssert sa = new SoftAssert();
		FormCreateNotesKA createNotesForm =new FormCreateNotesKA();
		createNotesForm.type();
		Thread.sleep(2000);
		try {
			createNotesForm.done();
		}catch(Exception ex){
			System.out.println("*****Done is not clicked*****");
		}
		AppElement Label1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmNotesListKA_lblNotesHeaderKA"));
		sa.assertEquals(Label1.getText(),"Order Notes");
	    sa.assertAll();	
	}
	
  @AfterClass(alwaysRun=true)
  public void setupAfterClass() throws Exception{
	  SoftAssert sa = new SoftAssert();
	  try{
	    FormNotesListKA notesListForm=new FormNotesListKA();
	    notesListForm.back();
		FormOrderExecution  frmOrderExecution=new FormOrderExecution();
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
