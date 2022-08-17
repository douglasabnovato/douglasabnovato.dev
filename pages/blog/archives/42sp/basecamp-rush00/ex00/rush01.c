/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   rush01.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: doantoni <doantoni@student.42sp.org.br>    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/02/06 00:10:04 by mdouglas          #+#    #+#             */
/*   Updated: 2022/02/09 13:25:04 by doantoni         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

void	ft_putchar(char c);

void	rush(int x, int y)
{
	int	c;
	int	r;

	c = 1;
	r = 1;
	while (r <= y)
	{
		while (c <= x)
		{
			if ((r == 1 && c == 1) || (r > 1 && r == y && c > 1 && c == x))
				ft_putchar('/');
			else if ((r == y && c == 1) || (r == 1 && c == x))
				ft_putchar('\\');
			else if (c == 1 || r == y || c == x || r == 1)
				ft_putchar('*');
			else
				ft_putchar(' ');
			c++;
		}
		ft_putchar('\n');
		c = 1;
		r++;
	}
}
