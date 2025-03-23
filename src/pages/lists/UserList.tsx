import { SearchBar } from "components/shared/Pagination";
import { UserCard } from "components/cards/UserCards";
import { useState } from "react";
import { removeAccents } from "components/shared/Template";
import { FaUser } from "react-icons/fa6";
import { userMock } from "mock/MockData";

export default function Users() {
    const [query, setQuery] = useState("");
     const filter = () => {
            return userMock.filter(user =>
                user.username.toUpperCase().includes(query.toLocaleUpperCase()) ||
                removeAccents(user.username)?.toUpperCase().includes(query.toLocaleUpperCase()) ||
                user.userLocation?.toUpperCase().includes(query.toLocaleUpperCase()) ||
                removeAccents(user.userLocation)?.toUpperCase().includes(query.toLocaleUpperCase())
            ).sort((user) => user.id);
        };
    
        const users = filter();

    return (
        <div className="mt-10">
            <SearchBar
                pageIcon={<FaUser />}
                pageTitle="Usuários"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
                {users.map(user => (
                    <div key={user.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                        <UserCard user={user} />
                    </div>
                ))}
            </div>
        </div>
    );
}