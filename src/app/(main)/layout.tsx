import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/common/CTAButton";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <>
            <Navbar />
            {children}
            <CTASection label="Contact" title="Get Involved" description="Tell us your interest and we'll reach out." buttonText="Contact Us" buttonLink="#" />
            <Footer />
        </>
    );
}
