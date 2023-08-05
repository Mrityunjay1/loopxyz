import { useState, useEffect, useMemo } from "react";
import Multiselect from "multiselect-react-dropdown";

import DataTable from "react-data-table-component";
import data from "./data/data.json";

// import Dropdown from './Dropdown'

const columns = [
  {
    name: "Number",
    selector: (row) => row.number,
    sortable: true,
  },
  {
    name: "Mod 3",
    selector: (row) => row.mod3,
    sortable: true,
  },
  {
    name: "Mod 4",
    selector: (row) => row.mod4,
  },
  {
    name: "Mod 5",
    selector: (row) => row.mod5,
  },
  {
    name: "Mod 6",
    selector: (row) => row.mod6,
  },
];

interface ConstDataType {
  number: number;
  mod3: number;
  mod4: number;
  mod5: number;
  mod6: number;
}

interface FilterType {
  number?: number[];
  mod3?: string[];
  mod4?: string[];
  mod5?: string[];
  mod6?: string[];
}

function App() {
  // filter data states
  const [numberData, setNumbersData] = useState<number[]>([]);
  const [mod3, setMod3] = useState<string[]>([]);
  const [mod4, setMod4] = useState<string[]>([]);
  const [mod5, setMod5] = useState<string[]>([]);
  const [mod6, setMod6] = useState<string[]>([]);

  const [filters, setFilters] = useState<FilterType>({
    number: [],
    mod3: [],
    mod4: [],
    mod5: [],
    mod6: [],
  });

  const filteredData = useMemo(() => {
    // FIlter on numbers
    return (
      data
        .filter((item) => {
          if (!filters?.number?.length) return true;
          return filters?.number?.includes(item.number);
        })

        // Filter on mod3
        .filter((item) => {
          if (!filters?.mod3?.length) return true;
          return filters?.mod3?.includes(String(item.mod3));
        })

        // Filter on mod4
        .filter((item) => {
          if (!filters?.mod4?.length) return true;
          return filters?.mod4?.includes(String(item.mod4));
        })

        // Filter on mod5
        .filter((item) => {
          if (!filters?.mod5?.length) return true;
          return filters?.mod5?.includes(String(item.mod5));
        })

        // Filter on mod6
        .filter((item) => {
          if (!filters?.mod6?.length) return true;
          return filters?.mod6?.includes(String(item.mod6));
        })
    );
  }, [filters]);


  console.log('filteredData length', filteredData.length)

  useEffect(() => {
    if (!data) return;
    setNumbersData([...new Set(data.map((item) => item.number))]);
    setMod3([...new Set(data.map((item) => String(item.mod3)))]);
    setMod4([...new Set(data.map((item) => String(item.mod4)))]);
    setMod5([...new Set(data.map((item) => String(item.mod5)))]);
    setMod6([...new Set(data.map((item) => String(item.mod6)))]);
  }, []);



  // This useeffect ensures that only values that are available
  // Are shown in the filters
  useEffect(() => {
    if (!filteredData) return;
    // setNumbersData([...new Set(filteredData.map((item) => item.number))]);
    setMod3([...new Set(filteredData.map((item) => String(item.mod3)))]);
    setMod4([...new Set(filteredData.map((item) => String(item.mod4)))]);
    setMod5([...new Set(filteredData.map((item) => String(item.mod5)))]);
    setMod6([...new Set(filteredData.map((item) => String(item.mod6)))]);
  }, [filteredData]);



  const handleSelect = (name: string) => (value: number) => {
    setFilters({ ...filters, [name]: value });
  };


  const handleRemove = (name: string) => (value: value) => {
    setFilters({ ...filters, [name]: filters[name].filter((item) => item !== value) });
  };

  return (
    <>
      <div className="container">
        <Multiselect
          isObject={false}
          placeholder="number"
          onSelect={handleSelect("number")}
          onRemove={handleRemove("number")}
          options={numberData}
          showCheckbox
        />
        <Multiselect
          isObject={false}
          placeholder="mod 3"
          onSelect={handleSelect("mod3")}
          onRemove={handleRemove("mod3")}
          options={mod3}
          showCheckbox
        />
        <Multiselect
          isObject={false}
          placeholder="mod 4"
          onSelect={handleSelect("mod4")}
          onRemove={handleRemove("mod4")}
          options={mod4}
          showCheckbox
        />
        <Multiselect
          isObject={false}
          placeholder="mod 5"
          onSelect={handleSelect("mod5")}
          onRemove={handleRemove("mod5")}
          options={mod5}
          showCheckbox
        />
        <Multiselect
          isObject={false}
          placeholder="mod 6"
          onSelect={handleSelect("mod6")}
          onRemove={handleRemove("mod6")}
          options={mod6}
          showCheckbox
        />
      </div>
      <DataTable
        columns={columns}
        data={filteredData}
        fixedHeader={true}
        fixedHeaderScrollHeight="400px"
        pagination
        paginationTotalRows={1000}
      />
    </>
  );
}

export default App;
