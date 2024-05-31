import cls from "./Typography.module.scss";
import cn from "classnames";

type TypographyProps = {
  font?: "ALSHauss" | "Roboto";
  size?: 12 | 14 | 16 | 18 | 20 | 32;
  weight?: 400 | 500 | 700;
  height?: "16px" | "18px" | "20px" | "22px" | "24px" | "44px";
  color?: "corp" | "primary" | "suxess" | "secondary" | "blind" | "triple";
  children?: any;
};

const Typography = ({
  children,
  color = "primary",
  font = "ALSHauss",
  weight = 500,
  size = 16,
  height = "24px",
}: TypographyProps) => {
  const styles = {
    fontFamily: font,
    fontWeight: weight,
    fontSize: size,
    lineHeight: height,
  };
  return (
    <span className={cn(cls.text, cls[color])} style={styles}>
      {children}
    </span>
  );
};

export default Typography;
