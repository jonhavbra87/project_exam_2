import GradientHeading from '../../styles/GradientHeading';
/**
 * PrivacyGuidelines component displays the privacy policy
 *
 * @component
 * @returns {JSX.Element} - Rendered PrivacyGuidelines component
 *
 * @description
 * Displays a formatted privacy policy document with sections covering
 * data collection, usage, security, user rights, data storage, third-party
 * services, and policy updates. Uses GradientHeading for the main title
 * and consistent styling for section headers and paragraphs. Designed to be
 * responsive across different screen sizes with appropriate typography classes.
 *
 * @example
 * // Usage in a route
 * <Route path="/privacy" element={<PrivacyGuidelines />} />
 */

const PrivacyGuidelines = (): JSX.Element => {
  return (
    <>
      <GradientHeading>Privacy Guidelines</GradientHeading>
      <h2 className="text-body-large-mobile md:text-body-large-desktop font-semibold font-body mt-4">
        1. Data Collection
      </h2>
      <p className="text-body-large-mobile md:text-body-large-desktop font-medium font-body">
        We collect user data necessary for account creation, booking, and
        platform operation. This includes name, email, and booking history.
      </p>
      <h2 className="text-body-large-mobile md:text-body-large-desktop font-semibold font-body mt-4">
        2. Data Usage
      </h2>
      <p className="text-body-large-mobile md:text-body-large-desktop font-medium font-body">
        Your data is used solely for providing and improving our services. We do
        not sell or share your data with third parties without consent.
      </p>
      <h2 className="text-body-large-mobile md:text-body-large-desktop font-semibold font-body mt-4">
        3. Security
      </h2>
      <p className="text-body-large-mobile md:text-body-large-desktop font-medium font-body">
        We implement security measures to protect user data. However, users
        should also maintain strong passwords and report any suspicious
        activities.
      </p>
      <h2 className="text-body-large-mobile md:text-body-large-desktop font-semibold font-body mt-4">
        4. User Rights
      </h2>
      <p className="text-body-large-mobile md:text-body-large-desktop font-medium font-body">
        Users have the right to access, modify, or delete their personal data.
        Requests can be made through our support team.
      </p>
      <h2 className="text-body-large-mobile md:text-body-large-desktop font-semibold font-body mt-4">
        5. Data Storage
      </h2>
      <p className="text-body-large-mobile md:text-body-large-desktop font-medium font-body">
        Our platform uses local storage to store your username and email for
        seamless login. Users are automatically logged out after 24 hours for
        security reasons.
      </p>
      <h2 className="text-body-large-mobile md:text-body-large-desktop font-semibold font-body mt-4">
        6. Third-Party Services
      </h2>
      <p className="text-body-large-mobile md:text-body-large-desktop font-medium font-body">
        We may use third-party services for analytics and payment processing.
        These services comply with data protection regulations.
      </p>
      <h2 className="text-body-large-mobile md:text-body-large-desktop font-semibold font-body mt-4">
        7. Policy Updates
      </h2>
      <p className="text-body-large-mobile md:text-body-large-desktop font-medium font-body">
        We may update this privacy policy as needed. Users will be notified of
        significant changes.
      </p>
    </>
  );
};

export default PrivacyGuidelines;
