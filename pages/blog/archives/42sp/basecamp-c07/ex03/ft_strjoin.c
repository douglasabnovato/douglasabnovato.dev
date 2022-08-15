/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strjoin.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: doantoni <doantoni@student.42sp.org.br>    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/02/17 14:39:13 by bbonaldi          #+#    #+#             */
/*   Updated: 2022/02/18 13:34:03 by doantoni         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdlib.h>

int	ft_strlen(char *c)
{
	int	i;

	i = 0;
	while (c[i] != '\0')
		i++;
	return (i);
}

int	get_total_len(int size, char **strs, char *sep)
{
	int	i;
	int	len_counter;
	int	sep_counter;

	i = 0;
	len_counter = 0;
	while (i < size)
	{
		len_counter += ft_strlen(strs[i]);
		i++;
	}
	i = 0;
	sep_counter = ft_strlen(sep);
	len_counter = (len_counter + (size - 1) * sep_counter);
	return (len_counter);
}	

char	*ft_strcat(char *dest, char *src)
{
	int	i;
	int	dest_len;

	i = 0;
	dest_len = ft_strlen(dest);
	while (src[i])
	{
		dest[dest_len + i] = src[i];
		i++;
	}
	dest[dest_len + i] = '\0';
	return (dest);
}

char	*ft_strjoin(int size, char **strs, char *sep)
{
	int		i;
	int		total_len;
	char	*result_cat;

	if (size == 0)
	{
		result_cat = (char *)malloc(sizeof(char));
		return (result_cat);
	}
	i = 0;
	total_len = get_total_len(size, strs, sep);
	result_cat = (char *)malloc(sizeof(*result_cat) * total_len + 1);
	while (i < size)
	{
		ft_strcat(result_cat, strs[i]);
		if (i < size -1)
			ft_strcat(result_cat, sep);
		i++;
	}
	return (result_cat);
}

#include <stdio.h>

int main ()
{
    char *c[] = {"abc","cba","qoeee"};
    char sep[] = ",";
    char *result;
    
    result = ft_strjoin(3,c,sep);
    printf("%s\n", result);
    return (0);
}