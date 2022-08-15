 
char	*ft_strlowcase(char *str)
{
	int	a;

	a = 0;
	while (str[a])
	{
		if (str[a] >= 'A' && str[a] <= 'Z')
		{
			str[a] = str[a] + 32;
		}
		a++;
	}
	return (str);
}