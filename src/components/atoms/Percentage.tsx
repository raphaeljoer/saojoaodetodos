
import React from "react";
import Text, { TextProps } from "@/components/atoms/Text";

interface PercentageProps extends TextProps {
  value: number;
  limit?: number;
};

export const Percentage = ({ value, limit = 5, ...props }: PercentageProps) => (
  <Text color="white" fontWeight="700" {...props}>
    {`${String(value).slice(0, limit)}%`}
  </Text>
);

export default Percentage;
