package com.cigital.wpst.service.intf;

import java.util.List;

public interface WebProfilingServiceIntf {

	boolean isPortAvailable(String host, int port);
	List<Integer> availablePorts(String host, List<Integer> allPorts);
}
