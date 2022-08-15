#include <unistd.h>

void	write_char(char c)
{
	write(1, &c, 1);
	// Primeiro argumento é o file descriptor
	// Segundo argumento é o endereço aonde começam os valores que quero imprimir
	//	`char` é um valor numerico, preciso passar o endereço aonde está armazenado
	//	Utilizo o operador & para puxar o endereço de memória associado ao valor da 
	//		variável `c`.
	// Terceiro argumento são quantos bytes eu desejo imprimir.
}

// Compilando com gcc sem utilizar as flags por hora
int	main(void)
{
	// Posso escrever o meu próprio `main` na plataforma para poder testar o meu código
	write_char('a');
	// Símbolo entre ' (apóstrofo) significa que quero o valor numérico do símbolo de dentro.
	// Símbolo entre " (aspas) significa que estou passando o endereço de memória de onde começa a string.
	// string é um array de char.
	write_char('z');
	write_char('\n');
	write_char('A');
	write_char('5');
	write_char('\n');
	return (0);
}
