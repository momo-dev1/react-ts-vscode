import { useDispatch, useSelector } from "react-redux";
import {
  setClickedFileAction,
  setOpenedFilesAction,
  setTabIdToRemoveAction,
} from "../app/features/fileTreeSlice";
import { RootState } from "../app/store";
import { IFile } from "../interfaces";
import RenderFileIcon from "./RenderFileIcon";
import CloseIcon from "./SVG/CloseIcon";

interface IProps {
  file: IFile;
}

const OpenedFilesBarTab = ({ file }: IProps) => {
  const dispatch = useDispatch();

  const {
    openedFiles,
    clickedFile: { activeTabId },
  } = useSelector((state: RootState) => state.tree);

  // ** Handlers
  const onClick = () => {
    const { id: activeTabId, name: filename, content: fileContent } = file;
    dispatch(setClickedFileAction({ filename, fileContent, activeTabId }));
  };
  const onRemove = (selectedId: string) => {};

  return (
    <div
      className={`max-w-screen-md flex items-center p-2 border-t-2 ${
        file.id === activeTabId ? "border-[#cf6ccf]" : "border-transparent"
      }`}
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        dispatch(setTabIdToRemoveAction(file.id));
      }}
    >
      <RenderFileIcon fileName={file.name} />
      <span className="cursor-pointer duration-300 flex justify-center items-center w-fit mx-2 p-1 rounded-md">
        {file.name}
      </span>
      <span
        className="cursor-pointer hover:bg-[#64646473] duration-300 flex justify-center items-center w-fit mr-2 p-1 rounded-md"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(file.id);
        }}
      >
        <CloseIcon />
      </span>
    </div>
  );
};

export default OpenedFilesBarTab;
