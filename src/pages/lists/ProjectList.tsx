import { ProjectCard } from "components/cards/ProjectCard";
import { SearchBar } from "components/shared/Pagination";
import { useState } from "react";
import { removeAccents } from "components/shared/Template";
import { FaFolderClosed, FaHouse } from "react-icons/fa6";
import { Breadcrumb } from "flowbite-react";
import { Link } from "react-router-dom";
import { projectMock } from "mock/MockData";

export default function Projects() {
    const [query, setQuery] = useState("");

    const filter = () => {
        return projectMock.filter(project =>
            project.projectTitle.toUpperCase().includes(query.toLocaleUpperCase()) ||
            removeAccents(project.projectTitle).toUpperCase().includes(query.toLocaleUpperCase())
        ).sort((project) => project.id);
    };

    const projects = filter();

    return (
        <div>

            <Breadcrumb aria-label="breadcrumb" className="mb-3 py-2">
                <Breadcrumb.Item icon={FaHouse}>
                    <Link to="/">
                        Início
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/projetos">
                        Projetos
                    </Link>
                </Breadcrumb.Item>
            </Breadcrumb>

            <div>
                <SearchBar
                    pageIcon={<FaFolderClosed />}
                    pageTitle="Projetos"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-10 gap-x-6 items-start p-8">
                    {projects.map(project => {
                        return (
                            <div key={project.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                                <ProjectCard project={project} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}