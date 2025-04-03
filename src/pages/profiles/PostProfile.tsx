import { Blockquote, Breadcrumb, Button, Card, Dropdown, Modal, Tabs } from "flowbite-react";

import { useState } from "react";
import * as FaIcons from "react-icons/fa6";
import { Props } from "resources";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PostEditForm, EventPostAddForm } from "pages/forms/PostForm";
import { EventSmCard } from "components/cards/EventCard";
import { PostSmCard } from "components/cards/PostCard";
import { CustomMarkdown } from "components/shared/Template";
import { eventPostMock, postMock } from "mock/MockData";
import { useNotification } from "components/shared/Notification";


export function PostProfile() {
    const params = useParams();
    return (
        <PostDetails params={`${params.postId}`} />
    );

    function PostDetails({ params: postId }: Props) {
        const navigate = useNavigate();
        const notification = useNotification();
        const [edit, setEdit] = useState(false);
        const [deleteModal, setDeleteModal] = useState(false);
        const [addEvent, setAddEvent] = useState(false);

        const postById = postMock.filter(x => x.postId.toString() === postId);
        const posts = postMock.sort(x => x.postId);
        const events = eventPostMock.filter(x => x.postId.toString() === postId);

        const deletePost = () => {
            setDeleteModal(false)
            navigate("/postagens")
            notification.notify("Deletado com sucesso!", "success");
        }


        return (
            <div>
                <div className="flex flex-col md:flex-row justify-between md:items-end mb-4 space-y-4 text-lg font-semibold text-gray-700">
                    <Breadcrumb aria-label="breadcrumb">
                        <Breadcrumb.Item icon={FaIcons.FaHouse}>
                            <Link to="/">
                                Início
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to="/postagens">
                                Postagens
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item >
                            <Link to={`/postagens/${postId}`}>
                                {postId}
                            </Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <Dropdown label="Configurações" inline>
                        <Dropdown.Item icon={FaIcons.FaSquarePen} onClick={() => setEdit(true)} className="text-md font-medium">
                            Editar Postagem
                        </Dropdown.Item>
                        <Dropdown.Item icon={FaIcons.FaCalendarCheck} onClick={() => setAddEvent(true)} className="text-md font-medium">
                            Adicionar Evento
                        </Dropdown.Item>
                        <Dropdown.Item icon={FaIcons.FaTrash} onClick={() => setDeleteModal(true)} className="text-md font-medium">
                            Deletar
                        </Dropdown.Item>
                    </Dropdown>
                </div>

                <Modal show={deleteModal} size="md" onClose={() => setDeleteModal(false)} popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <FaIcons.FaExclamation className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200 border-4 p-2  rounded-full" />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Deseja deletar esta postagem?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button color="failure" onClick={() => deletePost()} >
                                    <span onClick={() => setDeleteModal(false)}>{"Deletar"}</span>
                                </Button>
                                <Button color="gray" onClick={() => setDeleteModal(false)}>
                                    Cancelar
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

                <Modal show={addEvent} size="3xl" onClose={() => setAddEvent(false)} popup>
                    <Modal.Header />
                    <Modal.Body>
                        <EventPostAddForm params={postId} />
                    </Modal.Body>
                </Modal>

                {postById.map(post => (
                    <div>
                        {edit ? <PostEditForm params={postId} /> :
                            <div>
                                <h3 className="mb-4 text-2xl md:text-3xl leading-6 text-cyan-600 font-semibold">
                                    {post?.postTitle}
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-5 mt-5">
                                    <div className="col-span-3 text-xl text-gray-800 text-justify py-2 md:pr-10">
                                        <div className="relative flex flex-col items-start">

                                            <Blockquote className="mb-4 text-slate-600 text-xl">
                                                {post?.postSummary}
                                            </Blockquote>
                                            <img
                                                src={post?.postImage ? post?.postImage : require("assets/img/image.png")}
                                                className="shadow-md rounded-lg w-[160rem] " alt={post?.postTitle}
                                            />
                                            <p className="flex mt-2 items-center text-center text-sm font-medium text-gray-700">
                                                enviado em: {post?.createdDate}
                                            </p>
                                        </div>
                                        <p className="text-xl text-justify">
                                            <CustomMarkdown item={post?.postDescription} />
                                        </p>
                                    </div>

                                    <div className="flex flex-col col-span-2 p-4 md:border-l border-gray-300">
                                        <Card className="p-2 md:mb-10">
                                            <div className="flex items-center justify-start gap-x-2">
                                                <img
                                                    className="h-16 w-16 rounded-full border-2"
                                                    src={post?.userImage ?? require("assets/img/user_profile.png")}
                                                    alt="usuario"
                                                />
                                                <p id="profile-popover" className="mb-6 text-base font-semibold leading-none text-gray-900">
                                                    {post?.username}
                                                </p>
                                            </div>
                                            <p className="text-md font-normal max-h-[100px] overflow-hidden">
                                                {post?.userBio}
                                            </p>
                                        </Card>
                                        <div>
                                            <h2 className="font-semibold text-xl text-slate-800">Outras Postagens</h2>
                                            <div className="divide-y divide-gray-300 my-4">
                                                {posts?.map(post => {
                                                    posts.length = 6
                                                    return (
                                                        < div key={post.postId} >
                                                            <PostSmCard post={post} />
                                                        </div>
                                                    )
                                                })}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                        <Tabs className="p-1 text-slate-600 rounded-md overflow-x-scroll" variant="fullWidth">
                            <Tabs.Item icon={FaIcons.FaCalendarCheck} title="Eventos Relacionados" >
                                {!events?.length ? "Nenhum evento relacionado!" :
                                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 items-start p-8">
                                        {events?.map(event => (
                                            <>
                                                <div key={event.eventId} >
                                                    <EventSmCard event={event} />
                                                </div>
                                            </>
                                        ))}
                                    </div>
                                }
                            </Tabs.Item>
                            <Tabs.Item title="Galeria" icon={FaIcons.FaImages} >
                                <p className="mb-1 py-10 text-center block font-semibold text-3xl leading-6 text-slate-600">Em Desenvolvimento</p>
                            </Tabs.Item>
                        </Tabs>
                    </div>
                ))}
            </div >
        );
    }
}

