import { useState } from "react";
import type { CommentItemType } from "../../types";
import { formatTime } from "../../utils/formatTime";
import { formatReplies } from "../../utils/formatReplies";
import "./CommentItem.css";
import { App, Button } from "antd";
import { loadingSubComments } from "../../redux/slices/commentsSlice";
import { useAppDispatch } from "../../hooks/reduxHook";
import { CommentList } from "../CommentList/CommentList";

type CommentItemProps = {
  comment: CommentItemType;
};

const isIdList = (kids: number[] | CommentItemType[]): kids is number[] =>
  typeof kids[0] === "number";

export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const dispatch = useAppDispatch();
  const { message } = App.useApp();
  const [isLoading, setIsLoading] = useState(false);
  const kids = comment.kids ?? [];
  const isRemoved = comment.deleted || comment.dead;

  const loadReplies = async () => {
    if (!isIdList(kids)) return;
    setIsLoading(true);
    try {
      await dispatch(loadingSubComments(kids)).unwrap();
    } catch {
      message.error("Не удалось загрузить ответы");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="comment-wrapper">
        <div className="comment-wrapper-header">
          <p className="comment-by">{isRemoved ? "—" : comment.by}</p>
          <p className="comment-time">{formatTime(comment.time)}</p>
        </div>
        {isRemoved ? (
          <p className="comment-text comment-text-removed">
            [комментарий удалён]
          </p>
        ) : (
          <div
            className="comment-text"
            dangerouslySetInnerHTML={{ __html: comment.text ?? "" }}
          ></div>
        )}
        {kids.length > 0 && isIdList(kids) && (
          <Button
            type="link"
            size="small"
            className="comment-replies-button"
            loading={isLoading}
            onClick={loadReplies}
          >
            + {formatReplies(kids.length)}
          </Button>
        )}
      </div>
      {kids.length > 0 && !isIdList(kids) && (
        <div className="comment-replies">
          <CommentList comments={kids} />
        </div>
      )}
    </>
  );
};
