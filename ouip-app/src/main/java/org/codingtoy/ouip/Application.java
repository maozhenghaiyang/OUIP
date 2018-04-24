/**
 * 
 */
package org.codingtoy.ouip;

import javax.sql.DataSource;

import org.apache.tomcat.jdbc.pool.PoolProperties;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class Application implements WebMvcConfigurer {

	@Bean
	public DataSource dataSource() {
		return new org.apache.tomcat.jdbc.pool.DataSource(poolProperties());
	}

	@Bean
	@ConfigurationProperties(prefix = "ouip.datasource")
	public PoolProperties poolProperties() {
		return new PoolProperties();
	}

	public static void main(String[] args) throws Exception {
		new SpringApplicationBuilder(Application.class).web(WebApplicationType.SERVLET).run(args);
	}
}