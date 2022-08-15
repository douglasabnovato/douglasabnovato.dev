#include <unistd.h>

void	print_number(int number)
{
	// Armazenando o número num array de char.
	char	digits[10]; // Armazena todos os dígitos que cabem num int.
	int		index;
	int		sign;

	// Verifico o meu caso de excessão
	if (number == 0)
	{
		write(1, "0", 1); // Imprimo 0 na tela
		return ; // Paro a execução do código
	}
	// if (number == 0)
	// 	return ((void)(write(1, "0", 1)));
	// Verifico se é negativo
	sign = 1; // Por padrão, considero que o número é positivo
	if (number < 0)
	{
		sign = -1; // Armazeno uma variável que indica que é negativo
		write (1, "-", 1); // Se for negativo, quero imprimir o sinal de -
	}
	index = 9;
	while (number != 0)
	{
		// Consigo extrair o dígito da direita de um número de base 10
		// 	calculando o resto da divisão do número por 10
		// Se a base for diferente, basta trocar o 10 pelo tamanho da base.
		//	Exemplo: Base binária eu posso dividir por 2.
		digits[index] = number % 10 * sign;
		// digits[index] = (-number) % 10 * (number < 0) + (number % 10) * (number >= 0);
		// digits tem que armazenar o símbolo associado ao número.
		// Os números na ascii começam em 48 ou '0'.
		digits[index] = digits[index] + '0';
		index--; // Indo para o próximo digito da direita para a esquerda
		number = number / 10; // Eliminando o dígito mais à direita de number
	}
	// ? ??? ??? ??? <- digits
	//            42
	//           ↑ index parou aqui. Valor 7
	// write(1, digits + index + 1, 10 - (index + 1));
	index++; // Corrige a posição do index
	write(1, digits + index, 10 - index); // Imprime os números.
}

int	main(void)
{
	print_number(42);
	write(1, "\n", 1);
	print_number(-2147483648); // -(2 ^ 31)
	write(1, "\n", 1);
	print_number(2147483647); // 2 ^ 31 - 1
	write(1, "\n", 1);
	print_number(0);
	write(1, "\n", 1);
	print_number(-456);
	write(1, "\n", 1);
	return (0);
}