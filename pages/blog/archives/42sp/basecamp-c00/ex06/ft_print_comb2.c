/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_print_comb2.c                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: doantoni <doantoni@student.42sp.org.br>    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/02/11 22:39:11 by doantoni          #+#    #+#             */
/*   Updated: 2022/02/18 18:33:55 by doantoni         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <unistd.h>

void	print_number(int n)
{
	int	val1;
	int	val2;

	val1 = n / 10 + 48;
	val2 = n % 10 + 48;
	write(1, &val1, 1);
	write(1, &val2, 1);
}

void	ft_print_comb2(void)
{
	int	x;
	int	y;

	x = 0;
	y = 0;
	while (x <= 99)
	{
		y = x + 1;
		while (y <= 99)
		{
			print_number(x);
			write(1, " ", 1);
			print_number(y);
			if (!(x == 98 && y == 99))
				write(1, ", ", 2);
		y++;
		}
		x++;
	}
}
