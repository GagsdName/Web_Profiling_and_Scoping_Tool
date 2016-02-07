package com.cigital.wpst.rest.ws;

import java.lang.reflect.Type;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cigital.wpst.bean.WpstResponseBean;
import com.cigital.wpst.service.intf.WebProfilingServiceIntf;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

@Controller
@RequestMapping("/profiling_service")
public class WpstWebServiceController {

	@Value("${port_list}")
	String portsUnderTest;

	@Autowired
	private WebProfilingServiceIntf webProfilingService;

	Gson gson = new Gson();
	Type portDataType = new TypeToken<List<Integer>>(){}.getType();

	@GET
	@RequestMapping("/get_available_ports")
	@Produces(MediaType.APPLICATION_JSON)
	public @ResponseBody WpstResponseBean getOpenPorts(@RequestParam String host) {

		List<Integer> portList = gson.fromJson(portsUnderTest, portDataType);

		WpstResponseBean responseBean = new WpstResponseBean();

		responseBean.setOpenPorts(webProfilingService.availablePorts(host, portList));
		return responseBean;

	}
}
