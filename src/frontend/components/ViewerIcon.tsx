const ViewerIcon = ({
  Icon,
  handleClick,
}: {
  Icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  handleClick: () => void;
}) => {
  return (
    <Icon
      className="sm:text-light text-green/80 cursor-pointer size-7"
      onClick={handleClick}
    />
  );
};

export default ViewerIcon;
