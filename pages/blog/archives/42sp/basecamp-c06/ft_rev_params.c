/*ex02
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
	while (argc > i)
	{
		escreva(*(argv + (argc - 1)));
		escreva("\n");
		--argc;
	}
	return (0);
}
