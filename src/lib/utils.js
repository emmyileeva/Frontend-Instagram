import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow, parseISO } from "date-fns";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const getTimeAgo = (dateString) => {
  const date = parseISO(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
};
export const checkIsLiked = (likeList, userId) => {
  return likeList.includes(userId);
};

export const convertFileToUrl = (file) => {
  return URL.createObjectURL(file);
};

export default getTimeAgo;
