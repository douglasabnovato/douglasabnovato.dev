#include <stdio.h>

void	print_numbers(int *array, int size)
{
	int	index;

	index = 0;
	while (index < size)
	{
		printf("%d, ", array[index]);
		index++;
	}
	printf("\n");
}

void	swap_int(int *a, int *b)
{
	int	aux;
	aux = *a;
	*a = *b;
	*b = aux;
}

int	*sort_int(int	*array, int	size)
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
			print_numbers(array, size);
			if (array[index] > array[index + 1])
			{
				is_sorted = 0;
				swap_int(&array[index], &array[index + 1]);
			}
			index++;
		}
		print_numbers(array, size);
		printf("Organizando de novo\n");
	}
	printf("Terminei de organizar\n");
	return (array);
}

int	main(void)
{
	int	array[] = {-34, 90, 18, 24, -86, 97, -100, -85, 27, 24, -55, 76, -96, 38, 100, -2, 36, 6, -59, -23};
	//int	array[] = {5, 3, 4, 1, 2};
	int	*test_pointer;

	print_numbers(array, 20);
	test_pointer = sort_int(array, 20);
	// Testando se inverteu o array original
	print_numbers(array, 20);
	printf("Testando o ponteiro\n");
	print_numbers(test_pointer, 20);
}