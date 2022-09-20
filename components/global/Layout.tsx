import { PropsWithChildren, useState } from "react";
import MenuItemComponent, { MenuItem } from "./MenuItem";

interface Props {
  menuItems: MenuItem[];
}

export function Layout({ children, menuItems }: PropsWithChildren<Props>) {
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false);

  return (
    <>
      <header className="bg-white flex items-center">
        <a href="/">
          <figure className="px-8 py-6">
            <img
              src="/img/logo-light-bg.svg"
              alt="WP Engine Logo"
              className="hidden lg:block"
              style={{ height: "24px", width: "auto" }}
            />
            <img
              src="/img/logo-light-bg.svg"
              alt="WP Engine Logo"
              className="block lg:hidden"
              style={{ height: "24px", width: "auto" }}
            />
          </figure>
        </a>
        <div className="block lg:hidden">
          <button
            onClick={() => {
              setMobileNavIsOpen((status) => !status);
            }}
            className={`hamburger hamburger--squeeze ${
              mobileNavIsOpen ? "is-active" : ""
            }`}
            type="button"
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
        </div>
        <nav className="py-2 hidden lg:block ml-auto">
          <ul className="flex">
            {flatListToHierarchical(menuItems).map((item) => (
              <MenuItemComponent item={item} />
            ))}
          </ul>
        </nav>
      </header>
      <nav
        className={`lg:hidden bg-mirage opacity-0 pointer-events-none ${
          mobileNavIsOpen ? "pointer-events-auto opacity-100" : ""
        } transition-opacity fixed w-full`}
        style={{ top: "41px" }}
      >
        <ul>
          {flatListToHierarchical(menuItems).map((menuItem) => (
            <MenuItemComponent item={menuItem} />
          ))}
        </ul>
      </nav>
      {children}
    </>
  );
}

const flatListToHierarchical = (
  data = [] as MenuItem[],
  { idKey = "id", parentKey = "parentId", childrenKey = "children" } = {}
) => {
  const tree = [];
  const childrenOf = {};
  data.forEach((item) => {
    const newItem = { ...item };
    const { [idKey]: id, [parentKey]: parentId = 0 } = newItem;
    childrenOf[id] = childrenOf[id] || [];
    newItem[childrenKey] = childrenOf[id];
    parentId
      ? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem)
      : tree.push(newItem);
  });
  return tree;
};
