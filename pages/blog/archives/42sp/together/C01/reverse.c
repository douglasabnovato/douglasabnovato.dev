#include <stdio.h>

int	*reverse_int_array(int *array, int size)
{
	int	index;
	int	aux;

	index = 0;
	// Como eu recebo o tamanho do array e é a única informação que tenho
	// 	de quando o array termina, vou utilizar o size como limitador
	// 0 1 2 3 4 5; size = 6
	// 5 1 2 3 4 0 - 0
	// 5 4 2 3 1 0 - 1
	// 5 4 3 2 1 0 - 2
	// 5 4 2 3 1 0 - 3
	// 5 1 2 3 4 0 - 4
	// 0 1 2 3 4 5 - 5
	// Realizando somente metade das trocas para evitar trocar e voltar ao normal
	while (index < size / 2)
	{
		// Realizando a troca com apenas um contador/índice
		aux = array[index];
		array[index] = array[size - 1 - index];
		array[size - 1 - index] = aux;
		index++;
	}
	// int	index2;

	// index2 = size - 1;
	// while (index < size / 2)
	// {
	// 	aux = array[index];
	// 	array[index] = array[index2];
	// 	array[index2] = aux;
	// 	index++;
	// 	index2--;
	// }
	return (array);
}

int	ft_strlen(char *str)
{
	int	size;

	size = 0;
	while (str[size] != '\0')
		size++;
	return (size);
}

char	*reverse_string(char *str)
{
	int	index;
	int	size;
	char	aux;

	index = 0;
	size = ft_strlen(str);
	while (index < size / 2)
	{
		aux = str[index];
		str[index] = str[size - 1 - index];
		str[size - 1 - index] = aux;
		index++;
	}
	return (str);
}

char	**reverse_strings(char **strs, int size)
{
	int	index;
	char	*aux;

	index = 0;
	while (index < size / 2)
	{
		aux = strs[index];
		strs[index] = strs[size - 1 - index];
		strs[size - 1 - index] = aux;
		index++;
	}
	return (strs);
}

int	strslen(char **strs)
{
	int	size;


	size = 0;
	// strs[0] pega o valor do endereço da primeira string em strs
	// strs[0][0] pega o valor do primeiro char da primeira string em strs
	// Equivalente a
	// char	*str;
	// char	c;
	// str = strs[size];
	// c = str[0];
	while (strs[size][0] != '\0')
		size++;
	return (size);
}

char	**reverse_strings_sizeless(char **strs)
{
	int	index;
	int	size;
	char	*aux;

	index = 0;
	size = strslen(strs);
	while (index < size / 2)
	{
		aux = strs[index];
		strs[index] = strs[size - 1 - index];
		strs[size - 1 - index] = aux;
		index++;
	}
	return (strs);
}

void	print_int_array(int *array, int size)
{
	int index;

	index = 0;
	while (index < size)
	{
		printf("%d, ", array[index]);
		index++;
	}
}

void	print_strings(char **strs, int size)
{
	int	index;

	index = 0;
	while (index < size)
	{
		printf("%s\n", strs[index]);
		index++;
	}
	printf("\n");
}

#include <unistd.h>

void	print_string_with_write(char *str)
{
	int	size;

	size = 0;
	while (str[size] != '\0')
		size++;
	write(1, str, size);
}

void	print_strings_with_write(char **strs, int size)
{
	int	index;

	index = 0;
	while (index < size)
	{
		print_string_with_write(strs[index]);
		write(1, "\n", 1);
		index++;
	}
}

void	print_reverse_strings_with_write(char **strs, int size)
{
	while (size > 0)
	{
		print_string_with_write(strs[size - 1]);
		write(1, "\n", 1);
		size--;
	}
}

int	main(int argc, char **argv)
{
	// Declarar como array para poder testar a inversão
	int	odd_array[] = {0, 1, 2, 3, 4, 5, 6};
	int	even_array[] = {0, 1, 2, 3, 4, 5};
	char	odd_string[] = "Hello There";
	char	even_string[] = "General Kenobi";
	char	*odd_pointer;
	char	*even_pointer;
	char	*odd_strings[] = {"The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog", ""};
	char	*even_strings[] = {"Hello", "There", "General", "Kenobi", ""};
	
	print_int_array(odd_array, 7);
	printf("\n");
	reverse_int_array(odd_array, 7);
	print_int_array(odd_array, 7);
	printf("\n");
	print_int_array(even_array, 6);
	printf("\n");
	reverse_int_array(even_array, 6);
	print_int_array(even_array, 6);
	printf("\n");
	printf("%s\n", odd_string);
	odd_pointer = reverse_string(odd_string);
	printf("%s\n", odd_string);
	printf("%s\n", odd_pointer);
	printf("%s\n", even_string);
	even_pointer = reverse_string(even_string);
	printf("%s\n", even_string);
	printf("%s\n", even_pointer);
	print_reverse_strings_with_write(&argv[1], argc - 1);
	print_strings(&argv[1], argc - 1);
	reverse_strings(&argv[1], argc - 1);
	print_strings(&argv[1], argc - 1);
	print_strings(even_strings, 4);
	reverse_strings_sizeless(even_strings);
	print_strings(even_strings, 4);
	print_strings(odd_strings, 9);
	reverse_strings_sizeless(odd_strings);
	print_strings(odd_strings, 9);
	return (0);
}