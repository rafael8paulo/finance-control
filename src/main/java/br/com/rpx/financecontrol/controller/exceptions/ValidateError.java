package br.com.rpx.financecontrol.controller.exceptions;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.util.Map;

@Getter
@SuperBuilder
public class ValidateError extends BaseErrorDto implements Serializable {

    private Map<String, String> messages;

}
