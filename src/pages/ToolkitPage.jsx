import { useState, useEffect } from 'react'
import { useSearchParams, useLocation, Link } from 'react-router'
import { Search, ChevronDown } from 'lucide-react'
import toolsData from '../data/tools.json'
import ToolImage from '../components/ui/ToolImage'

export default function Toolkit() {
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchQuery, setSearchQuery] = useState('')
    const [filters, setFilters] = useState({
        purpose: ['all']
    })


    // Initialize search query and filters from URL params
    useEffect(() => {
        const purposeParam = searchParams.get('purpose')?.split(',') || ['all']
        setFilters({ purpose: purposeParam })
        setSearchQuery(searchParams.get('search') || '')
    }, [searchParams])

    const highlightText = (text, query) => {
        if (!query) return text;
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return parts.map((part, i) =>
            part.toLowerCase() === query.toLowerCase() ?
                <mark key={i} className="bg-yellow-200 px-1 py-0.5 rounded">{part}</mark> :
                part
        );
    };

    const filteredTools = toolsData.tools.filter(tool => {
        // Apply purpose filter
        if (!filters.purpose.includes('all')) {
            if (!filters.purpose.includes(tool.purpose)) return false;
        }

        // Apply search filter
        if (searchQuery) {
            const searchLower = searchQuery.toLowerCase();
            return (
                tool.name.toLowerCase().includes(searchLower) ||
                tool.summary.toLowerCase().includes(searchLower)
            );
        }

        return true;
    });


    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Update URL params
        const newParams = new URLSearchParams(searchParams);
        if (query) {
            newParams.set('search', query);
        } else {
            newParams.delete('search');
        }
        setSearchParams(newParams);
    };

    const handlePurposeChange = (e) => {
        const value = e.target.value;
        const newFilters = { purpose: value === 'all' ? ['all'] : [value] };
        setFilters(newFilters);

        // Update URL params
        const newParams = new URLSearchParams(searchParams);
        if (value === 'all') {
            newParams.delete('purpose');
        } else {
            newParams.set('purpose', value);
        }
        setSearchParams(newParams);
    };


    return (
        <div>
            {/* Search Input and Purpose Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search tools by name or description..."
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-seafoam-500 focus:border-seafoam-500"
                    />
                </div>
                <div className="w-full sm:w-1/3 relative">
                    <select
                        value={filters.purpose[0]}
                        onChange={handlePurposeChange}
                        className="block w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-seafoam-500 focus:border-seafoam-500 appearance-none bg-white"
                    >
                        <option value="all">All Purposes</option>
                        {toolsData.validOptions.purpose.filter(p => p !== 'TBD').map(purpose => (
                            <option key={purpose} value={purpose}>
                                {purpose}
                            </option>
                        ))}
                        <option value="TBD">To Be Determined</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                    </div>
                </div>
            </div>



            {/* Tools Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredTools.map(tool => (
                    <Link
                        key={tool.number}
                        to={`/tool/${tool.number}`}
                        state={{ from: '/toolkit', search: location.search }}
                        className="group relative overflow-hidden bg-gradient-to-br from-seafoam-50 to-white rounded-xl p-6 border border-seafoam-200 hover:border-seafoam-400 transition-all duration-200 flex flex-col h-full"
                    >
                        <div className="flex-1">
                            <ToolImage
                                toolNumber={tool.number}
                                alt={tool.name}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-xl font-display font-bold mb-3">
                                {highlightText(tool.name, searchQuery)}
                            </h3>
                            <p className="text-gray-600 mb-3">
                                {highlightText(tool.summary, searchQuery)}
                            </p>
                            <div className="mt-auto">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-seafoam-100 text-seafoam-800">
                                    {tool.purpose === 'TBD' ? 'To Be Determined' : tool.purpose}
                                </span>
                            </div>
                        </div>

                    </Link>
                ))}
            </div>
        </div>
    )
}