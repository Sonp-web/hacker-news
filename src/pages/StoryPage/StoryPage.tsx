import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined, ReloadOutlined } from "@ant-design/icons";
import { formatTime } from "../../utils/formatTime";
import { formatComment } from "../../utils/formatComments";
import { useEffect } from "react";
import { loadStory, selectStory } from "../../redux/slices/actualStory";
import "./StoryPage.css";

export const StoryPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const actualStory = useAppSelector(selectStory);
  useEffect(() => {
    if (id && actualStory?.id !== +id) {
      dispatch(loadStory(id));
    }
  }, [dispatch, id, actualStory]);

  return (
    <>
      <Link to="/">
        <Button type="primary" icon={<ArrowLeftOutlined />}>
          К новостям
        </Button>
      </Link>
      {actualStory && (
        <>
          <div className="story-page-header">
            <h1 className="story-page-title">{actualStory.title}</h1>
            <p className="story-page-url">{actualStory.url}</p>
            <p className="story-page-score">{actualStory.score}</p>
            <p className="story-page-by">{actualStory.by}</p>
            <p className="story-page-time">{formatTime(actualStory.time)}</p>
            <p className="story-page-comments">
              {formatComment(actualStory.descendants)}
            </p>
          </div>
          <div className="story-page-comm-toolbar">
            <h2 className="story-page-comm-title">
              Комментарии ({actualStory.descendants})
            </h2>
            <Button type="primary" icon={<ReloadOutlined />}>
              Обновить
            </Button>
          </div>
        </>
      )}
    </>
  );
};
