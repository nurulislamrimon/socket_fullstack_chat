import Chatting from "./components/Chatting";
import SocketProvider from "./providers/SocketProvider";

export default function Home() {
  return (
    <SocketProvider>
      <Chatting />
    </SocketProvider>
  );
}
