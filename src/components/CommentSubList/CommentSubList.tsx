import { useParams } from "react-router-dom";

export const CommentSubList: React.FC = () => {
  const { commentId } = useParams();
  return <>SubList{commentId}</>;
};
