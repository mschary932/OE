package test.java.orderexecution.tests;

import java.lang.reflect.Method;




import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import org.testng.asserts.SoftAssert;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;
import test.java.orderexecution.OrderState;
import test.java.orderexecution.forms.FormFSLogInKA;
import test.java.orderexecution.forms.FormHistory;
import test.java.orderexecution.forms.FormLogInKA;
import test.java.orderexecution.forms.FormMeasurementExecutionKA;
import test.java.orderexecution.forms.FormMeasurementReadings;
import test.java.orderexecution.forms.FormMeasurementsKA;
import test.java.orderexecution.forms.FormOrderExecution;
import test.java.orderexecution.forms.FormOrderListKA;
import test.java.orderexecution.forms.FormReadingExecution;
import test.java.orderexecution.forms.FormTenantKA;
import test.java.orderexecution.OrderExecutionBaseTest;

public class TestFormMeasurementReadings extends OrderExecutionBaseTest{
	
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
				FormOrderListKA orderListForm = new FormOrderListKA();		
				orderListForm.clickWorkorder(OrderState.state);
			}
			FormOrderExecution frmOrderExecution = new FormOrderExecution();
			 if(!frmOrderExecution.getStatus().equalsIgnoreCase("STARTED")){
			    frmOrderExecution.clickOnRoute();
				frmOrderExecution.clickStart();
			 }
		}
	}
	
	@Test
	public void test_navigate_to_measurementReading_from_Measurements() throws Exception{
		SoftAssert sa = new SoftAssert();
		FormOrderExecution frmOrderExecution = new FormOrderExecution();
		FormMeasurementExecutionKA frmMeasurementExecutionKA = frmOrderExecution.navigateToMeasurementExecution();
//		frmMeasurementExecutionKA.clickStart();
		FormMeasurementsKA frmMeasurementsKA = frmMeasurementExecutionKA.navigateToMeasurements();
		AppElement lblvalue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_lblTitleKA"));
	    sa.assertEquals(lblvalue.getText(),"Measurements");		
		FormMeasurementReadings frmMeasurementReadings = frmMeasurementsKA.navigateToMeasurementReading();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmMeasurementReadings_lblTitleKA"));
	    AppElement lblvalue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementReadings_lblTitleKA"));
	    sa.assertEquals(lblvalue1.getText(),"Measurement Reading");
	    frmMeasurementReadings.navigateBackToMeasurements();
	    frmMeasurementsKA.navigateBackToMeasurementExecution();
	    frmMeasurementExecutionKA.navigateBackToOrderExecution();
	    AppElement label = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));		
		sa.assertEquals(label.getText(), "Order Execution");
		sa.assertAll();
	}
	
	@Test
	public void test_navigate_to_measurementReading_from_measurementExecution() throws Exception{
		SoftAssert sa = new SoftAssert();
		FormOrderExecution frmOrderExecution = new FormOrderExecution();
		FormMeasurementExecutionKA frmMeasurementExecutionKA = frmOrderExecution.navigateToMeasurementExecution();
//		frmMeasurementExecutionKA.clickStart();
		FormMeasurementReadings frmMeasurementReadings = frmMeasurementExecutionKA.navigateToMeasurementReadings();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmMeasurementReadings_lblTitleKA"));
	    AppElement lblvalue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementReadings_lblTitleKA"));
	    sa.assertEquals(lblvalue1.getText(),"Measurement Reading");
	    frmMeasurementReadings.navigateBackToMeasurementExecution();
	    frmMeasurementExecutionKA.navigateBackToOrderExecution();
	    AppElement label = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));		
		sa.assertEquals(label.getText(), "Order Execution");
		sa.assertAll();
	}
	
	@Test
	public void test_navigate_to_measurementReading_history() throws Exception{
		SoftAssert sa = new SoftAssert();
		FormOrderExecution frmOrderExecution = new FormOrderExecution();		
		FormMeasurementExecutionKA frmMeasurementExecutionKA = frmOrderExecution.navigateToMeasurementExecution();
//		frmMeasurementExecutionKA.clickStart();
		FormMeasurementsKA frmMeasurementsKA = frmMeasurementExecutionKA.navigateToMeasurements();
		FormMeasurementReadings frmMeasurementReadings = frmMeasurementsKA.navigateToMeasurementReading();
		FormHistory frmHistory = frmMeasurementReadings.navigateToHistory();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmHistory_lblTitleKA"));
	    AppElement lblvalue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmHistory_lblTitleKA"));
	    sa.assertEquals(lblvalue1.getText(),"History");
	    frmHistory.navigateBackToMeasurementReadings();
	    frmMeasurementReadings.navigateBackToMeasurements();
	    frmMeasurementsKA.navigateBackToMeasurementExecution();
	    frmMeasurementExecutionKA.navigateBackToOrderExecution();
	    AppElement label = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));		
		sa.assertEquals(label.getText(), "Order Execution");
		sa.assertAll();
	}
	
	@Test
	public void test_create_reading() throws Exception{
		SoftAssert sa = new SoftAssert();
		FormOrderExecution frmOrderExecution = new FormOrderExecution();
		FormMeasurementExecutionKA frmMeasurementExecutionKA = frmOrderExecution.navigateToMeasurementExecution();
		try{
			   if((AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_btnHoldKA")))){
				   frmMeasurementExecutionKA.clickStart();  
			   } 
		   }catch(Exception e){
				   System.out.println("****Measurement is Already Started****");
		}		
		Thread.sleep(10000);
		AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_btnHoldKA"));   
		sa.assertEquals(lblValue.getText(), "Complete");
		FormMeasurementsKA frmMeasurementsKA = frmMeasurementExecutionKA.navigateToMeasurements();
		FormMeasurementReadings frmMeasurementReadings = frmMeasurementsKA.navigateToMeasurementReading();
		FormReadingExecution frmReadingExecution = frmMeasurementReadings.addNewReading();
		AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmReadingExecution_lbHeaderKA"));   
		sa.assertEquals(lblValue1.getText(), "Reading Execution");		
		frmReadingExecution.typeValue();
		frmReadingExecution.typeNotes();
		frmMeasurementReadings = frmReadingExecution.clickDone();
		AppElement lblvalue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementReadings_lblTitleKA"));
	    sa.assertEquals(lblvalue1.getText(),"Measurement Reading");
		frmMeasurementReadings.navigateBackToMeasurements();
		AppElement lblvalue2=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementsKA_lblTitleKA"));
	    sa.assertEquals(lblvalue2.getText(),"Measurements");
		frmMeasurementsKA.navigateBackToMeasurementExecution();
		AppElement lblvalue3=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_lblTitleKA"));
	    sa.assertEquals(lblvalue3.getText(),"Measurement Execution");
		frmMeasurementExecutionKA.navigateBackToOrderExecution();	
		AppElement lblvalue4=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
	    sa.assertEquals(lblvalue4.getText(),"Order Execution");
		}
	@AfterClass(alwaysRun=true)
	public void setupAfterClass() throws Exception{
		SoftAssert sa = new SoftAssert();
		try{
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
