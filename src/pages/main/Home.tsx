import { CategoryCard } from "components/cards/CategoryCard";
import { EventCard } from "components/cards/EventCard";
import { PostCard, PostSmCard } from "components/cards/PostCard";
import { ProjectCard } from "components/cards/ProjectCard";
import { CustomFlowbiteTheme, Flowbite, Carousel, Accordion, Banner, Breadcrumb, Button, Modal } from "flowbite-react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa6";
import { categoryMock, eventMock, postMock, projectMock } from "mock/MockData";
import { useState } from "react";

export const customTheme: CustomFlowbiteTheme = {
    carousel: {
        root: {
            base: "relative h-full w-full",
            leftControl: "absolute left-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none",
            rightControl: "absolute right-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none"
        },
        indicators: {
            active: {
                off: "bg-gray-400/70 hover:bg-gray-500",
                on: "bg-gray-500"
            },
            base: "h-3 w-3 rounded-full",
            wrapper: "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3"
        },
        control: {
            base: "inline-flex h-8 w-8 items-center justify-center rounded-full group-focus:outline-none group-focus:ring-4 group-focus:ring-white bg-gray-800/50 group-hover:bg-gray-800/80 group-focus:ring-gray-800/80 sm:h-10 sm:w-10",
            icon: "h-5 w-5 text-white sm:h-6 sm:w-6"
        },
    }
};

export default function Home() {
    const posts = postMock.sort(x => x.postId);
    const projects = projectMock.sort(x => x.id);
    const categories = categoryMock.sort(x => x.id);
    const events = eventMock.sort(x => x.eventId);
    const [infoModal, setInfoModal] = useState<boolean>(false);

    return (
        <>
            <div>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <Breadcrumb aria-label="breadcrumb">
                        <Breadcrumb.Item icon={FaIcons.FaHouse}>
                            <Link to="/">
                                Início
                            </Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Banner className="md:w-80 mt-4 md:m-0">
                        <div className="flex w-full justify-between border border-red-300 rounded-full hover:border-red-500 transiton duration-500 cursor-pointer bg-gray-50 " >

                            <p className="flex items-center w-full rounded-l-full gap-x-2 text-sm font-bold text-red-500 px-2" onClick={() => setInfoModal(true)}>
                                <FaIcons.FaInfo className="text-red-500 border-2 border-red-500 p-[2px] text-xl rounded-full" /> Versão Demonstrativa
                            </p>
                            <Banner.CollapseButton color="gray" className="border-0 rounded-r-full bg-transparent text-gray-500">
                                <FaIcons.FaX />
                            </Banner.CollapseButton>
                        </div>
                    </Banner>
                </div>
                <Modal show={infoModal} size="2xl" onClose={() => setInfoModal(false)}>
                    <Modal.Header>Versão Demonstrativa</Modal.Header>
                    <Modal.Body>
                        <div className="text-gray-600 text-sm md:text-md">
                            Esta é uma demonstração com funcionalidades limitadas, possibilitando apenas a visualização de dados estáticos.
                            <br />
                            Funcionalidades como: cadastro, login, adição, atualização ou remoção de conteúdo são meramente visuais e não implicam em alterações na plataforma.
                            <br />
                            Para saber mais sobre todas as funcionalidades disponíveis, acesse o link do projeto completo no GitHub e veja a descrição:
                            <a href="https://github.com/Henri-BS/diario-caxias" className=" mx-2 text-blue-600 hover:text-blue-400 hover:underline">Diário Caxias GitHub</a>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="justify-end">
                        <Button gradientDuoTone="purpleToBlue" onClick={() => setInfoModal(false)}>
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Accordion collapseAll>
                    <Accordion.Panel>
                        <Accordion.Title>
                            <h5 className="flex flex-row justify-between sm:text-md md:text-xl font-semibold tracking-tight text-gray-600 text-center">
                                Boas vindas ao Diário Caxias
                            </h5>
                        </Accordion.Title>
                        <Accordion.Content>
                            <p className="font-normal sm:text-sm text-gray-700 text-justify">
                                Aqui nesta plataforma você poderá encontrar um vasto acervo de projetos e eventos que visam contribuir com o desenvolvimento educacional, profissional e cultural da cidade de Caxias do Maranhão.
                                O Diário Caxias se compromete em estabelecer um vínculo entre a educação formal e a informal, permitindo que pessoas das mais diversas áreas ou níveis acadêmicos possam participar ativamente das atividades propostas, almejando uma participação multidisciplinar dos Caxienses.
                                Para saber um pouco mais sobre os recentes projetos ou eventos, clique nas últimas nóticias que aparecem aqui ao lado e faça a sua história em sua cidade.
                            </p>
                        </Accordion.Content>
                    </Accordion.Panel>
                </Accordion>
            </div>
            <div>
                <div className="items-center p-4 mt-4">
                    <div className="flex justify-between w-full sm:text-lg md:text-xl">
                        <h1>Últimas Postagens</h1>
                        <Link to={"/postagens"} className="text-blue-600 hover:text-blue-400 hover:underline">
                            Ver mais
                        </Link>
                    </div>


                    <div className="grid md:grid-cols-2 items-center">
                        <div className="h-80 md:h-96 max-w-[600px] w-full">
                            <Flowbite theme={{ theme: customTheme }}>
                                <Carousel>
                                    {posts.map(post => {

                                        return (
                                            <div key={post.postId} className="flex justify-center items-center w-full">
                                                <PostCard post={post} />
                                            </div>
                                        )
                                    })}
                                </Carousel>
                            </Flowbite>
                        </div>

                        <div className="mt-4 md:mt-0 divide-y divide-gray-300 overflow-y-hidden md:overflow-y-scroll max-h-80 ">
                        {posts.map(post => {
                                return (
                                    <div key={post.postId}>
                                        <PostSmCard post={post} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div className="flex justify-between p-4 sm:text-lg md:text-xl">
                    <h1>Projetos recentes</h1>
                    <Link to={"/projetos"} className="text-blue-600 hover:text-blue-400 hover:underline">
                        Ver mais
                    </Link>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 h-[78rem] md:h-[47rem] overflow-hidden gap-6 items-start p-4">
                    {projects.map(project => {
                        return (
                            <div key={project.id} >
                                <ProjectCard project={project} />
                            </div>
                        )
                    })}
                </div>

                <div className="flex justify-between p-4 sm:text-lg md:text-xl" >
                    <h1>Categorias</h1>
                    <Link to={"/categorias"} className="text-blue-600 hover:text-blue-400 hover:underline">
                        Ver mais
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 h-[34rem] md:h-[12rem] overflow-hidden gap-6 items-start p-4">
                    {categories.map(category => {
                        return (
                            <div key={category.id} >
                                <CategoryCard category={category} />
                            </div>
                        )
                    })}
                </div>

                <div className="flex justify-between p-4 sm:text-lg md:text-xl">
                    <h1>Eventos recentes</h1>
                    <Link to={"/eventos"} className="text-blue-600 hover:text-blue-400 hover:underline">
                        Ver mais
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-[87rem] md:h-[35rem] overflow-hidden gap-6 items-start p-4">
                    {events.map(event => {
                        return (
                            <div key={event.eventId}>
                                <EventCard event={event} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    );
}