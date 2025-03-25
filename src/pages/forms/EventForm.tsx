import { Breadcrumb, Button, Label, Select, Textarea, TextInput } from "flowbite-react";
import { FaCalendarCheck, FaHouse, FaX } from "react-icons/fa6";
import { useNotification, FieldError } from "components/shared/Notification";
import { useFormik } from "formik";
import { useAuth } from "resources/auth";
import { Event } from "resources/event";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Props } from "resources";
import { projectMock } from "mock/MockData";


export const eventValidationSchema = Yup.object().shape({
    eventTitle: Yup.string()
        .trim()
        .required("O campo título é obrigatório!")
        .min(3, "O título deve ter no mínimo 3 caracteres!")
        .max(100, "O título deve ter no máximo 100 caracteres!"),
    eventDescription: Yup.string()
        .trim()
        .required("O campo de descrição é obrigatório!"),
    eventStatus: Yup.string().trim().required("O campo de status é obrigatório!"),
});

export function EventAddForm() {
    const notification = useNotification();
    const auth = useAuth();
    const userId = auth.getUserSession()?.id;
    const query = "";

    const { values, handleChange, errors, resetForm } = useFormik<Event>({
        initialValues: {
            eventTitle: "",
            eventDescription: "",
            eventImage: "",
            eventDate: "",
            eventStatus: "",
            projectTitle: "",
            userId: 0,
        },
        validationSchema: eventValidationSchema,
        onSubmit: onSubmit
    })

    async function onSubmit() {
        notification.notify("Salvo com sucesso!", "success");
        resetForm();
    }

    return (
        <>
            <div className="mt-10">
                <Breadcrumb aria-label="breadcrumb" className="mb-3 py-2">
                    <Breadcrumb.Item icon={FaHouse}>
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
                        <Link to="/eventos/adicionar">
                            Adicionar Evento
                        </Link>
                    </Breadcrumb.Item>
                </Breadcrumb>

                <div className="flex flex-col items-center">
                    <div className="flex flex-row justify-between items-center text-xl font-semibold tracking-tight text-gray-700 mb-3 w-2/3">
                        <span className="flex flex-row items-center gap-2"><FaCalendarCheck /> Adicionar Evento</span>
                        <Link to={"/"}>
                            <FaX className="hover:shadow-xl cursor-pointer rounded-full  p-1 border hover:bg-gray-300  text-2xl" />
                        </Link>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-2 w-2/3 ">
                        <div>
                            <TextInput type="hidden"
                                id="userId"
                                onChange={handleChange}
                                value={userId}
                            />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium leading-6 text-gray-700" value="Título: *" />
                            <TextInput
                                color="bg-zinc-400"
                                id="eventTitle"
                                onChange={handleChange}
                                value={values.eventTitle}
                            />
                            <FieldError error={errors.eventTitle} />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium leading-6 text-gray-700" value="Projeto Associado: *" />
                            <TextInput
                                color="bg-zinc-400"
                                id="projectTitle"
                                list="projectList"
                                onChange={handleChange}
                                value={values.projectTitle}
                            />
                            <datalist id="projectList">
                                {projectMock.filter((project) =>
                                    project.projectTitle?.toUpperCase().includes(query.toLocaleUpperCase()))
                                    .map((project) =>
                                        <>
                                            <option id="query" key={project.id} value={project.projectTitle}>
                                                {project.projectTitle}
                                            </option>
                                        </>
                                    )
                                }
                            </datalist>
                        </div>
                        <div>
                            <Label className='block text-sm font-medium leading-6 text-gray-700' value="Descrição: *" />
                            <Textarea
                                color="bg-zinc-400"
                                id="eventDescription"
                                onChange={handleChange}
                                value={values.eventDescription}
                            />
                            <FieldError error={errors.eventDescription} />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium leading-6 text-gray-700" value="Data do Evento: *" />
                            <TextInput
                                type="date"
                                color="bg-zinc-400"
                                id="eventDate"
                                onChange={handleChange}
                                value={values.eventDate}
                            />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium leading-6 text-gray-700" value="Status do Evento: *" />
                            <Select
                                color="bg-zinc-400"
                                id="eventStatus"
                                onChange={handleChange}
                                value={values.eventStatus}
                            >
                                <option></option>
                                <option>Indefinido</option>
                                <option>Finalizado</option>
                                <option>Planejando</option>
                                <option>Programado</option>
                                <option>Cancelado</option>
                                <option>Adiado</option>
                            </Select>
                            <FieldError error={errors.eventStatus} />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium leading-6 text-gray-700" value="Url de Imagem:" />
                            <TextInput
                                color="bg-zinc-400"
                                id="eventImage"
                                onChange={handleChange}
                                value={values.eventImage}
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


export function EventEditForm({ params: eventId }: Props) {
    const notification = useNotification();
    const auth = useAuth();
    const userId = auth.getUserSession()?.id;
    const navigate = useNavigate();

    const query = "";

    const { values, handleChange, errors } = useFormik<Event>({
        initialValues: {
            eventId: eventId,
            eventTitle: "",
            eventDescription: "",
            eventImage: "",
            eventDate: "",
            eventStatus: "",
            projectTitle: "",
            userId: userId
        },
        validationSchema: eventValidationSchema,
        onSubmit: onSubmit
    })


    async function onSubmit() {
        notification.notify("Salvo com sucesso!", "success");
    }

    return (
        <>
            <div className="flex flex-col items-center my-6 ">
                <div className="flex flex-row justify-between items-center text-xl font-semibold tracking-tight text-gray-700 mb-3 w-2/3">
                    <span className="flex flex-row items-center gap-2"><FaCalendarCheck /> Editar Evento </span>
                    <FaX onClick={() => navigate(0)} className="hover:shadow-xl cursor-pointer rounded-full  p-1 border hover:bg-gray-300  text-2xl" />
                </div>
                <form onSubmit={onSubmit} className="space-y-2 w-2/3">
                    <div>
                        <TextInput
                            type="hidden"
                            id="id"
                            onChange={handleChange}
                            value={eventId}
                        />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium leading-6 text-gray-700" value="Título: *" />
                        <TextInput
                            color="bg-zinc-400"
                            id="eventTitle"
                            onChange={handleChange}
                            value={values.eventTitle}
                        />
                        <FieldError error={errors.eventTitle} />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium leading-6 text-gray-700" value="Projeto Associado: *" />
                        <TextInput
                            color="bg-zinc-400"
                            id="projectTitle"
                            list="projectList"
                            onChange={handleChange}
                            value={values.projectTitle}
                        />
                        <datalist id="projectList">
                            {projectMock.filter((project) =>
                                project.projectTitle?.toUpperCase().includes(query.toLocaleUpperCase()))
                                .map((project) =>
                                    <>
                                        <option id="query" key={project.id} value={project.projectTitle}>
                                            {project.projectTitle}
                                        </option>
                                    </>
                                )
                            }
                        </datalist>
                    </div>
                    <div>
                        <Label className="block text-sm font-medium leading-6 text-gray-700" value="Descrição: *" />
                        <Textarea
                            className="h-[160px]"
                            color="bg-zinc-400"
                            id="eventDescription"
                            onChange={handleChange}
                            value={values.eventDescription}
                        />
                        <FieldError error={errors.eventDescription} />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium leading-6 text-gray-700" value="Data do Evento: *" />
                        <TextInput
                            type="date"
                            color="bg-zinc-400"
                            id="eventDate"
                            onChange={handleChange}
                            value={values.eventDate}
                        />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium leading-6 text-gray-700" value="Status do Evento: *" />
                        <Select
                            color="bg-zinc-400"
                            id="eventStatus"
                            onChange={handleChange}
                            value={values.eventStatus}
                        >
                            <option></option>
                            <option>Indefinido</option>
                            <option>Finalizado</option>
                            <option>Planejando</option>
                            <option>Programado</option>
                            <option>Cancelado</option>
                            <option>Adiado</option>
                        </Select>
                        <FieldError error={errors.eventStatus} />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium leading-6 text-gray-700" value="Url de Imagem:" />
                        <TextInput
                            color="bg-zinc-400"
                            id="eventImage"
                            onChange={handleChange}
                            value={values.eventImage}
                        />
                    </div>
                    <div className="mt-5 flex items-center justify-end gap-x-4">
                        <Button type="submit" gradientDuoTone="purpleToBlue" >Salvar</Button>
                    </div>
                </form>
            </div>
        </>
    );
}