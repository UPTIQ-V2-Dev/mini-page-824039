export const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          About TinyPage
        </h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground mb-6">
            TinyPage is a modern web application built with the latest technologies and best practices. 
            Our mission is to demonstrate how simplicity and power can work together to create 
            exceptional user experiences.
          </p>
          
          <div className="grid gap-8 md:grid-cols-2 mt-12">
            <div className="bg-muted/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
              <p className="text-muted-foreground">
                To create beautiful, functional, and accessible web experiences that inspire 
                developers and delight users.
              </p>
            </div>
            
            <div className="bg-muted/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
              <p className="text-muted-foreground">
                To showcase modern web development practices through clean code, 
                thoughtful design, and exceptional performance.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-semibold mb-4">Built With Love</h3>
            <p className="text-muted-foreground">
              This application is crafted using React 19, TypeScript, Tailwind CSS, 
              and other cutting-edge technologies to deliver the best possible experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};