import { gql } from "@apollo/client";
import Link from "next/link";
import { PropsWithChildren, useState } from "react";

interface Props {
  menuItems: MenuItem[];
}

export function Layout({ children, menuItems }: PropsWithChildren<Props>) {
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false);

  return (
    <>
      <header className="bg-mirage flex items-center">
        <a href="/">
          <figure className="lg:pr-6 lg:mr-6 lg:border-r border-polar ml-2 my-2">
            <img
              src="/img/default-logo.svg"
              alt="Logo"
              className="hidden lg:block"
              style={{ height: "40px", width: "auto" }}
            />
            <img
              src="/img/small-logo.svg"
              alt="Logo"
              className="block lg:hidden"
              style={{ height: "25px", width: "auto" }}
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
        <nav className="py-2 hidden lg:block">
          <ul className="flex">
            {menuItems.map(
              (item) =>
                item.url && (
                  <li className="mr-6" key={item.url}>
                    <Link
                      href={item.url}
                      target={item.target ?? "_self"}
                      title={item.title ?? undefined}
                    >
                      <a className="text-polar hover:text-tiffany transition-colors">
                        {item.label}
                      </a>
                    </Link>
                  </li>
                )
            )}
          </ul>
        </nav>
        <div className="flex ml-auto self-stretch text-xs lg:text-base">
          {/* <a
            className="h-full bg-mirage text-white flex px-3 md:px-5 items-center font-bold"
            href="https://wpengine.com/atlas"
          >
            <span>Give Feedback</span>
          </a> */}
          <Link href="https://wpengine.com/atlas" target="_blank">
            <a className="h-full bg-royal text-white flex px-3 md:px-5 items-center font-bold">
              <span>Try Atlas</span>
            </a>
          </Link>
        </div>
      </header>
      <nav
        className={`lg:hidden bg-mirage opacity-0 pointer-events-none ${
          mobileNavIsOpen ? "pointer-events-auto opacity-100" : ""
        } transition-opacity fixed w-full`}
        style={{ top: "41px" }}
      >
        <ul>
          {menuItems.map(
            (menuItem) =>
              menuItem.url && (
                <li key={menuItem.url}>
                  <Link
                    href={menuItem.url}
                    target={menuItem.target ?? "_self"}
                    title={menuItem.title ?? menuItem.label}
                  >
                    <a className="text-white block p-2">{menuItem.label}</a>
                  </Link>
                </li>
              )
          )}
        </ul>
      </nav>
      {children}
    </>
  );
}

export interface MenuItem {
  url: string;
  label: string;
  target: string | null;
  title: string | null;
}

export const MenuItemFragment = gql`
  fragment MenuItem on MenuItem {
    url
    label
    target
    title
  }
`;
