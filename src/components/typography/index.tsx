export function Typography() {
  return (
    <div className="min-h-screen p-10 bg-background text-text-primary">
    <h1 className="text-primary font-extrabold text-h1-desktop mb-4">Primary Heading</h1>
    <h2 className="text-secondary text-h2-desktop mb-4">Secondary Heading</h2>
    <h3 className="text-tertiary text-h3-desktop mb-4">Tertiary Heading</h3>
    <h4 className="text-body-large-desktop mb-4">Large Body Text</h4>
    <h5 className="text-body-medium-desktop mb-4">Medium Body Text</h5>
    <h6 className="text-body-small-desktop mb-4">Small Body Text</h6>
    <p className="text-ingress-desktop mb-4">This is an ingress paragraph.</p>

    <p className="text-body-large-desktop mb-4">This is a standard paragraph.</p>

    {/* Button States */}
    <div className="space-x-4">
      <button className="bg-button-primary text-white px-4 py-2 rounded-md text-button-primary-desktop hover:bg-button-hover focus:ring-2 focus:ring-accent transition">
        Primary Button
      </button>
      <button className="bg-button-secondary text-black px-4 py-2 rounded-md text-button-secondary-desktop hover:bg-button-hoverSecondary focus:ring-2 focus:ring-accent transition">
        Secondary Button
      </button>
      <button className="bg-button-disabled text-text-contrast px-4 py-2 rounded-md text-button-primary-desktop cursor-not-allowed">
        Disabled Button
      </button>
    </div>

    {/* Links */}
    <div className="mt-5">
      <a href="#" className="text-accent-link hover:text-text-primary text-body-small-desktop">
        Learn More
      </a>
    </div>
  </div>
  );
}