import { TextInput } from "flowbite-react";
import { GoSearch } from "react-icons/go";

type InputSearchProps = {
    pageTitle?: string;
    pageIcon?: any;
    onChange?: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    value?: string;
}

export const SearchBar = ({ pageTitle, value, onChange, pageIcon }: InputSearchProps) => {

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between mt-6">
                <h1 className="flex flex-row items-center gap-x-4 text-2xl text-gray-700 font-semibold">{pageIcon} {pageTitle}</h1>
                <div className="flex md:justify-end">
                    <TextInput icon={GoSearch}
                        className="py-2 max-w-[400px]"
                        color="bg-zinc-400"
                        type="text"
                        id="query"
                        value={value}
                        onChange={onChange}
                        placeholder="buscar"
                    />
                </div>
            </div>
        </>
    );
}