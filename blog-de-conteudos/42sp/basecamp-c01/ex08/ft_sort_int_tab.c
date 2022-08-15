/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_sort_int_tab.c                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: doantoni <doantoni@student.42sp.org.br>    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/02/16 21:56:32 by doantoni          #+#    #+#             */
/*   Updated: 2022/02/18 21:53:01 by doantoni         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

void	execution(int j, int size, int aux, int *begin)
{
	while (j < size)
	{
		if (j != (size - 1))
		{
			if (*begin > *(begin + 1))
			{
				aux = *begin;
				*begin = *(begin + 1);
				*(begin + 1) = aux;
			}
		}
		begin++;
		j++;
	}
}

void	ft_sort_int_tab(int *tab, int size)
{
	int	i;
	int	j;
	int	aux;
	int	*begin;

	begin = tab;
	i = 0;
	while (i < size)
	{
		aux = *begin;
		j = 0;
		begin = tab;
		execution(j, size, aux, begin);
		i++;
	}
}
