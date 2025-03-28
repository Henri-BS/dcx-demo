import { CategoryCard } from "components/cards/CategoryCard";
import { ProjectCard } from "components/cards/ProjectCard";
import { useAuth } from "resources/auth";
import { Project } from "resources/project";
import { User } from "resources/user";

import { Accordion, Breadcrumb } from "flowbite-react";

import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa6";
import { Props } from "resources";
import { Link, useParams } from "react-router-dom";
import { baseUrl } from "utils/requests";
import axios from "axios";
import { CustomMarkdown } from "components/shared/Template";
import { Category } from "resources/category";

export function UserPersonalProfile() {
    const params = useParams();
    return (
        <>
            <UserPersonalDetails params={`${params.userId}`} />
        </>
    );
}


export function UserPersonalDetails({ params: userId }: Props) {

    const auth = useAuth();
    userId = auth.getUserSession()?.id;
    const [user, setUser] = useState<User>();
    const [projectPage, setProjectPage] = useState<Project[]>();
    const [categoryPage, setCategoryPage] = useState<Category[]>();



    useEffect(() => {
        axios.get(`${baseUrl}/users/${userId}`)
            .then((response) => {
                setUser(response.data);
            });
    }, [userId]);

    useEffect(() => {
        axios.get(`${baseUrl}/projects/by-user/${userId}?&size=10`)
            .then((response) => {
                setProjectPage(response.data);
            });

        axios.get(`${baseUrl}/user-category?userId=${userId}&size=9`)
            .then((response) => {
                setCategoryPage(response.data);
            });
    }, [userId]);


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

            <div className="flex flex-wrap items-center  justify-center">
                <div className="container lg:w-full bg-white shadow-xl transform duration-200 easy-in-out">
                    <div className=" h-40 overflow-hidden" >
                        <img className="w-full rounded-t-lg" src={user?.userCoverImage ?? require("assets/img/user_cover.png")} alt={user?.username} />
                    </div>
                    <div className="flex justify-center px-5 -mt-12">
                        <img className="h-32 w-32 bg-white p-2 rounded-full" src={user?.userImage ?? require("assets/img/user_profile.png")} alt={user?.username} />
                    </div>
                    <div className="text-gray-600 text-center px-14">
                        <h2 className="text-gray-800 text-3xl font-bold">{user?.username}</h2>
                        <p className="mt-2 text-md font-semibold"> {user?.userLocation} </p>
                        <p className="mt-2 text-lg text-justify">
                            <CustomMarkdown item={user?.userBio} />
                        </p>
                    </div>
                    <hr className="mt-6" />
                </div>
            </div>
            <Accordion collapseAll className="mt-12 ">
                <Accordion.Panel>
                    <Accordion.Title>
                        <h2 className="flex flex-row gap-2 mt-5 text-2xl text-zinc-800 "><FaIcons.FaTag />Categorias Relacionadas</h2>
                    </Accordion.Title>
                    <Accordion.Content className="p-2">

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
                            {categoryPage?.map(category => (
                                <div key={category.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                                    <CategoryCard category={category} />
                                </div>
                            ))}
                        </div>

                    </Accordion.Content>
                </Accordion.Panel>

                <Accordion.Panel>
                    <Accordion.Title>
                        <h2 className="flex flex-row gap-2 mt-5 text-2xl text-zinc-800 "><FaIcons.FaFolderClosed />Projetos Relacionados</h2>
                    </Accordion.Title>
                    <Accordion.Content className="p-2">
                        <div className="  grid grid-cols-1 xl:grid-cols-2 gap-y-10 gap-x-6 items-start p-8">
                            {projectPage?.map(project => (
                                <div key={project.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                                    <ProjectCard project={project} />
                                </div>
                            ))}
                        </div>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
        </div>
    );
}