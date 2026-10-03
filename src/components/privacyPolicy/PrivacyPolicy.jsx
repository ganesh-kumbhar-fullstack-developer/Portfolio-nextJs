import { ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "1. Introduction",
      content:
        "Welcome to gktechhub.com ('Portfolio'). This Privacy Policy explains how I collect, use, and protect your personal information when you visit my website, use my contact form, or interact with my services. I am committed to protecting your privacy and ensuring transparency about how your data is handled.",
    },
    {
      title: "2. Information I Collect",
      subsections: [
        {
          subtitle: "Contact Form Data",
          content:
            "When you submit the contact form on my portfolio, I collect: Name, Email Address, an optional Subject, and Message. This information is used solely to respond to your inquiry and establish communication.",
        },
        {
          subtitle: "Automatic Information",
          content:
            "I may collect technical information such as your IP address, browser type, device type, pages visited, and time spent on the site through standard web server logs.",
        },
        {
          subtitle: "Cookies",
          content:
            "My website uses cookies to enhance user experience, maintain theme preferences, and analyze website performance. You can disable cookies through your browser settings.",
        },
      ],
    },
    {
      title: "3. How I Use Your Information",
      content:
        "Your personal information is used to: (a) Respond to your contact form inquiries; (b) Send you follow-up communications regarding your message; (c) Improve website functionality and user experience; (d) Comply with legal obligations; (e) Prevent fraud and ensure security.",
    },
    {
      title: "4. Email and Communication",
      content:
        "When you contact me via the contact form, your email address is used to send you automated confirmation emails and my responses. I use Google's Gmail service to manage email communications. Your email data is stored according to Google's privacy standards. You will not receive promotional emails unless you explicitly opt-in.",
    },
    {
      title: "5. Third-Party Services",
      subsections: [
        {
          subtitle: "Email Service Provider",
          content:
            "I use nodemailer with Gmail (Google's services) to send and receive emails. Google's privacy policy applies to your email data: https://policies.google.com/privacy",
        },
        {
          subtitle: "Social Media Links",
          content:
            "My portfolio includes links to social media profiles (GitHub, LinkedIn, Instagram, Facebook). These links are provided for easy access but are not affiliated with my personal data collection. Visiting these platforms is subject to their respective privacy policies.",
        },
        {
          subtitle: "Analytics",
          content:
            "The website may use analytics tools to track visitor behavior and improve performance. No personally identifiable information is shared with analytics services.",
        },
      ],
    },
    {
      title: "6. Data Security",
      content:
        "I implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure. While I strive to protect your data, I cannot guarantee absolute security.",
    },
    {
      title: "7. Data Retention",
      content:
        "Contact form submissions are retained for a reasonable period to respond to your inquiries and maintain records. You may request deletion of your personal data at any time by contacting me at ganeshhh2003@gmail.com. I will comply with deletion requests within 30 days, subject to legal obligations.",
    },
    {
      title: "8. Your Rights",
      content:
        "You have the right to: (a) Access your personal data; (b) Request correction of inaccurate information; (c) Request deletion of your data; (d) Opt-out of communications; (e) Withdraw consent at any time. To exercise any of these rights, please contact me at ganeshhh2003@gmail.com.",
    },
    {
      title: "9. International Users",
      content:
        "If you are located in the European Union, you have additional rights under the GDPR. If you are in California, you have rights under CCPA. Please contact me for specific information about your jurisdiction's data protection laws.",
    },
    {
      title: "10. Children's Privacy",
      content:
        "This portfolio is not directed to individuals under the age of 13. I do not knowingly collect personal information from children. If I become aware that a child has provided personal information, I will delete such information immediately.",
    },
    {
      title: "11. Changes to This Privacy Policy",
      content:
        "I may update this Privacy Policy from time to time to reflect changes in my practices, technology, legal requirements, or other factors. I will notify you of any material changes by posting the updated policy on this page with an updated 'Last Updated' date. Your continued use of the website constitutes acceptance of the updated policy.",
    },
    {
      title: "12. Contact Information",
      content:
        "If you have questions, concerns, or requests regarding this Privacy Policy or my data practices, please contact me at: ganeshhh2003@gmail.com or visit my portfolio at https://gktechhub.com",
    },
  ];

  return (
    <main id="main" className="relative min-h-screen pt-14 text-white">

      <div className="relative z-10">
        {/* Header */}
        <div className="sticky top-14 z-20 border-b border-line bg-bg/85 backdrop-blur-md">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-accent hover:text-ink font-mono text-sm transition"
            >
              <ArrowLeft size={20} />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Title Section */}
          <div className="mb-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-accent/10 p-3 rounded-full">
                <Shield className="w-8 h-8 text-accent" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 font-mono text-white">
              Privacy Policy
            </h1>
            <p className="text-muted">
              Last Updated:{" "}
              October 3, 2026
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div
                key={index}
                className="panel panel-hover p-6 transition"
              >
                <h2 className="font-mono text-xl font-bold text-accent mb-4">
                  {section.title}
                </h2>

                {section.content && (
                  <p className="text-ink/90 leading-relaxed mb-4">
                    {section.content}
                  </p>
                )}

                {section.subsections && (
                  <div className="space-y-4">
                    {section.subsections.map((subsection, subIndex) => (
                      <div
                        key={subIndex}
                        className="ml-4 border-l-2 border-accent/30 pl-4"
                      >
                        <h3 className="text-lg font-semibold text-cyan mb-2">
                          {subsection.subtitle}
                        </h3>
                        <p className="text-muted leading-relaxed">
                          {subsection.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
