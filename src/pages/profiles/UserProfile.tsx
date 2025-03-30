import { ProjectCard } from "components/cards/ProjectCard";

import { Accordion, Breadcrumb, Tabs } from "flowbite-react";

import * as FaIcons from "react-icons/fa6";
import { Props } from "resources";
import { Link, useParams } from "react-router-dom";
import { CustomMarkdown } from "components/shared/Template";
import { eventMock, postMock, projectMock, userMock } from "mock/MockData";
import { EventSmCard } from "components/cards/EventCard";
import { PostSmCard } from "components/cards/PostCard";

export function UserPersonalProfile() {
    const params = useParams();
    return (
        <UserPersonalDetails params={`${params.userId}`} />
    );

    function UserPersonalDetails({ params: userId }: Props) {

        const userById = userMock.filter(x => x.id.toString() === userId);
        const projects = projectMock.filter(x => x.userId.toString() === userId);
        const myEvents = eventMock.filter(x => x.userId.toString() === userId);

        return (
            <div>
                <Breadcrumb aria-label="breadcrumb" className="mb-3 py-2">
                    <Breadcrumb.Item icon={FaIcons.FaHouse}>
                        <Link to="/">
                            Início
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/usuarios">
                            Usuários
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                        <Link to={`/usuarios/${userId}`}>
                            {userId}
                        </Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div>
                    {userById.map(user => (
                        <div>
                            <div className="flex flex-wrap items-center justify-center my-4">
                                <div className="lg:w-full bg-white  transform duration-200 easy-in-out">
                                    <div className=" h-40 overflow-hidden" >
                                        <img className="w-full rounded-t-lg" src={user?.userCoverImage ?? require("assets/img/user_cover.png")} alt={user?.username} />
                                    </div>
                                    <div className="flex justify-center px-5 -mt-12">
                                        <img className="h-32 w-32 bg-white p-2 rounded-full" src={user?.userImage ?? require("assets/img/user_profile.png")} alt={user?.username} />
                                    </div>
                                    <div className="text-gray-600 text-center px-14">
                                        <h2 className="text-gray-800 text-3xl font-bold">{user?.username}</h2>
                                        <p className="mt-2 text-md font-semibold"> {user?.userLocation} </p>
                                        <Accordion collapseAll className="my-6 ">
                                            <Accordion.Panel>
                                                <Accordion.Title>
                                                    <h2 className="flex flex-row items-center gap-2 text-xl text-slate-800 "><FaIcons.FaPencil />Bio</h2>
                                                </Accordion.Title>
                                                <Accordion.Content className="p-2">

                                                    <p className="mt-2 text-lg text-justify">
                                                        <CustomMarkdown item={user?.userBio} />
                                                    </p>
                                                </Accordion.Content>
                                            </Accordion.Panel>
                                        </Accordion>
                                    </div>
                                </div>
                            </div>
                            <Tabs className="p-1 text-slate-600 rounded-md overflow-x-scroll" variant="fullWidth">

                                <Tabs.Item icon={FaIcons.FaFolderClosed} title="Projetos Relacionados" >
                                    <h2 className="mt-5 text-2xl text-zinc-800 ">Criados: </h2>
                                    <div className="  grid grid-cols-1 gap-y-10 gap-x-6 items-start p-8 divide-y divide-gray-300">
                                        {projects?.map(project => (
                                            <div key={project.id}>
                                                <ProjectCard project={project} />
                                            </div>
                                        ))}
                                    </div>
                                </Tabs.Item>
                                <Tabs.Item icon={FaIcons.FaCalendarCheck} title="Eventos Relacionados" >

                                    <h2 className="mt-5 text-2xl text-zinc-800 ">Criados: </h2>
                                    <div className="grid grid-cols-1 items-start p-8 divide-y divide-gray-300">
                                        {myEvents?.map(event =>
                                            <div key={event.eventId}>
                                                <EventSmCard event={event} />
                                            </div>
                                        )}
                                    </div>

                                    <h2 className="mt-5 text-2xl text-zinc-800 ">Participando: </h2>
                                    <div className="grid grid-cols-1 items-start p-8 divide-y divide-gray-300">
                                        {eventMock?.map(event =>
                                            event.users?.filter(x => x.userId.toString() === userId)
                                                .map(x =>
                                                    <div key={event.eventId}>
                                                        <span aria-label={`${x.userId}`} />
                                                        <EventSmCard event={event} />
                                                    </div>
                                                )
                                        )}
                                    </div>
                                </Tabs.Item>
                                <Tabs.Item icon={FaIcons.FaNewspaper} title="Postagens Relacionados">
                                    <h2 className="mt-5 text-2xl text-zinc-800 ">Criados: </h2>
                                    <div className="  grid grid-cols-1 gap-x-2 w-full items-start p-8 divide-y divide-gray-300">
                                        {postMock?.filter(post => post.userId.toString() === userId)
                                            .map(post => (
                                                <div key={post.postId} >
                                                    <PostSmCard post={post} />
                                                </div>
                                            ))}
                                    </div>
                                </Tabs.Item>
                            </Tabs>
                        </div>
                    ))}
                </div>
            </div >
        );
    }
}

