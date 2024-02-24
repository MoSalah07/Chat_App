import getConversationById from "@/actions/getConversationById";
import getMessages from "@/actions/getMessages";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import React from "react";
import Body from "./components/Body";
import Form from "./components/Form";

interface IParams {
  conversationId: string;
}

export default async function ConversationId({ params }: { params: IParams }) {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-screen ">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <div className="flex flex-col h-full">
          <Body initialMessages={messages} />
          <Form />
        </div>
      </div>
    </div>
  );
}
