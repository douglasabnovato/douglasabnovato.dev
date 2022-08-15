/*ex00
$ ./a.out
*/
#include <unistd.h>

void	escreva(char *str)
{
	while (*str)
		write(1, &*str++, 1);
}

int	main(int argc, char *argv[])
{
	if (argc)
		escreva(argv[0]);
	escreva("\n");
	return (0);
}
