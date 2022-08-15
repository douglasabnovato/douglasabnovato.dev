#include <unistd.h>

// Estou passando como parâmetro um ponteiro de char.
// Esse ponteiro aponta para o começo da minha string.
// O endereço está armazenado na variável `str`.
void	print_string(char *str)
{
	// Operador * é utilizado para avaliar o conteúdo de um endereço de memória
	// *str retorna um char. Ver como o parâmetro foi declarado
	// No while, tenho que passar uma condição de saída. Quando for falso, 
	// 	ele para de repetir o bloco de código
	// 0 é considerado falso. Qualquer coisa diferente é considerado verdadeiro
	// A comparação de *str != '\0' não é obrigatória. '\0' é equivalente a 0.
	// '\0' representa o símbolo do byte nulo.
	// As strings em C utilizam por padrão um byte nulo no final delas, para indicar
	// 	o seu término.
	while (*str != '\0')
	{
		write(1, str, 1);
		str++;
	}
}

void	print_string2(char *str)
{
	// Utilizando variável contadora
	int	size;

	size = 0;
	// A notação de [] (colchetes) puxa o valor de uma posição específica da memória
	// str[0] vai puxar o valor do primeiro char no endereço de memória em str
	// str[5] vai puxar o valor do sexto char no endereço de memória em str
	// Lembrando que o começo é sempre em 0.
	while (str[size])
		size++;
	write(1, str, size);
}

int	main(void)
{
	print_string("Hello There\n");
	print_string2("General Kenobi\n");
	return (0);
}
