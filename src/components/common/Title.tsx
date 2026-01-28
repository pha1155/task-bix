interface TitleProps {
  title: string;
  className?: string;
}

const Title = ({ title, className }: TitleProps) => {
  return <h2 className={`text-dark-gray text-[2rem] font-bold md:px-0 ${className}`}>{title}</h2>;
};

export default Title;
