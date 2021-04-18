/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-handler-names */
import { forwardRef, Fragment, useState, VFC } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = UseFormRegisterReturn & {
  array: string[];
  label?: string;
  // register: any;
};

export const OldSelect: VFC<Props> = forwardRef((props, ref) => {
  const [selected, setSelected] = useState(props.array[0]);

  return (
    <div className="py-2">
      <label
        htmlFor={props.label}
        className="block text-sm leading-5 font-medium text-gray-700 dark:text-white pb-1"
      >
        {props.label}
      </label>
      <div className="mx-auto">
        <Listbox value={selected} onChange={setSelected}>
          {({ open }) => (
            <>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-blue-300 focus-visible:ring-offset-2 focus-visible:border-blue-500 sm:text-sm">
                  <span className="block truncate">{selected}</span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <SelectorIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options
                    static
                    className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none z-100 sm:text-sm"
                    ref={ref}
                    // {...props.register}
                  >
                    {props.array.map((item, itemIdx) => (
                      <Listbox.Option
                        key={itemIdx}
                        className={({ active }) =>
                          `${
                            active
                              ? "text-blue-900 bg-blue-100"
                              : "text-gray-900"
                          }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                        }
                        value={item}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`${
                                selected ? "font-medium" : "font-normal"
                              } block truncate`}
                            >
                              {item}
                            </span>
                            {selected ? (
                              <span
                                className={`${
                                  active ? "text-blue-600" : "text-blue-600"
                                }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                              >
                                <CheckIcon
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
    </div>
  );
});

OldSelect.displayName === "OldSelect";
