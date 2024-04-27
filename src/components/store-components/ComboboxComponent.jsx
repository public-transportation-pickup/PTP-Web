import PropTypes from 'prop-types';
import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
//import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { HiOutlineCheck,HiChevronDown } from "react-icons/hi";

export default function ComboboxComponent({listItems,params,onValueChange}) {
    const [selected, setSelected] = useState(listItems[0] ||'');
    const handeleChange=(value)=>{
      setSelected(value);
      if(value!==null || value!==undefined){
        onValueChange(value!==undefined?value:'');
      }
      
      console.log("onValueChange",value);
    }
    const [query, setQuery] = useState('')
  const filteredList =
    query === ''
      ? listItems
      : listItems.filter((person) =>
          person[params]
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )
  return (
    <div className="w-96">
    <Combobox value={selected} onChange={(e)=>handeleChange(e)}>
        <div className="relative">
        <div className="relative w-full cursor-default rounded-lg bg-white text-left sm:text-sm">
            <Combobox.Input
            className="w-full py-2 pl-3 pr-10 text-sm"
            displayValue={(person) => person[params]}
            onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <HiChevronDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
            />
            </Combobox.Button>
        </div>
        <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
        >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10">
            {filteredList.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                Nothing found.
                </div>
            ) : (
                filteredList.map((person,index) => (
                <Combobox.Option
                    key={index}
                    className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                    }`
                    }
                    value={person}
                >
                    {({ selected, active }) => (
                    <>
                        <span
                        className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                        }`}
                        >
                        {person[params]}
                        </span>
                        {selected ? (
                        <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-teal-600'
                            }`}
                        >
                            <HiOutlineCheck  className="h-5 w-5" aria-hidden="true" />
                        </span>
                        ) : null}
                    </>
                    )}
                </Combobox.Option>
                ))
            )}
            </Combobox.Options>
        </Transition>
        </div>
    </Combobox>
    </div>
  )
}

ComboboxComponent.propTypes={
    listItems:PropTypes.array.isRequired,
    params:PropTypes.string.isRequired,
    onValueChange:PropTypes.func
}
