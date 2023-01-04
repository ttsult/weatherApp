import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoAPIOptions } from "../../api";

const Search = ({onSearchChange}) => { // broad search function
    const [search, setSearch] = useState(null);

    const loadOptions = (inputValue) => { // loading options feature 
        return fetch(
            `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
            geoAPIOptions
        )
            .then((response) => response.json())
            .then((response) => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                        }
                    })
                }
            })
            .catch(err => console.error(err));
    }

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);

    }

    return (
        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={600} // milliseconds
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions} // loading search options method
        />
    )

}

export default Search;