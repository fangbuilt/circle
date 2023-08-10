import ThreadCardDetail from "../features/thread/components/ThreadCardDetail";
import Replies from "../features/thread/components/Replies";
import ThreadCard from "../features/thread/components/ThreadCard";

export default function Home() {
    return (
        <>
        <ThreadCard />
        </>
    )
}

export function ObserveThread() {
    return (
        <>
        <ThreadCardDetail />
        <Replies />
        </>
    )
}
