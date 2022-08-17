/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_rev_int_tab.c                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: doantoni <doantoni@student.42sp.org.br>    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/02/17 20:36:06 by doantoni          #+#    #+#             */
/*   Updated: 2022/02/18 21:58:20 by doantoni         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <unistd.h>

void	ft_rev_int_tab(int *tab, int size)
{
	int	index;
	int	aux;

	index = 0;
	while (index < size / 2)
	{
		aux = tab[index];
		tab[index] = tab[size - 1 - index];
		tab[size - 1 - index] = aux;
		index++;
	}
}
