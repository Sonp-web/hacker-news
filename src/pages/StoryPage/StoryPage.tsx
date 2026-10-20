import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { Button } from "antd";
import { Link } from "react-router-dom";
import {
  ArrowLeftOutlined,
  ExportOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { formatTime } from "../../utils/formatTime";
import { formatComment } from "../../utils/formatComments";
import { getHostname } from "../../utils/getHostname";
import { useEffect } from "react";
import {
  loadStory,
  selectStatus,
  selectStory,
} from "../../redux/slices/actualStory";
import "./StoryPage.css";
import { LoadingError } from "../../components/LoadingError/LoadingError";
import { CommentList } from "../../components/CommentList/CommentList";
import {
  loadingComments,
  selectComments,
} from "../../redux/slices/commentsSlice";

export const StoryPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const actualStory = useAppSelector(selectStory);
  const status = useAppSelector(selectStatus);
  const isActual = actualStory?.id === Number(id) ? true : null;
  const comments = useAppSelector(selectComments);
  useEffect(() => {
    if (id && !isActual) {
      dispatch(loadStory(id));
    }
    if (isActual && actualStory) {
      dispatch(loadingComments(actualStory.kids ?? []));
    }
  }, [dispatch, id, actualStory, isActual]);

  const tempFunc = () => {
    if (id) dispatch(loadStory(id));
  };
  return (
    <>
      <Link to="/">
        <ArrowLeftOutlined /> К новостям
      </Link>

      <LoadingError
        status={status}
        isActual={isActual}
        loading={tempFunc}
        component={
          actualStory && (
            <>
              <div className="story-page-header">
                <h1 className="story-page-title">{actualStory.title}</h1>
                <a
                  className="story-page-url"
                  href={
                    actualStory.url ??
                    `https://news.ycombinator.com/item?id=${actualStory.id}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {actualStory.url
                    ? getHostname(actualStory.url)
                    : "Открыть на Hacker News"}{" "}
                  <ExportOutlined />
                </a>
                <p className="story-page-score">{actualStory.score}</p>
                <p className="story-page-by">{actualStory.by}</p>
                <p className="story-page-time">
                  {formatTime(actualStory.time)}
                </p>
                <p className="story-page-comments">
                  {formatComment(actualStory.descendants)}
                </p>
              </div>
              <div className="story-page-comm-toolbar">
                <h2 className="story-page-comm-title">
                  Комментарии ({actualStory.descendants})
                </h2>
                <Button
                  type="primary"
                  icon={<ReloadOutlined />}
                  onClick={() => {
                    dispatch(loadingComments(actualStory.kids ?? []));
                  }}
                >
                  Обновить
                </Button>
              </div>
              {comments[0]?.parent === actualStory.id && (
                <CommentList comments={comments} />
              )}
            </>
          )
        }
      />
    </>
  );
};
