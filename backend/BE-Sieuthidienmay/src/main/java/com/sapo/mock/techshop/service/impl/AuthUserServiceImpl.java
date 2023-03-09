package com.sapo.mock.techshop.service.impl;

import com.sapo.mock.techshop.common.constant.HttpStatusConstant;
import com.sapo.mock.techshop.common.constant.JwtConstant;
import com.sapo.mock.techshop.common.enumtype.ERole;
import com.sapo.mock.techshop.common.exception.BusinessException;
import com.sapo.mock.techshop.common.utils.DTOValidator;
import com.sapo.mock.techshop.common.utils.DateTimeUtils;
import com.sapo.mock.techshop.dto.request.LoginRequest;
import com.sapo.mock.techshop.dto.request.RegisterUserRequestDTO;
import com.sapo.mock.techshop.dto.response.LoginUserInfo;
import com.sapo.mock.techshop.dto.response.UserListDTO;
import com.sapo.mock.techshop.entity.AuthUser;
import com.sapo.mock.techshop.mapper.UserMapper;
import com.sapo.mock.techshop.repository.AuthUserRepo;
import com.sapo.mock.techshop.repository.UserRepoCustom;
import com.sapo.mock.techshop.service.AuthUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class AuthUserServiceImpl implements AuthUserService {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    private DTOValidator validator;
    @Autowired
    private AuthUserRepo authUserRepo;

    @Autowired
    private UserRepoCustom userRepoCustom;
    @Autowired
    private UserMapper userMapper;

    public LoginUserInfo handleLoginRequest(LoginRequest loginRequest) {
        validator.validate(loginRequest);

        String requestedUsername = loginRequest.getUsername();
        String requestedPassword = loginRequest.getPassword();
        String requestedRole = loginRequest.getRole();

        AuthUser authUser = findByUsername(requestedUsername);

        // check username
        if (authUser == null) { // username not found
            throw new BusinessException(HttpStatusConstant.AUTHENTICATION_FAIL_CODE, HttpStatusConstant.AUTHENTICATION_FAIL_MESSAGE);
        }

        // check password
        if (!checkPassword(requestedPassword, authUser.getPassword())) {
            throw new BusinessException(HttpStatusConstant.AUTHENTICATION_FAIL_CODE, HttpStatusConstant.AUTHENTICATION_FAIL_MESSAGE);
        }

        // check role
        ERole role = authUser.getRole();
        if (!role.toString().equals(requestedRole)) {
            throw new BusinessException(HttpStatusConstant.UNAUTHORIZED_CODE, HttpStatusConstant.UNAUTHORIZED_MESSAGE);
        }

        // everything ok
        authUser.setLastLoginAt(DateTimeUtils.getNow().toLocalDateTime());
        authUserRepo.save(authUser);
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return loginSuccess(authUser);
    }

    // we maybe use some password encrypt function here
    private boolean checkPassword(String requestedPassword, String password) {
        return requestedPassword.equals(password);
    }

    private LoginUserInfo loginSuccess(AuthUser authUser) {
        String accessToken = JwtTokenService.buildJWT(authUser.getUsername(), JwtConstant.EXPIRATION_TIME);
        String refreshToken = JwtTokenService.buildJWT(authUser.getUsername(), JwtConstant.REFRESH_TOKEN_EXP_TIME);
        return new LoginUserInfo(
                authUser.getId(),
                authUser.getUsername(),
                authUser.getRole().toString(),
                accessToken,
                refreshToken
        );
    }

    @Override
    public AuthUser findByUsername(String username) {
        return authUserRepo.findAuthUserByUsername(username);
    }

    @Override
    public void createUser(RegisterUserRequestDTO registerUserRequestDTO) {
        validator.validate(registerUserRequestDTO);

        String registrationUsername = registerUserRequestDTO.getUsername();
        String registrationEmail = registerUserRequestDTO.getEmail();
        if (!authUserRepo.existsAuthUserByUsernameOrEmail(registrationUsername, registrationEmail)) {
            AuthUser newUser = userMapper.toEntity(registerUserRequestDTO);
            newUser.setRole(ERole.ROLE_USER);
            authUserRepo.save(newUser);
        } else {
           throw new BusinessException(HttpStatusConstant.REGISTER_FAILED_CODE, HttpStatusConstant.REGISTER_FAILED_MESSAGE);
        }
    }

    @Override
    public void deleteUser(Integer userId) {
        authUserRepo.deleteById(userId);
    }

    @Transactional
    @Override
    public UserListDTO getUserById(Integer userId) {
        AuthUser user = authUserRepo.getById(userId);
        return userMapper.toUserListDTO(user);
    }

    @Override
    public List<UserListDTO> listUsersForDashboard() {
        return userRepoCustom.getDetailsAllusers();
    }
}
