/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_range.c                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: doantoni <doantoni@student.42sp.org.br>    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/02/16 18:14:55 by bbonaldi          #+#    #+#             */
/*   Updated: 2022/02/18 13:18:36 by doantoni         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdlib.h>

int	*ft_range(int min, int max)
{
	int	i;
	int	*range;
	int	range_values;

	i = 0;
	if (min >= max)
		return (NULL);
	range_values = (max - min);
	range = (int *)malloc(sizeof(*range) * range_values);
	if (range == NULL)
		return (NULL);
	while (i < range_values)
	{
		range[i] = min + i;
		i++;
	}
	return (range);
}

#include <stdio.h>

void    display_array(int arr[], int size)
{
    int i = 0;
    while (i < size)
    {
        printf("%d\n",arr[i]);
        i++;
    }
}


int main ()
{
    int min = 1;
    int max = 100;
    int *arr;
    arr = ft_range(min, max);
    display_array(arr,max - min);
    free(arr);
    return (0);
}
