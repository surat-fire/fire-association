import React from 'react';
import { FileText, CheckCircle, Globe, UserCheck, Lock, Shield, Users, AlertCircle, Mail, Scale } from 'lucide-react';
import Banner from '@/components/common/Banner';

const TermsConditionsPage = () => {
    const sections = [
        {
            icon: <CheckCircle className="w-6 h-6" />,
            title: "1. Acceptance of Terms",
            content: (
                <p className="text-gray-600">
                    By using this website, you confirm that you have read and understood these Terms & Conditions
                    and agree to be legally bound by them. If you do not agree, please discontinue use of the website.
                </p>
            )
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: "2. Use of Website",
            content: (
                <>
                    <p className="text-gray-600 mb-3">You agree to use our website for lawful purposes only and not to:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                        <li>Violate any applicable laws or regulations</li>
                        <li>Interfere with the website&apos;s functionality</li>
                        <li>Harm the reputation of Surat Fire Association</li>
                        <li>Attempt unauthorized access to servers, systems, or data</li>
                    </ul>
                </>
            )
        },
        {
            icon: <FileText className="w-6 h-6" />,
            title: "3. Content Accuracy",
            content: (
                <p className="text-gray-600">
                    We strive to provide accurate and updated information; however, we do not guarantee that
                    all content on the website is error-free or current. We reserve the right to modify or
                    remove any content without notice.
                </p>
            )
        },
        {
            icon: <UserCheck className="w-6 h-6" />,
            title: "4. Event Registration",
            content: (
                <p className="text-gray-600">
                    When registering for an event on our website, you agree to provide complete and accurate information.
                    Event details may change due to safety or operational reasons. We may modify, postpone, or cancel
                    events at any time, and we are not responsible for any inconvenience or personal loss caused.
                </p>
            )
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "5. Personal Information & Privacy",
            content: (
                <>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-4">5.1 Information We Collect</h3>
                    <p className="text-gray-600 mb-3">We may collect personal information such as:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                        <li>Name</li>
                        <li>Email address</li>
                        <li>Phone number</li>
                        <li>Organization / Profession (if provided)</li>
                        <li>Event registration details</li>
                        <li>Messages submitted via contact forms</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-6">5.2 How We Use Your Information</h3>
                    <p className="text-gray-600 mb-3">We may use this information to:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                        <li>Respond to inquiries</li>
                        <li>Process event registrations</li>
                        <li>Send updates regarding events or safety information</li>
                        <li>Maintain administrative or safety records</li>
                        <li>Improve our website and services</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-6">5.3 Sharing of Information</h3>
                    <p className="text-gray-600 mb-3">
                        We do <strong>not</strong> sell or rent your personal information. We only share it:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                        <li>With event partners when required</li>
                        <li>To comply with legal or safety obligations</li>
                        <li>To prevent fraud or misuse</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-6">5.4 Data Security</h3>
                    <p className="text-gray-600">
                        We take reasonable measures to protect your information. However, no system is completely secure,
                        and you use the website at your own risk.
                    </p>
                </>
            )
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: "6. Cookies & Tracking",
            content: (
                <p className="text-gray-600">
                    Our website may use cookies or similar technologies to improve user experience and analyze traffic.
                    You may disable cookies through your browser settings if you prefer.
                </p>
            )
        },
        {
            icon: <Lock className="w-6 h-6" />,
            title: "7. Intellectual Property",
            content: (
                <p className="text-gray-600">
                    All website content—including text, graphics, logos, and images—is owned by Surat Fire Association
                    or used with permission. You may not reproduce or distribute any content without written approval.
                </p>
            )
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "8. Third-Party Links",
            content: (
                <p className="text-gray-600">
                    Our website may include links to external websites. We are not responsible for their content,
                    practices, or privacy policies.
                </p>
            )
        },
        {
            icon: <AlertCircle className="w-6 h-6" />,
            title: "9. Limitation of Liability",
            content: (
                <p className="text-gray-600">
                    Surat Fire Association is not liable for any loss or damage resulting from use of the website,
                    errors, interruptions, or actions taken based on the information provided.
                </p>
            )
        },
        {
            icon: <FileText className="w-6 h-6" />,
            title: "10. Changes to Terms",
            content: (
                <p className="text-gray-600">
                    We may update these Terms & Conditions at any time. Continued use of the website after changes
                    indicates acceptance of the revised terms.
                </p>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Banner */}
            <Banner title="Terms and Conditions" backgroundImage="/img/about-hero-bg.webp" />

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
                {/* Introduction Card */}
                <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-[#490c0c] bg-opacity-10 rounded-full flex items-center justify-center">
                                <Scale className="w-6 h-6 text-[#490c0c]" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Terms & Conditions</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Welcome to the official website of <strong>Surat Fire Association</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;)).
                                By accessing or using our website, including our blog, events section, contact forms, and event
                                registration forms (collectively, the &quot;Services&quot;), you agree to comply with and be bound by the
                                following Terms & Conditions. Please read them carefully.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Terms Sections */}
                <div className="space-y-6">
                    {sections.map((section, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <div className="border-l-4 border-[#490c0c] p-6 md:p-8">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-[#490c0c] bg-opacity-10 rounded-full flex items-center justify-center text-[#490c0c]">
                                            {section.icon}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h2>
                                        <div className="text-gray-600 leading-relaxed">
                                            {section.content}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact Section */}
                <div className="mt-8 bg-[#490c0c] rounded-lg shadow-md p-6 md:p-8 text-white">
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                <Mail className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
                            <p className="mb-4 text-gray-100">
                                If you have questions regarding these Terms & Conditions, please contact us:
                            </p>
                            <div className="bg-white bg-opacity-10 rounded-lg p-4 md:p-6 backdrop-blur-sm">
                                <p className="font-semibold text-lg mb-3">Surat Fire Association</p>
                                <div className="space-y-2 text-gray-100">
                                    <p><strong>Email:</strong> thesuratfireassociation.in@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} Surat Fire Association. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsConditionsPage;