/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: doantoni <doantoni@student.42sp.org.br>    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/02/16 22:22:54 by doantoni          #+#    #+#             */
/*   Updated: 2022/02/18 21:53:06 by doantoni         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdio.h>

int    main(void)
{
    int    tab[15] = {-2, -12345, 228, 49, -1, 0, 5, 22, -22, 42, -43, 115, 89, 1999, 67};
    int    size;
    int    i;

    size = 15;
    i = 0;
    printf("Antes: ");
    while (i < size)
    {
        printf("%d ", tab[i]);
        i++;
    }
    ft_sort_int_tab(&tab[0], size);
    i = 0;
    printf("\nDepois: ");
    while (i < size)
    {
        printf("%d ", tab[i]);
        i++;
    }
    printf("\n");
    return (0);
}
