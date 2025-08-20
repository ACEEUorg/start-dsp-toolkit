import { useParams, useNavigate, useLocation } from "react-router";
import toolsData from "../data/tools.json";
import ToolImage from "../components/ui/ToolImage";

export default function ToolDetail() {
  const { number } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const tool = toolsData.tools.find((t) => t.number === parseInt(number));

  if (!tool) {
    return <div>Tool not found</div>;
  }

  const handleBack = () => {
    // If we came from the toolkit page, go back to it with the same search params
    if (location.state?.from === "/toolkit") {
      navigate("/toolkit" + location.state.search);
    } else {
      // Fallback to browser back if we didn't come from toolkit
      navigate(-1);
    }
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
        Back to Toolbox
      </button>

      <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
        <h2 className="text-3xl font-display font-bold mb-6">{tool.name}</h2>
        <ToolImage
          toolNumber={tool.number}
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
                      Purpose
                    </div>
                  </div>
                  <div className="text-seafoam-900 text-base">
                    {tool.purpose === "TBD" ? "To Be Determined" : tool.purpose}
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
                      Benefits
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
                      Prerequisite Tools
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
              className={`flex flex-col lg:w-64 ${tool.links.length === 1 ? "justify-stretch" : "space-y-4"}`}
            >
              {tool.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className={`group relative overflow-hidden bg-gradient-to-br from-seafoam-50 to-white rounded-xl p-6 border border-seafoam-200 hover:border-seafoam-400 transition-all duration-200 ${tool.links.length === 1 ? "h-full flex items-center" : ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-seafoam-100 rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:bg-seafoam-200 transition-colors duration-200"></div>
                  <div className="relative">
                    <div className="flex items-center">
                      <svg
                        className="w-6 h-6 text-seafoam-600 mr-2"
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
                      <span className="text-lg font-medium text-seafoam-800 group-hover:text-seafoam-900">
                        {link.title}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          {tool.description && (
            <section>
              <h3 className="text-xl font-display font-bold mb-2">
                Description
              </h3>
              <p className="text-gray-600">{tool.description}</p>
            </section>
          )}

          {tool.instructions && (
            <section>
              <h3 className="text-xl font-display font-bold mb-2">
                Instructions
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
              <h3 className="text-xl font-display font-bold mb-2">Outcomes</h3>
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
                  Responsible Partner: <span className="font-medium text-gray-700">{tool.partner}</span>
                </span>
              </div>
              {(() => {
                const logoMap = {
                  'ACEEU': 'aceeu.jpg',
                  'EUEI': 'euei.jpg', 
                  'TVW': 'tvw.png',
                  'MMS': 'mms.jpg',
                  'UNEAT': 'uneat.png',
                  'MC': 'mc.png'
                };
                const logoFile = logoMap[tool.partner];
                
                return logoFile ? (
                  <img 
                    src={`/${logoFile}`}
                    alt={`${tool.partner} logo`}
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
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
