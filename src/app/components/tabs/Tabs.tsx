"use client";

import { Tab } from "@headlessui/react";
import { useState } from "react";
import { clsx } from "clsx";

type TabProps = {
  name: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: TabProps[];
  className?: string;
};

export const Tabs: React.FC<TabsProps> = ({ tabs }: TabsProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="bg-white px-5 py-5 rounded-md shadow-sm ring-1 ring-gray-900/5">
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List>
          <div className="hidden sm:block">
            <nav className="flex space-x-4" aria-label="Tabs">
              {tabs.map((tab) => (
                <Tab key={tab.name}>
                  {({ selected }) => (
                    <a
                      key={tab.name}
                      href="#"
                      className={clsx(
                        selected
                          ? "bg-indigo-100 text-indigo-700"
                          : "text-gray-500 hover:text-gray-700",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {tab.name}
                    </a>
                  )}
                </Tab>
              ))}
            </nav>
          </div>
        </Tab.List>
        <Tab.Panels>
          <div className="mt-8">
            {tabs.map((tab) => (
              <Tab.Panel key={tab.name}>{tab.content}</Tab.Panel>
            ))}
          </div>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
