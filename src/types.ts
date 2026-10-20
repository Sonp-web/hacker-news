export interface Story {
  by: string;
  descendants: number;
  id: number;
  kids?: number[];
  score: number;
  text?: string;
  time: number;
  title: string;
  type: "story";
  url?: string;
  dead?: boolean;
  deleted?: boolean;
}
export interface CommentItemType {
  by?: string;
  id: number;
  kids?: number[] | CommentItemType[];
  parent: number;
  text?: string;
  time: number;
  type: "comment";
  deleted?: boolean;
  dead?: boolean;
}
