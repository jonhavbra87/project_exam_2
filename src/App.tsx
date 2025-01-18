import './index.css';

function App() {
  return (
    <>
      <h1 className="text-primary text-h1-desktop">Primary Heading</h1>
      <h2 className="text-secondary text-h2-desktop">Secondary Heading</h2>
      <h3 className="text-tertiary text-h3-desktop">Tertiary Heading</h3>
      <h4 className="text-body-large-desktop">Large Body Text</h4>
      <h5 className="text-body-medium-desktop">Medium Body Text</h5>
      <h6 className="text-body-small-desktop">Small Body Text</h6>
      <p className="text-ingress-desktop">This is a ingress paragraph.</p>

      <p className="text-body-large-desktop">This is a paragraph.</p>
      <button className="bg-accent text-white px-4 py-2 rounded-md text-button-primary-desktop mt-5">
        Click Me
      </button>
      <a
        href="#"
        className="text-accent-link hover:text-text-primary text-body-small-desktop"
      >
        Learn More
      </a>
    </>
  );
}

export default App;
