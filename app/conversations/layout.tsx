import getConversations from "@/actions/getConversations";
import getUsers from "@/actions/getUsers";
import ConversationList from "@/components/ConversationList";
import SidebarComponent from "@/components/sidebar/SidebarComponent";

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <SidebarComponent>
      <div className="w-full">
        <ConversationList initialItems={conversations} users={users} />
        {children}
      </div>
    </SidebarComponent>
  );
}
