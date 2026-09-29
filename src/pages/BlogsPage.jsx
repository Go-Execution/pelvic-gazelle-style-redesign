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
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-soft/30">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-dark mb-6">
            Pelvic Health <span className="text-primary">Insights</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-dark/70 mb-8 max-w-2xl mx-auto">
            Discover articles, tips, and insights about pelvic floor health, treatments, and how to regain your comfort and confidence.
          </p>
        </div>
      </section>

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
                <div className="aspect-[16/10] overflow-hidden">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
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
