#include <stdio.h>

void	print_strings(char **array, int size)
{
	int	index;

	index = 0;
	while (index < size)
	{
		printf("%s||", array[index]);
		index++;
	}
	printf("\n");
}

void	swap_string(char **a, char **b)
{
	char	*aux;
	aux = *a;
	*a = *b;
	*b = aux;
}

int	compare_strings(char *s1, char *s2)
{
	int	index;

	index = 0;
	// Enquanto as 2 strings forem iguais
	// E eu não cheguei no byte nulo de 1 delas (escolhi a primeira no caso)
	while (s1[index] == s2[index] && s1[index] != '\0')
		index++;
	// Hello
	// Help
	// Hel
	// l - p
	// 108 - 112 == -4
	// Hello
	// Held
	// Hel
	// l - d
	// 108 - 100 == 8
	// Hello
	// Hello
	// Hello
	// \0 - \0
	// 0 - 0 == 0
	return (s1[index] - s2[index]);
}

char	**sort_strings(char	**strings, int	size)
{
	int	index;
	int	is_sorted;

	is_sorted = 0;
	printf("Começando a organizar\n");
	while (is_sorted == 0)
	{
		index = 0;
		is_sorted = 1;
		while (index < size - 1)
		{
			print_strings(strings, size);
			if (compare_strings(strings[index], strings[index + 1]) > 0)
			{
				is_sorted = 0;
				swap_string(&strings[index], &strings[index + 1]);
			}
			index++;
		}
		print_strings(strings, size);
		printf("Organizando de novo\n");
	}
	printf("Terminei de organizar\n");
	return (strings);
}

int	main(int argc, char **argv)
{
	char	**test_pointer;

	print_strings(&argv[1], argc - 1);
	test_pointer = sort_strings(&argv[1], argc - 1);
	// Testando se inverteu o array original
	print_strings(&argv[1], argc - 1);
	printf("Testando o ponteiro\n");
	print_strings(test_pointer, argc - 1);
}