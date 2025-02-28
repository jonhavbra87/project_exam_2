import { TiMessages } from "react-icons/ti";

const Messages = () => {
    return (
        <div>
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-h1-mobile md:text-h1-desktop font-heading font-semibold text-secondary mb-16">No Messages</h2>
        <TiMessages  className="text-6xl text-primary-3 mb-8" />
        <p className="text-body-large-mobile md:text-body-large-desktop font-body font-medium mb-16">Looks like your inbox is a little quiet. Start engaging with customers to build connections, answer inquiries, and keep the conversation going. Whether it’s about booking details, special requests, or just a friendly chat—your messages start here! Start a conversation today and turn visitors into happy guests!</p>
        </div>
      </div>
      )
}
export default Messages;