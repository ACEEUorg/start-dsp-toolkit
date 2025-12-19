import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { loadTools } from "../data/tools";
import { useLanguage, useTranslation } from "../i18n/hooks";
import ToolImage from "../components/ui/ToolImage";
import LanguageFallbackBadge from "../components/ui/LanguageFallbackBadge";
import { trackDownload } from "../utils/analytics";
import { getPdfUrlWithFallback } from "../utils/pdfFallback";

export default function ToolDetail() {
  const { number } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const [tool, setTool] = useState(null);
  const [pdfUrls, setPdfUrls] = useState({});

  // Load tools data when language changes
  useEffect(() => {
    loadTools(language).then((data) => {
      const foundTool = data.tools.find((t) => t.number === parseInt(number));
      setTool(foundTool);
    });
  }, [language, number]);

  // Check PDF availability and set up fallbacks
  useEffect(() => {
    if (!tool || !tool.links) return;

    const checkPdfs = async () => {
      const urlMap = {};
      for (const link of tool.links) {
        const result = await getPdfUrlWithFallback(link.url, language);
        urlMap[link.url] = result;
      }
      setPdfUrls(urlMap);
    };

    checkPdfs();
  }, [tool, language]);

  if (!tool) {
    return <div>Tool not found</div>;
  }

  const handleBack = () => {
    // If we came from the toolbox page, go back to it with the same search params
    if (location.state?.from === "/toolbox") {
      navigate("/toolbox" + location.state.search);
    } else {
      // Fallback to browser back if we didn't come from toolbox
      navigate(-1);
    }
  };

  const handleDownloadClick = (link) => {
    // Extract filename from URL (e.g., "assets/pdfs/tool_1.1_File.pdf" -> "tool_1.1_File.pdf")
    const fileName = link.url.split("/").pop();

    // Track the download event
    trackDownload(fileName, tool.number, tool.name, link.title);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={handleBack}
        className="flex items-center text-seafoam-600 hover:text-seafoam-800 mb-4 transition-colors"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        {t("toolDetail.backToToolbox")}
      </button>

      <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
        <h2 className="text-3xl font-display font-bold mb-6">{tool.name}</h2>
        <ToolImage
          toolNumber={tool.number}
          customImage={tool.image}
          alt={tool.name}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        {/* Purpose, Benefits and Prerequisite Tools cards and Downloads section */}
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          {/* Cards section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
            {tool.purpose && (
              <div className="p-3 bg-seafoam-100 rounded-lg shadow-md">
                <div className="flex flex-col">
                  <div className="flex items-center mb-1">
                    <svg
                      className="w-5 h-5 text-seafoam-600 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <div className="text-seafoam-700 text-base font-medium">
                      {t("toolDetail.purpose")}
                    </div>
                  </div>
                  <div className="text-seafoam-900 text-base">
                    {tool.purpose}
                  </div>
                </div>
              </div>
            )}

            {tool.benefits && (
              <div className="p-3 bg-seafoam-100 rounded-lg shadow-md">
                <div className="flex flex-col">
                  <div className="flex items-center mb-1">
                    <svg
                      className="w-5 h-5 text-seafoam-600 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="text-seafoam-700 text-base font-medium">
                      {t("toolDetail.benefits")}
                    </div>
                  </div>
                  <div className="text-seafoam-900 text-base whitespace-pre-line">
                    {tool.benefits.replace(/✔/g, "\n✔")}
                  </div>
                </div>
              </div>
            )}

            {tool.prerequisiteTools && (
              <div className="p-3 bg-seafoam-100 rounded-lg shadow-md">
                <div className="flex flex-col">
                  <div className="flex items-center mb-1">
                    <svg
                      className="w-5 h-5 text-seafoam-600 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <div className="text-seafoam-700 text-base font-medium">
                      {t("toolDetail.prerequisiteTools")}
                    </div>
                  </div>
                  <div className="text-seafoam-900 text-base whitespace-pre-line">
                    {tool.prerequisiteTools.replace(/✔/g, "\n✔")}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Downloads section */}
          {tool.links && tool.links.length > 0 && (
            <div
              className={`flex flex-col lg:w-64 gap-4 ${tool.links.length === 1 ? "" : "justify-between"}`}
            >
              {tool.links.map((link, index) => {
                const pdfInfo = pdfUrls[link.url] || {
                  url: link.url,
                  isFallback: false,
                };
                return (
                  <a
                    key={index}
                    href={pdfInfo.url}
                    className={`group relative overflow-hidden bg-gradient-to-br from-seafoam-50 to-white rounded-xl p-6 border border-seafoam-200 hover:border-seafoam-400 transition-all duration-200 ${tool.links.length === 1 ? "h-full" : "flex-1"} flex items-center`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleDownloadClick(link)}
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-seafoam-100 rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:bg-seafoam-200 transition-colors duration-200"></div>
                    <div className="relative w-full h-full flex flex-col justify-between">
                      <span className="text-lg font-medium text-seafoam-800 group-hover:text-seafoam-900">
                        {link.title}
                      </span>
                      <div className="flex items-center gap-2 mt-4">
                        {link.url.startsWith("http://") ||
                        link.url.startsWith("https://") ? (
                          <svg
                            className="w-6 h-6 text-seafoam-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-6 h-6 text-seafoam-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                        )}
                        {(() => {
                          const ext = link.url.split(".").pop()?.toLowerCase();
                          if (ext === "pdf") {
                            return (
                              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-red-100 text-red-700 rounded">
                                PDF
                              </span>
                            );
                          } else if (["xls", "xlsx", "xlsm"].includes(ext)) {
                            return (
                              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-green-100 text-green-700 rounded">
                                XLS
                              </span>
                            );
                          } else if (["doc", "docx"].includes(ext)) {
                            return (
                              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-700 rounded">
                                DOC
                              </span>
                            );
                          }
                          return null;
                        })()}
                        <div className="flex flex-wrap gap-2">
                          {((link.url.startsWith("http://") ||
                            link.url.startsWith("https://")) &&
                            language !== "en") ||
                          pdfInfo.isFallback ? (
                            <LanguageFallbackBadge />
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <div className="space-y-6">
          {tool.description && (
            <section>
              <h3 className="text-xl font-display font-bold mb-2">
                {t("toolDetail.description")}
              </h3>
              <p className="text-gray-600">{tool.description}</p>
            </section>
          )}

          {tool.instructions && (
            <section>
              <h3 className="text-xl font-display font-bold mb-2">
                {t("toolDetail.instructions")}
              </h3>
              <div className="text-gray-600">
                {tool.instructions.split("\n").map((instruction, index) => (
                  <p key={index} className="mb-2">
                    {instruction}
                  </p>
                ))}
              </div>
            </section>
          )}

          {tool.outcomes && (
            <section>
              <h3 className="text-xl font-display font-bold mb-2">
                {t("toolDetail.outcomes")}
              </h3>
              <p className="text-gray-600">{tool.outcomes}</p>
            </section>
          )}
        </div>

        {/* Partner Information Section */}
        {tool.partner && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-gray-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="text-sm text-gray-500">
                  {t("toolDetail.responsiblePartner")}{" "}
                  <span className="font-medium text-gray-700">
                    {tool.partner}
                  </span>
                </span>
              </div>
              {(() => {
                const logoMap = {
                  ACEEU: "assets/logos/aceeu.jpg",
                  EUEI: "assets/logos/euei.jpg",
                  TVW: "assets/logos/tvw.png",
                  MMS: "assets/logos/mms.jpg",
                  UNEAT: "assets/logos/uneat.png",
                  MC: "assets/logos/mc.png",
                };
                const logoFile = logoMap[tool.partner];

                return logoFile ? (
                  <img
                    src={`/${logoFile}`}
                    alt={`${tool.partner} logo`}
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : null;
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
