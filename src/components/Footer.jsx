import euLogo from '../assets/eu-logo.png'

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center space-y-4">
                    <img
                        src={euLogo}
                        alt="Co-funded by the European Union"
                        className="h-12 w-auto"
                    />
                    <p className="text-sm text-gray-600 text-center max-w-3xl">
                        This project has been funded with support from the European Commission. The author is solely responsible for this publication (communication) and the Commission accepts no responsibility for any use may be made of the information contained therein. In compliance of the new GDPR framework, please note that the Partnership will only process your personal data in the sole interest and purpose of the project and without any prejudice to your rights.
                    </p>
                </div>
            </div>
        </footer>
    )
} 