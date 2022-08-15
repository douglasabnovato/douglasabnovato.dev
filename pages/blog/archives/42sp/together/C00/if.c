#include <unistd.h>
#include <stdio.h>

void	print_numbers_in_str(char *str)
{
	int	index;

	index = 0;
	while (str[index] != '\0')
	{
		// '0' == 48
		// '9' == 57
		// Os símbolos numéricos, de letras minúsculas e letras maiúsculas são 
		//	sequenciais dentro de seus próprios grupos.
		//	0-9, a-z, A-Z
		// Os imprimíveis da tabela ascii são do 32 até o 126
		// Existem 2 operadores lógicos: && (e), || (ou)
		// (e) se tudo for verdadeiro, retorna verdadeiro
		// (ou) se alguém for verdadeiro, retorna verdadeiro
		// No (e), se ele encontrar 1 valor falso enquanto faz as comparações,
		// 	já interrompe o restante das comparações.
		// No (ou), se encontrar 1 valor verdadeiro enquanto faz as comparações,
		//	já interrompe o restante das comparações.
		if (str[index] >= '0' && str[index] <= '9')
			write(1, str + index, 1);
		// str[index] -> *(str + index * sizeof(str))
		// Exemplo: str tem o endereço 0x40, index é 10;
		//	str[index] -> Puxa o valor 10 * (tamanho do char) endereços de memória a frente
		// write(1, &str[index], 1); é equivalente à
		// write(1, str + index, 1);
		index++;
	}
}

void	print_ascii_table(void)
{
	char	c;

	c = 0;
	printf("%d: |||%c|||\n", c, c);
	while (c < 127)
	{
		c++;
		printf("%d: |||%c|||\n", c, c);
	}
}

int	print_char(char c)
{
	write(1, &c, 1);
	if (c < 32)
		return (1);
	return (0);
}

int	logic_operators(void)
{
	print_char('C');
	// Os operadores lógicos interrompem a comparação assim que já tem certeza
	//	da resposta.
	if (print_char('\n') || print_char('a') || print_char('\n'))
	{
		print_char('O');
		print_char('\n');
		print_char('\n');
	}
	if (print_char('a') && print_char('\n'))
	{
		print_char('X');
		print_char('\n');
		print_char('\n');
	}
	if (print_char('\n') && print_char('\n'))
	{
		print_char('X');
		print_char('\n');
		print_char('\n');
	}
}

int	main(void)
{
	print_numbers_in_str("Hell0 Th3r3\nG3n3r41 K3n0b1");
	write(1, "\n", 1);
	print_ascii_table();
	logic_operators();
	return (0);
}