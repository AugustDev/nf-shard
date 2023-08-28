import { clsx } from "clsx";

type ContainerProps = {
  children: React.ReactNode;
  sectionName: string;
  className?: string;
};

export const Container = ({
  children,
  className,
  sectionName,
}: ContainerProps) => {
  return (
    <div
      className={clsx(
        className,
        "w-full  mx-auto bg-white shadow-sm rounded-s"
      )}
    >
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">{sectionName}</h2>
      </header>
      <div className="px-6 py-6">{children}</div>
    </div>
  );
};
