import { clsx } from "clsx";

type TagProps = {
  name: string;
};

export const Tag: React.FC<TagProps> = ({ name }) => {
  return (
    <span className="inline-flex items-center rounded-full bg-gray-100 px-1.5 py-0.5 mx-1 text-xs font-medium text-gray-600">
      {name}
    </span>
  );
};

type StatusTagProps = {
  name: string;
  type: string;
};

export const StatusTag: React.FC<StatusTagProps> = ({ name, type }) => {
  const styles = clsx({
    "inline-flex items-center gap-x-1.5 rounded-full bg-green-100 px-2 py-1 text-xs font-medium capitalize":
      true,
    "bg-green-100 text-green-700": type === "success",
    "bg-red-100 text-red-700": type === "error" || type === "aborted",
    "bg-orange-100 text-orange-700":
      type === "pending" ||
      type === "running" ||
      type === "new" ||
      type == "submitted",
  });
  const dotStyles = clsx({
    "h-1.5 w-1.5": true,
    "fill-green-500": type === "success",
    "fill-red-500": type === "error" || type === "aborted",
    "fill-orange-500":
      type === "pending" ||
      type === "running" ||
      type === "new" ||
      type == "submitted",
  });
  return (
    <span className={styles}>
      <svg className={dotStyles} viewBox="0 0 6 6" aria-hidden="true">
        <circle cx={3} cy={3} r={3} />
      </svg>
      {name}
    </span>
  );
};
