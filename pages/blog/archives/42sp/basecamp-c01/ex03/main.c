/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: doantoni <doantoni@student.42sp.org.br>    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/02/14 23:27:55 by doantoni          #+#    #+#             */
/*   Updated: 2022/02/17 22:30:48 by doantoni         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdio.h>

void	ft_div_mod(int a, int b, int *div, int *mod);

int main()
{
	int a;
	int b;
	int c;
	int d;

	int *div = &c;
	int *mod = &d;

	a = 7;
	b = 2;
	
	printf("%d %d\n",a,b);
	ft_div_mod(a, b, div, mod);
	printf("%d %d\n",c, d);
}
