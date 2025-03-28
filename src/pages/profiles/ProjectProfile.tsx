import { PostSmCard } from "components/cards/PostCard";
import { Accordion, Breadcrumb, Button, Dropdown, Modal, Tabs, Timeline } from "flowbite-react";

import { useState } from "react";
import * as FaIcons from "react-icons/fa6";
import { Props } from "resources";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProjectCategoryAddForm, ProjectEditForm } from "pages/forms/ProjectForm";
import moment from "moment";
import { EventSmCard } from "components/cards/EventCard";
import { CustomMarkdown } from "components/shared/Template";
import { eventMock, eventPostMock, projectMock } from "mock/MockData";
import { CategoryCard } from "components/cards/CategoryCard";
import { useNotification } from "components/shared/Notification";

export function ProjectProfile() {
    const params = useParams();
    return (
        <>
            <ProjectDetails params={`${params.projectId}`} />
        </>
    );

    function ProjectDetails({ params: projectId }: Props) {
        const notification = useNotification();
        const [edit, setEdit] = useState(false);
        const [addCategory, setAddCategory] = useState(false);
        const [deleteModal, setDeleteModal] = useState(false);
        const navigate = useNavigate();

        const deleteProject = () => {
            setDeleteModal(false)
            navigate("/projetos")
            notification.notify("Deletado com sucesso!", "success");
        }

        const projectById = projectMock.filter(x => x.id.toString() === projectId);
        const eventByProject = eventMock.filter(x => x.projectId?.toString() === projectId);

        const posts = eventPostMock?.filter((post, index, self) => {
            return post.projectId?.toString() === projectId && self.map(p => p.postId).indexOf(post.postId) === index;
        })

        return (
            <div>
                <div className="flex flex-col md:flex-row justify-between  text-lg font-semibold text-gray-700">
                    <Breadcrumb aria-label="breadcrumb" className="mb-3 py-2">
                        <Breadcrumb.Item icon={FaIcons.FaHouse}>
                            <Link to="/">
                                Início
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to="/projetos">
                                Projetos
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item >
                            <Link to={`/projetos/${projectId}`}>
                                {projectId}
                            </Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <Dropdown label="Configurações" inline>
                        <Dropdown.Item icon={FaIcons.FaSquarePen} onClick={() => setEdit(true)} className="text-md font-medium">
                            Editar Projeto
                        </Dropdown.Item>
                        <Dropdown.Item icon={FaIcons.FaTag} onClick={() => setAddCategory(true)} className="text-md font-medium">
                            Adicionar Categoria
                        </Dropdown.Item>
                        <Dropdown.Item icon={FaIcons.FaTrash} onClick={() => setDeleteModal(true)} className="text-md font-medium">
                            Deletar Projeto
                        </Dropdown.Item>
                    </Dropdown>


                    <Modal show={deleteModal} size="md" onClose={() => setDeleteModal(false)} popup>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="text-center">
                                <FaIcons.FaExclamation className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200 border-4 p-2  rounded-full" />
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Deseja deletar este projeto?
                                </h3>
                                <div className="flex justify-center gap-4">
                                    <Button color="failure" onClick={() => deleteProject()}>
                                        <span>{"Deletar"}</span>
                                    </Button>
                                    <Button color="gray" onClick={() => setDeleteModal(false)}>
                                        Cancelar
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>

                    <Modal show={addCategory} size="3xl" onClose={() => setAddCategory(false)} popup>
                        <Modal.Header />
                        <Modal.Body>
                            <ProjectCategoryAddForm params={projectId} />
                        </Modal.Body>
                    </Modal>

                </div>
                {edit ? <ProjectEditForm params={projectId} /> :
                    <div>
                        {projectById.map(project => {
                            return (
                                <div>
                                    <div className="relative flex flex-col sm:flex-row xl:flex-col items-start md:shadow-md">
                                        <div className="order-1 sm:ml-6 xl:ml-0">
                                            <h1 className="mb-1 block text-3xl font-semibold leading-6 text-cyan-600">{project?.projectTitle}</h1>
                                            <div className="prose prose-slate prose-sm text-lg text-slate-700 mt-5">
                                                <p className="flex flex-row items-center gap-2"><FaIcons.FaTag /> Categorias relacionadas: <b>{projectById?.map(x => x.category?.length)}</b></p>
                                                <p className="flex flex-row items-center gap-2"><FaIcons.FaCalendarCheck /> Eventos relacionados: <b>{eventByProject.length}</b></p>
                                                <p className="flex flex-row items-center gap-2"><FaIcons.FaNewspaper /> Postagens relacionadas: <b>{posts?.length}</b></p>
                                            </div>
                                        </div>
                                        <img src={project?.projectImage ? project.projectImage : require("assets/img/image.png")} className="mb-6 shadow-md rounded-lg bg-slate-50 w-[22rem] sm:mb-0" alt={project.projectTitle} />
                                    </div>
                                    <Accordion collapseAll className="my-6 ">
                                        <Accordion.Panel>
                                            <Accordion.Title>
                                                <h2 className="flex flex-row items-center gap-2 text-xl text-slate-800 "><FaIcons.FaCircleInfo />Informações Gerais</h2>
                                            </Accordion.Title>
                                            <Accordion.Content className="p-2">
                                                <p className="mt-5 text-md text-slate-700 md:px-10">
                                                    <CustomMarkdown item={project?.projectDetails} />
                                                </p>
                                            </Accordion.Content>
                                        </Accordion.Panel>
                                        <Accordion.Panel>
                                            <Accordion.Title>
                                                <h2 className="flex flex-row items-center gap-2 text-xl text-slate-800 "><FaIcons.FaRectangleList />Descrição</h2>
                                            </Accordion.Title>
                                            <Accordion.Content>
                                                <p className="mt-5 text-xl text-slate-700 md:px-10">
                                                    <CustomMarkdown item={project?.projectDescription} />
                                                </p>
                                            </Accordion.Content>
                                        </Accordion.Panel>
                                    </Accordion>

                                    <Tabs className="p-1 text-slate-600 rounded-md overflow-x-scroll" variant="fullWidth">
                                        <Tabs.Item active title="Eventos" icon={FaIcons.FaCalendarCheck}>
                                            {eventByProject.length === null ? "Nenhum evento encontrado!" :
                                                <Timeline className="mt-5 mx-6">
                                                    {eventByProject.map(event => {
                                                        return (
                                                            <>
                                                                <Timeline.Item>
                                                                    <Timeline.Point icon={FaIcons.FaCalendarWeek} />
                                                                    <Timeline.Content>
                                                                        <Timeline.Time>{moment(event.eventDate).format("DD/MM/yyyy")}</Timeline.Time>
                                                                        <Timeline.Body>
                                                                            <EventSmCard event={event} />
                                                                        </Timeline.Body>
                                                                    </Timeline.Content>
                                                                </Timeline.Item >
                                                            </>
                                                        )
                                                    })}
                                                </Timeline>
                                            }
                                        </Tabs.Item>

                                        <Tabs.Item title="Categorias" icon={FaIcons.FaTag}>
                                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-10 gap-x-4 items-start p-4">
                                                {projectById?.map(project => (
                                                    project.category?.map(x => {
                                                        return (
                                                            <CategoryCard category={x} />
                                                        )
                                                    })
                                                ))}
                                            </div>
                                        </Tabs.Item>

                                        <Tabs.Item active title="Postagens" icon={FaIcons.FaNewspaper}>
                                            {posts.length === null ? "Nenhuma postagem encontrado!" :
                                                <div className="mt-10 grid grid-cols-1 divide-y gap-x-8 ">
                                                    {posts?.map(post =>
                                                        <PostSmCard post={post} />
                                                    )}
                                                </div>
                                            }
                                        </Tabs.Item>

                                        <Tabs.Item active title="Galeria" icon={FaIcons.FaImage}>
                                            <p className="mb-1 py-10 text-center block font-semibold text-3xl leading-6 text-slate-600">Em Desenvolvimento</p>
                                        </Tabs.Item>

                                        <Tabs.Item active title="Organização" icon={FaIcons.FaUserGroup}>
                                            <h2 className="text-xl font-semibold">Autor:</h2>
                                            <div className="flex items-center space-x-4 rtl:space-x-reverse py-1 sm:py-2 border-2 border-zinc-300 rounded-md">
                                                <img src={project?.userImage ? project.userImage : require("assets/img/user_profile.png")} alt="usuário" className="h-20 min-w-20 rounded-full" />
                                                <div title={project?.username} className="inline-flex font-semibold text-gray-900 h-12 overflow-hidden">
                                                    {project?.username}
                                                </div>
                                            </div>
                                            <p className="mb-1 py-10 text-center block font-semibold text-3xl leading-6 text-slate-600">Em Desenvolvimento</p>
                                        </Tabs.Item>
                                    </Tabs>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        );
    }
}

