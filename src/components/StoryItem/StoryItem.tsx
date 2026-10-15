import { Link } from "react-router-dom";
import type { Story } from "../../types";
import { RightOutlined } from "@ant-design/icons";
import { formatTime } from "../../utils/formatTime";
import "./StoryItem.css";
import { formatComment } from "../../utils/formatComments";

type StoryItemProps = {
  story: Story;
  index: number;
};

export const StoryItem: React.FC<StoryItemProps> = ({ story, index }) => {
  return (
    <Link to={`/item/${story.id}`} className="story-item-link">
      <p className="story-item-num">{index + 1}</p>
      <div className="story-item-wrapper">
        <div className="story-item-decsr">
          <h2 className="story-item-title">{story.title}</h2>
          <div className="story-item-subtitle-wrapper">
            <p className="story-item-points">{story.score} points</p>
            <p className="story-item-by">by {story.by}</p>
            <p className="story-item-time">{formatTime(story.time)}</p>
            <p className="story-item-comments">
              {formatComment(story.descendants)}
            </p>
          </div>
        </div>
        <RightOutlined />
      </div>
    </Link>
  );
};
