import type { CommentItemType } from "../../types";
import { formatTime } from "../../utils/formatTime";
import "./CommentItem.css";
import { Button } from "antd";
import { loadingSubComments } from "../../redux/slices/commentsSlice";
import { useAppDispatch } from "../../hooks/reduxHook";

type CommentItemProps = {
  comment: CommentItemType;
};
export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="comment-wrapper">
        <div className="comment-wrapper-header">
          <p className="comment-by">{comment.by}</p>
          <p className="comment-time">{formatTime(comment.time)}</p>
        </div>
        <div
          className="comment-text"
          dangerouslySetInnerHTML={{ __html: comment.text ?? "" }}
        ></div>
        {comment.kids?.length && (
          <Button
            onClick={() => {
              if (comment.kids) {
                dispatch(loadingSubComments(comment.kids));
              }
            }}
          >
            + {comment.kids?.length} Ответ
          </Button>
        )}
      </div>
    </>
  );
};
