import { useState } from "react";
import PropTypes from "prop-types";
import { Play } from "lucide-react";
import { useLanguage, useTranslation } from "../../i18n/hooks";

/**
 * YouTubeEmbed Component — two-click privacy embed
 *
 * Until the visitor clicks, nothing is requested from YouTube or Google: the
 * poster is a self-hosted copy of the video thumbnail, and the notice below it
 * explains what loading the video means. Only the click swaps in the iframe
 * (from youtube-nocookie.com, autoplaying so the click also starts playback).
 * The decision is not stored anywhere, so no consent banner is needed for it.
 *
 * @param {string} videoId - YouTube video id
 * @param {string} posterSrc - URL of the locally hosted poster image
 * @param {string} title - Accessible title for the iframe
 */
export default function YouTubeEmbed({ videoId, posterSrc, title }) {
  const [activated, setActivated] = useState(false);
  const { language } = useLanguage();
  const { t } = useTranslation();

  if (activated) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-lg border border-seafoam-200 bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&hl=${language}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setActivated(true)}
        aria-label={t("video.play")}
        className="group relative block aspect-video w-full overflow-hidden rounded-lg border border-seafoam-200 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-seafoam-500 focus:ring-offset-2"
      >
        <img src={posterSrc} alt="" className="h-full w-full object-cover" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-seafoam-600 shadow-lg transition-colors duration-200 group-hover:bg-seafoam-700">
            <Play className="ml-1 h-6 w-6 text-white" fill="currentColor" />
          </span>
        </span>
      </button>
      <p className="mt-2 text-xs leading-snug text-gray-500">
        {t("video.consentNotice")}{" "}
        <a
          href={`https://policies.google.com/privacy?hl=${language}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-seafoam-700"
        >
          {t("video.privacyPolicy")}
        </a>
      </p>
    </div>
  );
}

YouTubeEmbed.propTypes = {
  videoId: PropTypes.string.isRequired,
  posterSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
