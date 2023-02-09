import { useRouter } from "next/router";
import MessagePage from "components/MessagePage";

export default function Unauthorized() {
  const router = useRouter();
  return (
    <MessagePage title='Unauthorized Page'>
        <h1 className="text-5xl mb-5">Access Denied</h1>
        {router.query.message && <div className="text-red-400 mb-4">{router.query.message}</div>}
    </MessagePage>
  )
}
