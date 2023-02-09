import Link from "next/link";
import MessagePage from "components/MessagePage";

export default function Error() {
    return (
        <MessagePage title='404'>
            <h1 className="text-9xl mb-5">404</h1>
            <p>Page Not Found</p>
            <Link href='/' className="primary-button">Go Home</Link>
        </MessagePage>
    )
}