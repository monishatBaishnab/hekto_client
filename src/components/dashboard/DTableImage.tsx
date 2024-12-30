const DTableImage = ({
  title,
  image,
  helper,
}: {
  title: string;
  helper: string;
  image: string;
}) => {
  return (
    <div className="flex gap-2">
      <div className="size-10 overflow-hidden rounded-lg">
        <img className="size-full object-contain" src={image} alt={title} />
      </div>
      <div className="space-y-1">
        <h6 className="font-medium text-h-black">{title}</h6>
        <span className="text-sm text-athens-gray-700">{helper}</span>
      </div>
    </div>
  );
};

export default DTableImage;
