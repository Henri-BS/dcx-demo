import { PostSmCard } from "components/cards/PostCard";
import { UserCard } from "components/cards/UserCards";
import { useNotification } from "components/shared/Notification";
import { CustomMarkdown } from "components/shared/Template";
import { Breadcrumb, Button, Dropdown, Modal, Tabs } from "flowbite-react";
import { eventMock, eventPostMock } from "mock/MockData";
import moment from "moment";
import { EventEditForm } from "pages/forms/EventForm";
import { useState } from "react";
import * as FaIcons from "react-icons/fa6";
import * as GoIcons from "react-icons/go";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Props } from "resources";


export function EventProfile() {
    const params = useParams();
    return (
        <>
            <EventDetails params={`${params.eventId}`} />
        </>
    );
}

export function EventDetails({ params: eventId }: Props) {
    const navigate = useNavigate();
    const notification = useNotification();
    const [edit, setEdit] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const eventById = eventMock.filter(x => x.eventId.toString() === eventId);
    const postsByEvent = eventPostMock.filter(x => x.eventId.toString() === eventId);

    const deleteEvent = () => {
        setDeleteModal(false)
        navigate("/eventos")
        notification.notify("Deletado com sucesso!", "success");
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between py-4 text-lg font-semibold text-gray-700">
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
                    <Breadcrumb.Item >
                        <Link to={`/eventos/${eventId}`}>
                            {eventId}
                        </Link>
                    </Breadcrumb.Item>
                </Breadcrumb>

                <Dropdown label="Configurações" inline>
                    <Dropdown.Item icon={FaIcons.FaSquarePen} onClick={() => setEdit(true)} className="text-md font-medium">
                        Editar
                    </Dropdown.Item>
                    <Dropdown.Item icon={FaIcons.FaTrash} onClick={() => setDeleteModal(true)} className="text-md font-medium">
                        Deletar
                    </Dropdown.Item>
                </Dropdown>
                <Modal show={deleteModal} size="md" onClose={() => setDeleteModal(false)} popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <FaIcons.FaExclamation className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200 border-4 p-2  rounded-full" />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Deseja deletar este evento?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button color="failure" onClick={() => deleteEvent()} >
                                    <span onClick={() => setDeleteModal(false)}>{"Deletar"}</span>
                                </Button>
                                <Button color="gray" onClick={() => setDeleteModal(false)}>
                                    Cancelar
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
            {eventById.map(event =>
                <div>
                    {edit ? <EventEditForm params={eventId} /> :
                        <div>
                            <div className="relative flex flex-col sm:flex-row xl:flex-col items-start">
                                <div className="order-1 sm:ml-6 xl:ml-0">
                                    <h3 className="mb-1 text-slate-900 font-semibold">
                                        <span className="mb-1 block text-2xl leading-6 text-cyan-600">{event?.eventTitle}</span>
                                    </h3>
                                    <div>
                                        <p className="flex gap-2 items-center text-center text-lg font-semibold text-gray-700">
                                            <GoIcons.GoFileDirectory /> Projeto: <Link to={`/projetos/${event.projectId}`} className="hover:underline"> {event?.projectTitle}</Link>
                                        </p>
                                        <p className="flex gap-2 items-center text-center text-lg font-semibold text-gray-700">
                                            <GoIcons.GoCalendar /> Data do evento: {event.eventDate ? moment(event?.eventDate).format("DD/MM/yyyy") : "Indefinido"}
                                        </p>
                                        <p className="flex gap-2 items-center text-center text-lg font-semibold text-gray-700">
                                            <GoIcons.GoChecklist /> Status: {event?.eventStatus ?? "Indefinido"}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <img src={event?.eventImage ? event.eventImage : require("assets/img/image.png")} className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full" width="1216" height="640" alt={event.eventTitle} />
                                    <p className="flex gap-2 mt-2 items-center text-center text-sm font-medium text-gray-700">
                                        enviado em: {event?.createdDate}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 text-xl text-zinc-800 text-justify">
                                <CustomMarkdown item={event?.eventDescription} />
                            </div>
                            <Tabs className="mt-4 text-zinc-500 p-1 rounded-md overflow-scroll" variant="fullWidth">
                                <Tabs.Item active title="Postagens" icon={FaIcons.FaNewspaper}>
                                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 items-start p-8 divide-y divide-gray-300">
                                        {postsByEvent?.map((post) => (
                                            <>
                                                <PostSmCard post={post} />
                                            </>
                                        ))}
                                    </div>
                                </Tabs.Item>

                                <Tabs.Item title="Participantes" icon={FaIcons.FaUsersRectangle}>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
                                        {eventById.map(x => (
                                            x.users?.map(user =>
                                                <div key={user?.userId} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                                                    <UserCard user={user} />
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </Tabs.Item>
                                <Tabs.Item title="Programação" icon={FaIcons.FaClipboardList}>
                                    <p className="mb-1 py-10 text-center block font-semibold text-3xl leading-6 text-slate-600">Em Desenvolvimento</p>
                                </Tabs.Item>
                            </Tabs>
                        </div>
                    }
                </div>
            )}
        </div>
    );
}
