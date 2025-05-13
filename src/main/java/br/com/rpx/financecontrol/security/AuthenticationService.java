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
        String token = jwtService.generateToken(authentication);
        UserAuthenticated user = (UserAuthenticated) authentication.getPrincipal();
        return AuthenticationResponseDTO.builder()
                .token(token)
                .userId(user.getId())
                .build();
    }
}
