
/*ex03
$ ./a.out d a c b e
*/
#include <unistd.h>

int	ft_strcmp(char *s1, char *s2)
{
	int	i;

	i = 0;
	while (s1[i] != '\0')
	{
		if (s1[i] - s2[i] != 0)
		{
			return (s1[i] - s2[i]);
		}
		if (s1[i] - s2[i] == 0)
		{
			i++;
		}
	}
	if (s1[i] == s2[i])
	{
		return (0);
	}
	else
		return (s1[i] - s2[i]);
}

void	ft_putstr(char *str)
{
	int	i;

	i = 0;
	while (str[i] != '\0')
	{
		write(1, &str[i], 1);
		i++;
	}
}

char	**ft_sort_params(int argc, char **argv)
{
	char	*temp;
	int		i;
	int		o;

	i = 1;
	while (i < argc)
	{
		o = 0;
		while (i + o < argc)
		{
			if (ft_strcmp(argv[i], argv[i + o]) >= 0)
			{
				temp = argv[i];
				argv[i] = argv[i + o];
				argv[i + o] = temp;
			}
			o++;
		}
		i++;
	}
	return (argv);
}

int	main(int argc, char **argv)
{
	int		i;

	ft_sort_params(argc, argv);
	i = 1;
	while (i < argc)
	{
		ft_putstr(argv[i]);
		ft_putstr("\n");
		i++;
	}
	return (0);
}
