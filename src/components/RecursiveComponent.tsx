import { IFile } from "../interfaces";
import BottomArrowIcon from "./SVG/BottomArrow";
import RightArrowIcon from "./SVG/RightArrow";
import { useState } from "react";
import RenderFileIcon from "./RenderFileIcon";
import { RootState, AppDispatch } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { setOpenedFilesAction } from "../app/features/fileTreeSlice";

interface IProps {
  fileTree: IFile;
}

const RecursiveComponent = ({ fileTree }: IProps) => {
  const { isFolder, name, children } = fileTree;
  const dispatch = useDispatch<AppDispatch>();
  const { openedFiles } = useSelector((state: RootState) => state.tree);
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
          <div
            className="flex items-center mr-2 ml-4"
            onClick={() =>
              dispatch(setOpenedFilesAction([...openedFiles, fileTree]))
            }
          >
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
