package br.com.rpx.financecontrol.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Schema(description = "DTO de resposta para saldo mensal")
public class BalanceResponseDTO {
    @Schema(description = "Saldo total (receitas - despesas)", example = "1500.75")
    private BigDecimal balance;
    
    @Schema(description = "Total de receitas", example = "3000.00")
    private BigDecimal revenues;
    
    @Schema(description = "Total de despesas", example = "1499.25")
    private BigDecimal expenses;
    
    @Schema(description = "Mês e ano de referência", example = "2024-03")
    private String month;
    
    @Schema(description = "ID do usuário", example = "1")
    private Long userId;
    
    @Schema(description = "Nome do usuário", example = "João Silva")
    private String userName;
} 