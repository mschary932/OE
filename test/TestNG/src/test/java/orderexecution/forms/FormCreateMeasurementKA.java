package test.java.orderexecution.forms;

import test.common.AppElement;
import test.common.Segment;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormCreateMeasurementKA {

	public FormCreateMeasurementKA() throws Exception {
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCreateMeasurementKA_lblCreateMeasurementKA"));
	}

	public void clickAsset() throws Exception
	{
		Segment segOptionKA = new Segment(OrderExecutionWidgetId.getWidgetId("frmCreateMeasurementKA_segOptionKA"),OrderExecutionWidgetId.getWidgetId("tmpCreateMeasurementListKA_lblTaskNameKA"));
		segOptionKA.getElementWithIndex(0).click();
	}

}
