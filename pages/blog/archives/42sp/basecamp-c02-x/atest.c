#include <stdio.h>
#include <bsd/string.h>
#include <string.h>
#include "ex00/ft_strcpy.c"
#include "ex01/ft_strncpy.c"
#include "ex02/ft_str_is_alpha.c"
#include "ex03/ft_str_is_numeric.c"
#include "ex04/ft_str_is_lowercase.c"
#include "ex05/ft_str_is_uppercase.c"
#include "ex06/ft_str_is_printable.c"
#include "ex07/ft_strupcase.c"
#include "ex08/ft_strlowcase.c"
#include "ex09/ft_strcapitalize.c"
#include "ex10/ft_strlcpy.c"
#include "ex11/ft_putstr_non_printable.c"
#include "ex12/ft_print_memory.c"

int main(void)
{
	printf("-------------- EX00 ft_strcpy --------------\n\n");
	char c1[15] = "Teste do ex 00";
	char c2[15];
	printf("> String original: %s\n", c1);
	printf("> Retorno da func: %s\n", ft_strcpy(c2, c1));
	printf("> String copia:    %s\n", c2);
	printf("\n\n");
	printf("-------------- EX01 ft_strncpy --------------\n\n");
	char c3[15] = "Teste do ex 01";
	char c4[15];
	printf("> String original:      %s\n", c3);
	printf("> Retorno da func:      %s\n", ft_strncpy(c4, c3, 3));
	printf("> String copia:         %s\n", c4);
	printf("> Retorno da func orig: %s\n", strncpy(c4, c3, 3));
	printf("> String copia orig:    %s\n", c4);
	printf("> Teste 2\n");
	printf("> Retorno da func:      %s\n", ft_strncpy(c4, c3, 15));
	printf("> String copia:         %s\n", c4);
	printf("> Retorno da func orig: %s\n", strncpy(c4, c3, 15));
	printf("> String copia orig:    %s\n", c4);
	printf("\n\n");
	printf("-------------- EX02 ft_str_is_alpha --------------\n\n");
	printf("> Retorno da func: %d\n", ft_str_is_alpha("123"));
	printf("> Retorno da func: %d\n", ft_str_is_alpha("asd"));
	printf("> Retorno da func: %d\n", ft_str_is_alpha("asd asd"));
	printf("> Retorno da func: %d\n", ft_str_is_alpha("asd ASD"));
	printf("> Retorno da func: %d\n", ft_str_is_alpha("asdASD"));
	printf("> Retorno da func: %d\n", ft_str_is_alpha("asd 123"));
	printf("\n\n");
	printf("-------------- EX03 ft_str_is_numeric --------------\n\n");
	printf("> Retorno da func: %d\n", ft_str_is_numeric("123"));
	printf("> Retorno da func: %d\n", ft_str_is_numeric("asd"));
	printf("> Retorno da func: %d\n", ft_str_is_numeric("asd asd"));
	printf("> Retorno da func: %d\n", ft_str_is_numeric("asd ASD"));
	printf("> Retorno da func: %d\n", ft_str_is_numeric("asdASD"));
	printf("> Retorno da func: %d\n", ft_str_is_numeric("asd 123"));
	printf("\n\n");
	printf("-------------- EX04 ft_str_is_lowercase --------------\n\n");
	printf("> Retorno da func: %d\n", ft_str_is_lowercase("123"));
	printf("> Retorno da func: %d\n", ft_str_is_lowercase("asd"));
	printf("> Retorno da func: %d\n", ft_str_is_lowercase("asd asd"));
	printf("> Retorno da func: %d\n", ft_str_is_lowercase("asd ASD"));
	printf("> Retorno da func: %d\n", ft_str_is_lowercase("asdASD"));
	printf("> Retorno da func: %d\n", ft_str_is_lowercase("asd 123"));
	printf("\n\n");
	printf("-------------- EX05 ft_str_is_uppercase --------------\n\n");
	printf("> Retorno da func: %d\n", ft_str_is_uppercase("123"));
	printf("> Retorno da func: %d\n", ft_str_is_uppercase("ASD"));
	printf("> Retorno da func: %d\n", ft_str_is_uppercase("asd asd"));
	printf("> Retorno da func: %d\n", ft_str_is_uppercase("asd ASD"));
	printf("> Retorno da func: %d\n", ft_str_is_uppercase("asdASD"));
	printf("> Retorno da func: %d\n", ft_str_is_uppercase("asd 123"));
	printf("\n\n");
	printf("-------------- EX06 ft_str_is_printable --------------\n\n");
	printf("> Retorno da func: %d\n", ft_str_is_printable("123"));
	printf("> Retorno da func: %d\n", ft_str_is_printable("ASD"));
	printf("> Retorno da func: %d\n", ft_str_is_printable("asd\nasd"));
	printf("> Retorno da func: %d\n", ft_str_is_printable("asd\tASD"));
	printf("> Retorno da func: %d\n", ft_str_is_printable("asdASD"));
	printf("> Retorno da func: %d\n", ft_str_is_printable("asd 123"));
	printf("\n\n");
	printf("-------------- EX07 ft_strupcase --------------\n\n");
	char cc[10] = "123";
	printf("> Retorno da func com \"%s\": %s\n", cc, ft_strupcase(cc));
	char cc1[10] = "asd1asd";
	printf("> Retorno da func com \"asd1asd\": %s\n", ft_strupcase(cc1));
	char cc2[10] = "asdASD";
	printf("> Retorno da func com \"asdASD\": %s\n", ft_strupcase(cc2));
	printf("\n\n");
	printf("-------------- EX08 ft_strlowcase --------------\n\n");
	char cc3[10] = "123";
	printf("> Retorno da func com \"123\": %s\n", ft_strlowcase(cc3));
	char cc4[10] = "asd1asd";
	printf("> Retorno da func com \"asd1asd\": %s\n", ft_strlowcase(cc4));
	char cc5[10] = "asdASD";
	printf("> Retorno da func com \"asdASD\": %s\n", ft_strlowcase(cc5));
	printf("\n\n");
	printf("-------------- EX09 ft_strcapitalize --------------\n\n");
	char c6[] = "salut, comment tu vas ? 42mots quarante-deux; cinquante+et+un";
	printf("> Retorno da func com: \"salut, comment tu vas ? 42mots quarante-deux; cinquante+et+un\": %s\n", ft_strcapitalize(c6));
	printf("\n\n");
	printf("-------------- EX10 ft_strlcpy --------------\n\n");
	char c7[15] = "Teste do ex 01";
	char c8[15];
	printf("> String original: %s\n", c7);
	printf("> Retorno da func: %d\n", ft_strlcpy(c8, c7, 3));
	printf("> String copia: %s\n", c8);
	printf("> Retorno da func: %li\n", strlcpy(c8, c7, 3));
	printf("> String copia: %s\n", c8);
	printf("> Teste 2\n");
	printf("> Retorno da func: %d\n", ft_strlcpy(c8, c7, 15));
	printf("> String copia: %s\n", c8);
	printf("> Retorno da func: %li\n", strlcpy(c8, c7, 15));
	printf("> String copia: %s\n", c8);
	printf("\n\n");
	printf("-------------- EX11 ft_putstr_non_printable --------------\n\n");
	printf("> Teste 1\n");
	ft_putstr_non_printable("asd\nasd");
	printf("\n> Teste 2\n");
	ft_putstr_non_printable("asd\tasd");
	printf("\n> Teste 3\n");
	ft_putstr_non_printable("asd");
	printf("\n> Teste 4\n");
	ft_putstr_non_printable("123asguid");
	printf("\n> Teste 5\n");
	ft_putstr_non_printable("asda\t\tasdas");
	printf("\n\n");
	printf("------------------ EX12 ft_print_memory ------------------\n\n");
	char *str12_0 = "Bonjour les aminches... c'est foul toutcool show mem on fait de truc terrible\1\2";
	ft_print_memory(str12_0, strlen(str12_0));

	return 0;
}

/*Para testar a strlcpy original, você deve compilar o exercício com a
flag -lbsd, ex: gcc -Wall -Werror -Wextra -lbsd test.c*/