/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: doantoni <doantoni@student.42sp.org.br>    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/02/16 22:19:45 by doantoni          #+#    #+#             */
/*   Updated: 2022/02/17 22:30:43 by doantoni         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdio.h>

void	ft_ultimate_div_mod(int *a, int *b);

int	main(void)
{ 
	int x;
	int y;

	x = 4;
	y = 26;
	
	ft_ultimate_div_mod(x, y);
	printf("%d %d\n", &x, &y);
}
