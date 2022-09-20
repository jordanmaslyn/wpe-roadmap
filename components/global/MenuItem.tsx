import { gql } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";

interface Props {
  item: MenuItem;
  isChild: boolean;
}

export default function MenuItem({ item, isChild = false }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!item.url) {
    return null;
  }

  const updateExpanded = (status: boolean) => {
    if (isChild) {
      return;
    }

    setIsExpanded(status);
  };

  return (
    <li
      key={item.url}
      className="lg:mr-6 relative"
      onMouseLeave={() => updateExpanded(false)}
      onMouseEnter={() => updateExpanded(true)}
    >
      <span
        className={`flex items-center relative ${
          !isChild
            ? "after:absolute after:top-full after:h-0.5 after:w-full after:bg-tiffany after:transition-opacity"
            : ""
        } ${isExpanded ? "after:opacity-100" : "after:opacity-0"}`}
      >
        <Link
          href={item.url}
          target={item.target ?? "_self"}
          title={item.title ?? item.label}
        >
          <a
            className={`text-${
              isChild ? "soot" : "mirage"
            } whitespace-nowrap hover:text-tiffany transition-color block p-2 ${
              isChild ? "text-sm" : ""
            }`}
          >
            {item.label}
          </a>
        </Link>
        {!!item.children?.length && !isChild && (
          <img
            src={`/img/caret-${isExpanded ? "up" : "down"}.svg`}
            alt={isExpanded ? "Arrow Down" : "Arrow Up"}
          />
        )}
      </span>
      {!!item.children?.length && !isChild && (
        <ul
          className="lg:absolute bg-white min-w-full lg:top-full lg:translate-y-0.5 transition-opacity"
          style={{ padding: "3px 9px", opacity: isExpanded ? 1 : 0 }}
        >
          {item.children.map((item) => (
            <MenuItem item={item} isChild={true} key={item.id} />
          ))}
        </ul>
      )}
    </li>
  );
}

export interface MenuItem {
  id: string;
  parentId: string;
  url: string;
  label: string;
  target: string | null;
  title: string | null;
  children?: MenuItem[];
}

export const MenuItemFragment = gql`
  fragment MenuItem on MenuItem {
    id
    parentId
    url
    label
    target
    title
  }
`;
