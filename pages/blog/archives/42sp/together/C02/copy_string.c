
#include <stdio.h>

// A função do jeito que está, dependendo de como src e dest se sobreescreverem
// Pode retornar Segmentation Fault
char	*copy_string(char *dest, char *src)
{
	// Posso utilizar int para o contador
	// O ideal seria unsigned int
	// Como não vou utilizar index negativo, consigo aproveitar 2.000.000.000 de índices
	int	index;

	index = 0;
	while (src[index] != '\0')
	{
		// Passo o conteúdo de src para dest, 1 a 1
		dest[index] = src[index];
		// printf("%c", dest[index]);
		index++;
	}
	dest[index] = '\0';
	return (dest);
}

int	ft_strlen(char *str)
{
	int	size;

	size = 0;
	while (str[size] != '\0')
		size++;
	return (size);
}

char	*copy_string2(char *dest, char *src)
{
	int	index;
	int	size;

	// Copiando da esquerda para a direita
	if (src >= dest)
	{
		index = 0;
		while (src[index] != '\0')
		{
			dest[index] = src[index];
			index++;
		}
		dest[index] = '\0';
		return (dest);
	}
	// Copiando da direita para a esquerda
	else
	{
		size = ft_strlen(src);
		index = size - 1;
		while (index > 0)
		{
			dest[index] = src[index];
			index--;
		}
		dest[0] = src[0];
		return (dest);
	}
}


int	main(void)
{
	// Array de char com tamanho suficiente para receber source
	char	string1[40];
	char	*string2;
	char	*string3;

	copy_string(string1, "Hello There");
	printf("%s\n", string1);
	copy_string(string1, "General Kenobi");
	printf("%s\n", string1);
	// Se eu passar uma string maior do que cabe no array dá erro
	// copy_string(string1, "The quick brown fox jumps over the lazy dog");
	// printf("%s\n", string1);
	// Não vai parar de copiar até dar erro
	// Quebrando o meu código no meio
	string2 = string1;
	string3 = &string1[5];
	// copy_string(string3, string2);
	// printf("%s\n", string3);
	copy_string2(string3, string2);
	printf("%s\n", string3);
}