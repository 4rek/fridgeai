import { Dialog as TailwindDialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";

interface DialogProps {
  open: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  submitText: string;
  title: string;
  children: React.ReactNode;
}

export default function Dialog({
  open,
  onSubmit,
  onCancel,
  submitText,
  title,
  children,
}: DialogProps) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <TailwindDialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={onCancel}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <TailwindDialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start w-full">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                      <TailwindDialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        {title}
                      </TailwindDialog.Title>
                      {children}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 ml-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={onSubmit}
                  >
                    {submitText}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={onCancel}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </TailwindDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </TailwindDialog>
    </Transition.Root>
  );
}