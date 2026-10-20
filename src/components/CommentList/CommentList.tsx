import type { CommentItemType } from "../../types";
import { CommentItem } from "../CommentItem/CommentItem";
import "./CommentList.css";

type CommentListProps = {
  comments: CommentItemType[] | number[];
};
export const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div className="comment-list">
      {comments.map((comment) => {
        if (typeof comment !== "number") {
          return <CommentItem comment={comment} key={comment.id} />;
        }
      })}
    </div>
  );
};
