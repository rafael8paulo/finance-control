package br.com.rpx.financecontrol.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthenticationResponseDTO {

    private Long userId;
    private String token;

}
