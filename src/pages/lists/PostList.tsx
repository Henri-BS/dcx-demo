import { PostCard } from "components/cards/PostCard";
import { SearchBar } from "components/shared/SearchBar";
import { removeAccents } from "components/shared/Template";
import { Breadcrumb } from "flowbite-react";
import { postMock } from "mock/MockData";
import { useState } from "react";
import { FaHouse, FaNewspaper } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Posts() {
    const [query, setQuery] = useState("");

    const filter = () => {
        return postMock.filter(item =>
            item.postTitle.toUpperCase().includes(query.toLocaleUpperCase()) ||
            removeAccents(item.postTitle).toUpperCase().includes(query.toLocaleUpperCase()) 
        ).sort((post) => post.postId);
    };

    const posts = filter();

    return (
        <div>
            <Breadcrumb aria-label="breadcrumb" className="mb-3 py-2">
                <Breadcrumb.Item icon={FaHouse}>
                    <Link to="/">
                        Início
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/postagens">
                        Postagens
                    </Link>
                </Breadcrumb.Item>
            </Breadcrumb>
            <div>
                <SearchBar
                    pageIcon={<FaNewspaper />}
                    pageTitle="Postagens"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-10 items-start p-8">
                    {posts?.map(post => (
                        <div key={post.postId} className="relative flex sm:flex-row xl:flex-col items-start ">
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}