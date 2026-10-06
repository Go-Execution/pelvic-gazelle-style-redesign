import InnerPageHero from '../components/shared/InnerPageHero';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { blogs } from '../data/blogs';

const BlogsPage = () => {
  return (
    <>
      <SEO 
        title="Blog - Pelvic Vitality" 
        description="Read our latest articles on pelvic floor health, rehabilitation, and treatments for men and women."
      />
      
      <InnerPageHero
        title="Pelvic Health Insights"
        subtitle="Discover articles, tips, and insights about pelvic floor health, treatments, and how to regain your comfort and confidence."
      />

      {/* Blogs Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link 
                key={blog.id} 
                to={`/blogs/${blog.id}`}
                className="bg-white rounded-2xl shadow-sm border border-soft/50 overflow-hidden hover:shadow-md transition-shadow group flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden bg-gray-50 flex items-center justify-center">
                  {blog.image ? (
                  <img 
                    src={blog.image} 
                    alt={blog.imageAlt || blog.title}
                    className="w-full h-full object-contain object-center group-hover:scale-[1.02] transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-soft/20 flex flex-col items-center justify-center text-dark/40 group-hover:bg-soft/40 transition-colors">
                    <svg className="w-8 h-8 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span className="font-heading text-sm">Image Coming Soon</span>
                  </div>
                )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-heading font-semibold text-xl text-dark mb-3 group-hover:text-primary transition-colors">
                    {blog.title}
                  </h3>
                  <p className="font-body text-dark/70 line-clamp-3 mb-4 flex-grow">
                    {blog.content.trim().substring(0, 150).replace(/\*\*/g, '').replace(/\*/g, '')}...
                  </p>
                  <div className="text-primary font-medium font-body flex items-center group-hover:gap-2 transition-all">
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

export default BlogsPage;
