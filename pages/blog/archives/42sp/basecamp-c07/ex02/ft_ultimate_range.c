/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_ultimate_range.c                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: doantoni <doantoni@student.42sp.org.br>    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/02/17 04:14:52 by bbonaldi          #+#    #+#             */
/*   Updated: 2022/02/18 13:32:31 by doantoni         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdlib.h>

int	ft_ultimate_range(int **range, int min, int max)
{
	int	range_values;
	int	i;

	if (min >= max)
	{
		*range = NULL;
		return (0);
	}
	i = -1;
	range_values = (max - min);
	*range = (int *)malloc(sizeof(int) * range_values);
	if (range == NULL)
	{
		*range = NULL;
		return (-1);
	}
	else
	{
		i = -1;
		while (++i < range_values)
			range[0][i] = min + i;
	}
	return (i);
}

#include <stdio.h>

void    display_array(int *arr[], int size)
{
    int i = 0;
    while (i < size)
    {
        printf("%d\n",arr[0][i]);
        i++;
    }
}
 
int main ()
{
    int min = 1;
    int max = 100;
    int **arr;
    arr = (int **)malloc(sizeof(**arr));
    int i = ft_ultimate_range(arr,min, max);
    printf("%d\n\n", i);
    display_array(arr,max - min);
    free(arr);
    return (0);
}
