import { getMessagesByUser } from "@/action/messages/getMessagesByUser";
import UlMesaages from "@/components/UlMesaages";

export default async function MessagesPage() {
  const { allMesaagedByUser, error } = await getMessagesByUser();
  if (error) {
    return <div>{error}</div>;
  }

  if (allMesaagedByUser) {
    const simpleMessages = allMesaagedByUser.map(message => JSON.parse(JSON.stringify(message)));

    return (
      <section className="h-full">
        <UlMesaages messages={simpleMessages}/>
      </section>
    );
  }
}
