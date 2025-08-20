export default function Project() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-display font-bold mb-6">Project Overview</h2>
      <p className="text-gray-600 mb-8">
        The Start DSP project aims to enhance entrepreneurship education in
        Higher Education Institutions by providing innovative learning materials
        focused on digital, sustainable, and ethical business practices.
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-display font-medium mb-3">
            Entrepreneurial Toolbox
          </h3>
          <p className="text-gray-600 mb-4">
            Creating a comprehensive toolkit to enhance the quality and
            effectiveness of entrepreneurship education at European Higher
            Education Institutions.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Practical resources</li>
            <li>Educational strategies</li>
            <li>Professional development tools</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-display font-medium mb-3">
            Competence Framework
          </h3>
          <p className="text-gray-600 mb-4">
            Developing adaptable educational resources and curriculum aligned
            with European Commission frameworks.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Flexible learning resources</li>
            <li>Inclusive curriculum design</li>
            <li>Cross-cultural adaptation</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-display font-medium mb-3">
            Capacity Building
          </h3>
          <p className="text-gray-600 mb-4">
            Creating digital tools and platforms for ESG analysis and knowledge
            sharing.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>ESG Assessment Application</li>
            <li>Interactive Knowledge Hub</li>
            <li>Peer learning platform</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-display font-medium mb-3">Target Groups</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="font-display font-medium mb-2">Primary</h4>
            <p className="text-gray-600">
              HEI (Higher Education Institutions) Entrepreneurship Educators
              responsible for implementing entrepreneurship education courses,
              programs, and strategies.
            </p>
          </div>
          <div>
            <h4 className="font-display font-medium mb-2">Secondary</h4>
            <p className="text-gray-600">
              Adult and Vocational Education and Training (VET) Entrepreneurship
              Educators who can adapt and modify the resources for their
              specific contexts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
