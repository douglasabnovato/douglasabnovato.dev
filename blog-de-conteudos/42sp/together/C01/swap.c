#include <stdio.h>

void	ft_swap_int(int *a, int *b)
{
	int	aux;
	// Auxiliar/Pivo recebe um dos valores
	aux = *a;
	// Substituo esse valor que já foi armazenado pelo segundo valor
	*a = *b;
	// Substituo o segundo valor pelo conteúdo do auxiliar/pivo
	*b = aux;
}

void	ft_swap_char(char *a, char *b)
{
	char	aux;
	// Auxiliar/Pivo recebe um dos valores
	aux = *a;
	// Substituo esse valor que já foi armazenado pelo segundo valor
	*a = *b;
	// Substituo o segundo valor pelo conteúdo do auxiliar/pivo
	*b = aux;
}

void	ft_swap_string(char **a, char **b)
{
	char	*aux;
	// Auxiliar/Pivo recebe um dos valores
	aux = *a;
	// Substituo esse valor que já foi armazenado pelo segundo valor
	*a = *b;
	// Substituo o segundo valor pelo conteúdo do auxiliar/pivo
	*b = aux;
}

void	swap_torto_das_ideias(char *******************a, char *******************b)
{
	// Auxiliar/pivo sempre recebe um asterisco a menos
	char	******************aux;
	// Auxiliar/Pivo recebe um dos valores
	aux = *a;
	// Substituo esse valor que já foi armazenado pelo segundo valor
	*a = *b;
	// Substituo o segundo valor pelo conteúdo do auxiliar/pivo
	*b = aux;
}

int	main(void)
{
	int		n1;
	int		n2;
	char	c1;
	char	c2;
	char	*s1;
	char	*s2;

	n1 = 42;
	n2 = 24;
	printf("1: %d\n2: %d\n", n1, n2);
	ft_swap_int(&n1, &n2);
	printf("1: %d\n2: %d\n\n", n1, n2);
	c1 = 'A';
	c2 = 'z';
	printf("1: %c\n2: %c\n", c1, c2);
	ft_swap_char(&c1, &c2);
	printf("1: %c\n2: %c\n\n", c1, c2);
	s1 = "Hello";
	s2 = "There";
	printf("1: %s\n2: %s\n", s1, s2);
	ft_swap_string(&s1, &s2);
	printf("1: %s\n2: %s\n", s1, s2);
	return (0);
}