import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router";
import MobileMenu from "./MobileMenu";

const navigation = [
  { name: "About", to: "/", current: true },
  { name: "Project", to: "/project", current: false },
  { name: "Toolbox", to: "/toolbox", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MainNav() {
  return (
    <Disclosure as="nav" className="bg-seafoam-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="shrink-0">
                  <img
                    alt="Your Company"
                    src="/logo-color.png"
                    className="size-8"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.to}
                        className={({ isActive }) =>
                          classNames(
                            isActive
                              ? "bg-seafoam-900 text-white"
                              : "text-seafoam-300 hover:bg-seafoam-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium",
                          )
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>

              <div className="-mr-2 flex md:hidden">
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-seafoam-800 p-2 text-seafoam-400 hover:bg-seafoam-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-seafoam-800 focus:outline-hidden">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block size-6 group-data-open:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden size-6 group-data-open:block"
                  />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <MobileMenu navigation={navigation} />
        </>
      )}
    </Disclosure>
  );
}
