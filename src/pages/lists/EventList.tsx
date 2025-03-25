import { EventCard } from "components/cards/EventCard";
import { SearchBar } from "components/shared/Pagination";
import { useState } from "react";
import { removeAccents } from "components/shared/Template";
import * as FaIcons from "react-icons/fa6";
import { Breadcrumb } from "flowbite-react";
import { Link } from "react-router-dom";
import { eventMock } from "mock/MockData";

export default function Events() {
    const [query, setQuery] = useState("");

    const filter = () => {
        return eventMock.filter(event =>
            event.eventTitle.toUpperCase().includes(query.toLocaleUpperCase()) ||
            removeAccents(event.eventTitle).toUpperCase().includes(query.toLocaleUpperCase()) ||
            event.projectTitle.toUpperCase().includes(query.toLocaleUpperCase()) ||
            removeAccents(event.projectTitle).toUpperCase().includes(query.toLocaleUpperCase()) ||
            event.eventDate.toUpperCase().includes(query.toLocaleUpperCase())||
            event.eventStatus.toUpperCase().includes(query.toLocaleUpperCase()) 
        );
    };

    const events = filter();

    return (
        <div className="mt-10">
            <Breadcrumb aria-label="breadcrumb" className="mb-3 py-2">
                <Breadcrumb.Item icon={FaIcons.FaHouse}>
                    <Link to="/">
                        Início
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/eventos">
                        Eventos
                    </Link>
                </Breadcrumb.Item>
            </Breadcrumb>

            <div>
                <SearchBar
                    pageIcon={<FaIcons.FaCalendarCheck />}
                    pageTitle="Eventos"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4 items-start p-8">
                    {events.map(event => (
                        <div key={event.eventId} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                            <EventCard event={event} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}