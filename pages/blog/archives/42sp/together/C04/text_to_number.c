#include <stdio.h>

// Verifica se o valor é numérico
int	is_numeric(char c)
{
	return (c >= '0' && c <= '9');
}

// Verifica se o valor é um sinal
int	is_sign(char c)
{
	return (c == '+' || c == '-');
}

// Verifica se é um white-space
int	is_space(char c)
{
	// return (c == ' ' || c == '\t' || c == '\r'
	// 	|| c == '\v' || c == '\f' || c == '\n');
	return (c == ' ' || (c >= '\t' && c <= '\r'));
}

// A função retorna um inteiro
// Então em qualquer saída do código, deve retornar um valor int
int	text_to_number(char *str)
{
	int	number;
	int	index;
	int	sign;

	number = 0;
	// Fazendo a conversão da esquerda para a direita
	index = 0;
	// Tratando espaços em branco
	while (is_space(str[index]))
		index++;
	// Tratando os sinais
	sign = 1;
	// Mudei de if para while para conseguir tratar quantos símbolos de + ou -
	// 	eu quiser.
	// Utilize if se quiser tratar apenas 1 único símbolo de + ou - opcional
	while (is_sign(str[index]))
	{
		// Tratando o negativo
		if (str[index] == '-')
			sign = -sign;
		index++;
	}
	while (is_numeric(str[index]))
	{
		// Multiplicando o resultado pelo tamanho da base
		// Por padrão, trabalhamos com a base 10.
		// Exemplo 4582
		// 0 - Começa em 0
		// 0 - Multiplica o number por 10
		// 4 - Adiciona o número atual do str
		// 40 - Multiplica o number por 10
		// 45 - Adiciona o número atual do str
		// 450 - Multiplica o number por 10
		// 458 - Adiciona o número atual do str
		// 4580 - Multiplica o number por 10
		// 4582 - Adiciona o número atual do str
		number = number * 10;
		number = number + (str[index] - '0');
		index++;
	}
	// while (*str)
	// {
	// 	
	// 	str++; // str = str + sizeof(str);
	// }
	return (number * sign);
}

int	main(void)
{
	printf("%d\n", text_to_number("42"));
	printf("%d\n", text_to_number("-2147483648")); // -(2 ^ 31)
	printf("%d\n", text_to_number("2147483647")); // 2 ^ 31 - 1
	printf("%d\n", text_to_number("0"));
	printf("%d\n", text_to_number("-456"));
	printf("%d\n", text_to_number("      çhjklasdfgçhfsdalhjkfsdahljk-456"));
	printf("%d\n", text_to_number("-456    alsdf    ghçkjalksgdfhj"));
	printf("%d\n", text_to_number("+456"));
	printf("%d\n", text_to_number("--456"));
	printf("%d\n", text_to_number("--+-+-+-+--+-+---+-++-+-+-+-+-+-+++++++----456"));
	printf("%d\n", text_to_number("      \n\n\n\n\f\f\f\t\t\t\v\v\r\r\r    +-+-+-+-+-+-48613asdfa13168165çljkasdfglkhjasdglhkfasdjghkawsdfghjkl"));
	return (0);
}