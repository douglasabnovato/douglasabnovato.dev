/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strcapitalize.c                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cvieira <cvieira@student.42sp.org.br>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/02/19 00:28:08 by cvieira           #+#    #+#             */
/*   Updated: 2022/02/19 04:17:45 by cvieira          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

char	*ft_strcapitalize(char *str)
{
	int	i;
	int	j;

	i = 0;
	j = 0;
	while (str[i])
	{
		if (j == 0 && (str[i] >= 'a' && str[i] <= 'z'))
		{
			str[i] -= 'a' - 'A';
			j++;
		}
		else if (j > 0 && (str[i] >= 'A' && str[i] <= 'Z'))
			str[i] += 'a' - 'A';
		else if ((str[i] < '0') || (str[i] > '9' && str[i] < 'A') \
					|| (str[i] > 'Z' && str[i] < 'a') || (str[i] > 'z'))
			j = 0;
		else
			j++;
		i++;
	}
	return (str);
}
