import { IFile } from "../interfaces";
import BottomArrowIcon from "./SVG/BottomArrow";
import RightArrowIcon from "./SVG/RightArrow";
import { useState } from "react";
import RenderFileIcon from "./RenderFileIcon";

interface IProps {
  fileTree: IFile;
}

const RecursiveComponent = ({
  fileTree: { isFolder, name, children },
}: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);
  return (
    <div className="w-full mb-1 cursor-pointer ml-4">
      <div className="flex items-center mb-1 ">
        {isFolder ? (
          <div onClick={toggle} className="flex items-center">
            <span className="mr-1">
              {isOpen ? <BottomArrowIcon /> : <RightArrowIcon />}
            </span>
            <RenderFileIcon
              fileName={name}
              isOpen={isOpen}
              isFolder={isFolder}
            />
            <span className="ml-2 text-lg">{name}</span>
          </div>
        ) : (
          <div className="flex items-center mr-2 ml-4">
            <RenderFileIcon fileName={name} />
            <span className="ml-2 text-lg">{name}</span>
          </div>
        )}
      </div>
      {isOpen &&
        children &&
        children.map((file, idx) => (
          <RecursiveComponent fileTree={file} key={idx} />
        ))}
    </div>
  );
};

export default RecursiveComponent;
