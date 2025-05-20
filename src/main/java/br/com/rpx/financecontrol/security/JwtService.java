package br.com.rpx.financecontrol.security;

import br.com.rpx.financecontrol.dto.AuthenticationResponseDTO;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.stream.Collectors;

@Service
public class JwtService {
    private final JwtEncoder encoder;

    public JwtService(JwtEncoder encoder) {
        this.encoder = encoder;
    }

    public AuthenticationResponseDTO generateToken(Authentication authentication) {
        Instant now = Instant.now();
        long expiry = 1800L;

        String scope = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));

        Long userId = extractUserIdFromAuthentication(authentication);

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("spring-security-jwt")
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiry))
                .subject(authentication.getName())
                .claim("scope", scope)
                .claim("userId", userId)
                .build();

        return AuthenticationResponseDTO.builder()
                .token(encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue())
                .userId(userId)
                .build();
    }

    private Long extractUserIdFromAuthentication(Authentication authentication) {
        if (authentication.getPrincipal() instanceof UserAuthenticated) {
            return ((UserAuthenticated) authentication.getPrincipal()).getId();
        } else if (authentication.getPrincipal() instanceof Jwt) {
            Jwt jwt = (Jwt) authentication.getPrincipal();
            return Long.valueOf(jwt.getClaimAsString("userId"));
        }
        throw new IllegalStateException("Tipo de principal não suportado: " + authentication.getPrincipal().getClass().getName());
    }

}
