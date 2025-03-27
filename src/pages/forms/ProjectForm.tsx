import { useNotification, FieldError } from "components/shared/Notification";
import { TextInput, Textarea, Button, Label, Breadcrumb } from "flowbite-react";
import { useFormik } from "formik";
import { FaFolderClosed, FaHouse, FaTag, FaX } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "resources/auth";
import { Project, ProjectCategory } from "resources/project";
import * as Yup from "yup";
import { Login } from "./UserForm";
import { Props } from "resources";
import { categoryMock, projectMock } from "mock/MockData";

export const projectValidationSchema = Yup.object().shape({
    projectTitle: Yup.string()
        .trim()
        .required("O campo título é obrigatório!")
        .min(3, "O título deve ter no mínimo 3 caracteres!")
        .max(100, "O título deve ter no máximo 100 caracteres!"),
    projectDescription: Yup.string()
        .trim()
        .required("O campo de descrição é obrigatório!"),
});

export function ProjectAddForm() {

    const notification = useNotification();
    const navigate = useNavigate();

    const { handleChange, errors, resetForm } = useFormik<Project>({
        initialValues: {
            projectTitle: "",
            projectDescription: "",
            projectImage: "",
            userId: 0
        },
        validationSchema: projectValidationSchema,
        onSubmit: onSubmit
    })


    async function onSubmit() {
        notification.notify("Salvo com sucesso!", "success");
        resetForm();
    }

    return (
        <>
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
                    <Breadcrumb.Item >
                        <Link to="/projetos/adicionar">
                            Adicionar Projeto
                        </Link>
                    </Breadcrumb.Item>
                </Breadcrumb>

                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-row justify-between items-center text-xl font-semibold tracking-tight text-gray-700 mb-3 w-2/3">
                        <span className="flex flex-row items-center gap-2"><FaFolderClosed /> Adicionar Projeto </span>
                        <FaX onClick={() => navigate(-1)} className="hover:shadow-xl cursor-pointer rounded-full  p-1 border hover:bg-gray-300  text-2xl" />
                    </div>
                    <form onSubmit={onSubmit} className="space-y-2 w-2/3">
                        <div >
                            <Label className="block text-sm font-medium leading-6 text-gray-700" value="Título: *" />
                            <TextInput
                                color="bg-zinc-400"
                                id="projectTitle"
                                onChange={handleChange}
                            />
                            <FieldError error={errors.projectTitle} />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium leading-6 text-gray-700" value="Descrição: *" />
                            <Textarea
                                color="bg-zinc-400"
                                id="projectDescription"
                                onChange={handleChange}
                            />
                            <FieldError error={errors.projectDescription} />
                        </div>
                        <div className="mt-5 grid grid-cols-1">
                            <Label className="block text-sm font-medium leading-6 text-gray-700" value="Url da Imagem: " />
                            <TextInput
                                color="bg-zinc-400"
                                id="projectImage"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mt-5 flex items-center justify-end gap-x-4">
                            <Button type="submit" gradientDuoTone="purpleToBlue" >Salvar</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export function ProjectEditForm({ params: projectId }: Props) {
    const notification = useNotification();
    const navigate = useNavigate();

    const { errors, handleChange, resetForm } = useFormik<Project>({
        initialValues: {
            id: projectId
        },
        validationSchema: projectValidationSchema,
        onSubmit: onSubmit
    })
    async function onSubmit() {
        notification.notify("Salvo com sucesso!", "success");
        resetForm();
    }
    return (
        <div>
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-row justify-between items-center text-xl font-semibold tracking-tight text-gray-700 mb-3 w-2/3">
                    <span className="flex flex-row items-center gap-2"><FaFolderClosed /> Editar Projeto </span>
                    <FaX onClick={() => navigate(0)} className="hover:shadow-xl cursor-pointer rounded-full  p-1 border hover:bg-gray-300 text-2xl" />
                </div>
                <form onSubmit={onSubmit} className="space-y-2 w-2/3">
                    <div>
                        <Label className="block text-sm font-medium leading-6 text-gray-700" value="Título: *" />
                        <TextInput
                            color="bg-zinc-400"
                            id="projectTitle"
                            onChange={handleChange}
                        />
                        <FieldError error={errors.projectTitle} />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium leading-6 text-gray-700" value="Url de Imagem: " />
                        <TextInput
                            color="bg-zinc-400"
                            id="projectImage"
                            onChange={handleChange}
                        />
                        <FieldError error={errors.projectImage} />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium leading-6 text-gray-700" value="Descrição: *" />
                        <Textarea
                            className="h-[200px]"
                            color="bg-zinc-400"
                            id="projectDescription"
                            onChange={handleChange}
                        />
                        <FieldError error={errors.projectDescription} />
                    </div>

                    <div className="mt-5 flex items-center justify-end gap-x-4">
                        <Button type="submit" gradientDuoTone="purpleToBlue" >Salvar</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const projectCategoryValidationSchema = Yup.object().shape({
    categoryName: Yup.string()
        .trim()
        .required("Selecione uma categoria para adicionar!"),
});


export function ProjectCategoryAddForm({ params: projectId }: Props) {

    const notification = useNotification();
    const query = "";

    const { errors, handleChange, resetForm } = useFormik<ProjectCategory>({
        initialValues: {
            categoryName: "",
            projectId: projectId,
        },
        validationSchema: projectCategoryValidationSchema,
        onSubmit: onSubmit
    })

    async function onSubmit() {
        notification.notify("Salvo com sucesso!", "success");
        resetForm();
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-row justify-between items-center text-xl font-semibold tracking-tight text-gray-700 mb-3 w-full md:w-2/3">
                    <span className="flex flex-row items-center gap-2"><FaTag /> Adicionar Categoria </span>
                </div>
                <form onSubmit={onSubmit} className="space-y-2 w-full md:w-2/3">
                    <div>
                        <Label className="block text-sm font-medium leading-6 text-gray-700" value="Categoria: *" />
                        <TextInput
                            color="bg-zinc-400"
                            id="categoryName"
                            list="categoryList"
                            onChange={handleChange}
                        />
                        <datalist id="categoryList">
                            {categoryMock.filter((category) =>
                                category.categoryName?.toUpperCase().includes(query.toLocaleUpperCase()))
                                .map((category) =>
                                    <>
                                        <option id="query" key={category.id} value={category.categoryName}>
                                            {category.categoryName}
                                        </option>
                                    </>
                                )
                            }
                        </datalist>
                        <FieldError error={errors.categoryName} />
                    </div>

                    <div className="mt-5 flex items-center justify-end gap-x-4">
                        <Button type="submit" gradientDuoTone="purpleToBlue" >Salvar</Button>
                    </div>
                </form>
            </div>
        </>
    );
}