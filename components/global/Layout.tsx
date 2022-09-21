import { PropsWithChildren, useState } from "react";
import MenuItemComponent, { MenuItem } from "./MenuItem";

interface Props {
  menuItems: MenuItem[];
}

export function Layout({ children, menuItems }: PropsWithChildren<Props>) {
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false);

  return (
    <>
      <header
        className="bg-white flex items-center"
        style={{ boxShadow: "inset 0px -1px 0px #CFDDE9" }}
      >
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
        <div className="block lg:hidden ml-auto px-8 py-6">
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
              <MenuItemComponent item={item} key={item.id} />
            ))}
          </ul>
        </nav>
      </header>
      <nav
        className={`lg:hidden bg-white opacity-0 pb-4 pointer-events-none ${
          mobileNavIsOpen ? "pointer-events-auto opacity-100" : ""
        } transition-opacity fixed w-full border-tiffany border-b-2`}
        style={{ top: "82px" }}
      >
        <ul>
          {flatListToHierarchical(menuItems).map((menuItem) => (
            <MenuItemComponent item={menuItem} key={menuItem.id} />
          ))}
        </ul>
      </nav>
      {children}
    </>
  );
}

const flatListToHierarchical = (data: MenuItem[] = []) => {
  const tree = [] as MenuItem[];
  const childrenOf = {} as Record<string, any[]>;
  data.forEach((item: MenuItem) => {
    const newItem = { ...item };
    const { id, parentId = 0 } = newItem;
    childrenOf[id] = childrenOf[id] || [];
    newItem.children = childrenOf[id];
    parentId
      ? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem)
      : tree.push(newItem);
  });
  return tree;
};
