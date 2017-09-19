package test.java.orderexecution.tests;

import java.lang.reflect.Method;
import java.util.ArrayList;






import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;
//import org.json.JSONArray;
//import org.json.JSONObject;

import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import test.common.AppElement;
import test.common.SgConfiguration;
import test.dataconnector.sapconnector.JSONServer;
import test.dataconnector.sapconnector.SAPDataConnector;
import test.java.orderexecution.OrderExecutionBaseTest;
import test.java.orderexecution.OrderExecutionWidgetId;
import test.java.orderexecution.forms.FormFSLogInKA;
import test.java.orderexecution.forms.FormLogInKA;
import test.java.orderexecution.forms.FormOrderListKA;
import test.java.orderexecution.forms.FormTenantKA;

public class TestMyOrdersListData  extends OrderExecutionBaseTest{
	
	FormOrderListKA frmOrderListKA;	
	@BeforeMethod
	public void setupBeforeTest(Object[] inputParamsOfTestMethod,Method method) throws Exception {
		AppElement el=null;
		
		try {
			 el = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
		} catch (Exception e) {
			if (el == null){
				if(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmFSLoginKA_btnManualSetupKA"),10)){
					FormFSLogInKA frmFSLoginKA = new FormFSLogInKA(); 
					FormTenantKA frmTenantKA = frmFSLoginKA.doManualSetup();	
					FormLogInKA frmLoginKA = frmTenantKA.connectToTenant(sgconfig.getKeyValue("AppKey"), sgconfig.getKeyValue("AppSecret"), sgconfig.getKeyValue("AppConfigServiceURL"), sgconfig.getKeyValue("SyncAppVersion"));
//					frmLoginKA =  new FormLogInKA();//							
					FormOrderListKA frmOrderListKA = frmLoginKA.doLogin(sgconfig.getKeyValue("username"), sgconfig.getKeyValue("password"),true);
					AppElement lblexpect=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
					Assert.assertEquals(lblexpect.getText(),"My Orders");					
				}
				System.out.println("TestMyOrdersForm.setupBeforeTest(): Not on the OrderList Form");
			}
			else
				System.out.println("TestMyOrdersForm.setupBeforeTest(): Something went worng form");
			relaunchApp();
			doLogin();				
		}
	}  
		
	
	
	@Test
	public void TestWOCount() throws Exception {
		System.out.println("Entered to TestWOCount");
		SAPDataConnector sapDataConn=new SAPDataConnector();
		sapDataConn.Entity="EAM_WO_DIST";
		JSONServer jsonserver = new JSONServer();
		SgConfiguration sgconfig = SgConfiguration.getInstance();
		System.out.println("Entered to TestDataCustomer");
		sapDataConn.getSessionKey(sgconfig.getKeyValue("username"),sgconfig.getKeyValue("password"), sgconfig.getKeyValue("SKYInstanceURL"));
		JSONObject oerecords3 = sapDataConn.getDataJson(null,"EAM_DOB_WORK_ORDER");
	    System.out.println("records "+oerecords3.toString());  
	    jsonserver.writeJSONFile(oerecords3.getJSONObject("entry").getJSONArray(sapDataConn.Entity),"orderexecution.json");
	    String customerQuery="orderexecution?BASIC_START_DAT=20170317";
	    JSONObject customerresult = jsonserver.queryJSON(customerQuery);
	    System.out.println("result form server.........." + customerresult + " " + customerresult.length());
	    			 
	    	 

		
		ArrayList<String> backendArr=new ArrayList<String>();
		   JSONArray arr=new JSONArray();
		   arr=customerresult.getJSONArray("records");
		   System.out.println(arr.length());
		   for(int i=0;i<arr.length();i++)
		   {
			String value=arr.getJSONObject(i).getString("INTERNAL_NUMBER");
			System.out.println(i+") the value...... "+value);
			backendArr.add(value);
		   }
		   System.out.println("The Size of the arraylist........."+backendArr.size());
		System.out.println("*********"+customerresult.toString());
		
		ArrayList<String> appArr =new ArrayList<String>();
		for(int i=0;i<backendArr.size();i++)
		{
			
				AppElement.scrollUntilVisible(backendArr.get(i));
			     appArr.add(backendArr.get(i));
			  
		}
			
			
		}
		
	}
	
	

