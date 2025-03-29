import { FieldError, useNotification } from "components/shared/Notification";
import { Post } from "resources/post";
import { Breadcrumb, Button, Label, Textarea, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { FaCalendarCheck, FaHouse, FaNewspaper, FaX } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Props } from "resources";
import { eventMock } from "mock/MockData";
import { EventPost } from "resources/event";

export const postValidationSchema = Yup.object().shape({
    postTitle: Yup.string()
        .trim()
        .required("O campo título é obrigatório!")
        .min(3, "O título deve ter no mínimo 3 caracteres!")
        .max(100, "O título deve ter no máximo 100 caracteres!"),
    postSummary: Yup.string()
        .trim()
        .required("O campo de resumo é obrigatório!")
        .max(300, "O resumo deve ter no máximo 300 caracteres!"),
    postDescription: Yup.string()
        .trim()
        .required("O campo de descrição é obrigatório!")
        .min(3, "O título deve ter no mínimo 3 caracteres!"),
});


export function PostAddForm() {
    const notification = useNotification();
    const navigate = useNavigate();

    const { handleChange, errors, resetForm } = useFormik<Post>({
        initialValues: {
            postId: 0,
        },
        validationSchema: postValidationSchema,
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
                        <Link to="/postagens">
                            Postagens
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                        <Link to="/postagens/adicionar">
                            Adicionar Postagem
                        </Link>
                    </Breadcrumb.Item>
                </Breadcrumb>

                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-row justify-between items-center text-lg font-semibold tracking-tight text-gray-700 mb-3 w-full md:w-2/3">
                        <span className="flex flex-row items-center gap-2"><FaNewspaper /> Adicionar Postagem </span>
                        <FaX onClick={() => navigate(-1)} className="hover:shadow-xl cursor-pointer rounded-full p-1 border hover:bg-gray-300  text-2xl" />
                    </div>
                    <form onSubmit={onSubmit} className="space-y-2 w-full md:w-2/3">
                        <div>
                            <Label className="block text-sm font-medium leading-6 text-gray-700" value="Título: *" />
                            <TextInput
                                color="bg-zinc-400"
                                id="postTitle"
                                onChange={handleChange}
                            />
                            <FieldError error={errors.postTitle} />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium leading-6 text-gray-700" value="Url de Imagem: " />
                            <TextInput
                                color="bg-zinc-400"
                                id="postImage"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium leading-6 text-gray-700" value="Resumo: *" />
                            <Textarea
                                color="bg-zinc-400"
                                id="postSummary"
                                onChange={handleChange}
                            />
                            <FieldError error={errors.postSummary} />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium leading-6 text-gray-700" value="Descrição: *" />
                            <Textarea
                                color="bg-zinc-400"
                                id="postDescription"
                                onChange={handleChange}
                            />
                            <FieldError error={errors.postDescription} />
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


export function PostEditForm({ params: postId }: Props) {
    const notification = useNotification();
    const navigate = useNavigate();

    const { handleChange, resetForm, errors } = useFormik<Post>({
        initialValues: {
            postId: postId
        },
        validationSchema: postValidationSchema,
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
                    <span className="flex flex-row items-center gap-2"><FaNewspaper /> Editar Postagem </span>
                    <FaX onClick={() => navigate(0)} className="hover:shadow-xl cursor-pointer rounded-full  p-1 border hover:bg-gray-300 text-2xl" />
                </div>
                <form onSubmit={onSubmit} className="space-y-2 w-full md:w-2/3">
                    <div>
                        <TextInput
                            type="hidden"
                            id="userId"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium leading-6 text-gray-700" value="Título: *" />
                        <TextInput
                            color="bg-zinc-400"
                            id="postTitle"
                            onChange={handleChange}
                        />
                        <FieldError error={errors.postTitle} />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium leading-6 text-gray-700" value="Url de Imagem: " />
                        <TextInput
                            color="bg-zinc-400"
                            id="postImage"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium leading-6 text-gray-700" value="Resumo: *" />
                        <Textarea
                            className="h-[160px]"
                            color="bg-zinc-400"
                            id="postSummary"
                            onChange={handleChange}
                        />
                        <FieldError error={errors.postSummary} />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium leading-6 text-gray-700" value="Descrição: *" />
                        <Textarea
                            className="h-[160px]"
                            color="bg-zinc-400"
                            id="postDescription"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mt-5 flex items-center justify-end gap-x-4">
                        <Button type="submit" gradientDuoTone="purpleToBlue">Salvar</Button>
                    </div>
                </form>
            </div>
        </>
    );
}


export function EventPostAddForm({ params: postId }: Props) {

    const notification = useNotification();
    const query = "";


    const { handleChange, resetForm } = useFormik<EventPost>({
        initialValues: {postId:postId},
        validationSchema: postValidationSchema,
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
                    <span className="flex flex-row items-center gap-2"><FaCalendarCheck /> Adicionar Evento </span>
                </div>
                <form onSubmit={onSubmit} className="space-y-2 w-full md:w-2/3">    
                    <div>
                        <TextInput
                            color="bg-zinc-400"
                            id="eventTitle"
                            list="eventList"
                            onChange={handleChange}
                        />
                        <datalist id="eventList">
                            {eventMock.filter((event) =>
                                event.eventTitle?.toUpperCase().includes(query.toLocaleUpperCase()))
                                .map((event) =>
                                    <>
                                        <option id="query" key={event.eventId} value={event.eventTitle}>
                                            {event.eventTitle}
                                        </option>
                                    </>
                                )
                            }
                        </datalist>
                    </div>

                    <div className="mt-5 flex items-center justify-end gap-x-4">
                        <Button type="submit" gradientDuoTone="purpleToBlue" >Salvar</Button>
                    </div>
                </form>
            </div>
        </>
    );
}