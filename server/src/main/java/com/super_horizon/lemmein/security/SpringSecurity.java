package com.super_horizon.lemmein.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.http.HttpMethod;

@Configuration
@EnableWebSecurity
public class SpringSecurity extends WebSecurityConfigurerAdapter {

    @Autowired
    private AuthenticationEntryPoint authEntryPoint;
    
    @Override
	protected void configure(HttpSecurity http) throws Exception {

        http.csrf().disable().authorizeRequests()
            .antMatchers("/lemmein/customers/**").permitAll()
            //.antMatchers("/lemmein/admin/update").access("hasRole('USER')")
            .antMatchers("/lemmein/admin/**").access("hasRole('USER')")
            .and().httpBasic()           
            .authenticationEntryPoint(authEntryPoint)
            .and().sessionManagement().disable();        
	}

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
        .withUser("lemmein").password("{noop}lemmein0").roles("USER");
        //.and().withUser("lemmein1").password("{noop}lemmein0").roles("ADMIN");
	}
}