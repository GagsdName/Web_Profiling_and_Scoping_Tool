package com.cigital.wpst.bean;

import java.util.List;

public class WpstResponseBean {

	private List<Integer> openPorts;
	private String protocol;
	private int port;
	private String ip;
	private String domain;

	public List<Integer> getOpenPorts() {
		return openPorts;
	}

	public void setOpenPorts(List<Integer> openPorts) {
		this.openPorts = openPorts;
	}

	public String getProtocol() {
		return protocol;
	}

	public void setProtocol(String protocol) {
		this.protocol = protocol;
	}

	public int getPort() {
		return port;
	}

	public void setPort(int port) {
		this.port = port;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getDomain() {
		return domain;
	}

	public void setDomain(String domain) {
		this.domain = domain;
	}

	
}
