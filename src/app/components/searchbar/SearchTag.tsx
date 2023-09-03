import { TagIcon } from "@heroicons/react/20/solid";
import { BsFillPersonFill } from "react-icons/bs";
import { FiHash } from "react-icons/fi";
import { FaFolder } from "react-icons/fa";
import {
  LiaGreaterThanEqualSolid,
  LiaLessThanEqualSolid,
} from "react-icons/lia";

type TSearchTagProps = {
  tag: string;
  onRemoveClick: (tag: string) => void;
};

export const SearchTag = ({ tag, onRemoveClick }: TSearchTagProps) => {
  const [type, value] = tag.split(":").map((e) => e.trim());

  const tagClass = "h-4 w-4 flex-shrink-0 text-indigo-400";
  return (
    <>
      <span className="inline-flex items-center gap-x-0.5 rounded-md bg-indigo-50 px-2 py-1 mr-2 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
        {type == "tag" && <TagIcon className={tagClass} aria-hidden="true" />}
        {type == "user" && (
          <BsFillPersonFill className={tagClass} aria-hidden="true" />
        )}
        {type == "id" && <FiHash className={tagClass} aria-hidden="true" />}
        {type == "run" && <FiHash className={tagClass} aria-hidden="true" />}
        {type == "project" && (
          <FaFolder className={tagClass} aria-hidden="true" />
        )}
        {type == "after" && (
          <LiaGreaterThanEqualSolid className={tagClass} aria-hidden="true" />
        )}
        {type == "before" && (
          <LiaLessThanEqualSolid className={tagClass} aria-hidden="true" />
        )}
        {value ? value : tag}
        <button
          type="button"
          className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-indigo-600/20"
          onClick={() => onRemoveClick(tag)}
        >
          <span className="sr-only">Remove</span>
          <svg
            viewBox="0 0 14 14"
            className="h-3.5 w-3.5 stroke-indigo-600/50 group-hover:stroke-indigo-600/75"
          >
            <path d="M4 4l6 6m0-6l-6 6" />
          </svg>
          <span className="absolute -inset-1" />
        </button>
      </span>
    </>
  );
};
