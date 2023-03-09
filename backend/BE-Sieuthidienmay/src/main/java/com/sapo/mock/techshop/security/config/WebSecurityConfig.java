package com.sapo.mock.techshop.security.config;

import com.sapo.mock.techshop.common.enumtype.ERole;
import com.sapo.mock.techshop.security.handler.RestAccessDeniedHandler;
import com.sapo.mock.techshop.security.handler.RestAuthenticationEntryPoint;
import com.sapo.mock.techshop.service.impl.LoadUserForFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private LoadUserForFilter loadUserForFilter;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(loadUserForFilter).passwordEncoder(new CustomPasswordEncoder());
    }
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // permitAll()
        final String[] generalEndpoints = {
                "/api/auth/**",
                "/v3/api-docs/**",
                "/swagger-ui/**",
                "/swagger-ui.html",
                "/api/images/**"
        };

        final String[] managerEndpoints = {
                "/api/dashboard/**"
        };

        final String[] userEndpoints = {
                "/api/user/**"
        };

        http
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers(generalEndpoints).permitAll()
                // priority from upper to lower
                .antMatchers("/api/dashboard/users", "/api/dashboard/orders").hasAuthority(ERole.ROLE_MANAGER.toString())
                .antMatchers(HttpMethod.GET, managerEndpoints).permitAll()
                .antMatchers(managerEndpoints).hasAnyAuthority(ERole.ROLE_MANAGER.toString()) //same as hasAnyRole("ROLE_MANAGER")
                .antMatchers(userEndpoints).hasAnyAuthority(ERole.ROLE_USER.toString())
                .anyRequest().authenticated()
                .and()
                .cors()
                .and()
                .csrf().disable()
                .addFilterBefore(
                        authenticationJwtTokenFilter(),
                        UsernamePasswordAuthenticationFilter.class)
//                handle exception
                .exceptionHandling().authenticationEntryPoint(new RestAuthenticationEntryPoint())
                .accessDeniedHandler(new RestAccessDeniedHandler());
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        final CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedMethods(List.of("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        configuration.applyPermitDefaultValues();

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
