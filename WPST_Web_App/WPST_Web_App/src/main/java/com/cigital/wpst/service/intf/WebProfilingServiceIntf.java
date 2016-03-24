package com.cigital.wpst.service.intf;

import java.net.MalformedURLException;
import java.net.UnknownHostException;
import java.util.List;

import com.cigital.wpst.bean.WpstResponseBean;

public interface WebProfilingServiceIntf {

	boolean isPortAvailable(String host, int port);
	List<Integer> availablePorts(String host, List<Integer> allPorts);
	WpstResponseBean getHostInfo(String location) throws MalformedURLException, UnknownHostException;
	WpstResponseBean getHeaders(String location) throws MalformedURLException, UnknownHostException;
}
