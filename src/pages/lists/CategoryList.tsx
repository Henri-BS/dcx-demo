import { CategoryCard } from "components/cards/CategoryCard";
import { SearchBar } from "components/shared/SearchBar";
import { useState } from "react";
import { removeAccents } from "components/shared/Template";
import { FaHouse, FaTags } from "react-icons/fa6";
import { Breadcrumb } from "flowbite-react";
import { Link } from "react-router-dom";
import { categoryMock } from "mock/MockData";

export default function Categories() {

    const [query, setQuery] = useState("");
    const filter = () => {
        return categoryMock.filter(category =>
            category.categoryName.toUpperCase().includes(query.toLocaleUpperCase()) ||
            removeAccents(category.categoryName)?.toUpperCase().includes(query.toLocaleUpperCase())
        ).sort((category) => category.id);
    };

    const categories = filter();

    return (
        <div>
            <Breadcrumb aria-label="breadcrumb" className="mb-3 py-2">
                <Breadcrumb.Item icon={FaHouse}>
                    <Link to="/">
                        Início
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/categorias">
                        Categorias
                    </Link>
                </Breadcrumb.Item>
            </Breadcrumb>
            <div>
                <SearchBar
                    pageIcon={<FaTags />}
                    pageTitle="Categorias"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-y-10 gap-x-6 items-start mt-5">
                    {categories.map(category => (
                        <div key={category?.id} className="relative flex justify-center">
                            <CategoryCard category={category} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}