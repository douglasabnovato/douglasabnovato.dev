/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: doantoni <doantoni@student.42sp.org.br>    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/02/17 21:00:55 by doantoni          #+#    #+#             */
/*   Updated: 2022/02/17 21:08:14 by doantoni         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

void	ft_putchar(char c);

int	main(void)
{
	char dest[2];
	char src[] = "012345678911";
	char *destp;

	destp = ft_strcpy(&dest[0], &src[0]);
	ft_putchar(destp);
	return(0);
}
