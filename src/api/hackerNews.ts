import type { CommentItemType, Story } from "../types";

const BASE_URL = "https://hacker-news.firebaseio.com/v0";
const COUNT_STORIES = 100;
export const request = async <T>(path: string): Promise<T> => {
  const response = await fetch(BASE_URL + path);
  if (!response.ok) {
    throw new Error(`Ошибка запроса: ${response.status}`);
  }
  return response.json() as Promise<T>;
};

export const loadOneStory = async (id: string): Promise<Story> => {
  const res = await request<Story>(`/item/${id}.json`);
  if (res.type === "story") {
    return res;
  } else {
    throw new Error("not story");
  }
};

function isLoadedComments(
  item: PromiseSettledResult<CommentItemType | null>,
): item is PromiseFulfilledResult<CommentItemType> {
  return item.status === "fulfilled" && item.value !== null;
}
export const loadComments = async (
  arr: number[] | CommentItemType[],
): Promise<CommentItemType[]> => {
  const comments = await Promise.allSettled(
    arr.map((id) => request<CommentItemType | null>(`/item/${id}.json`)),
  );
  return comments.filter(isLoadedComments).map((item) => item.value);
};
function isLoaded(
  item: PromiseSettledResult<Story | null>,
): item is PromiseFulfilledResult<Story> {
  return (
    item.status === "fulfilled" &&
    item.value !== null &&
    !item.value.dead &&
    !item.value.deleted
  );
}
const addCountStories = async (
  arr: number[],
  count: number,
): Promise<PromiseFulfilledResult<Story>[]> => {
  const temp = arr.splice(0, count);
  const stories = await Promise.allSettled(
    temp.map((id) => request<Story | null>(`/item/${id}.json`)),
  );
  return stories.filter(isLoaded);
};
export const loadStories = async (): Promise<Story[]> => {
  const ids = await request<number[]>("/newstories.json");

  let filterStories = await addCountStories(ids, COUNT_STORIES);
  while (filterStories.length < COUNT_STORIES && ids.length !== 0) {
    const addArray = await addCountStories(
      ids,
      COUNT_STORIES - filterStories.length,
    );
    filterStories = [...filterStories, ...addArray];
  }

  if (filterStories.length === 0) throw new Error("No stories");
  const arrayStories = filterStories.map((item) => item.value);

  return arrayStories;
};
