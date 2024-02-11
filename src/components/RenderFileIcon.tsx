interface IProps {
  name: string;
}

const RenderFileIcon = (props: IProps) => {
  return <div>{props.name}</div>;
};

export default RenderFileIcon;
