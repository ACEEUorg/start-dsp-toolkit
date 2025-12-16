import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from '../i18n/I18nContext';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
];

/**
 * Language Selector Component
 *
 * Dropdown menu for selecting the site language.
 * Displays flag emoji and native language name.
 * Updates language in context and localStorage.
 */
export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const current = languages.find(l => l.code === language) || languages[0];

  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-seafoam-50 rounded-lg transition-colors duration-200">
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{current.flag} {current.name}</span>
        <span className="sm:hidden">{current.flag}</span>
        <ChevronDown className="h-4 w-4" />
      </MenuButton>

      <MenuItems className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 focus:outline-none z-50">
        {languages.map((lang) => (
          <MenuItem key={lang.code}>
            {({ focus }) => (
              <button
                onClick={() => setLanguage(lang.code)}
                className={`${
                  focus ? 'bg-seafoam-50' : ''
                } ${
                  language === lang.code ? 'bg-seafoam-100 font-semibold' : ''
                } w-full text-left px-4 py-2 flex items-center gap-3 text-sm text-gray-900 transition-colors duration-150`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span>{lang.name}</span>
                {language === lang.code && (
                  <span className="ml-auto text-seafoam-600">✓</span>
                )}
              </button>
            )}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
