import React from 'react';

function ArticleHeaderMock() {
  return (
    <div className="mb-10">
      <div className="flex gap-2 mb-4">
        <span className="text-[#E12A32] text-xs font-bold uppercase tracking-wider">Technology</span>
        <span className="text-gray-400 text-xs">— 5 Min Read</span>
      </div>
      <h1 className="text-5xl font-black text-[#09365E] leading-tight tracking-tighter mb-6">
        The Future of Technology: Preview Headline
      </h1>
      <p className="text-xl text-gray-500 font-serif italic border-l-4 border-[#E12A32] pl-6 mb-8">
        This is a preview of the article header and excerpt, showing how it will look on the real site.
      </p>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-200"></div>
        <div>
          <div className="font-bold text-[#09365E]">John Doe</div>
          <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Quimera Staff</div>
        </div>
      </div>
    </div>
  );
}

function ArticleContentMock() {
  return (
    <div className="w-full">
      <div className="w-full h-[400px] bg-gray-200 rounded-2xl mb-10 border border-gray-100 flex items-center justify-center text-gray-400 font-bold">
        Main Featured Image
      </div>
      <div className="max-w-none text-[18px] text-gray-700 leading-relaxed font-normal">
        <p className="mb-6 first-letter:text-6xl first-letter:font-black first-letter:text-[#09365E] first-letter:float-left first-letter:mr-3 first-letter:leading-[0.85]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
        </p>
        <p className="mb-6">
          Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
        <div className="my-10 p-10 bg-gray-50 rounded-2xl border-l-4 border-[#09365E]">
          <p className="text-3xl font-black text-[#09365E] italic tracking-tighter mb-4">
            "This is a pull quote preview. It adds visual interest to long articles."
          </p>
        </div>
        <p className="mb-6">
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
}

function RelatedArticlesMock() {
  return (
    <div className="mt-16 pt-10 border-t border-gray-200">
      <h3 className="text-2xl font-bold text-[#09365E] mb-8">Related Articles</h3>
      <div className="grid grid-cols-2 gap-6">
        <div className="group cursor-pointer">
          <div className="w-full aspect-[4/3] bg-gray-200 rounded-xl mb-4"></div>
          <h4 className="font-bold text-lg leading-tight group-hover:text-[#E12A32] transition-colors">
            Related Article Preview Title 1
          </h4>
        </div>
        <div className="group cursor-pointer">
          <div className="w-full aspect-[4/3] bg-gray-200 rounded-xl mb-4"></div>
          <h4 className="font-bold text-lg leading-tight group-hover:text-[#E12A32] transition-colors">
            Related Article Preview Title 2
          </h4>
        </div>
      </div>
    </div>
  );
}

function CommentsMock() {
  return (
    <div className="mt-16 pt-10 border-t border-gray-200">
      <h3 className="text-2xl font-bold text-[#09365E] mb-8">Comments (3)</h3>
      <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 text-center text-gray-500">
        Comments Section Preview
      </div>
    </div>
  );
}

const componentMap: Record<string, React.ElementType> = {
  ArticleHeader: ArticleHeaderMock,
  ArticleContent: ArticleContentMock,
  RelatedArticles: RelatedArticlesMock,
  Comments: CommentsMock,
};

export default function PreviewArticle({ searchParams }: { searchParams: { layout?: string } }) {
  const layout = searchParams.layout ? searchParams.layout.split(',') : [];

  return (
    <main className="w-full bg-white min-h-screen py-10">
      <div className="max-w-[800px] mx-auto px-4 pointer-events-none">
        {layout.map((componentName, index) => {
          const Component = componentMap[componentName];
          if (!Component) return null;
          return <Component key={`${componentName}-${index}`} />;
        })}
      </div>
    </main>
  );
}
