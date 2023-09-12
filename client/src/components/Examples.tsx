import React, { useState } from "react";
import { Select, Option, Typography } from "@material-tailwind/react";
import { Country, State, City } from "country-state-city";

function Examples() {
	const countries = Country.getAllCountries();
	const [country, setCountry] = useState("");
	const [state, setState] = useState("");
	const [city, setCity] = useState("");
	const countryIsoCode = country.split(",")[1];
	const stateIsoCode = state.split(",")[1];
	const states = State.getStatesOfCountry(countryIsoCode);
	const cities = City.getCitiesOfState(countryIsoCode, stateIsoCode);

	return (
		<div>
			<Typography variant="h6" className="px-5">
				Address
			</Typography>
			<div className="flex flex-col md:flex-row gap-3 p-3 justify-center items-center">
				<Select
					size="lg"
					label="Select Country"
					onChange={(e) => setCountry(e)}
					selected={(element) =>
						element &&
						React.cloneElement(element, {
							className:
								"flex items-center px-0 gap-2 pointer-events-none",
						})
					}
				>
					{countries.map(({ name, isoCode }) => (
						<Option
							key={name}
							value={name + "," + isoCode}
							color="blue"
							className="flex flex-start items-center justify-start"
						>
							<span
								className={`fi fi-${isoCode.toLowerCase()} mr-3`}
							></span>
							{name}
						</Option>
					))}
				</Select>
				<Select
					size="lg"
					label="Select State"
					onChange={(e) => setState(e)}
					selected={(element) =>
						element &&
						React.cloneElement(element, {
							className:
								"flex items-center px-0 gap-2 pointer-events-none",
						})
					}
				>
					{states.map(({ name, isoCode }) => (
						<Option
							key={name}
							value={name + "," + isoCode}
							color="blue"
							className="flex flex-start items-center justify-start"
						>
							{name}
						</Option>
					))}
				</Select>
				<Select
					size="lg"
					label="Select City"
					onChange={(e) => setCity(e)}
					selected={(element) =>
						element &&
						React.cloneElement(element, {
							className:
								"flex items-center px-0 gap-2 pointer-events-none",
						})
					}
				>
					{cities.map(({ name }) => (
						<Option
							key={name}
							value={name}
							color="blue"
							className="flex flex-start items-center justify-start"
						>
							{name}
						</Option>
					))}
				</Select>
			</div>
		</div>
	);
}

export default Examples;
