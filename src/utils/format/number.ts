const intl = (value: string | number): string => Intl.NumberFormat('pt-BR').format(Number(value));

export { intl };
