import ThreadCardDetail from "../features/thread/components/Thread";
import Replies from "../features/thread/components/Replies";
import ThreadCard from "../features/thread/components/Threads";

export function Home() {
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
