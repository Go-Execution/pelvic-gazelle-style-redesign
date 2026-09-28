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

  // Related blogs (random 3)
  const relatedBlogs = blogs
    .filter(b => b.id !== id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <>
      <SEO 
        title={`${blog.title} - Pelvic Vitality`} 
        description={blog.content.substring(0, 150).replace(/\*\*/g, '').replace(/\*/g, '')}
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
          <div className="w-full aspect-[21/9] md:aspect-[21/10] overflow-hidden rounded-2xl shadow-md">
            <img 
              src={blog.image} 
              alt={blog.title} 
              className="w-full h-full object-cover"
            />
          </div>
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
                <div className="aspect-[16/10] overflow-hidden">
                  <img 
                    src={relatedBlog.image} 
                    alt={relatedBlog.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
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
