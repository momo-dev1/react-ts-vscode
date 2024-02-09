import { IFile } from "../interfaces";
import BottomArrowIcon from "./SVG/Bottom";
import RightArrowIcon from "./SVG/Right";

interface IProps {
  fileTree: IFile;
}

const RecursiveComponent = ({ fileTree }: IProps) => {
  const isOpen = false;
  return (
    <div className="w-full mb-1 ml-1 cursor-pointer">
      <div className="flex items-center mb-1">
        <div className="flex items-center">
          <span className="mr-2">
            {isOpen ? <BottomArrowIcon /> : <RightArrowIcon />}
          </span>

          <span className="ml-2 text-lg">{fileTree.name}</span>
        </div>
      </div>
      {fileTree.children &&
        fileTree.children.map((file, idx) => (
          <RecursiveComponent fileTree={file} key={idx} />
        ))}
    </div>
  );
};

export default RecursiveComponent;
