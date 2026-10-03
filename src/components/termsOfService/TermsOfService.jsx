import { ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";

export default function TermsOfService() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content:
        "By accessing and using this website (gktechhub.com), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
    },
    {
      title: "2. Use License",
      subsections: [
        {
          subtitle: "Grant of License",
          content:
            "Permission is granted to temporarily download one copy of the materials (information or software) on gktechhub.com for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:",
        },
        {
          subtitle: "Prohibited Activities",
          content:
            "(a) Modify or copy the materials; (b) Use the materials for any commercial purpose or for any public display; (c) Attempt to decompile or reverse engineer any software contained on the website; (d) Remove any copyright or other proprietary notations from the materials; (e) Transfer the materials to another person or 'mirror' the materials on any other server; (f) Violate any applicable laws or regulations; (g) Harass, abuse, or threaten any person or engage in any unlawful conduct.",
        },
        {
          subtitle: "License Termination",
          content:
            "This license will automatically terminate if you violate any of these restrictions and may be terminated by me at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.",
        },
      ],
    },
    {
      title: "3. Disclaimer",
      content:
        "The materials on gktechhub.com are provided on an 'as is' basis. I make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.",
    },
    {
      title: "4. Limitations",
      content:
        "In no event shall gktechhub.com or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on gktechhub.com, even if I or an authorized representative has been notified orally or in writing of the possibility of such damage.",
    },
    {
      title: "5. Accuracy of Materials",
      content:
        "The materials appearing on gktechhub.com could include technical, typographical, or photographic errors. I do not warrant that any of the materials on the website are accurate, complete, or current. I may make changes to the materials contained on the website at any time without notice.",
    },
    {
      title: "6. Materials on Website",
      content:
        "I have not reviewed all of the sites linked to my website and am not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by me of the site. Use of any such linked website is at the user's own risk.",
    },
    {
      title: "7. Modifications",
      content:
        "I may revise these terms of service for the website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.",
    },
    {
      title: "8. Governing Law",
      content:
        "These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.",
    },
    {
      title: "9. Contact Form and User Submissions",
      subsections: [
        {
          subtitle: "Information Collection",
          content:
            "When you submit information through the contact form, you acknowledge that you are providing accurate and truthful information. Any information submitted is used solely for responding to your inquiry.",
        },
        {
          subtitle: "Intellectual Property Rights",
          content:
            "Any content you submit, transmit, or display on or through gktechhub.com remains your property. However, by submitting content, you grant me a worldwide, non-exclusive, royalty-free license to use, copy, modify, and display the content in connection with my portfolio and services.",
        },
        {
          subtitle: "No Liability for User Submissions",
          content:
            "I am not responsible for any user-submitted content. I do not endorse any user submissions and am not liable for any claims arising from your submissions.",
        },
      ],
    },
    {
      title: "10. Third-Party Links and Services",
      content:
        "This website may contain links to third-party websites and services. I am not responsible for the availability, accuracy, or content of these external sites. Your use of third-party websites is at your own risk and subject to their terms and conditions.",
    },
    {
      title: "11. Website Availability",
      content:
        "I strive to keep the website operational and accessible. However, I do not guarantee that the website will be available at all times. The website may be interrupted for maintenance, updates, or other reasons without notice.",
    },
    {
      title: "12. Cookies and Tracking",
      content:
        "The website uses cookies to enhance user experience and maintain theme preferences. By using this website, you consent to the use of cookies as described in the Privacy Policy.",
    },
    {
      title: "13. Limitation of Liability",
      content:
        "To the fullest extent permitted by applicable law, in no event will I be liable for any indirect, incidental, special, or consequential damages arising out of or related to your use of the website, regardless of the form of action.",
    },
    {
      title: "14. Indemnification",
      content:
        "You agree to indemnify and hold harmless gktechhub.com, its owners, operators, and employees from any and all claims, damages, liabilities, and expenses arising out of your violation of these Terms of Service or your use of the website.",
    },
    {
      title: "15. Severability",
      content:
        "If any provision of these Terms of Service is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect.",
    },
    {
      title: "16. Contact Information",
      content:
        "If you have any questions about these Terms of Service, please contact me at: ganeshhh2003@gmail.com. For other inquiries, visit my portfolio at https://gktechhub.com",
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
                <FileText className="w-8 h-8 text-accent" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 font-mono text-white">
              Terms of Service
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
