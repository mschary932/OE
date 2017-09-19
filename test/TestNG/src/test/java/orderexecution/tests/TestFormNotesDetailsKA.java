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
import test.java.orderexecution.forms.FormCreateNotesKA;
import test.java.orderexecution.forms.FormFSLogInKA;
import test.java.orderexecution.forms.FormLogInKA;
import test.java.orderexecution.forms.FormNotesDetailsKA;
import test.java.orderexecution.forms.FormNotesListKA;
import test.java.orderexecution.forms.FormOrderExecution;
import test.java.orderexecution.forms.FormOrderListKA;
import test.java.orderexecution.forms.FormTenantKA;

public class TestFormNotesDetailsKA extends OrderExecutionBaseTest{
	
	
	@BeforeMethod(alwaysRun=true)
	public void setupBeforeTest(Object[] inputParamsOfTestMethod,Method method) throws Exception {
		SoftAssert sa = new SoftAssert();
		AppElement ele = null;
		try {
			 ele = new AppElement(OrderExecutionWidgetId.getWidgetId("frmNotesListKA_lblNotesHeaderKA"));
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
				FormOrderExecution frmOrderExecution = new FormOrderExecution();
				FormNotesListKA notesListForm =  frmOrderExecution.navigateToOrderNotes();
				FormCreateNotesKA createNotesForm = notesListForm.navigateToCreateNotes();
				Thread.sleep(5000);
				AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmNotesListKA_lblNotesHeaderKA"));
				sa.assertEquals(lblValue.getText(),"New Note");
				sa.assertAll();
				createNotesForm.type();				
				Thread.sleep(2000);
				try {
					createNotesForm.done();				
				}catch(Exception ex){
					System.out.println("*****Done is not clicked*****");
				}
				sa.assertAll();
			}
		}
	}
	
	@Test
	public void test_notes_details() throws Exception{
		SoftAssert sa = new SoftAssert();
		FormNotesListKA notesListForm = new FormNotesListKA();
		notesListForm.navigateToNotesDetails();
		FormNotesDetailsKA notesDetailsForm =new FormNotesDetailsKA();
		AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("tmpNotesListKA_lblNotesDescKA"));
		sa.assertEquals(lblValue.getText(),"New Note Title");
	    notesDetailsForm.back();
	    AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmNotesListKA_lblNotesHeaderKA"));
		sa.assertEquals(lblValue1.getText(),"Order Notes");
		sa.assertAll();
	}
	
 @AfterClass(alwaysRun=true)
 public void setUpAfterClass() throws Exception{
	 SoftAssert sa = new SoftAssert();
	 try{
	    FormNotesListKA notesListForm =new FormNotesListKA();
		notesListForm.back();
		AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		sa.assertEquals(lblValue.getText(),"Order Execution");
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
