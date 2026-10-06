import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { blogs } from '../data/blogs';
import ReactMarkdown from 'react-markdown';

const BlogDetailPage = () => {
  const { id } = useParams();
  const blog = blogs.find(b => b.id === id);

  if (!blog) {
    return <Navigate to="/blogs" replace />;
  }

  const currentIndex = blogs.findIndex(b => b.id === id);
  const relatedBlogs = [];
  for (let i = 1; i <= 3; i++) {
    const nextIndex = (currentIndex + i) % blogs.length;
    relatedBlogs.push(blogs[nextIndex]);
  }

  return (
    <>
      <SEO 
        title={`${blog.title} - Pelvic Vitality`} 
        description={blog.content.trim().substring(0, 150).replace(/\*\*/g, '').replace(/\*/g, '')}
      />
      
      {/* Article Header */}
      <section className="pt-32 pb-12 bg-soft/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <Link to="/blogs" className="inline-flex items-center text-primary font-medium mb-6 hover:underline">
            ← Back to all articles
          </Link>
          <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-dark mb-8 leading-tight">
            {blog.title}
          </h1>
          <div className="w-full aspect-[21/9] md:aspect-[21/10] overflow-hidden rounded-2xl shadow-md bg-gray-50 flex items-center justify-center">
            {blog.image ? (
              <img
                src={blog.image}
                alt={blog.imageAlt || blog.title}
                className="w-full h-full object-contain object-center"
              />
            ) : (
              <div className="w-full h-full bg-soft/20 flex flex-col items-center justify-center text-dark/40">
                <svg className="w-12 h-12 mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <span className="font-heading text-lg">Image Coming Soon</span>
              </div>
            )}
          </div>
          {blog.imageCredit && (
            <p className="mt-3 text-xs text-dark/60">
              <a
                href={blog.imageCredit.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary hover:underline"
              >
                {blog.imageCredit.label}
              </a>{' '}
              ·{' '}
              <a
                href={blog.imageCredit.licenseUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary hover:underline"
              >
                {blog.imageCredit.licenseLabel}
              </a>
            </p>
          )}
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-dark prose-p:font-body prose-p:text-dark/80 prose-a:text-primary">
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </div>
          
          <div className="mt-16 pt-8 border-t border-soft">
            <h3 className="font-heading font-semibold text-2xl mb-6">Ready to take the next step?</h3>
            <p className="font-body text-dark/70 mb-6">
              If you're experiencing pelvic floor symptoms, you don't have to face them alone. Learn more about how our advanced, non-invasive treatment can help.
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-dark transition-colors"
            >
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-20 bg-soft/30">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-heading font-bold text-3xl text-center mb-12">More Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {relatedBlogs.map((relatedBlog) => (
              <Link 
                key={relatedBlog.id} 
                to={`/blogs/${relatedBlog.id}`}
                className="bg-white rounded-2xl shadow-sm border border-soft/50 overflow-hidden hover:shadow-md transition-shadow group flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden bg-gray-50 flex items-center justify-center">
                  {relatedBlog.image ? (
                  <img 
                    src={relatedBlog.image} 
                    alt={relatedBlog.imageAlt || relatedBlog.title}
                    className="w-full h-full object-contain object-center group-hover:scale-[1.02] transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-soft/20 flex flex-col items-center justify-center text-dark/40 group-hover:bg-soft/40 transition-colors">
                    <svg className="w-6 h-6 mb-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-heading font-semibold text-xl text-dark mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {relatedBlog.title}
                  </h3>
                  <div className="text-primary font-medium font-body flex items-center group-hover:gap-2 transition-all mt-auto">
                    Read Article <span className="ml-1">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetailPage;
