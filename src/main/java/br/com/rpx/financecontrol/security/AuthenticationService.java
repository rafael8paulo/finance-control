package br.com.rpx.financecontrol.security;

import br.com.rpx.financecontrol.dto.AuthenticationResponseDTO;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private JwtService jwtService;

    public AuthenticationService(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    public AuthenticationResponseDTO authenticate(Authentication authentication) {
        return jwtService.generateToken(authentication);
    }
}
