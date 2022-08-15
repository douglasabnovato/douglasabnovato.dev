/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strdup.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: doantoni <doantoni@student.42sp.org.br>    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/02/16 17:53:29 by bbonaldi          #+#    #+#             */
/*   Updated: 2022/02/18 13:00:29 by doantoni         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdlib.h>

int	ft_strlen(char *str)
{
	int	i;

	i = 0;
	while (str[i])
		i++;
	return (i);
}

char	*ft_strdup(char *src)
{
	char	*c;
	int		src_len;
	int		i;

	src_len = ft_strlen(src);
	c = malloc(sizeof(*c) * src_len + 1);
	i = 0;
	while (src[i])
	{
		c[i] = src[i];
		i++;
	}
	c[i] = '\0';
	return (c);
}

#include <stdio.h>
int main ()
{
    char s[] = "abcdef";
    char *c;
    c = ft_strdup(s);
    printf("%s", c);
    free(c);
    return (0);
}
