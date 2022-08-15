/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_print_alphabet.c                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: doantoni <doantoni@student.42sp.org.br>    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/02/11 15:22:04 by doantoni          #+#    #+#             */
/*   Updated: 2022/02/18 18:33:14 by doantoni         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <unistd.h>

void	ft_print_alphabet(void)
{
	char	letter;
	int		index;

	index = 97;
	while (index <= 122)
	{
		letter = index;
		write(1, &letter, 1);
		index++;
	}
}
