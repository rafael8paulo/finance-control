package br.com.rpx.financecontrol.dto;

import br.com.rpx.financecontrol.model.User;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Schema(description = "DTO para criação de usuários")
public class UserCreateDTO {

    @Schema(description = "Nome do usuário", example = "João Silva")
    @NotNull(message = "O nome é obrigatório")
    private String name;

    @Schema(description = "Email do usuário", example = "Tj5oX@example.com")
    @NotNull(message = "O email é obrigatório")
    private String email;

    @Schema(description = "Senha do usuário", example = "123456")
    @NotNull(message = "A senha é obrigatória")
    private String password;


    public User convertToUser() {
        return User.builder()
                .email(this.email)
                .name(this.name)
                .password(this.password)
                .build();
    }

}
