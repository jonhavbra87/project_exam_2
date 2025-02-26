import GradientHeading from "../../styles/GradientHeading";

const TermsOfService = () => {
  return (
    <div>
      <GradientHeading>Terms of Service</GradientHeading>

      <h2 className="text-body-large-mobile md:text-body-large-desktop font-semibold font-body mt-4">1. Introduction</h2>
      <p className="text-body-large-mobile md:text-body-large-desktop font-medium font-body">
        Welcome to our <span className="text-secondary">Holidaze</span> booking
        platform. By using our services, you agree to comply with the following
        Terms of Service.
      </p>

      <h2 className="text-body-large-mobile md:text-body-large-desktop font-semibold font-body mt-4">2. User Accounts</h2>
      <p className="text-body-large-mobile md:text-body-large-desktop font-medium font-body">
        To use this platform, you must create an account using a valid
        @noroff.stud.no email address. Users must provide accurate information
        and maintain the security of their account credentials.
      </p>

      <h2 className="text-body-large-mobile md:text-body-large-desktop font-semibold font-body mt-4">
        3. Profile and Venue Creation
      </h2>
      <p className="text-body-large-mobile md:text-body-large-desktop font-medium font-body">
        Users can create a profile and list venues for booking. Venue details
        must be accurate and comply with platform policies.
      </p>

      <h2 className="text-body-large-mobile md:text-body-large-desktop font-semibold font-body mt-4">
        4. Booking and Cancellations
      </h2>
      <p className="text-body-large-mobile md:text-body-large-desktop font-medium font-body">
        Users can book available venues through the platform. Cancellations must
        be made at least 24 hours before the scheduled booking time to avoid
        penalties.
      </p>

      <h2 className="text-body-large-mobile md:text-body-large-desktop font-semibold font-body mt-4">5. Platform Conduct</h2>
      <p className="text-body-large-mobile md:text-body-large-desktop font-medium font-body">
        Users must adhere to ethical conduct and refrain from fraudulent or
        harmful activities. Violation of these terms may result in account
        suspension or termination.
      </p>

      <h2 className="text-body-large-mobile md:text-body-large-desktop font-semibold font-body mt-4">6. Liability</h2>
      <p className="text-body-large-mobile md:text-body-large-desktop font-medium font-body">
        We do not take responsibility for disputes between users or damages
        occurring during venue usage. Users are encouraged to communicate and
        resolve issues amicably.
      </p>

      <h2 className="text-body-large-mobile md:text-body-large-desktop font-semibold font-body mt-4">7. Amendments</h2>
      <p className="text-body-large-mobile md:text-body-large-desktop font-medium font-body">
        We reserve the right to modify these Terms of Service at any time. Users
        will be notified of significant updates.
      </p>

      <h2 className="text-body-large-mobile md:text-body-large-desktop font-semibold font-body mt-4">8. Contact</h2>
      <p className="text-body-large-mobile md:text-body-large-desktop font-medium font-body">
        If you have any questions regarding these terms, please contact our
        support team.
      </p>
    </div>
  );
};

export default TermsOfService;
