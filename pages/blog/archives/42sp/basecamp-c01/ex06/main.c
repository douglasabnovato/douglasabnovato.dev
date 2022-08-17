/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: doantoni <doantoni@student.42sp.org.br>    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/02/16 22:20:38 by doantoni          #+#    #+#             */
/*   Updated: 2022/02/17 22:30:32 by doantoni         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdio.h>

int main(){
	char nome[10] = "Tiagoahuor";
	int resp;
	resp = ft_strlen(nome);
	printf("A qtd eh: %d", resp);
} 
