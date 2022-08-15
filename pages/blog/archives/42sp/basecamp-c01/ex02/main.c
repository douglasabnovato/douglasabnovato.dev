/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: doantoni <doantoni@student.42sp.org.br>    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/02/14 23:11:57 by doantoni          #+#    #+#             */
/*   Updated: 2022/02/17 22:30:55 by doantoni         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdio.h>

void	ft_swap(int *a, int *b);

int main()
{
	int a;
	int b;

	int *pa = &a;
	int *pb = &b;

	a = 19;
	b = 5;
	
	printf("%d %d\n",a,b);
	ft_swap(pa, pb);
	printf("%d %d\n",*pa, *pb);
} 
