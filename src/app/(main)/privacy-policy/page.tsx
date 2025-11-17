import React from 'react';
import { Shield, Lock, Eye, Users, FileText, Mail, Globe, UserCheck } from 'lucide-react';
import Banner from '@/components/common/Banner';

const PrivacyPolicyPage = () => {
    const sections = [
        {
            icon: <FileText className="w-6 h-6" />,
            title: "1. Information We Collect",
            content: (
                <>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-6">1.1 Personal Information</h3>
                    <p className="text-gray-600 mb-3">We may collect identifiable information such as:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                        <li>Name</li>
                        <li>Email address</li>
                        <li>Phone number</li>
                        <li>Organization / Profession (if added)</li>
                        <li>Event registration details</li>
                        <li>Messages submitted through contact forms</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-6">1.2 Automatically Collected Information</h3>
                    <p className="text-gray-600 mb-3">When you access our website, we may collect:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                        <li>IP address</li>
                        <li>Browser type and version</li>
                        <li>Device information</li>
                        <li>Pages visited and interactions</li>
                        <li>Cookies and tracking data</li>
                    </ul>
                </>
            )
        },
        {
            icon: <Eye className="w-6 h-6" />,
            title: "2. How We Use Your Information",
            content: (
                <>
                    <p className="text-gray-600 mb-3">Your information may be used to:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                        <li>Respond to inquiries and messages</li>
                        <li>Process and confirm event registrations</li>
                        <li>Send updates, event information, or safety notifications</li>
                        <li>Improve our website, services, and user experience</li>
                        <li>Maintain administrative or safety records</li>
                        <li>Ensure website security and prevent misuse</li>
                    </ul>
                </>
            )
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: "3. Cookies & Tracking Technologies",
            content: (
                <p className="text-gray-600">
                    Our website may use cookies or similar technologies to enhance user experience, analyze traffic,
                    and improve usability. You can disable cookies through your browser settings. However, some features
                    may not function properly without them.
                </p>
            )
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "4. Sharing Your Information",
            content: (
                <>
                    <p className="text-gray-600 mb-3">We do <strong>not</strong> sell or trade your personal data. We may share your information only in the following cases:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                        <li>With event partners or organizers when necessary for event management</li>
                        <li>With government or legal authorities if required by law</li>
                        <li>To prevent fraud, protect safety, or prevent misuse of our website</li>
                    </ul>
                </>
            )
        },
        {
            icon: <Lock className="w-6 h-6" />,
            title: "5. Data Security",
            content: (
                <p className="text-gray-600">
                    We take reasonable measures to protect your data from unauthorized access, modification, or disclosure.
                    However, no online method is 100% secure, and you use our website at your own risk.
                </p>
            )
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: "6. External Links",
            content: (
                <p className="text-gray-600">
                    Our website may contain links to third-party websites. We are not responsible for their privacy practices,
                    content, or policies. We encourage you to review their privacy policies before providing any personal information.
                </p>
            )
        },
        {
            icon: <UserCheck className="w-6 h-6" />,
            title: "7. Children's Privacy",
            content: (
                <p className="text-gray-600">
                    We do not knowingly collect personal information from individuals under the age of 13. If you believe we have
                    unintentionally collected such data, please contact us so we can remove it.
                </p>
            )
        },
        {
            icon: <FileText className="w-6 h-6" />,
            title: "8. Changes to This Privacy Policy",
            content: (
                <p className="text-gray-600">
                    We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated &quot;Last Updated&quot; date.
                    Continued use of our website means you accept the updated policy.
                </p>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Banner */}
            <Banner title="Privacy & Policy" backgroundImage="/img/about-hero-bg.webp" />

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
                {/* Introduction Card */}
                <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-[#490c0c] bg-opacity-10 rounded-full flex items-center justify-center">
                                <Shield className="w-6 h-6 text-[#490c0c]" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">Privacy Policy</h2>
                            <p className="text-sm text-gray-500 mb-4"><strong>Last Updated:</strong> January 2025</p>
                            <p className="text-gray-600 leading-relaxed">
                                This Privacy Policy explains how <strong>Surat Fire Association</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) collects,
                                uses, protects, and discloses your personal information when you use our website, including our blog,
                                event registration pages, and contact forms (&quot;Services&quot;).
                            </p>
                        </div>
                    </div>
                </div>

                {/* Policy Sections */}
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
                            <h2 className="text-2xl font-bold mb-4">9. Contact Us</h2>
                            <p className="mb-4 text-gray-100">
                                If you have questions regarding this Privacy Policy or wish to request information removal, you can contact us at:
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

export default PrivacyPolicyPage;