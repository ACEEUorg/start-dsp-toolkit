import { DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Link } from "react-router";
import LanguageSelector from "../LanguageSelector";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MobileMenu({ navigation }) {
  return (
    <DisclosurePanel className="md:hidden">
      <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
        {navigation.map((item) => (
          <DisclosureButton
            key={item.name}
            as={Link}
            to={item.to}
            className={({ isActive }) =>
              classNames(
                isActive
                  ? "bg-seafoam-900 text-white"
                  : "text-seafoam-300 hover:bg-seafoam-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium",
              )
            }
          >
            {item.name}
          </DisclosureButton>
        ))}
        <div className="px-3 py-2">
          <LanguageSelector />
        </div>
      </div>
    </DisclosurePanel>
  );
}
