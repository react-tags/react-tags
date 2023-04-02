interface ReactTagsProps {
  placeholder: string;
}

function ReactTags({ placeholder }: ReactTagsProps) {
  console.log(placeholder);
  return <div>React tags</div>;
}

export default ReactTags;