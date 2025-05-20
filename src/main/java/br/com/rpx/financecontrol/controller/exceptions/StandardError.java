package br.com.rpx.financecontrol.controller.exceptions;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.util.List;

@Getter
@SuperBuilder
public class StandardError extends BaseErrorDto implements Serializable {

    private List<String> messages;

}
