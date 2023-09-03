"use client";

import { useState } from "react";
import { clsx } from "clsx";
import styles from "./SearchBar.module.scss";
import { add } from "lodash";

type SearchProps = {
  tags: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
};

export const SearchBar: React.FC<SearchProps> = ({
  tags,
  addTag,
  removeTag,
}: SearchProps) => {
  const [search, setSearch] = useState("");

  const addNewTag = (tag: string) => {
    addTag(tag);
    setSearch("");
  };

  return (
    <>
      <div
        className={clsx(
          styles.inputTag,
          "bg-white border border-gray-300 rounded-md pl-2 py-1 flex flex-wrap"
        )}
      >
        <ul
          className={clsx(styles.inputTags, "flex content-center items-center")}
        >
          {tags.map((tag, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-x-0.5 rounded-md bg-indigo-50 px-2 py-1 mr-2 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10"
            >
              {tag}
              <button
                type="button"
                className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-indigo-600/20"
                onClick={() => removeTag(tag)}
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
          ))}
          <li className={clsx(styles.inputTagInput)}>
            <input
              className="w-full focus:outline-none border-none focus:ring-0 text-sm text-gray-900"
              placeholder="Search runs, workflow id, tags etc"
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              onKeyDown={(e) =>
                e.key === "Enter" ? addNewTag(search) : undefined
              }
            />
          </li>
        </ul>
      </div>
      {/* <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
        Search
      </label>
      <div className="relative">
        {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div> */}
      {/* <input
          type="search"
          id="default-search"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search runs, workflow id, tags etc"
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? onSubmit() : undefined)}
        />
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={onSubmit}
        >
          Search
        </button>
      </div>  */}
    </>
  );
};
