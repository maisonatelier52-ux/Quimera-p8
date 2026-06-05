import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Authors | Quimera News",
    description: "Meet the expert journalists and contributors behind Quimera's in-depth financial analysis and market insights.",
    openGraph: {
        title: "Our Authors | Quimera News",
        description: "Behind every story: meet the Quimera global editorial team.",
        url: "https://quimera-news.com/authors",
        siteName: "Quimera",
        images: [
            {
                url: "https://picsum.photos/seed/author-fallback/800/500",
                width: 1200,
                height: 630,
                alt: "Quimera Authors",
            }
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Our Authors | Quimera News",
        description: "Meet the voices shaping the future of financial journalism at Quimera.",
        images: ["https://picsum.photos/seed/author-fallback/800/500"],
    },
};

export default function AuthorsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
