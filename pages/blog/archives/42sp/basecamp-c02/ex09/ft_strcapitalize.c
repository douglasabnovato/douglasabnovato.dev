 
char    *ft_strcapitalize(char *str)
{
    int    a;

    a = 0;
    while (str[a])
    {
        if (str[a - 1] == 32 || (str[a - 1] == '-' || str[a - 1] == '+'))
        {
            if (str[a] >= 'a' && str[a] <= 'z')
            {
                str[a] -= 32;
            }
        }
        else if (a == 0 && (str[a] >= 'a' && str[a] <= 'z'))
        {
            str[a] -= 32;
        }
        else if (str[a - 1] != 32 && (str[a] >= 'A' && str[a] <= 'Z'))
        {
            str[a] += 32;
        }
        a++;
    }
    return (str);
}