import { StoryItem } from "../StoryItem/StoryItem";
import "./StoryList.css";
import type { Story } from "../../types";
type StoryListProps = {
  stories: Story[];
};
export const StoryList: React.FC<StoryListProps> = ({ stories }) => {
  return (
    <div className="story-list-wrapper">
      {stories.map((item, index) => (
        <StoryItem key={item.id} story={item} index={index} />
      ))}
    </div>
  );
};
