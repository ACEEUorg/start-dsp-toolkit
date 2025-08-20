export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-display font-bold mb-4">
        About the Start DSP Toolbox
      </h2>
      <p className="text-gray-600 mb-6">
        The Start DSP Entrepreneurial University Educators Package and Toolbox
        is designed to enhance the quality and impact of entrepreneurship
        education in European Higher Education Institutions through
        practice-oriented resources and guidelines.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-display font-medium mb-3">
            Core Objectives
          </h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>
              Needs-based development of Entrepreneurial Educators Toolbox
            </li>
            <li>Integration of Entre-, Digi- and GreenComp frameworks</li>
            <li>Development of curriculum and training materials</li>
            <li>Creation of assessment tools and Knowledge Hub</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-display font-medium mb-3">
            Research & Development
          </h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Expert interviews and surveys</li>
            <li>Target group integration</li>
            <li>Best practices analysis</li>
            <li>Scientific publication of findings</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-display font-medium mb-3">
          Toolbox Components
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Entrepreneurial Self-Assessment Templates</li>
            <li>Vision and Institutional Commitment Guidelines</li>
            <li>Entrepreneurial Culture Development</li>
            <li>Intra-organizational Entrepreneurship Awareness</li>
          </ul>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Learner-focused Entrepreneurship Approaches</li>
            <li>Incentive Schemes and Rewards</li>
            <li>Planning and Financing Guidelines</li>
            <li>Continuous Improvement Frameworks</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-display font-medium mb-3">Impact</h3>
        <p className="text-gray-600">
          This comprehensive Toolbox provides suitable approaches for the
          further professionalization of entrepreneurship education across
          different maturity levels, contributing to improving the quality and
          impact of entrepreneurship education in Europe. It serves as a central
          resource for Higher Education Institutions looking to enhance their
          entrepreneurial education capabilities.
        </p>
      </div>
    </div>
  );
}
