#include <unistd.h>

void	print_char(char c)
{
	write(1, &c, 1);
}

// (void *) é um ponteiro para algo que eu não sei o tipo
// Eu recebo um endereço de memória, mas não sei exatamente qual era o tipo que
//	deveria estar armazenado lá.
// (void *) pode receber endereço de qualquer tipo de dado.
void	print_to_size(void *address, int size)
{
	int	index;

	index = 0;
	while (index < size)
	{
		if (((char *) address)[index] == 0)
			print_char('$');
		else if (((char *) address)[index] < 32 || ((char *) address)[index] > 126)
			print_char('.');
		print_char(((char *) address)[index]);
		index++;
	}
}

int	main(void)
{
	// Declarando array sem tamanho dentro
	// Preciso passar o valor na mesma linha
	// O tamanho do array é o mesmo tamanho do valor que vou armazenar nele
	//	Exemplo: "Hello There" tem tamanho 12, pois inclui o byte nulo
	char	str[] = "Hello There\0\0\0\0\0\0\0\0\0\0\0General Kenobi";
	// str contém o endereço de onde começa o array
	// Não posso mudar o endereço do str/array
	// Ele já separa um espaço na memória para guardar o conteúdo do tamanho dele
	char	*str2 = "Teste";
	// Não posso mudar o endereço do str/array
	// str = str2;
	// Não consigo manipular o conteúdo de strings. Consigo manipular o endereço
	// Vou receber Segmentation Fault
	// str2[0] = 'A';
	// Consigo manipular o cónteúdo de array de char
	str[0] = 'Z';
	// Consigo manipular o cónteúdo de um ponteiro que aponte para um array.
	str2 = str;
	str[1] = '@';
	print_to_size(str, 37);
	print_char('\n');
	int	tab[4] = {10, -50, 21456489, -12348612};
	print_to_size(tab, 16);
	print_char('\n');
}