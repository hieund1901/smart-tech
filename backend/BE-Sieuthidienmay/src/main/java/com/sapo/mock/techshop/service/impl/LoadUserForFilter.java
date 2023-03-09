package com.sapo.mock.techshop.service.impl;

import com.sapo.mock.techshop.entity.AuthUser;
import com.sapo.mock.techshop.repository.AuthUserRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@Slf4j
public class LoadUserForFilter implements UserDetailsService {
    @Autowired
    private AuthUserRepo authUserRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AuthUser user = authUserRepo.findAuthUserByUsername(username);
        if (user == null) {
            log.debug("username: \"" + username + "\" doesn't exist");
            // RestAuthenticationEntryPoint will handle it
            throw new UsernameNotFoundException("Username: \"" + username + "\" doesn't exist");
        }
        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        // the user here only has one role
        grantedAuthorities.add(new SimpleGrantedAuthority(user.getRole().toString()));
        return new User(user.getUsername(), user.getPassword(), grantedAuthorities);
    }
}
