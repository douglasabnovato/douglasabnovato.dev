/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: doantoni <doantoni@student.42sp.org.br>    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/02/16 22:21:00 by doantoni          #+#    #+#             */
/*   Updated: 2022/02/18 21:52:58 by doantoni         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdio.h>

int    main(void)
{
    int    tab[11] = {1, -50, 3, 500, -39, 0, 87, 22, 70, 200, 30};
    int    size;
    int    i;

    size = 11;
    i = 0;
    printf("Antes: ");
    while (i < size)
    {
        printf("%d ", tab[i]);
        i++;
    }
    ft_rev_int_tab(&tab[0], size);
    i = 0;
    printf("\nDepois: ");
    while (i < size)
    {
        printf("%d ", tab[i]);
        i++;
    }
    printf("\n");
}
