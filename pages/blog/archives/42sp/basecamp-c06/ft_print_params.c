/* ex01
$ ./a.out test1 test2 test3
*/

#include <unistd.h>

void	escreva(char *str)
{
	while (*str)
		write(1, &*str++, 1);
}

int	main(int argc, char *argv[])
{
	int	i;

	i = 1;
	while (i < argc)
	{
		escreva(*(argv + i));
		escreva("\n");
		i++;
	}
	return (0);
}
