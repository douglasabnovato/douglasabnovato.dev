#include <stdlib.h>

int	ft_strlen(char *str)
{
	int	size;

	size = 0;
	while (str[size])
		size++;
	return (size);
}

char	*copy_malloc(char *str)
{
	char	*copy;
	int		index;

	// Alocando um espaço na memória igual ao tamanho de str + 1, para incluir o byte nulo
	// Convertendo o endereço do malloc de (void *) para (char *)
	copy = (char *) malloc((ft_strlen(str) + 1) * sizeof(char));
	// Se o malloc der errado, interrompe a função.
	// Quando o malloc dá errado, ele retorna o null pointer
	// ((void *) 0) é o valor do null pointer;
	if (copy == ((void *) 0))
		//return (copy);
		return (((void *) 0));
	index = 0;
	while (str[index] != '\0')
	{
		copy[index] = str[index];
		index++;
	}
	copy[index] = '\0';
	return (copy);
}
#include <stdio.h>

int	main(void)
{
	char	*teste;

	teste = copy_malloc("Hello There! General Kenobi");
	printf("%s\n", teste);
	free(teste);
}